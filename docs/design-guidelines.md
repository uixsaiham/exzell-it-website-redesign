# Exzell IT design guidelines

## Direction
Clear, capable, approachable. Preserve the original green/navy identity and imagery. Explain business outcomes before technical details. English is the starting locale; add translations as structured content when localization is implemented.

## Color tokens
Source of truth: app/globals.css via Tailwind v4 @theme. Use semantic utilities instead of repeated hex values.

| Token | Value | Use |
| --- | --- | --- |
| brand | #4CAF50 | Decorative accent; icons on dark backgrounds |
| brand-strong | #287C2C | Primary buttons with white text; links on light backgrounds |
| brand-soft | #EBF5EC | Badges and soft panels |
| ink | #0B1B2B | Headings, dark sections |
| body | #111827 | Body text |
| muted | #596579 | Supporting text on light backgrounds |
| line | #E5E7EB | Borders |
| surface | #F9FAFB | Alternate backgrounds |
| canvas | #FFFFFF | Base background |
| danger | #B42318 | Validation errors |

The original green is retained as an accent. Use brand-strong for small green text and white-label actions to improve contrast. Never rely on color alone for state.

## Typography
Stack: Inter, Arial, Helvetica, sans-serif. Inter is not bundled yet; fallback fonts render without a network request. Add licensed WOFF2 files with next/font/local when available.
- Hero: 36/48/60px at base/sm/lg, weight 800, line height 1.12, tight tracking.
- Section heading: 30/36px at base/sm, weight 800.
- Card title: 20px, weight 700.
- Body: 16px, line height 1.6; lead copy: 18px.
- Supporting copy: 14px; eyebrow: 12px, uppercase, 0.14em tracking.
One h1 per page, h2 for sections, h3 for cards. Keep long text around 65 characters per line.

## Layout
Container: 1200px max, 20px mobile and 28px larger gutters. Use a 4px spacing rhythm: 4, 8, 12, 16, 24, 32, 40, 48, 64, 96. Cards: 24px padding and gap. Sections: 64px mobile, 96px larger.
Default Tailwind breakpoints: sm 640px, md 768px, lg 1024px, xl 1280px. Start with one column. Service cards use three columns from md; hero splits at lg. Check 320px and 200% zoom; avoid fixed content heights.
Cards: 12px radius; feature panels: 20px; buttons and badges: pill. Use shadow-card for ordinary surfaces, shadow-lift sparingly. Borders provide most separation. Color transitions last 200ms; respect reduced motion.

## Components
- Button: native button with default type=button. Variants: primary, dark, outline, light. Sizes: sm/md/lg, minimum heights 44/48/56px. Native disabled state. Use submit only inside a working form.
- ButtonLink: navigation with the same styling and a real href. Never nest interactive controls.
- Container: page alignment. Card: neutral surface with semantic headings supplied by the consumer.
- Badge: short noninteractive category label.
- SectionHeading: eyebrow, title, description and optional centered alignment.
- InputField/TextareaField: unique id, visible label, hint or error linked through aria-describedby, native required/disabled support. Show validation errors when relevant and add form-level error handling for real submissions.
- SiteHeader/SiteFooter: shared shell. Mobile menu exposes its expanded state. Keep future widgets in small client components.
Review examples at /design-system. Homepage compositions live in components/sections; shared content is in lib/site-data.ts.

## Images and icons
Reuse public/assets/images. Use next/image with meaningful alt text, responsive sizes and dimensions or an aspect-ratio wrapper. Decorative images get empty alt text. Use Lucide icons at 16–24px with consistent default strokes. Icon-only buttons need names; decorative icons beside text do not need independent labels. Video uses visible controls and no autoplay; add captions and transcripts if spoken content is introduced.

## Accessibility and writing
Target WCAG AA: 4.5:1 regular text, 3:1 large text. Verify actual color pairs for new uses. Preserve focus outlines, skip link and logical keyboard order. Interactive targets are at least 44px. Test reduced motion, mobile navigation, keyboard interaction and zoom before release.
Use clear labels such as “Book a free discovery call”. Avoid “Click here”, unverified metrics and invented testimonials.

## Workflow and migration scope
Change theme tokens first, component variants second, page compositions third. Add gallery examples for new states. Run npm run lint, npm run typecheck and npm run build; then review desktop/mobile visually and with a keyboard.
This is the component foundation and starter homepage. Original root HTML/CSS/JS remain reference material and are not executed by Next.js. Booking/legal links use the original website. News API, contact submission, anti-spam, consent management, localization, articles and testimonials still need migration and validation. Do not show fake submission success.

## Homepage visual direction — October 2026
References supplied for this iteration: Revento, Platform, Agencux, Portfolio B and Atlas Design. Reference URLs: https://revento.framer.website/, https://plat-form.framer.ai/, https://agencux.framer.website/, https://portfoliob.framer.website/, https://atlasdesign.framer.ai/. Portfolio B could not be loaded by the browsing tool. These are design references; Exzell content and imagery remain the project assets.

The homepage extends the foundation with an editorial agency treatment:
- Accent token: #B9ED91, used with dark ink for hero and contact actions. Paper token: #F7F8F5, for warm alternate surfaces.
- Large display typography: weight 500, tight tracking (-0.055em), line-height 1.04–1.08. Hero 44–72px, section headings 36–57px. This replaces the earlier bold-only homepage heading treatment; standard UI headings can still use heavier weights.
- Numbered eyebrows, generous section rhythm, service rows with original imagery, soft bento cards, dark journey section and green contact panel.
- Hero service nodes use CSS gradients, borders and Lucide icons. Their labels describe services, not live performance data.
- Intro and floating-node motion are subtle and disabled by prefers-reduced-motion. Hover states complement keyboard focus.
- Homepage actions use gently rounded 10px corners while shared UI controls retain their default pill shape. Feature imagery uses 16–18px corners.
- Original differentiator descriptions, customer quotes and the two linked AI articles are restored. Article links go to the original site. No new ratings or client claims were created.

Implementation: components/sections/home.tsx contains the core sections and shared Eyebrow; components/sections/home-content.tsx contains differentiators, reviews and insights. Homepage CSS is grouped after the core theme in app/globals.css. The original news feed and contact submission integrations remain outside this visual iteration.

Main hero title font: Zalando Sans, self-hosted through next/font/local from app/fonts/zalando-sans-variable.ttf. Use weight 800 for the main hero title at the standard width; other homepage headings retain their existing weights. The shared heading token (--font-heading / font-heading) applies this font to the hero, homepage section titles, service and process titles, benefit and review titles, article titles and contact heading. Body text and navigation retain their current font stack. Font source: https://github.com/google/fonts/tree/main/ofl/zalandosans; license retained in app/fonts/OFL.txt.
