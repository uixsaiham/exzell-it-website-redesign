"use client";

import { useEffect } from "react";

// Feeds the pointer position into each growth-journey card as --mx/--my for the CSS spotlight.
export function JourneySpotlight() {
  useEffect(() => {
    const list = document.querySelector<HTMLElement>(".journey");
    if (!list || !window.matchMedia("(pointer: fine)").matches) return;
    let frame = 0;
    const move = (event: PointerEvent) => {
      const card = (event.target as Element).closest<HTMLElement>(".journey-card");
      if (!card) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const box = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${event.clientX - box.left}px`);
        card.style.setProperty("--my", `${event.clientY - box.top}px`);
      });
    };
    list.addEventListener("pointermove", move);
    return () => { cancelAnimationFrame(frame); list.removeEventListener("pointermove", move); };
  }, []);
  return null;
}
