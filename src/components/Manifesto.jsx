import { Logo } from "./Logo.jsx";

export function Manifesto() {
  return (
    <section id="manifesto" className="border-b border-dusk bg-ink px-5 py-20 md:px-12 md:py-28 lg:px-16" aria-labelledby="manifesto-title">
      <Logo className="h-12 w-auto md:h-16" />
      <h1 id="manifesto-title" className="sr-only">
        Asteria
      </h1>
      <p className="mt-8 max-w-[16ch] font-display text-[clamp(2.6rem,5vw,4.4rem)] leading-[0.95] text-lamp">
        Um estúdio boutique focado em design e segurança.
      </p>
      <p className="mt-6 max-w-[38ch] text-lg leading-relaxed text-piano">
        Sites sob medida. O visual é próprio. A proteção entra desde a primeira linha.
      </p>
      <a href="#contato" className="showtime mt-10 inline-block px-5 py-3 font-mono text-sm tracking-wide">
        Iniciar um projeto
      </a>
    </section>
  );
}
