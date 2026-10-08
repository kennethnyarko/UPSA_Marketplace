# Testing strategy

No automated test cases have been written and no tests have been run for this foundation correction. Test directories exist, `@firebase/rules-unit-testing` is a locked development dependency, and `npm run test:rules` is configured to refuse an empty suite rather than report a false pass.

When tests are introduced:

1. Use Node's built-in test runner for isolated JavaScript checks where suitable.
2. Use `@firebase/rules-unit-testing` with Firestore and Storage emulators for access Rules. Assert both allow and deny behavior using synthetic identities.
3. Run trusted Functions tests against the Functions Emulator and any dependent Auth/Firestore/Storage emulators.
4. Exercise user/admin flows with the Hosting Emulator after build.
5. Include failure, retry, cleanup, and concurrency cases for sensitive workflows.

Run Security Rules tests with `npm run test:rules` after adding `*.test.js`/`*.spec.js` files under `tests/security/`. The script runs `firebase emulators:exec` for Firestore and Storage with `--project demo-upsa-marketplace` and `--config firebase.json`. Functions tests can use Node's built-in `node:test` runner through the Functions Emulator and dependent service emulators. Record exact commands and actual outcomes in `TEST_REGISTER.md`.

The current default-deny Rules are intended to fail closed. Their syntax/configuration has not been checked by the Emulator Suite because Java is not installed on this Mac. Do not claim Rules tested or passed.
