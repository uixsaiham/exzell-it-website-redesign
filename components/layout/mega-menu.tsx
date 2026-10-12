"use client";

import { useEffect, useId, useRef } from "react";
import Link from "next/link";
import { Archive, ArrowRight, ArrowUpRight, BrainCircuit, ChartNoAxesCombined, ChevronDown, Code2, HardDriveDownload, KeyRound, MonitorCog, PackageCheck, Palette, Sparkles, Wifi, Workflow, Wrench, type LucideIcon } from "lucide-react";
import { bookingUrl, megaMenu } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  "Web Development": Code2, "UI/UX Design": Palette, "IT Consulting": MonitorCog,
  "Data Recovery": HardDriveDownload, "WiFi Survey": Wifi, "IT Field Service": Wrench, "B2B Procurement": PackageCheck, "Software Licensing": KeyRound, "Email Archiving": Archive,
  "Business Intelligence": ChartNoAxesCombined, "Predictive AI": BrainCircuit, "Intelligent Automation": Workflow,
};

type MegaMenuProps = { label: string; active: boolean; open: boolean; onOpenChange: (open: boolean) => void };

// Desktop "Services" disclosure. The panel spans the header width, so the wrapper stays unpositioned and the panel anchors to the sticky header.
export function MegaMenu({ label, active, open, onOpenChange }: MegaMenuProps) {
  const panelId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") { onOpenChange(false); triggerRef.current?.focus(); } };
    const onPointer = (event: PointerEvent) => { if (!wrapperRef.current?.contains(event.target as Node)) onOpenChange(false); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("pointerdown", onPointer); };
  }, [open, onOpenChange]);
  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  function hover(next: boolean, event: React.PointerEvent) {
    if (event.pointerType !== "mouse") return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => onOpenChange(next), next ? 80 : 180);
  }
  const close = () => onOpenChange(false);

  return (
    <div ref={wrapperRef} onPointerEnter={event => hover(true, event)} onPointerLeave={event => hover(false, event)} onBlur={event => { if (!wrapperRef.current?.contains(event.relatedTarget as Node)) close(); }}>
      <button ref={triggerRef} type="button" aria-expanded={open} aria-controls={panelId} onClick={() => onOpenChange(!open)} className={cn("nav-item mega-trigger", (active || open) && "is-active", open && "is-open")}>
        {label} <ChevronDown size={14} aria-hidden="true" />
      </button>
      <div id={panelId} hidden={!open} className="mega-panel">
        <div className="mega-inner">
          <div>
            <p className="mega-label">Our services</p>
            <ul className="mega-services">
              {megaMenu.services.map(item => {
                const Icon = icons[item.title];
                return <li key={item.title}><a href={item.href} onClick={close} className="mega-service group"><span className="mega-tile"><Icon size={20} strokeWidth={1.7} /></span><span className="min-w-0 flex-1"><strong>{item.title}</strong><span>{item.description}</span></span><ArrowRight size={16} className="mega-arrow" aria-hidden="true" /></a></li>;
              })}
            </ul>
          </div>
          <div className="mega-it">
            <p className="mega-label">IT consulting covers</p>
            <ul className="mega-it-list">
              {megaMenu.itServices.map(item => {
                const Icon = icons[item.title];
                return <li key={item.title}><a href={item.href} onClick={close}><Icon size={16} strokeWidth={1.7} aria-hidden="true" />{item.title}</a></li>;
              })}
            </ul>
          </div>
          <div className="mega-feature">
            <span className="mega-tile mega-tile-dark" aria-hidden="true"><Sparkles size={18} strokeWidth={1.7} /></span>
            <p className="mega-feature-title">Not sure where to start?</p>
            <p className="mega-feature-text">Tell us where your business is today. We’ll show you which services fit, and in what order.</p>
            <a href={bookingUrl} onClick={close} className="mega-cta">Book a free discovery call <ArrowUpRight size={16} aria-hidden="true" /></a>
            <Link href="/#services" onClick={close} className="mega-overview">See how our services connect <ArrowRight size={15} aria-hidden="true" /></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mobile version: a native disclosure inside the mobile navigation.
export function MobileServices({ label, onNavigate }: { label: string; onNavigate: () => void }) {
  const groups = [{ label: "Our services", items: megaMenu.services }, { label: "IT consulting covers", items: megaMenu.itServices }];
  return (
    <details className="mobile-services group">
      <summary>{label} <ChevronDown size={18} aria-hidden="true" className="transition-transform group-open:rotate-180" /></summary>
      {groups.map(group => (
        <div key={group.label} className="mt-3">
          <p className="mega-label px-3">{group.label}</p>
          <ul className="mt-1">
            {group.items.map(item => {
              const Icon = icons[item.title];
              return <li key={item.title}><a href={item.href} onClick={onNavigate}><Icon size={17} strokeWidth={1.7} aria-hidden="true" />{item.title}</a></li>;
            })}
          </ul>
        </div>
      ))}
    </details>
  );
}
