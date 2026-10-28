import { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { ScrollProgress } from "@/components/motion-primitives/scroll-progress";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { Particles } from "@/components/ui/particles";
import { Constellation } from "./components/Constellation.jsx";
import { Audience } from "./components/Audience.jsx";
import { Dream } from "./components/Dream.jsx";
import { Duality } from "./components/Duality.jsx";
import { Faq } from "./components/Faq.jsx";
import { Footer } from "./components/Footer.jsx";
import { Header } from "./components/Header.jsx";
import { Hero } from "./components/Hero.jsx";
import { Inquiry } from "./components/Inquiry.jsx";
import { Portfolio } from "./components/Portfolio.jsx";
import { Process } from "./components/Process.jsx";
import { Scope } from "./components/Scope.jsx";
import { WhatsAppButton } from "./components/WhatsAppButton.jsx";

const PARTICLE_COLORS = [
  { hex: "#ffffff", weight: 70 },
  { hex: "#6B3FE0", weight: 15 },
  { hex: "#F2C230", weight: 10 },
  { hex: "#F08A6B", weight: 5 },
];

const DIM_SECTIONS = ["escopo", "iniciar", "duvidas"];

function useParticleQuantity() {
  const [quantity, setQuantity] = useState(() => (window.innerWidth <= 767 ? 100 : 220));

  useEffect(() => {
    const apply = () => setQuantity(window.innerWidth <= 767 ? 100 : 220);
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);

  return quantity;
}

function useParticleDim() {
  const [dim, setDim] = useState(false);

  useEffect(() => {
    const nodes = DIM_SECTIONS.map((id) => document.getElementById(id)).filter(Boolean);
    if (!nodes.length) return undefined;

    const covers = () => {
      const view = window.innerHeight || 1;
      return nodes.some((node) => {
        const rect = node.getBoundingClientRect();
        const visible = Math.min(rect.bottom, view) - Math.max(rect.top, 0);
        return visible / view >= 0.55;
      });
    };

    const observer = new IntersectionObserver(() => {
      setDim(covers());
    }, { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] });

    nodes.forEach((node) => observer.observe(node));
    setDim(covers());
    return () => observer.disconnect();
  }, []);

  return dim;
}

export default function App() {
  const quantity = useParticleQuantity();
  const dim = useParticleDim();

  return (
    <ReactLenis
      root
      options={{
        anchors: true,
        autoToggle: true,
        allowNestedScroll: true,
        stopInertiaOnNavigate: true,
        lerp: 0.08,
      }}
    >
      <a href="#palco" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-violet focus:px-3 focus:py-2 focus:text-light">
        Ir para o conteúdo
      </a>
      <ScrollProgress className="scroll-progress pointer-events-none fixed z-50" />
      <SmoothCursor />
      <Constellation />
      <Particles
        className="pointer-events-none fixed inset-0 z-[1]"
        aria-hidden="true"
        colors={PARTICLE_COLORS}
        quantity={quantity}
        size={0.5}
        staticity={60}
        ease={80}
        vx={0}
        vy={-0.03}
        style={{ opacity: dim ? 0.5 : 1, transition: "opacity 600ms ease" }}
      />
      <Header />
      <main className="relative z-[2]">
        <Hero />
        <Portfolio />
        <Duality />
        <Process />
        <Audience />
        <Scope />
        <Inquiry />
        <Faq />
        <Dream />
      </main>
      <Footer />
      <WhatsAppButton />
    </ReactLenis>
  );
}
