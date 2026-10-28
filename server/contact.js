const fs = require("fs");
const path = require("path");

const WINDOW_MS = 15 * 60 * 1000;
const LIMIT = 5;
const MAX_BODY = 12_000;
const hits = new Map();
const leads = path.resolve(__dirname, "..", "data", "leads.jsonl");

const TIMELINES = new Set(["1m", "3m", "sem-pressa"]);

function clean(value, max) {
  return String(value ?? "")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function rateOk(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= LIMIT) {
    hits.set(ip, recent);
    return false;
  }
  recent.push(now);
  hits.set(ip, recent);
  return true;
}

function sameOrigin(request) {
  const origin = request.headers.origin;
  if (!origin) return true;
  try {
    return new URL(origin).host === request.headers.host;
  } catch {
    return false;
  }
}

function validate(input) {
  const fields = {};
  const lead = {
    name: clean(input.name, 120),
    company: clean(input.company, 160),
    whatsapp: clean(input.whatsapp, 40),
    email: clean(input.email, 160),
    segment: clean(input.segment, 80),
    hasSite: input.hasSite === "sim" ? "sim" : input.hasSite === "nao" ? "nao" : "",
    siteUrl: clean(input.siteUrl, 300),
    timeline: TIMELINES.has(input.timeline) ? input.timeline : "",
    project: clean(input.project, 2000),
  };

  if (lead.name.length < 2) fields.name = "Informe o nome.";
  if (lead.company.length < 2) fields.company = "Informe a empresa.";
  if (lead.whatsapp.replace(/\D/g, "").length < 10) fields.whatsapp = "Informe um WhatsApp válido.";
  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) fields.email = "Confira o e-mail.";
  if (lead.segment.length < 2) fields.segment = "Informe o segmento.";
  if (!lead.hasSite) fields.hasSite = "Diga se já tem site.";
  if (lead.hasSite === "sim" && !/^https?:\/\/\S+$/i.test(lead.siteUrl)) fields.siteUrl = "Informe o link do site atual.";
  if (!lead.timeline) fields.timeline = "Escolha um prazo.";

  return { lead, fields };
}

function send(response, status, payload) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
  });
  response.end(JSON.stringify(payload));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    request.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY) {
        reject(Object.assign(new Error("too-large"), { status: 413 }));
        request.destroy();
        return;
      }
      chunks.push(chunk);
    });
    request.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    request.on("error", reject);
  });
}

function handleContact(request, response) {
  const url = new URL(request.url, "http://127.0.0.1");
  if (url.pathname !== "/api/contato") return false;
  if (request.method !== "POST") {
    send(response, 405, { ok: false });
    return true;
  }

  const ip = request.socket?.remoteAddress || "local";
  if (!sameOrigin(request) || !rateOk(ip)) {
    send(response, 429, { ok: false });
    return true;
  }

  readBody(request)
    .then((raw) => {
      let input = {};
      try {
        input = JSON.parse(raw || "{}");
      } catch {
        send(response, 400, { ok: false, fields: {} });
        return;
      }

      if (clean(input.website, 200)) {
        send(response, 200, { ok: true });
        return;
      }

      const { lead, fields } = validate(input);
      if (Object.keys(fields).length) {
        send(response, 400, { ok: false, fields });
        return;
      }

      fs.mkdirSync(path.dirname(leads), { recursive: true });
      fs.appendFileSync(leads, `${JSON.stringify({ at: new Date().toISOString(), ...lead })}\n`);
      send(response, 200, { ok: true });
    })
    .catch((error) => {
      if (response.headersSent) return;
      send(response, error.status || 400, { ok: false });
    });

  return true;
}

module.exports = { handleContact };
