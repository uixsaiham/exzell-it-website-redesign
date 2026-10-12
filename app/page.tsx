import { Hero, ProblemSection, ServicesSection, AboutSection, ProcessSection, ContactSection } from "@/components/sections/home";
import { AiNewsSection } from "@/components/sections/ai-news";
import { DifferenceSection, TestimonialsSection, InsightsSection } from "@/components/sections/home-content";
export default function Home() {
  return <main id="main"><Hero /><ProblemSection /><ServicesSection /><AboutSection /><ProcessSection /><DifferenceSection /><TestimonialsSection /><InsightsSection /><AiNewsSection /><ContactSection /></main>;
}
