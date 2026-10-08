# Student developer guide

This guide is for two IT students learning while building the project. The current repository is a file/folder skeleton only: it has no package manifest, runnable app, Firebase project, emulator setup, or test command.

## What goes where

- HTML pages: `src/pages/`.
- Shared UI: `src/components/`.
- CSS/design tokens: `src/styles/`.
- Browser-side Firebase client modules: `src/services/` (future; untrusted client).
- Trusted backend operations: `functions/src/` (future).
- Firebase config and Rules: `firebase/` (currently placeholders).
- Test folders: `tests/` and `functions/tests/` (currently empty).
- Project explanations: `docs/`.

## Concepts to learn

Authentication confirms identity; authorization decides access. Client validation helps users but cannot protect data. Firestore and Storage Rules will guard direct client access. Cloud Functions are trusted server-side operations; Admin SDK bypasses Rules, so Functions must make their own permission checks. Public and private records must be separated. Emulator development must use synthetic data and be explicitly isolated from staging/production.

## Safe development habits

- Do not commit credentials, service account keys, secrets, student data, or ID images.
- Do not use real student information until required approval is obtained.
- Do not bypass Rules to make a feature work or trust frontend role values.
- Do not connect local development to production.
- Do not say implemented or tested because a file exists; record actual evidence.

## Git collaboration

Use one branch per small task, make focused commits, open a pull request, and have the other student review it before merging to `main`. Revert a faulty change with a reviewed Git revert rather than deleting shared history. The repository currently has no GitHub remote or commits; the project owner must create/connect the team repository externally. See `CONTRIBUTING.md`.

Before implementing, the team must decide the client source/Hosting arrangement and configure local emulators. Do not try `npm install`, `npm run`, Firebase deploy or emulator commands yet; no project scripts/configuration currently exist.
