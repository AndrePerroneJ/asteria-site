const SPECS = [
  {
    title: "Zero brechas",
    body: "O site nasce fechado. Validação rigorosa e superfície sem porta aberta.",
    span: "lg:col-span-7",
    edge: "border-b lg:border-r",
  },
  {
    title: "Velocidade",
    body: "A página abre na hora. Entrega leve, pronta em menos de um segundo.",
    span: "lg:col-span-5",
    edge: "border-b",
  },
  {
    title: "Estética autoral",
    body: "Visual próprio, com paleta e atmosfera de cinema. Nada de template genérico.",
    span: "lg:col-span-5",
    edge: "border-b lg:border-r lg:border-b-0",
  },
  {
    title: "Infraestrutura protegida",
    body: "Publicação protegida, conexão segura e borda fechada.",
    span: "lg:col-span-7",
    edge: "",
  },
];

export function Specs() {
  return (
    <section id="especificacoes" className="border-b border-dusk" aria-labelledby="specs-title">
      <div className="border-b border-dusk px-5 py-8 md:px-12">
        <h2 id="specs-title" className="font-mono text-xs tracking-[0.2em] text-spotlight">
          Especificações
        </h2>
      </div>
      <ul className="grid lg:grid-cols-12">
        {SPECS.map((spec) => (
          <li
            key={spec.title}
            className={`${spec.span} ${spec.edge} border-dusk bg-asphalt px-5 py-10 transition-colors hover:bg-velvet md:px-10`}
          >
            <h3 className="font-display text-3xl leading-none text-lamp">{spec.title}</h3>
            <p className="mt-4 max-w-[36ch] text-piano">{spec.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
