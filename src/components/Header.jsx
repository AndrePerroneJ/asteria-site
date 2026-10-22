import { useEffect, useState } from "react";
import { Logo } from "./Logo.jsx";

const PATH = [
  ["stars", "#palco"],
  ["griffith", "#dualidade"],
  ["la", "#especificacoes"],
  ["home", "#contato"],
];

export function Header() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShown(window.scrollY > 12);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header fixed inset-x-0 top-0 z-40 border-b border-dusk bg-ink/75 backdrop-blur-md${shown ? " is-shown" : ""}`}>
      <div className="relative flex items-center justify-between gap-4 px-4 py-3.5 md:px-8">
        <a href="#palco" aria-label="Asteria Code, início" className="relative z-10">
          <Logo className="h-6 md:h-8" />
        </a>
        <nav aria-label="Diretórios" className="absolute left-1/2 hidden -translate-x-1/2 md:block">
          <Path />
        </nav>
        <a
          href="#contato"
          className="relative z-10 inline-flex items-center gap-2 border border-dusk px-2.5 py-2 font-mono text-[10px] tracking-[0.12em] whitespace-nowrap text-lamp transition-colors hover:bg-velvet sm:px-3 sm:text-[11px]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-dress shadow-[0_0_10px_var(--color-dress)]" aria-hidden="true" />
          [ Iniciar Projeto ]
        </a>
      </div>
      <nav aria-label="Diretórios" className="border-t border-dusk px-4 py-2 md:hidden">
        <Path />
      </nav>
    </header>
  );
}

function Path() {
  return (
    <p className="flex flex-wrap items-center justify-center gap-x-2 font-mono text-[11px] tracking-[0.16em] text-lilac">
      {PATH.map(([label, href], index) => (
        <span key={label} className="inline-flex items-center gap-2">
          {index > 0 ? <span aria-hidden="true">/</span> : null}
          <a href={href} className="transition-colors hover:text-lamp">
            {label}
          </a>
        </span>
      ))}
    </p>
  );
}
