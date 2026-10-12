"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { Cookie, X } from "lucide-react";
import { cookiebotId, privacyUrl } from "@/lib/site-data";
import { cn } from "@/lib/utils";

type CookiebotApi = { hasResponse: boolean; consent: { preferences: boolean; statistics: boolean; marketing: boolean }; submitCustomConsent: (preferences: boolean, statistics: boolean, marketing: boolean) => void };
declare global { interface Window { Cookiebot?: CookiebotApi } }

type Choices = { preferences: boolean; statistics: boolean; marketing: boolean };
const categories: { key: keyof Choices | "necessary"; title: string; text: string }[] = [
  { key: "necessary", title: "Necessary", text: "Required for the site to work, including security and spam protection on our forms. Always on." },
  { key: "preferences", title: "Preferences", text: "Remember choices you make, such as your language." },
  { key: "statistics", title: "Statistics", text: "Help us understand how visitors use the site so we can improve it." },
  { key: "marketing", title: "Marketing", text: "Used to measure campaigns and show relevant content on other platforms." },
];
export const openConsentEvent = "exzell:open-consent";
const cookiebot = () => (typeof window.Cookiebot?.submitCustomConsent === "function" ? window.Cookiebot : undefined);

// Branded interface for Cookiebot. Cookiebot still decides when consent is needed, stores and logs the choice, and its own dialog is hidden in CSS.
export function ConsentBanner() {
  const [open, setOpen] = useState(false);
  const [customize, setCustomize] = useState(false);
  const [choices, setChoices] = useState<Choices>({ preferences: false, statistics: false, marketing: false });

  useEffect(() => {
    const sync = () => {
      const api = cookiebot();
      if (!api) return false;
      setChoices({ preferences: api.consent.preferences, statistics: api.consent.statistics, marketing: api.consent.marketing });
      if (!api.hasResponse) setOpen(true);
      return true;
    };
    const reopen = () => { sync(); setCustomize(true); setOpen(true); };
    // The Cookiebot script loads after hydration and its load event can fire before this listener exists, so poll briefly for its API.
    let attempts = 0;
    const poll = window.setInterval(() => {
      attempts += 1;
      if (sync() || attempts >= 25) window.clearInterval(poll);
      // If Cookiebot never loads in development (blocked or offline), show the banner as a preview.
      if (attempts >= 25 && !cookiebot() && process.env.NODE_ENV === "development") setOpen(true);
    }, 400);
    window.addEventListener("CookiebotOnLoad", sync);
    window.addEventListener(openConsentEvent, reopen);
    return () => { window.clearInterval(poll); window.removeEventListener("CookiebotOnLoad", sync); window.removeEventListener(openConsentEvent, reopen); };
  }, []);

  function submit(next: Choices) {
    cookiebot()?.submitCustomConsent(next.preferences, next.statistics, next.marketing);
    setChoices(next);
    setOpen(false);
    setCustomize(false);
  }
  const all = (value: boolean) => submit({ preferences: value, statistics: value, marketing: value });

  return (
    <>
      <Script id="Cookiebot" src="https://consent.cookiebot.com/uc.js" data-cbid={cookiebotId} data-blockingmode="manual" strategy="afterInteractive" />
      {open && (
        <section role="dialog" aria-modal="false" aria-labelledby="consent-title" aria-describedby="consent-text" className="consent-banner">
          <div className="consent-head">
            <span className="consent-icon" aria-hidden="true"><Cookie size={20} strokeWidth={1.7} /></span>
            <div className="min-w-0 flex-1">
              <h2 id="consent-title">Your privacy, your choice</h2>
              <p id="consent-text">We use necessary cookies to run this site. With your permission, we’d also like to use cookies for preferences, statistics and marketing. Read our <a href={privacyUrl}>Privacy Policy</a>.</p>
            </div>
            {customize && <button type="button" className="consent-close" onClick={() => setCustomize(false)} aria-label="Back to summary"><X size={18} /></button>}
          </div>
          {customize && (
            <ul className="consent-list">
              {categories.map(category => {
                const locked = category.key === "necessary";
                const checked = locked || choices[category.key as keyof Choices];
                const id = `consent-${category.key}`;
                return (
                  <li key={category.key}>
                    <div><p id={`${id}-label`} className="consent-category">{category.title}</p><p id={`${id}-text`}>{category.text}</p></div>
                    <button type="button" role="switch" aria-checked={checked} aria-labelledby={`${id}-label`} aria-describedby={`${id}-text`} disabled={locked} className={cn("consent-switch", checked && "is-on")} onClick={() => !locked && setChoices(current => ({ ...current, [category.key]: !checked }))}><span /></button>
                  </li>
                );
              })}
            </ul>
          )}
          <div className="consent-actions">
            <button type="button" className="consent-btn consent-btn-outline" onClick={() => all(false)}>Reject all</button>
            {customize ? <button type="button" className="consent-btn consent-btn-outline" onClick={() => submit(choices)}>Save selection</button> : <button type="button" className="consent-btn consent-btn-ghost" onClick={() => setCustomize(true)}>Customize</button>}
            <button type="button" className="consent-btn consent-btn-dark" onClick={() => all(true)}>Accept all</button>
          </div>
        </section>
      )}
    </>
  );
}
