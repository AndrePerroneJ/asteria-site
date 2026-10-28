import wordmark from "../../design/logo/asteria-wordmark.svg";

export function Logo({ className = "h-8" }) {
  return (
    <img
      src={wordmark}
      alt=""
      className={`${className} w-auto`}
    />
  );
}
