import { Logo } from "./Logo.jsx";
import { XiCaret } from "./XiCaret.jsx";

export function Footer() {
  return (
    <footer id="contato">
      <div className="h-0.5 w-full" style={{ background: "var(--gradient-magic-hour)" }} />
      <div className="flex flex-col items-center px-5 py-16 text-center md:py-20">
        <Logo className="h-12 md:h-14" />
        <p className="mt-7 font-mono text-sm tracking-[0.08em] text-lilac">
          // é aqui que começa.
          <XiCaret />
        </p>
        <p className="mt-4 max-w-[28ch] text-piano">A noite fecha aqui. O contato abre o próximo projeto.</p>
        <nav aria-label="Contato" className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono text-sm">
          <a className="text-spotlight hover:text-lamp" href="https://instagram.com/asteriacode" rel="noreferrer">
            @asteriacode
          </a>
          <a className="text-spotlight hover:text-lamp" href="mailto:contato@asteriacode.com.br">
            Iniciar projeto
          </a>
        </nav>
        <p className="mt-12 font-mono text-[11px] tracking-[0.18em] text-lilac uppercase">
          TLS 1.3 · Defensive Architecture · Guarulhos, SP
        </p>
      </div>
    </footer>
  );
}
