import { EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL, WHATSAPP_DISPLAY, whatsappLink } from "../config.js";
import { Logo } from "./Logo.jsx";

export function Footer() {
  return (
    <footer id="contato" className="band relative z-[2]">
      <div className="frame flex flex-col items-center text-center">
        <div id="constelacao-rodape">
          <Logo className="h-16 md:h-20" />
        </div>
        <p className="mt-8 font-mono text-[14px] tracking-[0.08em] text-smoke">// é aqui que começa.</p>
        <p className="body mt-4">A noite fecha aqui. O contato abre o próximo projeto.</p>
        <nav aria-label="Contato" className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          <a className="ghost ghost-quiet" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
            {INSTAGRAM_HANDLE}
          </a>
          <a className="ghost ghost-quiet" href={whatsappLink()} target="_blank" rel="noreferrer">
            WhatsApp {WHATSAPP_DISPLAY}
          </a>
          <a className="ghost ghost-quiet" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </nav>
        <p className="mt-16 font-mono text-[12px] tracking-[0.08em] text-smoke uppercase">TLS 1.3 · Defensive Architecture · Guarulhos, SP</p>
      </div>
    </footer>
  );
}
