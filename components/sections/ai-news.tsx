import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/primitives";
import { Eyebrow } from "@/components/sections/home";
import { apiBase } from "@/lib/site-data";

type NewsItem = { title: string; desc: string; pubDate: string; link: string; source: string };

function isNewsItem(value: unknown): value is NewsItem {
  if (typeof value !== "object" || value === null) return false;
  const item = value as Record<string, unknown>;
  return typeof item.title === "string" && typeof item.link === "string" && /^https?:\/\//.test(item.link) && typeof item.source === "string";
}

// Cached on the server and refreshed every 30 minutes. The dashboard API rejects browser requests from other origins.
async function getNews(): Promise<NewsItem[]> {
  try {
    const response = await fetch(`${apiBase}/api/news`, { next: { revalidate: 1800 }, signal: AbortSignal.timeout(10000) });
    if (!response.ok) return [];
    const data: unknown = await response.json();
    const items = typeof data === "object" && data !== null && Array.isArray((data as { items?: unknown }).items) ? (data as { items: unknown[] }).items : [];
    return items.filter(isNewsItem).slice(0, 6).map(item => ({ ...item, desc: typeof item.desc === "string" ? item.desc : "", pubDate: typeof item.pubDate === "string" ? item.pubDate : "" }));
  } catch {
    return [];
  }
}

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : { label: date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Europe/Berlin" }), iso: date.toISOString() };
}

export async function AiNewsSection() {
  const news = await getNews();
  // The feed is supplementary. If it is unavailable, the section is left out rather than shown empty.
  if (!news.length) return null;
  return (
    <section id="ai-news" className="section-space bg-[#f7f8f5]">
      <Container>
        <div className="section-intro"><div><Eyebrow>08 / LATEST IN AI</Eyebrow><h2 className="display-heading">What’s moving in AI.<br /><span className="text-muted">Curated for you.</span></h2></div><p className="section-description">Fresh updates from leading AI labs and publications, collected automatically. External articles open in a new tab.</p></div>
        <ul className="news-grid">
          {news.map(item => {
            const date = formatDate(item.pubDate);
            return (
              <li key={item.link} className="news-card group">
                <div className="news-meta"><span>{item.source}</span>{date && <time dateTime={date.iso}>{date.label}</time>}</div>
                <h3><a href={item.link} target="_blank" rel="noopener noreferrer" className="news-link">{item.title}<span className="sr-only"> (opens in a new tab)</span></a></h3>
                {item.desc && <p>{item.desc}</p>}
                <span className="news-read" aria-hidden="true">Read full article <ArrowUpRight size={15} /></span>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
