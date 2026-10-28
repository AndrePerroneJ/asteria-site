import { useEffect, useState } from "react";
import ViewfinderFlipCarousel from "@/components/ui/viewfinder-flip-carousel";

const SOON = "/repertorio/em-breve.webp";

const ITEMS = [
  { title: "Próxima peça", src: SOON, alt: "Próxima peça" },
  {
    title: "JUNO, um de nossos clientes",
    src: "/repertorio/juno-color.svg",
    alt: "JUNO",
    fit: "contain",
  },
  { title: "Próxima peça", src: SOON, alt: "Próxima peça" },
];

function useFrame() {
  const [wide, setWide] = useState(() => window.matchMedia("(min-width: 768px)").matches);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const onChange = () => setWide(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return wide
    ? { height: "520px", size: 260, openWidth: 300, foldedWidth: 64 }
    : { height: "440px", size: 176, openWidth: 210, foldedWidth: 42 };
}

export function Portfolio() {
  const frame = useFrame();

  return (
    <section id="repertorio" className="band overflow-hidden" aria-labelledby="repertorio-title">
      <div className="frame">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="label">Repertório</p>
            <h2 id="repertorio-title" className="heading-lg mt-6">
              Cada peça, uma composição própria.
            </h2>
          </div>
          <p className="body max-w-[520px] lg:col-span-5">Nenhum projeto sai do mesmo molde. Cada marca ganha um palco só dela.</p>
        </div>
      </div>
      <ViewfinderFlipCarousel
        items={ITEMS}
        defaultIndex={1}
        height={frame.height}
        size={frame.size}
        openWidth={frame.openWidth}
        foldedWidth={frame.foldedWidth}
        className="mt-10 md:mt-16"
        ariaLabel="Repertório"
        onSelect={(item) => {
          if (item.alt === "JUNO") window.open("https://junocreative.com.br", "_blank", "noopener,noreferrer");
        }}
      />
    </section>
  );
}
