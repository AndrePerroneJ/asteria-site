const DRESS = [233, 194, 46];
const EMBER = [232, 135, 92];
const ROSE = [201, 118, 122];

function mix(from, to, amount) {
  return from.map((channel, index) => Math.round(channel + (to[index] - channel) * amount));
}

function rgb(channels) {
  return `rgb(${channels[0]} ${channels[1]} ${channels[2]})`;
}

const TRACE = Array.from({ length: 14 }, (_, index) => {
  const amount = index / 13;
  const channels = amount < 0.5 ? mix(DRESS, EMBER, amount / 0.5) : mix(EMBER, ROSE, (amount - 0.5) / 0.5);
  return rgb(channels);
});

export function Dream() {
  return (
    <section id="sonho" className="relative overflow-hidden border-b border-dusk bg-ink px-5 py-20 md:px-12 md:py-28">
      <div className="relative mx-auto max-w-3xl text-center">
        <pre className="font-mono text-sm leading-7 text-lamp md:text-base">
          <code>
            function dream() {"{"}
            {"\n"}
            {"  "}return dream();
            {"\n"}
            {"}"}
          </code>
        </pre>
        <div className="relative mx-auto mt-16 max-w-xl">
          <ul className="space-y-1 font-mono text-[11px] md:text-xs" aria-hidden="true">
            {TRACE.map((color, index) => (
              <li key={index} style={{ color }}>
                at dream (asteria.js:11)
              </li>
            ))}
          </ul>
          <p className="dream-error absolute top-1/2 left-1/2 w-[min(100%,28rem)] -translate-x-1/2 -translate-y-1/2 bg-ink/80 px-4 py-3 font-mono text-[clamp(1.25rem,2.6vw,1.9rem)] leading-tight">
            RangeError: maximum dream size exceeded
          </p>
        </div>
        <p className="mt-16 font-display text-[clamp(1.8rem,3.4vw,2.8rem)] leading-tight text-lamp">
          Para marcas que buscam projetos fora do comum.
        </p>
      </div>
    </section>
  );
}
