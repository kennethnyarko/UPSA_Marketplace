# Test register

## Foundation checks performed

These are limited setup checks, not marketplace feature or security tests.

| Check | Status | Evidence / limitation |
|---|---|---|
| Firebase config and indexes JSON parse | TESTED/PASSED | Parsed `firebase.json` and `firebase/firestore.indexes.json` with Python `json.loads` during foundation setup. This does not validate Rules or emulator behavior. |
| Static copy build | TESTED/PASSED | `npm run build` completed and wrote ignored `dist/` output. |
| Hosting Emulator preview | TESTED/PASSED | `npm run serve` started Hosting Emulator using `demo-upsa-marketplace`; HTTP GET `http://127.0.0.1:5005/` returned `200 OK` and the expected placeholder comment. Emulator was stopped with Ctrl+C. This tests only static preview. |
| Full Auth/Firestore/Storage/Functions emulator suite | BLOCKED | Java runtime is not installed on the inspected Mac. Full emulator startup and Rules compilation/testing were not run. |
| Marketplace feature tests | NOT IMPLEMENTED | There are no feature tests because no marketplace functionality exists. |

## Record future tests

For each future test, record:

| Field | Value |
|---|---|
| Test ID / requirement | |
| Scenario and expected result | |
| Test level / environment | |
| Synthetic fixture used | |
| Command or procedure | |
| Actual result and date | |
| Evidence location | |
| Status (NOT RUN / PASS / FAIL / BLOCKED) | |

Use fake identities, messages, listings, reports, and ID sample images only. Never use real student data in local tests. `npm run test:rules` intentionally exits nonzero while there are no Rules test files; it will not claim an empty suite passed.
