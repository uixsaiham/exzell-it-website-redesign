# exzell-it-website-redesign

Next.js App Router, TypeScript and Tailwind CSS v4 foundation.

Run npm install, then npm run dev. Open http://localhost:3000 for the starter homepage and http://localhost:3000/design-system for the component gallery.

Validation: npm run lint, npm run typecheck, npm run build. Production: npm start.

GitHub Pages: npm run deploy:pages builds a static export (GITHUB_PAGES=true) and commits it to the gh-pages branch, served at https://uixsaiham.github.io/exzell-it-website-redesign/. The contact API route is not part of that build.

- app/: routes and shared theme tokens
- components/ui/: reusable controls and layout primitives
- components/layout/: shared navigation and footer
- components/sections/: homepage compositions
- lib/site-data.ts: shared service content
- public/assets/images/: original imagery
- docs/design-guidelines.md: design rules and component contracts

The original static site (index.html and assets/) was removed in favour of this app; it is still available in git history before this commit. This foundation does not yet migrate every original section or backend integration. See the design guidelines for scope.

Setup follows the official Next.js installation guide (https://nextjs.org/docs/app/getting-started/installation) and Tailwind Next.js guide (https://tailwindcss.com/docs/installation/framework-guides/nextjs).
