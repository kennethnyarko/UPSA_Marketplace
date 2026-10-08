# Testing strategy

**Current status:** future testing plan only. No test runner or test cases exist, and no tests have been run for the current skeleton.

When implementation begins, use unit tests for pure validation/state logic; Firebase Emulator Suite integration tests for Auth, Firestore, Storage and Functions; explicit allow-and-deny Rules tests; end-to-end user/admin flows; and failure, retry, cleanup, and concurrency scenarios. Use synthetic accounts and data only. Test critical authorization and privacy cases before staging. Record commands, actual results, environment, and evidence in `TEST_REGISTER.md`; do not infer a pass from code review or file presence.
