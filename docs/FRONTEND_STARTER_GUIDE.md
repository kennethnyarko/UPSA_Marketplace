# Frontend structure guide

**Current status: locations only. No page designs or behavior are implemented.**

- Put future page markup in `src/pages/`, grouped by area.
- Put reusable page pieces in `src/components/`.
- Put future CSS in `src/styles/`; centralize design tokens in `tokens.css`.
- Put browser-side Firebase client modules in `src/services/` after architecture/setup is approved.
- Put static assets in `public/assets/` and `public/favicon/`.

The project direction is plain semantic HTML, CSS and browser JavaScript modules. No React, Vue, Angular, Next.js, TypeScript, bundler, or frontend framework is included. The foundation now has a static copy script that places the scaffold beneath ignored `dist/`, which is the Firebase Hosting root. This is local-serving infrastructure only; it does not add Firebase calls, marketplace behavior, or finished visual styling.

Every HTML file under `src/pages/` is a one-comment placeholder. Service, CSS, state, config, and utility modules are comments only. Consult `PAGE_MAP.md` for intended page purpose and `IMPLEMENTATION_STATUS.md` for actual status.
