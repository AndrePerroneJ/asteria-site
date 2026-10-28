import { useEffect, useRef } from "react";
import wordmark from "../../design/logo/asteria-wordmark.svg";

const WHITE = [255, 255, 255];
const VIOLET = [107, 63, 224];
const SPARK = [242, 194, 48];
const DUSK = [240, 138, 107];
const LOGO_RATIO = 1595 / 265;
const DEPTHS = [0.05, 0.15, 0.3];

function rgb([r, g, b]) {
  return `rgb(${r} ${g} ${b})`;
}

function mix(from, to, amount) {
  return [
    Math.round(from[0] + (to[0] - from[0]) * amount),
    Math.round(from[1] + (to[1] - from[1]) * amount),
    Math.round(from[2] + (to[2] - from[2]) * amount),
  ];
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function easeInOutCubic(amount) {
  const t = clamp(amount, 0, 1);
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

function scatterColor() {
  const roll = Math.random();
  if (roll < 0.7) return WHITE;
  if (roll < 0.85) return VIOLET;
  if (roll < 0.95) return SPARK;
  return DUSK;
}

function drawSparkle(ctx, x, y, radius) {
  ctx.beginPath();
  ctx.moveTo(x, y - radius);
  ctx.lineTo(x + radius * 0.22, y - radius * 0.22);
  ctx.lineTo(x + radius, y);
  ctx.lineTo(x + radius * 0.22, y + radius * 0.22);
  ctx.lineTo(x, y + radius);
  ctx.lineTo(x - radius * 0.22, y + radius * 0.22);
  ctx.lineTo(x - radius, y);
  ctx.lineTo(x - radius * 0.22, y - radius * 0.22);
  ctx.closePath();
  ctx.fill();
}

function fit(canvas, ctx) {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.max(1, rect.width);
  const height = Math.max(1, rect.height);
  canvas.width = Math.max(1, Math.floor(width * dpr));
  canvas.height = Math.max(1, Math.floor(height * dpr));
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { width, height };
}

function sampleLogo(img, width, height, coverage) {
  const scale = 2;
  const off = document.createElement("canvas");
  off.width = Math.max(1, Math.floor(width * scale));
  off.height = Math.max(1, Math.floor(height * scale));
  const ctx = off.getContext("2d", { willReadFrequently: true });
  const ratio = img.naturalWidth > 0 && img.naturalHeight > 0 ? img.naturalWidth / img.naturalHeight : LOGO_RATIO;
  let logoW = width * coverage;
  let logoH = logoW / ratio;
  const maxH = height * (coverage > 0.9 ? 0.96 : 0.78);
  if (logoH > maxH) {
    logoH = maxH;
    logoW = logoH * ratio;
  }
  ctx.drawImage(img, ((width - logoW) / 2) * scale, ((height - logoH) / 2) * scale, logoW * scale, logoH * scale);
  const { data } = ctx.getImageData(0, 0, off.width, off.height);
  const points = [];
  const step = 6;
  for (let y = 0; y < off.height; y += step) {
    for (let x = 0; x < off.width; x += step) {
      const index = (y * off.width + x) * 4;
      if (data[index + 3] <= 128) continue;
      const red = data[index];
      const blue = data[index + 2];
      const violet = blue > 120 && red < 190 && blue > red + 30;
      points.push({
        x: x / scale + (Math.random() * 2 - 1),
        y: y / scale + (Math.random() * 2 - 1),
        color: violet ? VIOLET : WHITE,
      });
    }
  }
  return points;
}

function coverOf(id, viewHeight) {
  const node = document.getElementById(id);
  if (!node) return 0;
  const rect = node.getBoundingClientRect();
  const visible = Math.min(rect.bottom, viewHeight) - Math.max(rect.top, 0);
  return visible > 0 ? visible / viewHeight : 0;
}

function makeParticles(count) {
  const logoCount = Math.round(count * 0.75);
  return Array.from({ length: count }, (_, index) => {
    const spark = Math.random() < 0.05;
    const depth = DEPTHS[index % DEPTHS.length];
    const far = depth === 0.05;
    const mid = depth === 0.15;
    return {
      index,
      nx: Math.random(),
      ny: Math.random(),
      depth,
      logo: index < logoCount,
      footerOnly: index % 2 === 1,
      scatter: scatterColor(),
      hero: null,
      foot: null,
      radius: spark ? 2 + Math.random() * 0.5 : far ? 0.45 : mid ? 0.7 : 0.5 + Math.random() * 0.5,
      spark,
      phase: Math.random() * Math.PI * 2,
      delay: Math.random() * 600,
      skyAlpha: far ? 0.08 + Math.random() * 0.06 : mid ? 0.14 + Math.random() * 0.1 : 0.22 + Math.random() * 0.13,
    };
  });
}

function assign(particles, points, key) {
  const logos = particles.filter((particle) => particle.logo);
  logos.forEach((particle, index) => {
    if (!points.length) {
      particle[key] = null;
      return;
    }
    const point = points[index % points.length];
    particle[key] = { x: point.x, y: point.y, color: point.color };
  });
}

export function Constellation() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const particles = makeParticles(mobileQuery.matches ? 600 : 1400);
    const logoCount = particles.filter((particle) => particle.logo).length;
    const started = performance.now();
    let frame = 0;
    let looping = false;
    let alive = true;
    let pageOn = document.visibilityState !== "hidden";
    let logo = null;
    let timer = 0;
    let sized = false;
    let dreamMix = 0;
    let skyKeep = 1;
    let footGoal = 0;
    let footStamp = started;
    let leadFrom = 0;
    let slow = 0;
    let last = performance.now();

    if (!reduce) document.documentElement.classList.add("constellation-ready");

    function resample() {
      if (!logo) return;
      const hero = document.getElementById("constelacao-hero");
      const foot = document.getElementById("constelacao-rodape");
      if (hero) {
        const rect = hero.getBoundingClientRect();
        if (rect.width > 8 && rect.height > 8) {
          assign(particles, sampleLogo(logo, rect.width, rect.height, mobileQuery.matches ? 0.9 : 0.8), "hero");
        }
      }
      if (foot) {
        const rect = foot.getBoundingClientRect();
        if (rect.width > 8 && rect.height > 8) {
          assign(particles, sampleLogo(logo, rect.width, rect.height, 0.98), "foot");
        }
      }
      sized = true;
      fit(canvas, ctx);
    }

    function origin(id) {
      const node = document.getElementById(id);
      if (!node) return null;
      const rect = node.getBoundingClientRect();
      if (rect.width < 8) return null;
      return rect;
    }

    function draw(now) {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (!sized || width < 2 || height < 2) return;
      const heroRect = origin("constelacao-hero");
      const footRect = origin("constelacao-rodape");
      const heroBox = document.getElementById("palco");
      const heroSpan = (heroBox?.offsetHeight || height) * 0.5;
      const heroScroll = 1 - clamp(window.scrollY / heroSpan, 0, 1);
      let footSeen = 0;
      if (footRect) {
        const visible = Math.min(footRect.bottom, height) - Math.max(footRect.top, 0);
        footSeen = visible > 0 ? clamp(visible / footRect.height, 0, 1) : 0;
      }
      const wantFoot = footRect && footSeen > (footGoal > 0.5 ? 0.18 : 0.72) ? 1 : 0;
      if (!reduce && wantFoot !== footGoal) {
        const stamp = footStamp;
        const goal = footGoal;
        for (const particle of particles) {
          const from = particle.footFrom ?? 0;
          const t = easeInOutCubic((now - stamp - particle.delay) / 2200);
          particle.footFrom = from + (goal - from) * t;
        }
        leadFrom += (footGoal - leadFrom) * easeInOutCubic((now - footStamp) / 2200);
        footGoal = wantFoot;
        footStamp = now;
      }
      const footShown = reduce ? footSeen : leadFrom + (footGoal - leadFrom) * easeInOutCubic((now - footStamp) / 2200);
      const dreamCover = coverOf("sonho", height);
      const dreamGoal = dreamCover > 0.5 ? 1 : 0;
      dreamMix += (dreamGoal - dreamMix) * 0.05;
      const cap = Math.max(24, Math.floor((width * height / 4000) * skyKeep));

      ctx.clearRect(0, 0, width, height);
      const glowRect = footShown >= heroScroll ? footRect : heroRect;
      const glowWeight = Math.max(heroScroll, footShown);
      if (glowRect && glowWeight > 0.08) {
        const cx = glowRect.left + glowRect.width / 2;
        const cy = glowRect.top + glowRect.height / 2;
        const glow = ctx.createRadialGradient(cx, cy, 12, cx, cy, Math.max(glowRect.width, glowRect.height) * 0.72);
        glow.addColorStop(0, `rgba(11, 16, 48, ${0.9 * glowWeight})`);
        glow.addColorStop(1, "rgba(11, 16, 48, 0)");
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);
      }

      for (const particle of particles) {
        const gather = reduce ? 1 : easeInOutCubic((now - started - 600 - particle.delay) / 2200);
        const heroWeight = particle.hero ? gather * heroScroll : 0;
        const footFrom = particle.footFrom ?? 0;
        const footWeight = particle.foot
          ? reduce
            ? 1
            : footFrom + (footGoal - footFrom) * easeInOutCubic((now - footStamp - particle.delay) / 2200)
          : 0;
        const useFoot = reduce ? particle.footerOnly : footWeight >= heroWeight;
        const local = useFoot ? particle.foot : particle.hero;
        const anchor = useFoot ? footRect : heroRect;
        const weight = reduce
          ? (local && anchor ? 1 : 0)
          : (useFoot ? footWeight : heroWeight);
        const looseBudget = Math.floor(cap * 0.35);
        const inSky = particle.logo
          ? particle.index < cap - looseBudget && weight < 0.25
          : particle.index - logoCount < looseBudget;
        if (!inSky && weight < 0.03) continue;

        let x = particle.nx * width;
        let y = particle.ny * height;
        if (!reduce) {
          y -= window.scrollY * particle.depth;
          x += Math.sin(now / 7000 + particle.phase) * 8 * particle.depth * (1 - weight);
        }
        y = ((y % height) + height) % height;
        if (local && anchor && weight > 0) {
          x += (anchor.left + local.x - x) * weight;
          y += (anchor.top + local.y - y) * weight;
          if (!reduce && weight > 0.85) {
            const breathe = (weight - 0.85) / 0.15;
            x += Math.sin(now / 1300 + particle.phase) * 0.6 * breathe;
            y += Math.cos(now / 1700 + particle.phase) * 0.6 * breathe;
          }
        }

        const skyA = particle.skyAlpha * (1 - dreamMix) + 0.05 * dreamMix;
        const logoA = 0.78;
        const alpha = inSky || weight > 0.03 ? skyA + (logoA - skyA) * weight : 0;
        if (alpha < 0.02) continue;
        const color = local ? mix(particle.scatter, local.color, weight) : particle.scatter;
        const violetInk = color[2] > color[0] + 40 && color[0] < 180;
        ctx.fillStyle = rgb(color);
        if (violetInk && weight > 0.45) {
          ctx.globalAlpha = alpha * 0.4;
          ctx.beginPath();
          ctx.arc(x, y, particle.radius + 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = alpha;
        if (particle.spark && weight > 0.72) drawSparkle(ctx, x, y, particle.radius);
        else if (!particle.spark || inSky) {
          ctx.beginPath();
          ctx.arc(x, y, particle.spark ? 0.6 : particle.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    }

    function start() {
      if (!alive || looping || !pageOn) return;
      looping = true;
      frame = requestAnimationFrame(tick);
    }

    function tick(now) {
      looping = false;
      if (!alive) return;
      const dt = now - last;
      last = now;
      if (!reduce && dt > 0 && dt < 100) {
        const fps = 1000 / dt;
        if (fps < 45) slow += dt;
        else slow = Math.max(0, slow - dt);
        if (slow > 2000 && skyKeep > 0.35) {
          skyKeep *= 0.7;
          slow = 0;
        }
      }
      draw(reduce ? started + 4000 : now);
      if (pageOn) start();
    }

    function onResize() {
      clearTimeout(timer);
      timer = window.setTimeout(resample, sized ? 200 : 0);
    }

    function onVisibility() {
      pageOn = document.visibilityState !== "hidden";
      if (pageOn) start();
    }

    const watch = ["escopo", "iniciar", "duvidas", "sonho", "contato"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver(() => {
      if (reduce) draw(started + 4000);
    }, { threshold: [0, 0.25, 0.5, 0.75, 1] });
    watch.forEach((node) => observer.observe(node));

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(canvas);
    const heroSlot = document.getElementById("constelacao-hero");
    const footSlot = document.getElementById("constelacao-rodape");
    if (heroSlot) resizeObserver.observe(heroSlot);
    if (footSlot) resizeObserver.observe(footSlot);

    const img = new Image();
    img.src = wordmark;
    img.decode().then(() => {
      if (!alive) return;
      logo = img;
      resample();
      start();
    }).catch(() => {});

    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      resizeObserver.disconnect();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      document.documentElement.classList.remove("constellation-ready");
    };
  }, []);

  return <canvas ref={ref} className="sky" aria-hidden="true" />;
}
