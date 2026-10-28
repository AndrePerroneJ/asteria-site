const PILLARS = [
  {
    index: "01",
    kicker: "A arte",
    title: "A Hora Mágica",
    body: "Um visual criado para a sua marca, não adaptado de um modelo. Tipografia, cor e movimento pensados para o cliente lembrar de você.",
  },
  {
    index: "02",
    kicker: "A fortaleza",
    title: "Arquitetura Defensiva",
    body: "O site nasce protegido contra invasões, golpes e instabilidade. Ninguém usa o nome da sua empresa como porta de entrada.",
  },
];

const BENEFITS = [
  ["Fechado para invasores.", "Sem brechas, sem plugins esquecidos, sem porta aberta."],
  ["Abre na hora.", "Leve e rápido, até no 4G. Cliente não espera, cliente vai embora."],
  ["Feito para ser encontrado.", "Estrutura pensada para o Google desde o início."],
  ["Sempre em cena.", "Hospedagem protegida e conexão segura. O site não sai do ar."],
];

export function Duality() {
  return (
    <section id="dualidade" className="band" aria-labelledby="dualidade-title">
      <div className="frame">
        <p className="label">A dualidade</p>
        <h2 id="dualidade-title" className="heading-lg mt-6 max-w-[12ch]">
          Bonito por fora. Blindado por dentro.
        </h2>
        <div className="mt-16 grid gap-16 lg:grid-cols-2">
          {PILLARS.map((pillar) => (
            <article key={pillar.index}>
              <p className="label">
                {pillar.index} / {pillar.kicker}
              </p>
              <h3 className="heading mt-5">{pillar.title}</h3>
              <p className="body mt-5">{pillar.body}</p>
            </article>
          ))}
        </div>
        <ul className="mt-20 grid gap-x-16 gap-y-9 sm:grid-cols-2">
          {BENEFITS.map(([title, body]) => (
            <li key={title}>
              <h3 className="heading-xs">{title}</h3>
              <p className="body mt-3">{body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-16 font-mono text-[12px] tracking-[0.08em] text-smoke uppercase">TLS 1.3 · CSP · SECURITY HEADERS · VALIDAÇÃO RIGOROSA</p>
      </div>
    </section>
  );
}
