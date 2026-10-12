import type { Metadata } from "next";
import localFont from "next/font/local";
import { Manrope } from "next/font/google";
import "./globals.css";
import { SiteHeader, SiteFooter } from "@/components/layout/site-shell";
import { ConsentBanner } from "@/components/layout/consent-banner";
const zalandoSans = localFont({ src: "./fonts/zalando-sans-variable.ttf", variable: "--font-zalando-sans", weight: "200 900", style: "normal", display: "swap" });
// Body font: Manrope, downloaded at build time and served from this site (no request to Google from the browser).
const manrope = Manrope({ subsets: ["latin", "latin-ext"], variable: "--font-manrope", display: "swap" });
export const metadata: Metadata = { title: { default: "Exzell IT | Your technology partner", template: "%s | Exzell IT" }, description: "Web development, IT consulting and Business Intelligence. One partner for your business, from start to scale." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${zalandoSans.variable} ${manrope.variable}`}><body><a href="#main" className="sr-only fixed left-4 top-4 z-50 rounded-full bg-ink px-5 py-3 text-white focus:not-sr-only">Skip to content</a><SiteHeader />{children}<SiteFooter /><ConsentBanner /></body></html>;
}
