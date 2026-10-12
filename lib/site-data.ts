import type { LucideIcon } from "lucide-react";
import { Code2, Network, ChartNoAxesCombined, Palette, BrainCircuit, Workflow } from "lucide-react";
// Services with a photo use `image`; the newer services use a coded illustration (`visual`, see components/sections/service-visuals.tsx).
export type Service = { id: string; title: string; verb: string; description: string; features: readonly string[]; cta: string; icon: LucideIcon; tone: string; image?: string; visual?: "design" | "predict" | "automate" };
export const services: readonly Service[] = [
  { id: "web", title: "Web Development", verb: "Build it", description: "Custom websites and web apps — fast, responsive and built to convert visitors into clients.", features: ["Business websites & landing pages", "Custom web applications", "E-commerce stores", "Performance optimisation & SEO-ready"], image: "/assets/images/webdev-visual.png", cta: "Let’s talk web", icon: Code2, tone: "bg-blue-50 text-blue-700" },
  { id: "design", title: "UI/UX Design", verb: "Design it", description: "Interfaces and brand experiences that feel clear, consistent and easy to use, so visitors understand you quickly and know what to do next.", features: ["User research & customer journeys", "Wireframes & interactive prototypes", "UI design for websites & apps", "Brand identity & design systems"], cta: "Let’s talk design", icon: Palette, tone: "bg-violet-50 text-violet-700", visual: "design" },
  { id: "it", title: "IT & WLAN", verb: "Connect it", description: "Stable networks and complete IT setup so your business runs without interruption.", features: ["Data recovery for failed drives & ransomware", "WiFi surveys & network installation", "On-site IT field service, Germany-wide", "B2B hardware & software procurement", "Software licensing management", "Managed email archiving & compliance"], image: "/assets/images/wlan-visual.png", cta: "Let’s talk IT", icon: Network, tone: "bg-amber-50 text-amber-700" },
  { id: "bi", title: "Business Intelligence", verb: "Decide it", description: "Live dashboards and AI-generated insights that turn your data into decisions.", features: ["Live dashboards & automated reporting", "Data integration from all your tools", "AI-generated insights & forecasting", "Automated alerts, no data team required"], image: "/assets/images/data-analysis-visual.png", cta: "Let’s talk data", icon: ChartNoAxesCombined, tone: "bg-teal-50 text-teal-700" },
  { id: "predict", title: "Predictive AI", verb: "Predict it", description: "Machine learning that turns your historical data into forecasts for demand, revenue and risk, without building an in-house data science team.", features: ["Sales & demand forecasting", "Fraud & anomaly detection", "Customer segmentation", "Model monitoring & retraining"], cta: "Let’s talk AI", icon: BrainCircuit, tone: "bg-emerald-50 text-emerald-700", visual: "predict" },
  { id: "automate", title: "Intelligent Automation", verb: "Automate it", description: "Voice bots and WhatsApp chatbots that answer questions, qualify leads and book appointments around the clock, connected to the tools you already use.", features: ["AI voice bots for calls", "WhatsApp chatbots", "Appointment booking & follow-ups", "CRM, calendar & tool integrations"], cta: "Let’s talk automation", icon: Workflow, tone: "bg-sky-50 text-sky-700", visual: "automate" },
];
export const navigation = [{ label: "Services", href: "/#services" }, { label: "About us", href: "/#about" }, { label: "Our process", href: "/#process" }];
export const bookingUrl = "https://exzell-it.de/booking.html";
// Cookiebot consent manager (account from the original site).
export const cookiebotId = "df320ff6-4987-479d-b20e-52443b2865b1";
export const privacyUrl = "https://exzell-it.de/datenschutz.html";
// Backend for contact submissions and the AI news feed. It only allows browser requests from exzell-it.de, so this site calls it server-side.
export const apiBase = "https://dashboard.exzell-it.de";
// Public Cloudflare Turnstile site key; the secret key stays on the dashboard server.
export const turnstileSiteKey = "0x4AAAAAAFODmAohwCCmdM8-";
export const contactServices = [{ value: "web-development", label: "Web Development" }, { value: "it-wlan", label: "IT & WLAN" }, { value: "business-intelligence", label: "Business Intelligence" }, { value: "not-sure", label: "Not sure yet — need advice" }] as const;
// Service pages still live on the original site until they are migrated.
const originalSite = "https://exzell-it.de";
export const megaMenu = {
  services: [
    { title: "Web Development", description: "Sites & web apps", href: `${originalSite}/web-development.html` },
    { title: "UI/UX Design", description: "Brand & experience", href: `${originalSite}/ui-ux-design.html` },
    { title: "IT Consulting", description: "Support, recovery & procurement", href: `${originalSite}/wlan-design.html` },
    { title: "Business Intelligence", description: "See your business in real time", href: `${originalSite}/data-as-a-service.html` },
    { title: "Predictive AI", description: "Forecast what comes next", href: `${originalSite}/ml-as-a-service.html` },
    { title: "Intelligent Automation", description: "Automate repetitive work", href: `${originalSite}/ai-automation.html` },
  ],
  itServices: [
    { title: "Data Recovery", href: `${originalSite}/wlan-design.html#svc-data-recovery` },
    { title: "WiFi Survey", href: `${originalSite}/wlan-survey.html` },
    { title: "IT Field Service", href: `${originalSite}/wlan-design.html#svc-field-service` },
    { title: "B2B Procurement", href: `${originalSite}/wlan-design.html#svc-procurement` },
    { title: "Software Licensing", href: `${originalSite}/wlan-design.html#svc-licensing` },
    { title: "Email Archiving", href: `${originalSite}/wlan-design.html#svc-email-archiving` },
  ],
} as const;
// Top navigation. `section` ties an item to a homepage section for the active highlight; "services" is the mega menu.
export const headerNav = [
  { key: "home", label: "Home", href: "/" },
  { key: "about", label: "About us", href: "/#about", section: "about" },
  { key: "services", label: "Problems we solve", href: "/#services", section: "services" },
  { key: "resources", label: "Resources", href: `${originalSite}/resources.html` },
  { key: "career", label: "Career", href: `${originalSite}/career.html` },
  { key: "contact", label: "Contact us", href: "/#contact", section: "contact" },
] as const;
// The new site is English only for now; the German version is the original site, which defaults to German.
export const germanSiteUrl = `${originalSite}/`;
