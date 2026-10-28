const PILLARS = [
  {
    index: "01",
    title: "A Hora Mágica",
    kicker: "A arte",
    body: "Tipografia expressiva, ritmo visual, micro-interações fluidas e identidade autoral que afasta a marca de qualquer padrão genérico.",
  },
  {
    index: "02",
    title: "Arquitetura Defensiva",
    kicker: "A fortaleza",
    body: "Sites projetados como fortalezas digitais desde a primeira linha de código, com blindagem de superfície web, políticas estritas de segurança (CSP/Headers), proteção contra vulnerabilidades e performance extrema.",
  },
];

export function Duality() {
  return (
    <section id="dualidade" className="border-b border-dusk bg-midnight" aria-labelledby="dualidade-title">
      <div className="border-b border-dusk px-5 py-8 md:px-12 lg:px-16">
        <h2 id="dualidade-title" className="font-mono text-xs tracking-[0.2em] text-spotlight">
          A dualidade
        </h2>
      </div>
      <div className="grid lg:grid-cols-2">
        {PILLARS.map((pillar, index) => (
          <article
            key={pillar.index}
            className={`px-5 py-16 md:px-12 md:py-20 lg:px-16 ${index === 0 ? "border-b border-dusk lg:border-r lg:border-b-0" : ""}`}
          >
            <p className="font-mono text-xs tracking-[0.18em] text-lilac">
              {pillar.index} / {pillar.kicker}
            </p>
            <h3 className="mt-5 font-display text-[clamp(2.4rem,4vw,3.6rem)] leading-none text-lamp">
              {pillar.title}
            </h3>
            <p className="mt-6 max-w-[42ch] text-lg leading-relaxed text-piano">{pillar.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
