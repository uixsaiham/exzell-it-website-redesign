"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { services } from "@/lib/site-data";
import { ServiceVisual } from "@/components/sections/service-visuals";

export function HeroShowcase() {
  const [index, setIndex] = useState(0);
  const service = services[index];
  const go = (step: number) => setIndex(current => (current + step + services.length) % services.length);
  return (
    <div className="hero-showcase" role="group" aria-roledescription="carousel" aria-label="Our services">
      <a href="#services" className="hero-showcase-card group">
        <div className="hero-showcase-image">
          {service.image ? <Image key={service.id} src={service.image} alt="" fill sizes="(max-width: 1024px) 90vw, 400px" className="object-cover transition-transform duration-700 group-hover:scale-105" priority={index === 0} /> : <ServiceVisual key={service.id} service={service} />}
          <span className="hero-showcase-chip"><service.icon size={13} aria-hidden="true" />0{index + 1} / {service.verb}</span>
        </div>
        <p className="hero-showcase-title" aria-live="polite">{service.title}</p>
      </a>
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
