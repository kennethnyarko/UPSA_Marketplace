# Project structure

The repository separates editable browser source, generated static output, trusted Functions, Firebase Rules/configuration, tests, and documentation.

```text
.
├── firebase.json             # Firebase CLI configuration at repository root
├── package.json / package-lock.json # Reproducible project scripts and local tooling
├── scripts/build-static.mjs  # Copies source/assets into ignored dist/; no bundler
├── scripts/test-rules.mjs    # Refuses to run an empty Rules test suite
├── src/                      # Editable browser source
│   ├── pages/                # HTML grouped by user journey
│   ├── components/           # Future reusable UI pieces
│   ├── styles/               # Future CSS and design tokens
│   ├── services/             # Future browser Firebase client services
│   ├── config/               # Future client environment/config
│   ├── state/
│   └── utils/
├── public/                   # Source static assets and favicon only
├── dist/                     # Generated Hosting site; ignored by Git
├── functions/                # Cloud Functions package and trusted source locations
├── firebase/                 # Firestore/Storage Rules and Firestore indexes
├── tests/                    # Unit, integration, security, e2e, and fixture locations
└── docs/                     # Project, developer, security, operations, and status guides
```

`npm run build` copies HTML/CSS/JS from selected `src/` folders and assets from `public/` to `dist/`. It copies the landing placeholder to `dist/index.html`. Edit source under `src/` or assets under `public/`; never edit generated `dist/` output. Firebase Hosting Emulator serves `dist/` on port `5005`.

Firebase CLI discovers root `firebase.json`. Its `firestore`, `storage`, and `functions` entries point to `firebase/` and `functions/`; emulator ports and Hosting root are declared there. Use the local scripts, which always select emulator-only project `demo-upsa-marketplace`; no project alias or production fallback is configured.

`src/pages/` includes landing, auth, marketplace, listing/seller management, account, messaging, verification, reports, and admin page locations. Buyer flow uses listing detail and messaging; no distinct buyer role is needed. Favourites has only an OPEN/POST-MVP note. All page/style/JS files remain placeholders; no product behavior is implemented.
