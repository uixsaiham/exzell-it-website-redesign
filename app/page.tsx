import { Hero, ServicesSection, AboutSection, ProcessSection, ContactSection } from "@/components/sections/home";
import { DifferenceSection, TestimonialsSection, InsightsSection } from "@/components/sections/home-content";
export default function Home() {
  return <main id="main"><Hero /><ServicesSection /><AboutSection /><ProcessSection /><DifferenceSection /><TestimonialsSection /><InsightsSection /><ContactSection /></main>;
}
