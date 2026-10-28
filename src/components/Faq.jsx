import { useState } from "react";

const QUESTIONS = [
  { id: "prazo", question: "Quanto tempo leva para o site ficar pronto?", answer: "Sites institucionais: de 3 a 6 semanas." },
  { id: "custo", question: "Quanto custa?", answer: "Cada projeto é sob medida, então o valor depende do escopo. Depois da conversa inicial, você recebe uma proposta clara, sem surpresas." },
  { id: "seguranca", question: "Por que segurança importa num site institucional?", answer: "Sites vulneráveis são invadidos e usados para golpes com o nome da empresa, e o Google pode marcá-los como perigosos. Proteger o site é proteger a sua reputação." },
  { id: "celular", question: "Funciona bem no celular?", answer: "Sim. O site é pensado primeiro para o celular, que é onde está a maior parte dos seus clientes." },
  { id: "dominio", question: "Vocês cuidam de domínio e hospedagem?", answer: "Sim. Configuramos tudo, e você não precisa se preocupar com a parte técnica." },
  { id: "atualizar", question: "Consigo atualizar o site depois?", answer: "Sim. Nos 30 dias de suporte, os ajustes são com a gente. Depois, o plano mensal de manutenção segue com as atualizações." },
  { id: "problema", question: "E se der algum problema depois do lançamento?", answer: "30 dias de suporte inclusos; depois, plano mensal de manutenção." },
];

export function Faq() {
  const [open, setOpen] = useState(null);

  return (
    <section id="duvidas" className="band" aria-labelledby="duvidas-title">
      <div className="frame">
        <p className="label">Dúvidas</p>
        <h2 id="duvidas-title" className="heading-lg mt-6">
          Antes da estreia.
        </h2>
        <div className="mt-16 border-t border-[var(--color-hairline)]">
          {QUESTIONS.map((item) => {
            const expanded = open === item.id;
            return (
              <article key={item.id} className="border-b border-[var(--color-hairline)]">
                <h3>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    aria-expanded={expanded}
                    aria-controls={`faq-${item.id}`}
                    onClick={() => setOpen(expanded ? null : item.id)}
                  >
                    <span className="heading-xs">{item.question}</span>
                    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" className={`shrink-0 text-light transition-transform ${expanded ? "rotate-45" : ""}`}>
                      <path d="M8 1.5v13M1.5 8h13" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </button>
                </h3>
                {expanded ? (
                  <p id={`faq-${item.id}`} className="body max-w-[640px] pb-6">
                    {item.answer}
                  </p>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
