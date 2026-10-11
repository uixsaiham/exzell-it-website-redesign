"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/primitives";
import { Button, ButtonLink } from "@/components/ui/button";
import { navigation, bookingUrl } from "@/lib/site-data";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur-xl">
      <Container className="flex min-h-[84px] items-center justify-between gap-5">
        <Link href="/" aria-label="Exzell IT home" onClick={() => setOpen(false)}><Image src="/assets/images/logo.png" alt="Exzell IT" width={140} height={64} className="h-16 w-auto" priority /></Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">{navigation.map(item => <Link className="text-xs font-medium text-muted transition-colors hover:text-brand-strong" key={item.href} href={item.href}>{item.label}</Link>)}<Link href="/#insights" className="text-xs font-medium text-muted hover:text-brand-strong">Insights</Link></nav>
        <div className="hidden items-center gap-5 md:flex"><span className="hidden text-[10px] text-muted lg:flex lg:items-center lg:gap-2"><span className="size-1.5 rounded-full bg-brand-strong" />Based in Germany</span><ButtonLink href={bookingUrl} variant="dark" size="sm" className="rounded-[10px]">Let’s talk <ArrowUpRight size={16} /></ButtonLink></div>
        <Button variant="outline" size="sm" className="md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</Button>
      </Container>
      {open && <nav id="mobile-nav" aria-label="Mobile navigation" className="border-t border-line p-5 md:hidden">{[...navigation, { label: "Insights", href: "/#insights" }].map(item => <Link onClick={() => setOpen(false)} className="block rounded-card p-3 text-ink hover:bg-surface" key={item.href} href={item.href}>{item.label}</Link>)}<ButtonLink href={bookingUrl} className="mt-3 w-full">Let’s talk <ArrowUpRight size={16} /></ButtonLink></nav>}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[#101e23] pb-6 pt-16 text-white">
      <Container>
        <div className="grid gap-10 border-b border-white/15 pb-12 sm:grid-cols-[1.4fr_1fr_1fr]">
          <div><Link href="/" className="inline-flex items-center gap-2 text-3xl font-semibold tracking-tight">exzell<span className="text-accent">it<span className="ml-1 text-lg">✳</span></span></Link><p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">From your first laptop to a live dashboard.<br />One partner, the whole way.</p></div>
          <nav aria-label="Footer navigation"><p className="mb-5 text-[10px] tracking-widest text-white/40">EXPLORE</p><div className="flex flex-col items-start gap-3 text-sm text-white/75">{navigation.map(item => <Link key={item.href} href={item.href} className="hover:text-accent">{item.label}</Link>)}<Link href="/#insights" className="hover:text-accent">Insights</Link></div></nav>
          <div><p className="mb-5 text-[10px] tracking-widest text-white/40">LET’S CONNECT</p><a className="inline-flex min-h-11 items-center gap-3 text-sm hover:text-accent" href="mailto:info@exzell-it.de">info@exzell-it.de <ArrowUpRight size={15} /></a><a href="tel:+4951219570761" className="block min-h-11 text-sm text-white/75 hover:text-accent">+49 5121 9570761</a><p className="mt-2 text-xs text-white/40">Your technology partner in Germany.</p></div>
        </div>
        <div className="flex flex-col justify-between gap-4 pt-6 text-[10px] text-white/45 sm:flex-row"><p>© {new Date().getFullYear()} Exzell IT. All rights reserved.</p><nav aria-label="Legal and resources" className="flex gap-5"><Link href="/design-system" className="hover:text-white">Design system</Link><a href="https://exzell-it.de/impressum.html" className="hover:text-white">Imprint</a><a href="https://exzell-it.de/datenschutz.html" className="hover:text-white">Privacy</a></nav></div>
      </Container>
    </footer>
  );
}
