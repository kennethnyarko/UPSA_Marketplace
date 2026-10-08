# Project structure

**Current status: file/folder skeleton only.** Files marked as placeholders establish locations; they do not implement or connect any feature.

```text
.
├── README.md, .env.example, .gitignore, CONTRIBUTING.md, SECURITY.md
├── docs/                 # Product, architecture, security, design, and project guidance
├── src/
│   ├── pages/            # Future HTML pages grouped by product area
│   ├── components/       # Future reusable UI component locations
│   ├── styles/           # Future CSS; token file is comment-only
│   ├── services/         # Future browser Firebase service modules
│   ├── state/             # Future browser state helpers
│   ├── utils/             # Future shared utilities
│   └── config/            # Future non-secret client configuration
├── functions/src/         # Future trusted server operations; empty placeholders
├── functions/tests/       # Future Function tests; empty placeholder
├── firebase/              # Firebase config/rule placeholders; not deployable
├── tests/                 # Empty future unit, integration, security, e2e, fixture folders
├── scripts/               # Empty future developer scripts folder
└── public/                # Static assets and favicon locations only
```

## Where work belongs

- HTML: `src/pages/<area>/`.
- Shared UI: `src/components/<kind>/`.
- CSS and future design tokens: `src/styles/`.
- Browser-side service calls: `src/services/`; these remain untrusted client code.
- Trusted server operations: `functions/src/<area>/`.
- Firebase configuration and future Firestore/Storage rules: `firebase/`.
- Tests and synthetic fixtures: `tests/`; Function-specific tests: `functions/tests/`.
- Static images/icons/favicon: `public/assets/` and `public/favicon/`.
- Explanations and future evidence: `docs/`.

The approved client approach is plain HTML, CSS and browser JavaScript. No framework or bundler is present. The Firebase Hosting source/build arrangement is an implementation decision to resolve before running or deploying; this skeleton has no Hosting configuration.

## Current placeholders

HTML pages contain only a comment. CSS and JavaScript files contain only a brief comment. Firebase JSON is empty, rules contain explanatory comments only, indexes are empty, and test folders contain only `.gitkeep` markers. No Firebase project is connected and nothing is deployable.
