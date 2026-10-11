# exzell-it-website-redesign

Next.js App Router, TypeScript and Tailwind CSS v4 foundation.

Run npm install, then npm run dev. Open http://localhost:3000 for the starter homepage and http://localhost:3000/design-system for the component gallery.

Validation: npm run lint, npm run typecheck, npm run build. Production: npm start.

- app/: routes and shared theme tokens
- components/ui/: reusable controls and layout primitives
- components/layout/: shared navigation and footer
- components/sections/: homepage compositions
- lib/site-data.ts: shared service content
- public/assets/images/: original imagery
- docs/design-guidelines.md: design rules and component contracts

Original index.html and assets/ remain as migration references. This foundation does not yet migrate every original section or backend integration. See the design guidelines for scope.

Setup follows the official Next.js installation guide (https://nextjs.org/docs/app/getting-started/installation) and Tailwind Next.js guide (https://tailwindcss.com/docs/installation/framework-guides/nextjs).
