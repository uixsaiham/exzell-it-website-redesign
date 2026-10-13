"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { services } from "@/lib/site-data";
import { asset } from "@/lib/utils";
import { ServiceVisual } from "@/components/sections/service-visuals";

const autoplayMs = 5000;
const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const subscribeReducedMotion = (onChange: () => void) => { const query = window.matchMedia(reducedMotionQuery); query.addEventListener("change", onChange); return () => query.removeEventListener("change", onChange); };

export function HeroShowcase() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, () => window.matchMedia(reducedMotionQuery).matches, () => false);
  const service = services[index];
  const go = (step: number) => setIndex(current => (current + step + services.length) % services.length);
  const autoplay = !paused && !reducedMotion;

  // Advance every 5s; changing slides (manually or automatically) restarts the timer. Hover or keyboard focus pauses it.
  useEffect(() => {
    if (!autoplay) return;
    const timer = setTimeout(() => setIndex(current => (current + 1) % services.length), autoplayMs);
    return () => clearTimeout(timer);
  }, [index, autoplay]);

  return (
    <div className="hero-showcase" role="group" aria-roledescription="carousel" aria-label="Our services" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}>
      <a href="#services" className="hero-showcase-card group">
        <div key={service.id} className="hero-showcase-image hero-showcase-fade">
          {service.image ? <Image key={service.id} src={asset(service.image)} alt="" fill sizes="(max-width: 1024px) 90vw, 400px" className="object-cover transition-transform duration-700 group-hover:scale-105" priority={index === 0} /> : <ServiceVisual key={service.id} service={service} />}
          <span className="hero-showcase-chip"><service.icon size={13} aria-hidden="true" />0{index + 1} / {service.verb}</span>
        </div>
        <p className="hero-showcase-title" aria-live={autoplay ? "off" : "polite"}>{service.title}</p>
      </a>
      <span className="hero-showcase-progress" aria-hidden="true">{autoplay && <span key={index} style={{ animationDuration: `${autoplayMs}ms` }} />}</span>
      <div className="hero-showcase-controls">
        <span aria-hidden="true">0{index + 1} / 0{services.length}</span>
        <div className="flex gap-2">
          <button type="button" onClick={() => go(-1)} aria-label="Previous service"><ChevronLeft size={18} /></button>
          <button type="button" onClick={() => go(1)} aria-label="Next service"><ChevronRight size={18} /></button>
        </div>
      </div>
    </div>
  );
}
