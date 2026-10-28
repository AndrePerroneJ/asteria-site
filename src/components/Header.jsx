import { useEffect, useState } from "react";
import { Logo } from "./Logo.jsx";

const LINKS = [
  ["Repertório", "#repertorio", "repertorio"],
  ["Processo", "#processo", "processo"],
  ["Escopo", "#escopo", "escopo"],
  ["Contato", "#iniciar", "iniciar"],
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = LINKS.map(([, , id]) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.15, 0.4] },
    );
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-40 ${scrolled ? "bg-[rgba(0,0,0,0.8)] backdrop-blur-[16px]" : ""}`}>
      <div className="px-[var(--gutter)] pt-4 pb-3">
        <div className="frame flex items-center gap-6">
          <a href="#palco" aria-label="Asteria Code, início">
            <Logo className="h-6 md:h-7" />
          </a>
          <nav aria-label="Seções" className="ml-auto hidden items-center gap-7 md:flex">
            <Links active={active} />
          </nav>
          <a href="#iniciar" className="btn-primary ml-auto md:ml-0">
            Iniciar projeto
          </a>
        </div>
      </div>
    </header>
  );
}

function Links({ active }) {
  return LINKS.map(([label, href, id]) => (
    <a key={id} href={href} className={`nav-link${active === id ? " is-active" : ""}`}>
      {label}
    </a>
  ));
}
