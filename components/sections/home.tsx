import Image from "next/image";
import { ArrowRight, ArrowUpRight, MapPin, UsersRound, Check, Code2, Network, Sparkles, MonitorX, WifiOff, LifeBuoy, TrendingDown } from "lucide-react";
import { Container } from "@/components/ui/primitives";
import { ButtonLink } from "@/components/ui/button";
import { bookingUrl, services } from "@/lib/site-data";
import { asset } from "@/lib/utils";
import { ContactForm } from "@/components/sections/contact-form";
import { HeroShowcase } from "@/components/sections/hero-showcase";
import { AboutFilm } from "@/components/sections/about-film";
import { HeroBackdrop } from "@/components/sections/hero-backdrop";
import { ServiceVisual } from "@/components/sections/service-visuals";

export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}><span />{children}</p>;
}

const heroServices = ["Web development", "IT consulting", "WLAN & networks", "Business intelligence"];
const clientInitials = ["MS", "ST", "JS", "LA"];

export function Hero() {
  return (
    <section className="agency-hero">
      <HeroBackdrop /><div className="hero-grain" aria-hidden="true" />
      <Container className="hero-frame">
        <div className="hero-top">
          <div className="hero-copy">
            <h1>From your first laptop to a live dashboard. <span>One partner, the whole way.</span></h1>
            <div className="hero-actions">
              <a href={bookingUrl} className="hero-cta group"><span className="hero-cta-icon"><ArrowUpRight size={18} /></span><span className="hero-cta-label">Book a free discovery call</span></a>
              <a href="#testimonials" className="hero-proof"><span className="hero-avatars" aria-hidden="true">{clientInitials.map(initials => <span key={initials}>{initials}</span>)}</span><span><strong>Real client stories</strong><span>Based in Germany</span></span></a>
            </div>
          </div>
          <HeroShowcase />
        </div>
        <p className="hero-wordmark" aria-hidden="true">Exzell IT</p>
        <ul className="hero-services" aria-label="What we do">{heroServices.map(service => <li key={service}>{service}</li>)}</ul>
      </Container>
    </section>
  );
}

export function ProblemSection() {
  const problems = [
    { title: "Your website doesn’t reflect your business", text: "An old or unprofessional website loses trust before a word is spoken. First impressions are digital now.", icon: MonitorX, solution: "Web Development", href: "#services" },
    { title: "Network outages stop work instantly", text: "One WLAN failure can cost hours of productivity. Your team shouldn’t lose time waiting for connectivity.", icon: WifiOff, solution: "IT & WLAN", href: "#services" },
    { title: "No reliable IT support when things break", text: "Without a fast IT partner, small technical issues snowball into expensive downtime and frustrated staff.", icon: LifeBuoy, solution: "IT & WLAN", href: "#services" },
    { title: "Competitors look more professional online", text: "A polished website and fast load speeds are table stakes today. Customers notice — and choose accordingly.", icon: TrendingDown, solution: "Web Development", href: "#services" },
  ];
  return <section id="problem" className="section-space"><Container><div className="section-intro"><div><Eyebrow>01 / THE PROBLEM</Eyebrow><h2 className="display-heading">Your business is generating data.<br /><span className="text-muted">Most of it goes nowhere.</span></h2></div><p className="section-description">Growing businesses sit on enormous amounts of operational data — but without the right systems, it stays invisible and decisions get made on instinct.</p></div><ul className="problem-grid">{problems.map((problem, i) => <li key={problem.title} className="problem-card"><div className="problem-top"><span className="problem-icon"><problem.icon size={20} strokeWidth={1.6} /></span><span>0{i + 1}</span></div><h3>{problem.title}</h3><p>{problem.text}</p><a href={problem.href} className="problem-solution"><span>Solved by</span>{problem.solution}<ArrowUpRight size={15} /></a></li>)}</ul><div className="problem-footnote"><span className="status-dot" />Every one of these has a fix. And one partner who handles them all.</div></Container></section>;
}

export function ServicesSection() {
  return (
    <section id="services" className="section-space bg-[#f7f8f5]">
      <Container>
        <div className="section-intro"><div><Eyebrow>02 / WHAT WE DO</Eyebrow><h2 className="display-heading">Big ambitions.<br /><span className="text-muted">Connected solutions.</span></h2></div><p className="section-description">From the foundations to your next big move. Six services to design, build, connect and grow, all under one roof.</p></div>
        <div className="service-list">
          {services.map((service, i) => (
            <article key={service.id} className="service-row group" style={{ "--i": i } as React.CSSProperties}>
              <div className="service-content"><div className="flex items-center gap-3"><span className="service-number">0{i + 1}</span><span className="text-xs font-semibold uppercase tracking-widest text-muted">{service.verb}</span></div><h3>{service.title}</h3><p>{service.description}</p><ul className="service-features">{service.features.map(feature => <li key={feature}><Check size={15} aria-hidden="true" />{feature}</li>)}</ul><a href={bookingUrl} className="text-link">{service.cta}<span><ArrowUpRight size={18} /></span></a></div>
              <div className={`service-image service-image-${i}`}><span className="image-corner"><service.icon size={20} /></span>{service.image ? <Image src={asset(service.image)} alt={`${service.title} by Exzell IT`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" /> : <ServiceVisual service={service} />}<span className="image-label">EXZELL IT / {service.verb.toUpperCase()}</span></div>
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
        <div className="about-intro">
          <div>
            <Eyebrow>03 / A LITTLE ABOUT US</Eyebrow><h2 className="display-heading">Great technology.<br /><span className="text-muted">Even better partnership.</span></h2>
            <ul className="about-points"><li><span><MapPin size={18} /></span>Local support in Germany</li><li><span><UsersRound size={18} /></span>One team. The whole picture.</li></ul>
          </div>
          <div className="about-copy">
            <p>We’re the technology partner entrepreneurs rely on at every stage. Hardware and IT support from day one, a website that builds trust, a network that never drops, and a live Business Intelligence dashboard once you’re ready to scale.</p>
            <a href="#process" className="about-link">See how we work <ArrowRight size={16} /></a>
          </div>
        </div>
        <AboutFilm />
      </Container>
    </section>
  );
}

export function ProcessSection() {
  const steps = [{ title: "Get set up", text: "Hardware, software and IT support. Everything you need to hit the ground running.", icon: Network }, { title: "Go live", text: "A website that reflects your business and turns first impressions into lasting trust.", icon: Code2 }, { title: "Stay connected", text: "Reliable networks and responsive support that keep your people productive.", icon: Check }, { title: "Scale smart", text: "Live dashboards and AI-generated insights. Less guesswork, better decisions.", icon: Sparkles }];
  return <section id="process" className="process-section section-space"><Container><div className="section-intro"><div><Eyebrow light>04 / YOUR GROWTH JOURNEY</Eyebrow><h2 className="display-heading text-white">Wherever you are.<br /><span className="text-[#a4dd81]">We meet you there.</span></h2></div><p className="section-description text-white/60">You don’t need everything on day one. You need a partner who knows what comes next.</p></div><ol className="process-grid">{steps.map((step, i) => <li key={step.title}><div className="process-top"><span>0{i + 1}</span><step.icon size={23} /></div><h3>{step.title}</h3><p>{step.text}</p><span className="process-line" /></li>)}</ol><div className="process-footnote"><span className="status-dot" />One relationship. Every stage of your business.</div></Container></section>;
}

export function ContactSection() {
  return <section id="contact" className="contact-section"><Container><div className="contact-inner"><div className="contact-copy"><Eyebrow>YOUR NEXT CHAPTER STARTS HERE</Eyebrow><h2>Stop guessing.<br /><span>Start knowing.</span></h2><p>Tell us where you are. Let’s work out where you could go.</p><ul className="contact-points"><li><Check size={16} aria-hidden="true" />A reply from a real person, not a ticket queue</li><li><Check size={16} aria-hidden="true" />Web, IT and data advice from one team</li></ul><div className="contact-alt"><span>Prefer to talk it through?</span><ButtonLink href={bookingUrl} variant="dark" size="md">Book a free discovery call <ArrowUpRight size={18} /></ButtonLink></div></div><ContactForm /></div><div className="contact-bottom"><span>No pressure. Just a conversation about what’s possible.</span><a href="mailto:info@exzell-it.de">info@exzell-it.de <ArrowUpRight size={16} /></a></div></Container></section>;
}
