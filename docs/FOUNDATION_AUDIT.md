# Foundation audit

**Audit date:** 2026-10-08  
**Scope:** Foundation readiness for the two IT students. This is not a feature, security, legal, or production-readiness certification.

## Result

The repository now has a reproducible static Hosting preview and a demo-only Firebase Emulator configuration, with deny-all Firestore and Storage Rules as a safe starting baseline. It is **not yet ready for Firebase-backed implementation and security testing** because the inspected Mac has no Java runtime, so the Firestore/Storage/Functions emulator suite and Rules compilation have not been validated.

## Foundation corrections made

- Moved Firebase CLI configuration to the repository root at `firebase.json`; removed the obsolete nested `firebase/firebase.json`.
- Configured local Auth, Firestore, Functions, Hosting, Storage, and Emulator UI ports. The only configured project ID is `demo-upsa-marketplace`; emulator commands use it so unavailable emulator services do not silently fall through to a real project.
- Connected the configuration to `firebase/firestore.rules`, `firebase/storage.rules`, and the valid empty `firebase/firestore.indexes.json`.
- Replaced Rules comments with a version 2 deny-all baseline. This protects by default but is not the eventual marketplace Rules implementation and has not yet been emulator-validated.
- Added root npm scripts and lockfile; `.nvmrc` selects Node 22, matching the Cloud Functions runtime. Added a Functions package/entry placeholder without any callable business operation.
- Added a static copy build that places the existing plain HTML, CSS, and browser JavaScript scaffold under ignored `dist/` for Firebase Hosting. No frontend framework or bundler was introduced.
- Added local development and Rules-test runner instructions. The test command refuses to report success when no Rules test files exist.
- Corrected the obsolete `.gitignore` path and updated setup/security/Git documentation to describe the observed repository state and the configured local workflow.
- Kept Firestore indexes empty because no implemented query requires an index yet.

## Verified repository and Git state

- Branch: `main`.
- Remote: `origin` is `git@github.com:kennethnyarko/UPSA_Marketplace.git` for fetch and push.
- The audit did not push, commit, or change the remote.
- Changes from this foundation correction are present in the working tree and are not committed.
- The repository has clear HTML page placeholders under `src/pages/`, client-side locations under `src/`, future Functions locations under `functions/src/`, Firebase CLI files under `firebase/`, tests under `tests/` and `functions/tests/`, and documentation under `docs/`.
- Source files remain placeholders. Their presence does not mean a feature exists.

## Commands/checks actually performed

| Check | Result | What it establishes |
|---|---|---|
| Parse `firebase.json`, package manifests/lockfile, and Firestore index JSON | TESTED/PASSED | These configuration files are valid JSON. It does not validate Firebase Rules. |
| `npm ci --ignore-scripts --offline` | TESTED/PASSED | The committed dependency lockfile can install from the available local npm cache. Lifecycle scripts were explicitly disabled for this check. |
| `npm run build` | TESTED/PASSED | The static scaffold copies into `dist/`. This does not test marketplace behavior. |
| `npm run serve` and HTTP GET `/` at `http://127.0.0.1:5005/` | TESTED/PASSED | Firebase Hosting Emulator served the generated landing placeholder with HTTP 200 using the demo project. The server was stopped. |
| Java runtime availability | BLOCKED | `java -version` reported that no Java Runtime is installed. |
| Full Auth/Firestore/Storage/Functions Emulator Suite | NOT RUN — BLOCKED | Firestore/Storage emulator execution requires a supported Java runtime on this machine. |
| Rules syntax and Rules tests | NOT RUN — BLOCKED | The configured Rules have not been compiled or evaluated by an emulator. No Rules test cases exist yet. |
| Marketplace automated tests | NOT IMPLEMENTED | No marketplace functionality or corresponding tests exist. |

## Current implementation boundaries

| Area | Status | Evidence boundary |
|---|---|---|
| Static build and Hosting preview | TESTED/PASSED | Only the placeholder landing response was served. |
| Local Firebase configuration | IMPLEMENTED — NOT YET TESTED | Hosting preview validated; full suite is still unvalidated. |
| Firestore and Storage baseline Rules | IMPLEMENTED — NOT YET TESTED | Deny-all files are configured; no emulator compilation/test. |
| Authentication | NOT IMPLEMENTED | No browser Firebase SDK integration or auth flow. |
| Listings and browsing | NOT IMPLEMENTED | No data-backed marketplace behavior. |
| Messaging | NOT IMPLEMENTED | No conversation behavior. |
| Student verification | NOT IMPLEMENTED | No verification workflow; real ID/data use is PENDING APPROVAL. |
| Reporting and moderation | NOT IMPLEMENTED | No report workflow. |
| Account deletion | NOT IMPLEMENTED | No deletion workflow. |
| Production Firebase connection/deployment | NOT IMPLEMENTED | No production project or deployment was configured. |
| Security certification | NOT TESTED | Documentation and deny-all baseline do not prove a complete secure product. |

## Remaining blockers and owner actions

1. **Install a supported JDK (11 or newer; use the team-agreed version) on each developer machine.** Then run the documented full emulator startup and Rules checks before Firebase-backed work. The current machine has no Java runtime.
2. **Select Node 22 for this repository.** `.nvmrc` records the version; the inspected shell currently runs Node 24.21.0. Each student must use a Node 22 installation before Functions work to match the configured runtime.
3. **Confirm both IT students have GitHub write access and agree on feature branches, pull requests, and review ownership.** The remote exists, but collaborator access and the team workflow were not verified.
4. **Create separate staging/production Firebase projects only when needed.** Keep local work on the demo project and emulators. Do not configure production credentials in this repository.
5. **Obtain supervisor/ethics/privacy approval before any real student IDs or personal student data are collected or used.** Use synthetic data until then.
6. **Name trusted administrators and agree how their Firebase Custom Claims are assigned/revoked before implementing admin workflows.** No administrator identity or claim is configured.

## Intentionally not included in this foundation

Marketplace features, browser Firebase initialization, production project configuration, deployed Rules, Cloud Functions business operations, design tokens or styled screens, real student information, and test results without execution evidence are intentionally absent.

FOUNDATION NOT READY — CORRECTIONS REQUIRED
