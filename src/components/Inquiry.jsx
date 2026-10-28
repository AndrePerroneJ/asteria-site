import { useState } from "react";
import { whatsappLink } from "../config.js";

const EMPTY = {
  name: "",
  company: "",
  whatsapp: "",
  email: "",
  segment: "",
  hasSite: "",
  siteUrl: "",
  timeline: "",
  project: "",
  website: "",
};

const ERROR = "Algo saiu do tom. Confira os campos marcados e tente de novo.";
const SUCCESS = "Recebido. Em breve, a cortina sobe. Entraremos em contato pelo WhatsApp.";

const TIMELINE_LABEL = {
  "1m": "Até 1 mês",
  "3m": "1 a 3 meses",
  "sem-pressa": "Sem pressa",
};

function validate(values) {
  const fields = {};
  const name = values.name.trim();
  const company = values.company.trim();
  const email = values.email.trim();
  const segment = values.segment.trim();
  const siteUrl = values.siteUrl.trim();

  if (name.length < 2) fields.name = "Informe o nome.";
  if (company.length < 2) fields.company = "Informe a empresa.";
  if (values.whatsapp.replace(/\D/g, "").length < 10) fields.whatsapp = "Informe um WhatsApp válido.";
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fields.email = "Confira o e-mail.";
  if (segment.length < 2) fields.segment = "Informe o segmento.";
  if (values.hasSite !== "sim" && values.hasSite !== "nao") fields.hasSite = "Diga se já tem site.";
  if (values.hasSite === "sim" && !/^https?:\/\/\S+$/i.test(siteUrl)) fields.siteUrl = "Informe o link do site atual.";
  if (!TIMELINE_LABEL[values.timeline]) fields.timeline = "Escolha um prazo.";

  return fields;
}

function openWhatsApp(message) {
  const link = document.createElement("a");
  link.href = whatsappLink(message);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function Inquiry() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  function set(name, value) {
    setValues((current) => ({ ...current, [name]: value }));
  }

  function onSubmit(event) {
    event.preventDefault();
    setErrors({});

    if (values.website.trim()) {
      setStatus("sent");
      return;
    }

    const fields = validate(values);
    if (Object.keys(fields).length) {
      setErrors(fields);
      setStatus("error");
      return;
    }

    const lines = [
      "Olá, quero iniciar um projeto com a Asteria.",
      `Nome: ${values.name.trim()}`,
      `Empresa: ${values.company.trim()}`,
      `WhatsApp: ${values.whatsapp.trim()}`,
      values.email.trim() && `E-mail: ${values.email.trim()}`,
      `Segmento: ${values.segment.trim()}`,
      values.hasSite === "sim" ? "Já tem site: sim" : "Já tem site: não",
      values.siteUrl.trim() && `Site: ${values.siteUrl.trim()}`,
      `Prazo: ${TIMELINE_LABEL[values.timeline]}`,
      values.project.trim(),
    ].filter(Boolean);

    openWhatsApp(lines.join("\n"));
    setStatus("sent");

    fetch("/api/contato", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }).catch(() => {});
  }

  return (
    <section id="iniciar" className="band" aria-labelledby="iniciar-title">
      <div className="frame">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="label">Iniciar projeto</p>
            <h2 id="iniciar-title" className="heading mt-6">
              Conte a sua história. A gente compõe o resto.
            </h2>
          </div>
          <p className="body max-w-[520px] lg:col-span-5">Leva dois minutos.</p>
        </div>

        {status === "sent" ? (
          <p className="heading-xs mt-16 max-w-[20ch]" role="status">
            {SUCCESS}
          </p>
        ) : (
          <form className="mt-16 max-w-3xl" onSubmit={onSubmit} noValidate>
            <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
              <label>
                Site
                <input name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(event) => set("website", event.target.value)} />
              </label>
            </div>

            <div className="grid gap-9 sm:grid-cols-2">
              <Field label="Nome" name="name" required value={values.name} error={errors.name} onChange={set} />
              <Field label="Empresa" name="company" required value={values.company} error={errors.company} onChange={set} />
              <Field label="WhatsApp" name="whatsapp" required value={values.whatsapp} error={errors.whatsapp} onChange={set} autoComplete="tel" />
              <Field label="E-mail" name="email" type="email" value={values.email} error={errors.email} onChange={set} autoComplete="email" />
              <Field label="Segmento" name="segment" required value={values.segment} error={errors.segment} onChange={set} className="sm:col-span-2" />
            </div>

            <fieldset className="mt-9">
              <legend className="field-label">Já tem site?</legend>
              <div className="mt-4 flex flex-wrap gap-6">
                <Choice name="hasSite" value="sim" current={values.hasSite} onChange={set} label="Sim, quero renovar" />
                <Choice name="hasSite" value="nao" current={values.hasSite} onChange={set} label="Não, será o primeiro" />
              </div>
              {errors.hasSite ? <p className="line-error">{errors.hasSite}</p> : null}
            </fieldset>

            {values.hasSite === "sim" ? (
              <div className="mt-9">
                <Field label="Link do site atual" name="siteUrl" required value={values.siteUrl} error={errors.siteUrl} onChange={set} autoComplete="url" />
              </div>
            ) : null}

            <label className="mt-9 block">
              <span className="field-label">Prazo ideal</span>
              <select name="timeline" value={values.timeline} onChange={(event) => set("timeline", event.target.value)} aria-invalid={errors.timeline ? "true" : "false"} className={`line${errors.timeline ? " is-error" : ""}`}>
                <option value="">Escolha</option>
                <option value="1m">Até 1 mês</option>
                <option value="3m">1 a 3 meses</option>
                <option value="sem-pressa">Sem pressa</option>
              </select>
              {errors.timeline ? <p className="line-error">{errors.timeline}</p> : null}
            </label>

            <label className="mt-9 block">
              <span className="field-label">Conte um pouco sobre o projeto</span>
              <textarea name="project" rows={4} value={values.project} onChange={(event) => set("project", event.target.value)} className="line" />
            </label>

            <button type="submit" className="btn-primary mt-10" disabled={status === "sending"}>
              Enviar e iniciar o projeto
            </button>
            <p className="mt-4 max-w-[46ch] text-[12px] text-smoke">Seus dados ficam só com a gente e servem apenas para responder ao seu contato.</p>
            {status === "error" ? (
              <p className="line-error" role="alert">
                {ERROR}
              </p>
            ) : null}
          </form>
        )}
      </div>
    </section>
  );
}

function Field({ label, name, value, error, onChange, required, type = "text", autoComplete, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="field-label">{label}</span>
      <input name={name} type={type} required={required} autoComplete={autoComplete} value={value} aria-invalid={error ? "true" : "false"} onChange={(event) => onChange(name, event.target.value)} className={`line${error ? " is-error" : ""}`} />
      {error ? <p className="line-error">{error}</p> : null}
    </label>
  );
}

function Choice({ name, value, current, onChange, label }) {
  const selected = current === value;
  return (
    <label className={`flex cursor-pointer items-center gap-3 text-[18px] font-normal ${selected ? "text-light" : "text-smoke"}`}>
      <input className="sr-only" type="radio" name={name} value={value} checked={selected} onChange={() => onChange(name, value)} />
      <span className={`grid h-3.5 w-3.5 place-items-center rounded-full border ${selected ? "border-violet" : "border-[var(--color-hairline)]"}`} aria-hidden="true">
        {selected ? <span className="h-1.5 w-1.5 rounded-full bg-violet" /> : null}
      </span>
      {label}
    </label>
  );
}
