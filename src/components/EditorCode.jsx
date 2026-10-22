function Kw({ children }) {
  return <span className="text-lilac">{children}</span>;
}

function Dress({ children }) {
  return <span className="text-dress">{children}</span>;
}

function Spot({ children }) {
  return <span className="text-spotlight">{children}</span>;
}

function Str({ children }) {
  return <span className="text-lamp">{children}</span>;
}

export function EditorCode() {
  return (
    <code>
      <div>
        <Kw>import</Kw> <Dress>asteria</Dress> <Kw>from</Kw> <Str>"../../../sky"</Str>;
      </div>
      <div>
        <Kw>const</Kw> <Dress>star</Dress> = <Kw>await</Kw> sky.<Spot>fall</Spot>();
      </div>
      <div>
        <span className="text-rose">{"// a hora mágica."}</span>
      </div>
      <div>
        <Kw>let</Kw> <Dress>theme</Dress> = <Str>"magic hour"</Str>;
      </div>
      <div>
        <Kw>for</Kw> (<Kw>const</Kw> <Dress>note</Dress> <Kw>of</Kw> jazz) {"{"}
      </div>
      <div>
        {"  "}
        <Spot>play</Spot>(<Dress>note</Dress>);
      </div>
      <div>{"}"}</div>
    </code>
  );
}
