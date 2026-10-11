import Image from "next/image";
import { ArrowDown, ArrowUpRight, Check, Code2, Network, ChartNoAxesCombined, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/primitives";
import { ButtonLink } from "@/components/ui/button";
import { bookingUrl, services } from "@/lib/site-data";

export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}><span />{children}</p>;
}

function TechnologyVisual() {
  return (
    <div className="technology-visual" aria-label="Web development, connected IT and business intelligence working together">
      <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" />
      <div className="orbit-axis" />
      <div className="tech-core"><span className="core-mark">e<span>✳</span></span><span className="core-label">CONNECTED BY EXZELL</span></div>
      <div className="tech-node node-web"><span className="node-icon"><Code2 size={22} /></span><div><span className="node-caption">01 / BUILD IT</span><strong>Web development</strong></div><ArrowUpRight size={18} /></div>
      <div className="tech-node node-network"><span className="node-icon"><Network size={22} /></span><div><span className="node-caption">02 / CONNECT IT</span><strong>IT & WLAN</strong></div><span className="signal-bars"><i /><i /><i /><i /></span></div>
      <div className="tech-node node-data"><span className="node-icon"><ChartNoAxesCombined size={22} /></span><div><span className="node-caption">03 / DECIDE IT</span><strong>Business intelligence</strong></div></div>
      <span className="orbit-dot dot-one" /><span className="orbit-dot dot-two" />
      <p className="visual-note"><span />One connected technology ecosystem</p>
    </div>
  );
}

export function Hero() {
  return (
    <section className="agency-hero">
      <div className="hero-grain" aria-hidden="true" />
      <Container className="relative z-10">
        <div className="grid items-center gap-6 lg:grid-cols-[1.15fr_1fr]">
          <div className="hero-copy">
            <Eyebrow light>YOUR TECHNOLOGY PARTNER. START TO SCALE.</Eyebrow>
            <h1>From your first<br className="hidden sm:block" /> laptop to a<br className="hidden sm:block" /> live dashboard.<span>One partner.<br />The whole way.</span></h1>
            <p className="hero-description">We connect the dots between your website, your IT, and your data. So your technology works together. And your business moves forward.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={bookingUrl} className="hero-primary">Book a free discovery call <ArrowUpRight size={18} /></ButtonLink>
              <ButtonLink href="#services" variant="light">Explore our services <ArrowDown size={16} /></ButtonLink>
            </div>
            <div className="hero-assurance"><span><Check size={14} />One partner, every stage</span><span><span className="status-dot" />Based in Germany</span></div>
          </div>
          <TechnologyVisual />
        </div>
        <div className="hero-bottom"><span>TECHNOLOGY THAT GROWS WITH YOU</span><a href="#services" aria-label="Scroll to services"><ArrowDown size={18} /></a><a href="tel:+4951219570761">Prefer a conversation? <span>+49 5121 9570761 ↗</span></a></div>
      </Container>
    </section>
  );
}

export function ServicesSection() {
  const features = [["Custom websites", "Web applications", "Conversion-led design"], ["IT consulting", "WLAN & networks", "Hardware & support"], ["Live dashboards", "Data analysis", "AI-powered insights"]];
  return (
    <section id="services" className="section-space bg-[#f7f8f5]">
      <Container>
        <div className="section-intro"><div><Eyebrow>01 / WHAT WE DO</Eyebrow><h2 className="display-heading">Big ambitions.<br /><span className="text-muted">Connected solutions.</span></h2></div><p className="section-description">From the foundations to your next big move. Everything you need to build, connect, and grow — all under one roof.</p></div>
        <div className="service-list">
          {services.map((service, i) => (
            <article key={service.id} className="service-row group">
              <div className="service-content"><div className="flex items-center gap-3"><span className="service-number">0{i + 1}</span><span className="text-xs font-semibold uppercase tracking-widest text-muted">{service.verb}</span></div><h3>{service.title}</h3><p>{service.description}</p><ul className="service-tags">{features[i].map(feature => <li key={feature}>{feature}</li>)}</ul><a href={bookingUrl} className="text-link">Let’s talk {service.title === "IT & WLAN" ? "IT" : service.id === "bi" ? "data" : "web"}<span><ArrowUpRight size={18} /></span></a></div>
              <div className={`service-image service-image-${i}`}><span className="image-corner"><service.icon size={20} /></span><Image src={service.image} alt={`${service.title} by Exzell IT`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" /><span className="image-label">EXZELL IT / {service.verb.toUpperCase()}</span></div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="section-space">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]"><Eyebrow>02 / A LITTLE ABOUT US</Eyebrow><div><h2 className="display-heading">Great technology.<br />Even better partnership.</h2><p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">We’re the technology partner entrepreneurs rely on at every stage. Hardware and IT support from day one, a website that builds trust, a network that never drops, and a live Business Intelligence dashboard once you’re ready to scale.</p><div className="mt-7 flex flex-wrap gap-6 text-sm font-semibold text-ink"><span className="flex items-center gap-2"><Check size={17} className="text-brand-strong" />Local support in Germany</span><span className="flex items-center gap-2"><Check size={17} className="text-brand-strong" />One team. The whole picture.</span></div></div></div>
        <div className="about-film"><video controls playsInline preload="metadata" aria-label="Exzell IT city film"><source src="/assets/images/city-vid.mp4" type="video/mp4" />Your browser does not support video.</video><div className="film-caption"><span>ROOTED IN GERMANY. BUILT FOR WHAT’S NEXT.</span><span>Exzell IT®</span></div></div>
      </Container>
    </section>
  );
}

export function ProcessSection() {
  const steps = [{ title: "Get set up", text: "Hardware, software and IT support. Everything you need to hit the ground running.", icon: Network }, { title: "Go live", text: "A website that reflects your business and turns first impressions into lasting trust.", icon: Code2 }, { title: "Stay connected", text: "Reliable networks and responsive support that keep your people productive.", icon: Check }, { title: "Scale smart", text: "Live dashboards and AI-generated insights. Less guesswork, better decisions.", icon: Sparkles }];
  return <section id="process" className="process-section section-space"><Container><div className="section-intro"><div><Eyebrow light>03 / YOUR GROWTH JOURNEY</Eyebrow><h2 className="display-heading text-white">Wherever you are.<br /><span className="text-[#a4dd81]">We meet you there.</span></h2></div><p className="section-description text-white/60">You don’t need everything on day one. You need a partner who knows what comes next.</p></div><ol className="process-grid">{steps.map((step, i) => <li key={step.title}><div className="process-top"><span>0{i + 1}</span><step.icon size={23} /></div><h3>{step.title}</h3><p>{step.text}</p><span className="process-line" /></li>)}</ol><div className="process-footnote"><span className="status-dot" />One relationship. Every stage of your business.</div></Container></section>;
}

export function ContactSection() {
  return <section id="contact" className="contact-section"><Container><div className="contact-inner"><div><Eyebrow>YOUR NEXT CHAPTER STARTS HERE</Eyebrow><h2>Stop guessing.<br /><span>Start knowing.</span></h2><p>Tell us where you are. Let’s work out where you could go.</p><ButtonLink href={bookingUrl} variant="dark" size="lg">Book a free discovery call <ArrowUpRight size={20} /></ButtonLink></div><a href={bookingUrl} className="contact-arrow" aria-label="Book a free discovery call"><ArrowUpRight strokeWidth={1} /></a></div><div className="contact-bottom"><span>No pressure. Just a conversation about what’s possible.</span><a href="mailto:info@exzell-it.de">info@exzell-it.de <ArrowUpRight size={16} /></a></div></Container></section>;
}
