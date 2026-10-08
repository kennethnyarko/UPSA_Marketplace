# Implementation status

Last reviewed: 2026-10-08. Status distinguishes setup evidence from marketplace functionality.

| Area | Status | Evidence / boundary |
|---|---|---|
| Directory and page map | IMPLEMENTED — NOT YET TESTED | Placeholder locations exist; no product behavior. |
| Static build/Hosting preview | TESTED/PASSED | `npm run build` completed; Hosting Emulator served `/` with HTTP 200. See `TEST_REGISTER.md`. |
| Firebase CLI/emulator configuration | IMPLEMENTED — NOT YET TESTED | Root `firebase.json` declares Auth, Firestore, Storage, Functions, Hosting and UI ports; Hosting-only preview worked. Full suite is BLOCKED pending Java. |
| Firestore/Storage foundation Rules | IMPLEMENTED — NOT YET TESTED | Strict deny-all baseline files are connected in config. Rules have not been compiled/tested by emulators. No marketplace authorization Rules. |
| Firestore indexes | NOT IMPLEMENTED | Valid empty indexes definition; add query-driven indexes only when needed. |
| Functions runtime/package entry | IMPLEMENTED — NOT YET TESTED | Node 22 package/runtime entry placeholder; no Functions are implemented. |
| Security Rules test runner | IMPLEMENTED — NOT YET TESTED | `npm run test:rules` requires actual test files and intentionally refuses an empty suite. Rules tests have not run. |
| Authentication, listings, messaging, verification, reports, admin workflows, deletion | NOT IMPLEMENTED | No feature logic or Firebase browser SDK connection. |
| Production Firebase connection/deployment | NOT IMPLEMENTED | No production project, alias, credentials, or deployment. |
| Real student IDs/data | PENDING APPROVAL | Do not use until required supervisor/ethics/privacy approval is obtained. |

The inspected Mac has Node.js 24.21.0/npm 11.19.0 and no Java runtime. Node.js 22 is the project standard and Functions runtime; install/use it for team consistency. Full Emulator Suite startup and Rules testing remain BLOCKED until a supported JDK is installed. No feature is represented as tested.
