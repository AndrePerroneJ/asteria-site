import { WHATSAPP_DISPLAY, whatsappLink } from "../config.js";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      className="fixed right-5 bottom-5 z-40 grid h-12 w-12 place-items-center text-light transition-colors duration-200 hover:text-violet"
      aria-label={`WhatsApp ${WHATSAPP_DISPLAY}`}
      target="_blank"
      rel="noreferrer"
    >
      <span
        aria-hidden="true"
        className="block h-11 w-11 bg-current"
        style={{
          WebkitMask: "url(/whatsapp.png) center / contain no-repeat",
          mask: "url(/whatsapp.png) center / contain no-repeat",
        }}
      />
    </a>
  );
}
