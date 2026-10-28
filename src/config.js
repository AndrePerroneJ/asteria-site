export const WHATSAPP_NUMBER = "5511952930202";
export const WHATSAPP_DISPLAY = "(11) 95293-0202";
export const INSTAGRAM_HANDLE = "@asterialabs";
export const INSTAGRAM_URL = "https://instagram.com/asterialabs";
export const EMAIL = "comercial@asteriacode.com.br";

export function whatsappLink(message) {
  const digits = WHATSAPP_NUMBER.replace(/\D/g, "");
  const text = encodeURIComponent(message || "Olá, quero iniciar um projeto com a Asteria.");
  return `https://wa.me/${digits}?text=${text}`;
}
