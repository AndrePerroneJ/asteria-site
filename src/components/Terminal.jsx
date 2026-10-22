import { useEffect, useState } from "react";
import { XiCaret } from "./XiCaret.jsx";
import { EditorCode } from "./EditorCode.jsx";

const LOGS = [
  { text: "> npm run showtime", tone: "text-piano" },
  { text: "[griffith] lights: on", tone: "text-piano" },
  { text: "[pier]     lamps: 7:42 pm", tone: "text-piano" },
  { text: "[club]     piano: tuned", tone: "text-piano" },
  { text: "[stage]    spotlight → asteria", tone: "text-spotlight" },
  { text: "✓ ready in 0.88s", tone: "text-dress" },
];

export function Terminal({ run }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setCount(LOGS.length);
      return undefined;
    }

    setCount(0);
    let next = 0;
    const id = window.setInterval(() => {
      next += 1;
      setCount(next);
      if (next >= LOGS.length) window.clearInterval(id);
    }, 460);

    return () => window.clearInterval(id);
  }, [run]);

  return (
    <div className="relative w-full overflow-hidden border border-dusk bg-asphalt">
      <div className="h-1.5 w-full" style={{ background: "var(--gradient-magic-hour)" }} />
      <div className="pointer-events-none absolute top-6 right-8 h-24 w-24 rounded-full bg-dress/45 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute top-16 right-28 h-20 w-20 rounded-full bg-velvet blur-3xl" aria-hidden="true" />
      <div className="relative flex items-center border-b border-dusk px-4 py-3">
        <span className="border-b border-ember pb-1 font-mono text-xs tracking-[0.14em] text-lamp">
          asteria.js
        </span>
      </div>
      <pre className="relative overflow-x-auto px-5 py-6 font-mono text-[13px] leading-7 text-lamp">
        <EditorCode />
      </pre>
      <div
        className="relative min-h-36 border-t border-dusk px-5 py-4 font-mono text-[12.5px] leading-6 whitespace-pre"
        aria-live="polite"
      >
        {LOGS.slice(0, count).map((line) => (
          <div key={line.text} className={line.tone}>
            {line.text}
          </div>
        ))}
        <XiCaret />
      </div>
    </div>
  );
}
