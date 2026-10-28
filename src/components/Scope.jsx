const ITEMS = [
  "Direção visual exclusiva",
  "Design responsivo para celular, tablet e desktop",
  "Desenvolvimento sob medida, sem template",
  "Arquitetura de segurança",
  "Configuração de domínio e hospedagem",
  "Certificado SSL (conexão segura)",
  "Otimização de velocidade",
  "Estrutura de SEO para o Google",
  "Integração com WhatsApp e redes sociais",
  "Formulário de contato protegido",
  "Métricas de acesso",
];

export function Scope() {
  return (
    <section id="escopo" className="band" aria-labelledby="escopo-title">
      <div className="frame">
        <p className="label">O escopo</p>
        <h2 id="escopo-title" className="heading-lg mt-6 max-w-[12ch]">
          Tudo o que entra em cena.
        </h2>
        <ul className="mt-16 grid gap-x-12 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item) => (
            <li key={item} className="body flex items-start gap-3">
              <Star />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Star() {
  return (
    <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true" className="mt-2 shrink-0 text-violet">
      <path d="M6 0 L7.1 4.9 L12 6 L7.1 7.1 L6 12 L4.9 7.1 L0 6 L4.9 4.9 Z" fill="currentColor" />
    </svg>
  );
}
