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
Body stack: Manrope (via next/font/google, self-hosted at build time, Latin and Latin Extended subsets for German characters), then Arial, Helvetica, sans-serif. Tokens: --font-sans for body, --font-heading (Zalando Sans) for titles. Add licensed WOFF2 files with next/font/local when available.
- Hero: 36/48/60px at base/sm/lg, weight 800, line height 1.12, tight tracking.
- Section heading: 30/36px at base/sm, weight 800.
- Card title: 20px, weight 700.
- Body: 16px, line height 1.6; lead copy: 18px.
- Supporting copy: 14px; eyebrow: 12px, uppercase, 0.14em tracking.
One h1 per page, h2 for sections, h3 for cards. Keep long text around 65 characters per line.

## Layout
Container: 1240px max, 20px mobile and 28px larger gutters. Use a 4px spacing rhythm: 4, 8, 12, 16, 24, 32, 40, 48, 64, 96. Cards: 24px padding and gap. Sections: 64px mobile, 96px larger.
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

Problem section (October 2026): restores the original “The problem” content as section 01, between the hero and services. Four bordered columns (2 at tablet, 1 on small phones) each name a pain point and link to the service that solves it. Later homepage eyebrows were renumbered 02–07.

Homepage completion (October 2026):
- Services list the original feature bullets (lib/site-data.ts `features`) as a two-column checklist, replacing the short tags.
- AI news (section 08, components/sections/ai-news.tsx) is a server component. It fetches `/api/news` from the dashboard API and caches it for 30 minutes, so the homepage is regenerated at most every 30 minutes. If the feed fails or is empty, the section is left out. External links open in a new tab and say so to screen readers.
- Contact form (components/sections/contact-form.tsx) posts to the local route app/api/contact/route.ts. That route validates the input and forwards it to the dashboard `/api/contact`. It includes the honeypot, render time and Cloudflare Turnstile token. A success message appears only when the dashboard returns `{ ok: true }`. Otherwise an inline alert offers email as a fallback.
- The dashboard API only allows browser requests from https://exzell-it.de (CORS), which is why both integrations run on the server.
- SelectField joins the shared form controls.

Hero redesign (October 2026), after the Atlas Design reference:
- Full-height hero in brand greens with a soft diagonal dark streak (CSS gradients, blurred). Thin vertical lines mark the container edges.
- The header is transparent with white links over the hero on the homepage. It turns solid white after 24px of scroll or when the mobile menu is open.
- Top left: a shorter h1 (weight 500, 30–44px; this replaces the earlier 800-weight treatment), a divider, the accent pill call-to-action with a separate arrow circle, and an avatar stack of the four real reviewers linking to #testimonials. No star ratings or review counts are shown.
- Top right: a service showcase card (components/sections/hero-showcase.tsx). Previous and next buttons cycle through the three services, and the card links to #services.
- Bottom: a decorative “Exzell IT” wordmark sized with container query units to fill the content width and aligned to its left edge (aria-hidden), then a row of services joined by connector lines.
- The orbit and node visual from the previous hero was removed.

Cookie consent (October 2026): components/layout/consent-banner.tsx is a branded interface for the original Cookiebot account (cbid in lib/site-data.ts). Cookiebot still decides when consent is needed and stores and logs each choice through `Cookiebot.submitCustomConsent`. Its own dialog is hidden in globals.css.
- A floating card at bottom left (a bottom sheet on small phones), non-modal so the page stays usable. “Reject all” and “Accept all” are equally prominent. “Customize” shows the Necessary (locked), Preferences, Statistics and Marketing switches with “Save selection”.
- The footer's “Cookie settings” button reopens it with the current choices.
- Cookiebot only stores and logs consent on domains registered in the Cookiebot dashboard. Add the new production domain there before launch. On localhost the choice applies for the page session only.

Logo (October 2026): public/assets/images/logo.svg (183×29, horizontal mark) replaces logo.png in the header and footer. Header: 28px tall on mobile and 32px from sm, vertically centred in the 85px bar. It renders solid white (CSS brightness-0 invert) while the header is transparent over the hero, and in full colour on the white header. Footer: 36px tall, full colour on the dark background.

Services mega menu (October 2026): components/layout/mega-menu.tsx, with data in lib/site-data.ts (`megaMenu`). It replaces the plain “Services” header link on md and up.
- Three columns: all six services as equal items in a two-column grid (Web Development, UI/UX Design, IT Consulting, Business Intelligence, Predictive AI, Intelligent Automation; icon tile, title and description, with an arrow that appears on hover), “IT consulting covers” (six specialist links), and a dark “Not sure where to start?” card with the booking call-to-action and a link to #services. At tablet width the dark card spans the full width as a horizontal strip.
- The panel spans the full width under the sticky header, and the header turns solid white while it is open. It opens on mouse hover (80ms delay, 180ms close delay) or click. Escape closes it and returns focus to the trigger, as do an outside click or focus leaving the menu. The trigger exposes aria-expanded and aria-controls.
- Mobile: a native details/summary “Services” group at the top of the mobile navigation.
- Service links point to the pages on exzell-it.de until those pages are migrated.

Service cards, sticky stacking (October 2026): the three “What we do” rows are white 28px-radius cards. They use plain CSS position: sticky, with no scroll JavaScript. Card i pins at top: 96px + i × 96px with z-index 10 + i (from a --i custom property set in home.tsx), with 40px between cards, so each card slides over the previous one and leaves its top 96px visible. Stacking only applies from 768px wide and 760px tall. On smaller screens a pinned card would hide its own lower content, so cards scroll normally there. Where the browser supports scroll-driven animations (animation-timeline: view()) and reduced motion is off, each card fades and scales in (opacity .35 → 1, translateY 48px → 0, scale .94 → 1) as it enters. Browsers without support show static cards.

Six service cards (October 2026): “What we do” now lists all six services from the mega menu, in menu order: Web Development, UI/UX Design, IT & WLAN, Business Intelligence, Predictive AI, Intelligent Automation. Data is in lib/site-data.ts (typed `Service`, with a `cta` label per service). Predictive AI and Intelligent Automation copy is adapted from the original site's ML and AI automation pages. The UI/UX Design copy is new and makes no claims. The three newer services have no photography, so they use coded SVG illustrations (components/sections/service-visuals.tsx: a wireframe with a style panel, a demand forecast chart, and a chat-to-workflow automation) in the same dark green style. The hero showcase cycles through all six services (01–06), using the photo where there is one and the coded illustration otherwise. With six cards, the stacking step is 40px instead of 96px (the last card pins at 296px), and stacking needs a viewport at least 740px tall. The rise animation moves and scales only, with no fade, so a card never shows the one beneath through it.

Heading weight (October 2026): every title now uses weight 700. That covers display headings, the hero h1, service, process, benefit, review, article, news, problem and contact titles, the mega menu and consent titles. The hero wordmark stays at 800. Large heading letter-spacing eased slightly to suit the heavier weight: display -.045em, contact -.055em, service titles -.04em. This supersedes the earlier weight 500 notes.

Top navigation (October 2026), replacing the earlier uppercase links: data is in lib/site-data.ts (`headerNav`, `germanSiteUrl`).
- Logo on the left. In the centre, a pill-shaped bar with Home, About us, Problems we solve (the mega menu), Resources, Career and Contact us; items are 14px medium in sentence case, 44px tall. On the right, the language menu and a “Book a call” button with a calendar icon.
- Active item: a white pill. On the homepage, scroll position decides it: the section crossing 40% of the viewport (about, services, contact), with Contact chosen at the page end and Home near the top.
- Over the hero, the bar is translucent white glass with white text and the active pill stays solid white. Book a call switches to lime (accent with ink text); on the white header it is brand-strong green.
- Language: “EN” opens a small menu with English (this site, current) and Deutsch, which links to the original German site. No fake toggle.
- Resources and Career link to the original site's pages.
- Full bar from xl (1280px). Below that, a hamburger opens a list of the same items, with Problems we solve as a collapsible group, an EN/DE row and a full-width Book a call button.

Footer (October 2026), in components/layout/site-shell.tsx: dark ink background with soft green glows.
- Top row: brand (logo, tagline, “Your technology partner in Germany” badge); Services (all six, from megaMenu); Company (About us, Our process, Insights, Resources, Career); and a contact card (“Have a project in mind?”, email, phone, lime “Book a free discovery call”). Link arrows slide in on hover and focus.
- A decorative “Exzell IT” wordmark (aria-hidden), faded white gradient text sized with container query units to fill the content width.
- Bottom bar: © year Exzell IT UG (haftungsbeschränkt), the legal name from the original site; Imprint, Privacy, Cookie settings, Design system; and a Back to top button that respects reduced motion.
- No social icons: the original links had no destinations. Add them only with real profile URLs.
- Layout: 2 columns below 1024px, with the contact card beside the brand; on phones the brand and contact card span the full width.
