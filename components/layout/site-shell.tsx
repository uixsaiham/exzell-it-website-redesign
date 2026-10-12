"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUp, ArrowUpRight, CalendarDays, Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { bookingUrl, headerNav, germanSiteUrl, megaMenu } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { openConsentEvent } from "@/components/layout/consent-banner";
import { MegaMenu, MobileServices } from "@/components/layout/mega-menu";
import { LanguageMenu } from "@/components/layout/language-menu";

const spySections = headerNav.flatMap(item => ("section" in item ? [item.section] : []));

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("home");
  const pathname = usePathname();
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      if (pathname !== "/") return;
      // Highlight the section that crosses 40% of the viewport; fall back to Home near the top.
      const line = window.innerHeight * 0.4;
      const current = spySections.find(id => { const box = document.getElementById(id)?.getBoundingClientRect(); return box ? box.top <= line && box.bottom > line : false; });
      // The last section can't reach the line at the end of the page, so treat a visible one as current there.
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      const last = spySections.at(-1);
      const lastVisible = atBottom && last && (document.getElementById(last)?.getBoundingClientRect().top ?? Infinity) < window.innerHeight ? last : undefined;
      setActive(current ?? lastVisible ?? (window.scrollY < window.innerHeight * 0.6 ? "home" : ""));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);
  // On the homepage the header sits transparently over the hero until the page scrolls.
  const overlay = pathname === "/" && !scrolled && !open && !menuOpen;
  const close = () => setOpen(false);
  return (
    <header data-overlay={overlay} className={cn("site-header sticky top-0 z-40 border-b transition-colors duration-200", overlay ? "border-transparent bg-transparent" : menuOpen ? "border-line bg-white" : "border-line bg-white/95 backdrop-blur-xl")}>
      <Container className="flex min-h-[84px] items-center justify-between gap-6">
        <Link href="/" aria-label="Exzell IT home" className="flex min-h-11 shrink-0 items-center" onClick={close}><Image src="/assets/images/logo.svg" alt="Exzell IT" width={183} height={29} className={cn("h-7 w-auto transition-[filter] duration-200 sm:h-8", overlay && "brightness-0 invert")} priority /></Link>
        <nav aria-label="Main navigation" className="nav-pill hidden xl:flex">
          {headerNav.map(item => {
            const isActive = pathname === "/" ? active === item.key : item.key === "home" && pathname === "/";
            if (item.key === "services") return <MegaMenu key={item.key} label={item.label} active={isActive} open={menuOpen} onOpenChange={setMenuOpen} />;
            const className = cn("nav-item", isActive && "is-active");
            return item.href.startsWith("/") ? <Link key={item.key} href={item.href} className={className} aria-current={isActive && item.key === "home" ? "page" : undefined}>{item.label}</Link> : <a key={item.key} href={item.href} className={className}>{item.label}</a>;
          })}
        </nav>
        <div className="hidden items-center gap-2 xl:flex">
          <LanguageMenu />
          <a href={bookingUrl} className="book-btn"><CalendarDays size={17} aria-hidden="true" />Book a call</a>
        </div>
        <Button variant={overlay ? "light" : "outline"} size="sm" className="xl:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</Button>
      </Container>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile navigation" className="max-h-[calc(100svh-85px)] overflow-y-auto border-t border-line p-5 xl:hidden">
          {headerNav.map(item => item.key === "services"
            ? <MobileServices key={item.key} label={item.label} onNavigate={close} />
            : item.href.startsWith("/") ? <Link key={item.key} onClick={close} className="mobile-nav-link" href={item.href}>{item.label}</Link> : <a key={item.key} onClick={close} className="mobile-nav-link" href={item.href}>{item.label}</a>)}
          <div className="mt-4 flex items-center justify-between gap-3 border-t border-line px-3 pt-4 text-sm"><span className="text-muted">Language</span><span className="flex gap-2"><span className="rounded-full bg-ink px-3 py-1.5 font-semibold text-white">EN</span><a href={germanSiteUrl} hrefLang="de" lang="de" className="inline-flex min-h-8 items-center rounded-full border border-line px-3 font-semibold text-ink">DE</a></span></div>
          <a href={bookingUrl} className="book-btn mt-4 w-full justify-center"><CalendarDays size={17} aria-hidden="true" />Book a call</a>
        </nav>
      )}
    </header>
  );
}

const footerCompany = [
  { label: "About us", href: "/#about" },
  { label: "Our process", href: "/#process" },
  { label: "Insights", href: "/#insights" },
  ...headerNav.filter(item => item.key === "resources" || item.key === "career"),
];

export function SiteFooter() {
  const toTop = () => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  return (
    <footer className="site-footer">
      <div className="footer-glow" aria-hidden="true" />
      <Container className="relative">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" aria-label="Exzell IT home" className="inline-flex min-h-11 items-center"><Image src="/assets/images/logo.svg" alt="Exzell IT" width={183} height={29} className="h-9 w-auto" /></Link>
            <p>From your first laptop to a live dashboard. One partner, the whole way.</p>
            <span className="footer-badge"><span className="status-dot" />Your technology partner in Germany</span>
          </div>
          <nav aria-labelledby="footer-services" className="footer-col">
            <p id="footer-services" className="footer-heading">Services</p>
            <ul>{megaMenu.services.map(item => <li key={item.title}><a href={item.href}>{item.title}<ArrowUpRight size={14} aria-hidden="true" /></a></li>)}</ul>
          </nav>
          <nav aria-labelledby="footer-company" className="footer-col">
            <p id="footer-company" className="footer-heading">Company</p>
            <ul>{footerCompany.map(item => <li key={item.label}>{item.href.startsWith("/") ? <Link href={item.href}>{item.label}<ArrowUpRight size={14} aria-hidden="true" /></Link> : <a href={item.href}>{item.label}<ArrowUpRight size={14} aria-hidden="true" /></a>}</li>)}</ul>
          </nav>
          <div className="footer-contact">
            <p className="footer-contact-title">Have a project in mind?</p>
            <p className="footer-contact-text">Tell us where you are. We’ll help you work out what comes next.</p>
            <a href="mailto:info@exzell-it.de" className="footer-contact-row"><span><Mail size={16} aria-hidden="true" /></span>info@exzell-it.de</a>
            <a href="tel:+4951219570761" className="footer-contact-row"><span><Phone size={16} aria-hidden="true" /></span>+49 5121 9570761</a>
            <a href={bookingUrl} className="footer-book"><CalendarDays size={17} aria-hidden="true" />Book a free discovery call</a>
          </div>
        </div>
        <div className="footer-wordmark-wrap" aria-hidden="true"><p className="footer-wordmark">Exzell IT</p></div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Exzell IT UG (haftungsbeschränkt). All rights reserved.</p>
          <nav aria-label="Legal" className="footer-legal">
            <a href="https://exzell-it.de/impressum.html">Imprint</a>
            <a href="https://exzell-it.de/datenschutz.html">Privacy</a>
            <button type="button" onClick={() => window.dispatchEvent(new Event(openConsentEvent))}>Cookie settings</button>
            <Link href="/design-system">Design system</Link>
          </nav>
          <button type="button" className="footer-top-btn" onClick={toTop}>Back to top <ArrowUp size={15} aria-hidden="true" /></button>
        </div>
      </Container>
    </footer>
  );
}
