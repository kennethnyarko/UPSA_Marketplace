# Local development

This is the safe local workflow for the two IT students. It uses Firebase Emulators with the reserved **emulator-only** project ID `demo-upsa-marketplace`; this is not a Firebase project. No production project ID or credential is needed or used.

## Required tools

- Node.js 22 (recommended project standard; Functions runtime is Node.js 22).
- npm (installed with Node.js).
- Java Development Kit 11 or later for Firestore Emulator; Java 17 is a suitable team choice.
- Git and a current web browser.
- Firebase CLI is installed locally through the repository dependencies; do not install a separate global CLI to run this project.

Firebase CLI requires Node.js 18 or later. The Firebase Emulator Suite installation guide requires Node.js 16 or later and JDK 11 or later. The project standardizes on Node.js 22 for alignment with the Functions runtime. See the official [Firebase CLI](https://firebase.google.com/docs/cli), [Emulator Suite setup](https://firebase.google.com/docs/emulator-suite/install_and_configure), and [Functions runtime](https://firebase.google.com/docs/functions/manage-functions) guides.

## First setup

From the repository root:

```sh
npm ci
```

This installs the locked local Firebase CLI dependency. No `firebase login`, Firebase project, `.firebaserc`, or production credentials are needed for emulator-only work.

## Build and view the static scaffold

```sh
npm run build
npm run serve
```

The build script copies browser files from `src/` and static files from `public/assets/` and `public/favicon/` into the ignored `dist/` output. Firebase Hosting Emulator serves `dist/` at `http://127.0.0.1:5005/`. This is a local preview; the page files are still placeholders.

## Start all local emulators

```sh
npm run emulators
```

This builds the static output and starts Authentication, Firestore, Storage, Functions, Hosting, and Emulator UI with `--project demo-upsa-marketplace`. The emulator ports are Auth `9099`, Firestore `8080`, Functions `5001`, Storage `9199`, Hosting `5005`, Emulator UI `4000`, and Hub `4400`.

Stop the running process with **Ctrl+C**. Emulator state is in memory: this workflow does not import or export data, so stopping and starting again resets it. Use synthetic identities, ID examples, listings, images, reports, and messages only.

## How future browser code connects locally

When a feature uses the Firebase Web SDK, its single client setup belongs under `src/config/`. In local mode, it must connect to the emulator endpoints above, for example with the SDK's `connectAuthEmulator`, `connectFirestoreEmulator`, `connectStorageEmulator`, and `connectFunctionsEmulator` helpers. This connection code is **not implemented yet**. Require explicit local environment selection and fail closed if it is missing; never silently select production.

The emulator-only project ID is passed on the command line. The repository intentionally has no default production project alias. Do not run `firebase deploy` from local development.

## Rules and Functions testing

No automated tests exist yet. After tests have been added, run them against the local emulators with the Firebase CLI `emulators:exec` command and synthetic data. Rules tests should use `@firebase/rules-unit-testing` and assert both denied and permitted cases as each feature's Rules are introduced. Function tests should run against the Functions and dependent service emulators. Record actual commands, results, and evidence in `TEST_REGISTER.md`; do not label a test passed before running it.

## Manual setup still required

Install Node.js 22 and JDK 11+ if they are not already available. This machine currently has Node.js 24.21.0/npm 11.19.0 but no Java runtime, so full emulator startup is blocked until Java is installed. Use the official [Node.js downloads](https://nodejs.org/en/download) and a JDK distribution approved by the team; then verify `node --version`, `npm --version`, and `java -version` in Terminal. Do not install system software by copying credentials or project IDs into the repository.
