export function Manifesto() {
  return (
    <section id="apresentacao" className="border-b border-dusk bg-ink px-5 py-20 md:px-12 md:py-28 lg:px-16" aria-labelledby="apresentacao-title">
      <p className="font-mono text-xs tracking-[0.18em] text-lilac">estúdio boutique · guarulhos</p>
      <h1 id="apresentacao-title" className="mt-6 max-w-[16ch] font-display text-[clamp(2.5rem,5.2vw,4.4rem)] leading-[0.96] text-lamp">
        Seu negócio já é referência. O site precisa estar à altura.
      </h1>
      <p className="mt-6 max-w-[42ch] text-lg leading-relaxed text-piano">
        Sites sob medida, com visual autoral e proteção desde a primeira linha de código. Para marcas que não cabem em template.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <a href="#iniciar" className="showtime inline-block px-5 py-3 font-mono text-sm tracking-wide">
          Iniciar um projeto
        </a>
        <a href="#repertorio" className="inline-block border border-dusk px-5 py-3 font-mono text-sm tracking-wide text-lamp transition-colors hover:bg-velvet">
          Ver o repertório
        </a>
      </div>
    </section>
  );
}
