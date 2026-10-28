import { ScrollProgress } from "@/components/motion-primitives/scroll-progress";
import { Duality } from "./components/Duality.jsx";
import { Dream } from "./components/Dream.jsx";
import { Footer } from "./components/Footer.jsx";
import { Header } from "./components/Header.jsx";
import { Hero } from "./components/Hero.jsx";
import { Manifesto } from "./components/Manifesto.jsx";
import { Portfolio } from "./components/Portfolio.jsx";
import { Specs } from "./components/Specs.jsx";

export default function App() {
  return (
    <>
      <a
        href="#palco"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-dress focus:px-3 focus:py-2 focus:text-ink"
      >
        Ir para o conteúdo
      </a>
      <ScrollProgress className="scroll-progress pointer-events-none fixed z-50" />
      <Header />
      <main>
        <Hero />
        <Manifesto />
        <Duality />
        <Specs />
        <Portfolio />
        <Dream />
      </main>
      <Footer />
    </>
  );
}
