# Environments

## Local

Local development uses the Firebase Emulator Suite with project ID `demo-upsa-marketplace`. This is an emulator-only ID, not a created Firebase project. Scripts pass it explicitly; no production alias or credential is required. Emulator configuration is in root `firebase.json`; instructions and ports are in `LOCAL_DEVELOPMENT.md`.

No emulator data is imported or exported by default. Data exists only during the emulator process and resets after stopping it. Use synthetic data only. Do not run deploy commands as part of local work.

## Staging and production

Staging and production must be separate Firebase projects, created and owned by the project owner. Neither is configured in this repository. Staging uses synthetic data. Real student IDs and data are prohibited until required supervisor/ethics/privacy approval is documented.

The web app must require an explicit environment and fail closed. Never silently fall back from missing local configuration to a hosted Firebase project. Never commit `.firebaserc`, service-account credentials, private keys, student data, or ID images.

## Tool requirements

Project standard: Node.js 22 for local tooling and the Cloud Functions runtime. Firebase CLI is pinned as a local development dependency. Firestore Emulator requires Java JDK 11 or later; use Java 17 as the team choice. The current development Mac has Node.js 24.21.0/npm 11.19.0 but no Java runtime, so starting the full emulator suite remains blocked until Java is installed.
