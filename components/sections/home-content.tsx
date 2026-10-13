import { ArrowUpRight, ArrowRight, Zap, BadgeCheck, Eye, Target, Handshake, TrendingUp, Quote, MessageCircle, AudioLines, Sparkles, Bot, PanelsTopLeft, ChartNoAxesCombined, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/primitives";
import { Eyebrow } from "@/components/sections/home";

const benefits = [
  { title: "Fast turnaround", text: "We deliver iterations quickly so you can get market feedback faster.", icon: Zap },
  { title: "Cost-effective solutions", text: "Clean, upfront costs that align with your business needs. No surprises.", icon: BadgeCheck },
  { title: "Transparency", text: "Consistent communication, timely updates, and progress reports you can rely on.", icon: Eye },
  { title: "Attentiveness", text: "A dedicated, focused team that treats your product like our own.", icon: Target },
  { title: "Keeping commitments", text: "Your success is our success. We deliver what we promise.", icon: Handshake },
  { title: "Business impact", text: "Tech expertise with a strong business mindset to drive real results.", icon: TrendingUp },
];

export function DifferenceSection() {
  return <section className="section-space bg-[#f7f8f5]"><Container><div className="section-intro"><div><Eyebrow>05 / THE EXZELL DIFFERENCE</Eyebrow><h2 className="display-heading">Good at technology.<br /><span className="text-muted">Great to work with.</span></h2></div><p className="section-description">The right solution matters. So does the team behind it. Here’s what you can expect from us.</p></div><div className="benefit-grid">{benefits.map((benefit, i) => <article key={benefit.title} className={`benefit-card ${i === 0 ? "benefit-featured" : ""}`}><div className="benefit-top"><benefit.icon size={25} strokeWidth={1.5} /><span>0{i + 1}</span></div><h3>{benefit.title}</h3><p>{benefit.text}</p></article>)}</div></Container></section>;
}

const reviews = [
  { name: "Marcos Stach", initials: "MS", title: "Fast & straightforward", quote: "Simple and hassle-free setup. Great work, completed quickly and professionally." },
  { name: "Störber", initials: "ST", title: "Very satisfied", quote: "Everything went smoothly — we are very satisfied with the quality of work delivered." },
  { name: "J. Speyrer", initials: "JS", title: "Independent & reliable", quote: "Setup worked perfectly — handled independently and completed in no time without any extra support needed." },
  { name: "Leon Aschkar", initials: "LA", title: "Great collaboration", quote: "Very attentive and calm. A pleasure to work with. Everything was completed to our fullest satisfaction. Keep it up!" },
];

export function TestimonialsSection() {
  return <section id="testimonials" className="section-space"><Container><div className="section-intro"><div><Eyebrow>06 / WORDS FROM OUR CLIENTS</Eyebrow><h2 className="display-heading">Real people.<br />Lasting partnerships.</h2></div><p className="section-description">Our customers value our work. Here are some of their experiences with Exzell IT.</p></div><div className="review-grid">{reviews.map(review => <figure key={review.name} className="review-card"><Quote size={28} strokeWidth={1.3} className="text-brand-strong" aria-hidden="true" /><h3>{review.title}</h3><blockquote>{review.quote}</blockquote><figcaption><span className="review-avatar">{review.initials}</span><span><strong>{review.name}</strong><span>Exzell IT client</span></span></figcaption></figure>)}</div></Container></section>;
}

type Article = { category: string; title: string; description: string; href?: string; icon: LucideIcon; visual: string };

const featuredArticles: Article[] = [
  { category: "AUTOMATION / 5 MIN READ", title: "Your Business Now Has a WhatsApp Assistant That Never Sleeps", description: "We turned WhatsApp into a fully automated customer service and booking machine that responds instantly, 24/7.", href: "https://exzell-it.de/blog-whatsapp-assistant.html", icon: MessageCircle, visual: "article-messaging" },
  { category: "AI & VOICE / 5 MIN READ", title: "We Built an AI That Answers Calls in Any Language", description: "What if your phone never needed a receptionist again? Here’s the system we built to make that a reality.", href: "https://exzell-it.de/blog-ai-voice-agent.html", icon: AudioLines, visual: "article-voice" },
];

const moreArticles: Article[] = [
  { category: "AI / 7 MIN READ", title: "The AI Revolution: How Intelligent Apps Are Reshaping Industries", description: "Explore how custom AI applications are driving efficiency, enhancing user experiences, and opening new streams across various sectors.", icon: Bot, visual: "article-ai" },
  { category: "WEB DEVELOPMENT / 5 MIN READ", title: "From Design to Results: Building Web Experiences That Convert", description: "Dive into our strategies for crafting high-performance websites that not only look stunning but are engineered to convert.", icon: PanelsTopLeft, visual: "article-web" },
  { category: "ANALYTICS / 6 MIN READ", title: "Unlocking Value: The Power of Analytics in Strategic Decision Making", description: "Learn how harnessing your business data helps you predict market trends.", icon: ChartNoAxesCombined, visual: "article-data" },
];

function ArticleCard({ article, compact }: { article: Article; compact?: boolean }) {
  const art = <div className={`article-art ${article.visual}`}><div className="article-orbit" /><div className="article-app-icon"><article.icon size={compact ? 40 : 58} strokeWidth={1.2} /></div><span className="article-mini-label"><Sparkles size={13} />BUILT BY EXZELL IT</span>{article.href && <span className="article-arrow"><ArrowUpRight size={22} /></span>}</div>;
  return <article className={`article-card-modern group ${compact ? "article-compact" : ""}`}>{article.href ? <a href={article.href} className="article-visual-link" aria-label={`Read: ${article.title}`}>{art}</a> : art}<div className={compact ? "py-5" : "py-6"}><p className="text-[11px] font-bold tracking-widest text-brand-strong">{article.category}</p><h3 className={`mt-3 font-bold leading-snug tracking-tight text-ink ${compact ? "text-lg" : "text-2xl"}`}>{article.href ? <a href={article.href} className="hover:text-brand-strong">{article.title}</a> : article.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted">{article.description}</p>{article.href ? <a href={article.href} className="mt-5 inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-ink">Read the story <ArrowRight size={16} /></a> : <span className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-muted">Coming soon</span>}</div></article>;
}

export function InsightsSection() {
  return <section id="insights" className="section-space border-t border-line"><Container><div className="section-intro"><div><Eyebrow>07 / IDEAS & INSIGHTS</Eyebrow><h2 className="display-heading">A little perspective.<br /><span className="text-muted">A lot of possibility.</span></h2></div><span className="section-description">What we’re building, what we’re learning, and what it means for your business.</span></div><div className="grid gap-8 md:grid-cols-2">{featuredArticles.map(article => <ArticleCard key={article.title} article={article} />)}</div><div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{moreArticles.map(article => <ArticleCard key={article.title} article={article} compact />)}</div></Container></section>;
}
