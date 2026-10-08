# Student developer guide

This guide supports two IT students working in small reviewed steps. The application remains a plain HTML/CSS/browser-JavaScript project with Firebase; there is no frontend framework.

## Required software

- Node.js 22 and npm for project scripts and the Functions runtime.
- Java JDK 11 or later for the Firestore Emulator (Java 17 is the team choice).
- Git and a current browser.
- The Firebase CLI is a project-local dependency; use `npm run ...` scripts rather than a global CLI.

Official version/setup sources are linked in `LOCAL_DEVELOPMENT.md`. This Mac currently has Node.js 24.21.0/npm 11.19.0; Java is absent. Install Java manually before starting all emulators.

## First local run

From the repository root:

```sh
npm ci
npm run build
npm run serve
```

`serve` runs the Hosting Emulator preview at `http://127.0.0.1:5005/`. For the full local backend environment, run `npm run emulators`; it starts Auth, Firestore, Storage, Functions, Hosting, and Emulator UI at the ports in `LOCAL_DEVELOPMENT.md`. Stop with Ctrl+C. A new emulator process starts with fresh in-memory data. Use fake data only.

## Where things go

- Source HTML: `src/pages/`.
- Source CSS: `src/styles/`.
- Browser modules: `src/services/`, `src/config/`, `src/state/`, and `src/utils/`.
- Shared UI components: `src/components/`.
- Static images/icons/favicon: `public/assets/` and `public/favicon/`.
- Generated Hosting output: ignored `dist/`, created by `npm run build`; do not edit it manually.
- Trusted backend source: `functions/src/`.
- Firebase CLI config: root `firebase.json`; Rules/index definitions: `firebase/`.
- Tests: `tests/`; Functions tests: `functions/tests/`.
- Guides/evidence: `docs/`.

The build copies source folders into `dist/` without a framework or bundler. All app paths should be root-relative in the served site (`/pages/...`, `/styles/...`, `/services/...`, `/assets/...`). The landing placeholder is copied to `dist/index.html`.

## Firebase and trust boundaries

Authentication establishes a UID; authorization decides what that UID can access. Browser validation and role values are not trusted. Future browser SDK setup belongs in `src/config/` and, in local mode, must use the Auth `9099`, Firestore `8080`, Storage `9199`, and Functions `5001` emulator endpoints. No client Firebase connection is present yet.

Firestore and Storage Rules protect direct client access. Current Rules deny everything and are not feature policies. Cloud Functions are the trusted location for privileged workflows. The Admin SDK bypasses Rules, so every Function must verify its caller and permissions itself. Custom Claims are assigned only through a trusted owner-controlled process.

## Safe work and Git

- Never commit credentials, service-account keys, private keys, student data, or ID images.
- Never connect local work to production or use real IDs before required approval.
- Never bypass Rules or trust a frontend admin flag.
- Keep work small, use feature/fix/security branches, and open a PR for peer review before merging to `main`.
- Record actual commands/results in `TEST_REGISTER.md`; a placeholder file is not evidence.

The repository is already connected to `origin` at `git@github.com:kennethnyarko/UPSA_Marketplace.git`. `main` tracks `origin/main`. Confirm both IT students have repository access before team work begins.
