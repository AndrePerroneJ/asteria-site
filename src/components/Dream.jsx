const SPARK = [242, 194, 48];
const DUSK = [240, 138, 107];

function mix(from, to, amount) {
  return from.map((channel, index) => Math.round(channel + (to[index] - channel) * amount));
}

const TRACE = Array.from({ length: 12 }, (_, index) => {
  const amount = index / 11;
  const channels = mix(SPARK, DUSK, amount);
  const distance = Math.abs(index - 5.5) / 5.5;
  const alpha = 0.18 + distance * 0.82;
  return `rgba(${channels[0]} ${channels[1]} ${channels[2]} / ${alpha})`;
});

export function Dream() {
  return (
    <section id="sonho" className="band" aria-label="Sonho">
      <div className="frame text-center">
        <pre className="font-mono text-[16px] leading-8 font-normal text-light">
          <code>
            function dream() {"{"}
            {"\n"}
            {"  "}return dream();
            {"\n"}
            {"}"}
          </code>
        </pre>
        <div className="relative mx-auto mt-16 max-w-xl">
          <ul className="space-y-1 font-mono text-[12px] tracking-[0.08em]" aria-hidden="true">
            {TRACE.map((color, index) => (
              <li key={index} style={{ color }}>
                at dream (asteria.js:11)
              </li>
            ))}
          </ul>
          <p className="dream-error absolute top-1/2 left-1/2 w-[min(100%,28rem)] -translate-x-1/2 -translate-y-1/2">RangeError: maximum dream size exceeded</p>
        </div>
      </div>
    </section>
  );
}
