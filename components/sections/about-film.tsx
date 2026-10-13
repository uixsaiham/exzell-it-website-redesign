"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Pause, Play, Volume2, VolumeX, Layers, ChartNoAxesCombined } from "lucide-react";
import { asset } from "@/lib/utils";

const highlights = [
  { icon: MapPin, title: "Germany-wide", text: "On-site IT field service" },
  { icon: Layers, title: "One partner", text: "IT, web and data under one roof" },
  { icon: ChartNoAxesCombined, title: "Ready to scale", text: "Live dashboards when you grow" },
];

// Ambient city film: autoplays muted on loop unless the visitor prefers reduced motion; always pausable (WCAG 2.2.2).
export function AboutFilm() {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) video.current?.play().catch(() => {});
  }, []);

  const togglePlay = () => { const v = video.current; if (!v) return; if (v.paused) v.play().catch(() => {}); else v.pause(); };
  const toggleMute = () => { const v = video.current; if (!v) return; v.muted = !v.muted; setMuted(v.muted); };

  return (
    <div className="film-card">
      <video ref={video} muted loop playsInline preload="metadata" aria-label="Exzell IT city film" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}><source src={`${asset("/assets/images/city-vid.mp4")}#t=0.1`} type="video/mp4" /></video>
      <div className="film-shade" aria-hidden="true" />
      <div className="film-top"><span className="film-pill"><span className="film-dot" />ROOTED IN GERMANY</span><div className="flex gap-2"><button type="button" className="film-btn" onClick={toggleMute} aria-label={muted ? "Unmute film" : "Mute film"}>{muted ? <VolumeX size={18} /> : <Volume2 size={18} />}</button><button type="button" className="film-btn" onClick={togglePlay} aria-label={playing ? "Pause film" : "Play film"}>{playing ? <Pause size={18} /> : <Play size={18} />}</button></div></div>
      <div className="film-bottom">
        <p className="film-title">Built for<br /><span>what’s next.</span></p>
        <ul className="film-stats">{highlights.map(item => <li key={item.title}><item.icon size={20} strokeWidth={1.6} /><span><strong>{item.title}</strong>{item.text}</span></li>)}</ul>
      </div>
    </div>
  );
}
