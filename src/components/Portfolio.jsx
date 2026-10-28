export function Portfolio() {
  return (
    <section id="repertorio" className="border-b border-dusk bg-ink" aria-labelledby="repertorio-title">
      <div className="border-b border-dusk px-5 py-8 md:px-12 lg:px-16">
        <h2 id="repertorio-title" className="font-mono text-xs tracking-[0.2em] text-spotlight">
          Repertório
        </h2>
      </div>
      <div className="px-5 py-16 md:px-12 md:py-24 lg:px-16">
        <p className="max-w-[14ch] font-display text-[clamp(2.6rem,5vw,4.4rem)] leading-[0.95] text-lamp">
          As peças, com imagem.
        </p>
        <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-piano">
          Cada trabalho entra com a imagem do site entregue, o nome e o ano. As peças reais ainda não foram colocadas aqui.
        </p>
      </div>
    </section>
  );
}
