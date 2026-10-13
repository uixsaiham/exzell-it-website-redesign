"use client";

import { useEffect, useRef } from "react";

// Animated hero background: drifting aurora blobs, a panning grid, a periodic light sweep and a cursor spotlight.
export function HeroBackdrop() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const hero = el?.parentElement;
    if (!el || !hero || !window.matchMedia("(pointer: fine)").matches) return;
    let frame = 0;
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const box = hero.getBoundingClientRect();
        el.style.setProperty("--mx", `${event.clientX - box.left}px`);
        el.style.setProperty("--my", `${event.clientY - box.top}px`);
        el.dataset.spot = "on";
      });
    };
    const leave = () => { el.dataset.spot = "off"; };
    hero.addEventListener("pointermove", move);
    hero.addEventListener("pointerleave", leave);
    return () => { cancelAnimationFrame(frame); hero.removeEventListener("pointermove", move); hero.removeEventListener("pointerleave", leave); };
  }, []);

  return (
    <div ref={root} className="hero-backdrop" aria-hidden="true">
      <span className="hero-blob hero-blob-a" />
      <span className="hero-blob hero-blob-b" />
      <span className="hero-blob hero-blob-c" />
      <span className="hero-sweep" />
      <span className="hero-grid" />
      <span className="hero-beam" />
      <span className="hero-spot" />
    </div>
  );
}
