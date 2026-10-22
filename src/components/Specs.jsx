const SPECS = [
  {
    title: "Secure-by-Design",
    body: "Arquitetura defensiva nativa e validação rigorosa.",
    span: "lg:col-span-7",
    edge: "border-b lg:border-r",
  },
  {
    title: "Latência Sub-Segundo",
    body: "Entrega otimizada inspirada no benchmark ✓ ready in 0.88s.",
    span: "lg:col-span-5",
    edge: "border-b",
  },
  {
    title: "Estética Autoral",
    body: "Composições exclusivas com paleta e atmosfera cinematográfica.",
    span: "lg:col-span-5",
    edge: "border-b lg:border-r lg:border-b-0",
  },
  {
    title: "Infraestrutura Blindada",
    body: "Hardening de deploy, TLS estrito e proteção de borda.",
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
