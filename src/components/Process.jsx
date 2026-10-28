const STEPS = [
  ["Conversa.", "Entendemos o seu negócio, o seu público e o que o site precisa resolver."],
  ["Direção.", "Você vê e aprova a proposta visual antes de qualquer linha de código."],
  ["Construção.", "Desenvolvemos com segurança desde o início, e você acompanha cada etapa."],
  ["Estreia.", "O site entra no ar testado e protegido, com suporte depois do lançamento."],
];

export function Process() {
  return (
    <section id="processo" className="band" aria-labelledby="processo-title">
      <div className="frame">
        <p className="label">O processo</p>
        <h2 id="processo-title" className="heading-lg mt-6 max-w-[12ch]">
          Do primeiro acorde à estreia.
        </h2>
        <ol className="mt-16 grid gap-12 lg:grid-cols-4">
          {STEPS.map(([title, body], index) => (
            <li key={title}>
              <p className="heading-lg text-light/20">0{index + 1}</p>
              <h3 className="heading-xs mt-4">{title}</h3>
              <p className="body mt-3">{body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
