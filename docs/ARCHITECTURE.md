# Architecture

## System view

```text
Student browser
   ├── Firebase Authentication (identity and verified-email claim)
   ├── Firestore / Storage (only through Security Rules for direct client access)
   └── Cloud Functions (privileged, validated workflows)
          ├── Firebase Admin SDK → Firestore
          └── Firebase Admin SDK → private Storage
                 ↓
          Authorized administrator workflows
```

The user-facing product and approved field-level schema are in the synchronized Documents 1–3. See `DATA_MODEL.md` for the logical records. This foundation has no marketplace workflows.

## Trust boundaries

### Browser

The browser handles UI, user interaction, basic input checks, and status display. It is untrusted. It cannot decide administrator privileges, student approval, attempt counts, ownership, conversation membership, report authority, or private-data access. A modified browser can send arbitrary requests.

### Firebase Authentication

Authentication establishes which Firebase UID made a request. Email verification and domain checks are separate access conditions. Authentication does not by itself grant a user marketplace permissions or establish current student enrollment.

### Security Rules

Firestore and Storage Rules control direct browser access to their respective services. Rules must enforce allowed reads/writes for every document/object path. A hidden button is not protection. Rules do not automatically protect server operations using the Admin SDK.

### Cloud Functions

Functions implement privileged workflows. Every call independently checks authentication, Custom Claims when required, ownership, current state, constraints, and request contents. Use state checks, transactions, idempotency, and retry-safe operations for concurrent or retried requests.

### Admin SDK

The Admin SDK has trusted server-side authority and bypasses Firestore Rules. A Function using it must perform its own authorization checks. Never bundle credentials or Admin SDK code into the browser.

## Data flow and privacy

The public `users/{uid}` profile is minimal and may expose the approved index identity. Verification data and audit records are separate. Student-ID images use a private Storage path distinct from listing images. Never put private verification data in a document readable by marketplace users.

## Environment boundary

The local Emulator Suite is configured with emulator-only ID `demo-upsa-marketplace`; no real Firebase project is connected. Staging and production remain separate future Firebase projects. App/scripts must require explicit safe environment selection and must not silently fall back to production. Real student data remains prohibited pending required approval.

Editable browser source lives in `src/`. `scripts/build-static.mjs` copies the supported source folders plus `public/assets/` and `public/favicon/` into ignored `dist/`; Firebase Hosting Emulator serves only `dist/`. This keeps documentation, Functions source, and test fixtures outside the public hosting root while avoiding a framework or bundler.

## Technology choices

- Plain HTML/CSS/native browser modules keep the client approachable for the team and avoid an unapproved framework.
- Firebase Authentication provides account identity and email verification.
- Firestore stores structured marketplace/workflow records.
- Storage holds image bytes, separated by privacy class.
- Functions handle operations that users must not be allowed to choose or mutate directly.
- Rules protect direct client access; emulator tests provide repeatable synthetic security checks.

No marketplace behavior is implemented by this architecture document.
