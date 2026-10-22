import wordmark from "../../design/logo/asteria-wordmark.svg";

export function Logo({ className = "h-8" }) {
  return (
    <img
      src={wordmark}
      alt=""
      className={`${className} w-auto [filter:drop-shadow(0_0_14px_rgba(193,63,166,0.32))]`}
    />
  );
}
