import { Code2, Network, ChartNoAxesCombined } from "lucide-react";
export const services = [
  { id: "web", title: "Web Development", verb: "Build it", description: "Custom websites and web apps — fast, responsive and built to convert visitors into clients.", image: "/assets/images/webdev-visual.png", icon: Code2, tone: "bg-blue-50 text-blue-700" },
  { id: "it", title: "IT & WLAN", verb: "Connect it", description: "Stable networks and complete IT setup so your business runs without interruption.", image: "/assets/images/wlan-visual.png", icon: Network, tone: "bg-amber-50 text-amber-700" },
  { id: "bi", title: "Business Intelligence", verb: "Decide it", description: "Live dashboards and AI-generated insights that turn your data into decisions.", image: "/assets/images/data-analysis-visual.png", icon: ChartNoAxesCombined, tone: "bg-teal-50 text-teal-700" },
] as const;
export const navigation = [{ label: "Services", href: "/#services" }, { label: "About us", href: "/#about" }, { label: "Our process", href: "/#process" }];
export const bookingUrl = "https://exzell-it.de/booking.html";
