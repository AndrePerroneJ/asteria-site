import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo.jsx";

const DESK = "/video/asteria-intro-desktop.mp4?v=2";
const PHONE = "/video/asteria-intro-mobile.mp4?v=2";
const PHONE_QUERY = "(max-width: 767px)";

function filmFor(matches) {
  return matches ? PHONE : DESK;
}

export function Hero() {
  const videoRef = useRef(null);
  const endedRef = useRef(false);
  const [ended, setEnded] = useState(false);
  const [src, setSrc] = useState(() => filmFor(window.matchMedia(PHONE_QUERY).matches));

  useEffect(() => {
    const phone = window.matchMedia(PHONE_QUERY);

    function onLayout() {
      const next = filmFor(phone.matches);
      if (endedRef.current || next === src) return;
      setEnded(false);
      setSrc(next);
    }

    phone.addEventListener("change", onLayout);
    return () => phone.removeEventListener("change", onLayout);
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    endedRef.current = false;

    function reveal() {
      endedRef.current = true;
      setEnded(true);
    }

    function holdStill() {
      reveal();
      video.pause();
    }

    function easeOut() {
      if (!video.duration || video.duration - video.currentTime > 1.2) return;
      reveal();
    }

    function startFilm() {
      if (motion.matches || video.ended) return;
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      const attempt = video.play();
      if (attempt) {
        attempt
          .then(() => {
            if (video.duration && video.duration - video.currentTime <= 1.2) return;
            endedRef.current = false;
            setEnded(false);
          })
          .catch(() => {});
      }
    }

    function onMotion() {
      if (motion.matches) holdStill();
      else startFilm();
    }

    video.preload = motion.matches ? "none" : "auto";
    video.addEventListener("ended", holdStill);
    video.addEventListener("timeupdate", easeOut);
    video.addEventListener("canplay", startFilm);
    motion.addEventListener("change", onMotion);

    if (motion.matches) holdStill();
    else startFilm();

    return () => {
      video.removeEventListener("ended", holdStill);
      video.removeEventListener("timeupdate", easeOut);
      video.removeEventListener("canplay", startFilm);
      motion.removeEventListener("change", onMotion);
    };
  }, [src]);

  return (
    <section
      id="palco"
      className={`relative h-dvh overflow-hidden bg-ink${ended ? " is-ended" : ""}`}
      aria-labelledby="abertura-title"
    >
      <h1 id="abertura-title" className="sr-only">
        Asteria Code
      </h1>
      <video
        ref={videoRef}
        key={src}
        className="hero-film pointer-events-none absolute inset-0 h-full w-full object-cover"
        src={src}
        muted
        playsInline
        aria-hidden="true"
        tabIndex={-1}
      />
      <div className="hero-mark pointer-events-none absolute inset-0 grid place-items-center px-6">
        <Logo className="h-14 w-auto max-w-[78vw] md:h-20" />
      </div>
      <a href="#dualidade" className="hero-down" aria-label="Descer">
        <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
          <path d="M5 9l7 7 7-7" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </a>
    </section>
  );
}
