import { useEffect, useState } from "react";

export function Hero() {
  const [arrow, setArrow] = useState(true);

  useEffect(() => {
    function onScroll() {
      setArrow(window.scrollY < window.innerHeight * 0.55);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="palco" className="relative flex min-h-svh items-center px-[var(--gutter)] pt-[252px] pb-24 lg:pt-48" aria-labelledby="apresentacao-title">
      <div className="frame grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div id="constelacao-hero" className="order-1 h-[45vh] w-full lg:order-2 lg:h-[min(68vh,620px)]" aria-hidden="true" />
        <div className="order-2 lg:order-1">
          <p className="label">Estúdio boutique · Guarulhos</p>
          <h1 id="apresentacao-title" className="display mt-6">
            Seu negócio já é referência. O site precisa estar à altura.
          </h1>
          <p className="body mt-6 max-w-[480px]">
            Sites sob medida, com visual autoral e proteção desde a primeira linha de código. Para marcas que não cabem em template.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a href="#iniciar" className="btn-primary">
              Iniciar um projeto
            </a>
            <a href="#repertorio" className="ghost">
              Ver o repertório →
            </a>
          </div>
        </div>
      </div>
      {arrow ? (
      <a href="#repertorio" className="hero-down" aria-label="Descer">
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path d="M5 9l7 7 7-7" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </a>
      ) : null}
    </section>
  );
}
