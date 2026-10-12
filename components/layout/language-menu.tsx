"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown, Globe, ArrowUpRight } from "lucide-react";
import { germanSiteUrl } from "@/lib/site-data";
import { cn } from "@/lib/utils";

// English is this site. German links to the original site until localisation is migrated.
export function LanguageMenu() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); buttonRef.current?.focus(); } };
    const onPointer = (event: PointerEvent) => { if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("pointerdown", onPointer); };
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative" onBlur={event => { if (!wrapperRef.current?.contains(event.relatedTarget as Node)) setOpen(false); }}>
      <button ref={buttonRef} type="button" className={cn("lang-btn", open && "is-open")} aria-expanded={open} aria-controls={menuId} aria-label="Language: English" onClick={() => setOpen(!open)}>
        <Globe size={16} aria-hidden="true" />EN<ChevronDown size={14} aria-hidden="true" />
      </button>
      <div id={menuId} hidden={!open} className="lang-menu">
        <p className="lang-option is-current"><span><strong>English</strong><span>This site</span></span><Check size={16} aria-label="Current language" /></p>
        <a href={germanSiteUrl} hrefLang="de" lang="de" className="lang-option" onClick={() => setOpen(false)}><span><strong>Deutsch</strong><span>Aktuelle Website</span></span><ArrowUpRight size={16} aria-hidden="true" /></a>
      </div>
    </div>
  );
}
