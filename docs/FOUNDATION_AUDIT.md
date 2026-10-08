# Firebase emulator foundation audit

**Audit date:** 2026-10-08 (live emulator verification)  
**Scope:** Verify the previously reported Java/Firebase Emulator startup blocker. This is not a full product security review or a comprehensive Rules test suite.

## Verdict

**FOUNDATION BLOCKER RESOLVED.** OpenJDK 25 is available to this environment, and the Firebase Emulator Suite is running and reachable. The Emulator Hub reports Auth, Firestore, Storage, Functions, Hosting, and UI on the configured ports. Firestore exposes the configured Rules source; unauthenticated read-only probes to Firestore and Storage were denied as expected by the deny-all baseline.

Formal Rules coverage remains **NOT YET TESTED**: no Rules test cases exist, and `npm run test:rules` refuses to treat an empty test suite as passed. Emulator startup and limited deny probes do not establish complete security.

## Verified checks

| Check | Result | Evidence and limits |
|---|---|---|
| Java availability | RESOLVED | `java -version` reports OpenJDK 25.0.4.1; `/usr/libexec/java_home -V` locates `/Library/Java/JavaVirtualMachines/temurin-25.jdk/Contents/Home`. |
| Running Firebase Emulator Suite | RESOLVED | The Emulator Hub at `127.0.0.1:4400` responded HTTP 200 and listed Auth 9099, Firestore 8080, Storage 9199, Functions 5001, Hosting 5005, and Emulator UI 4000. The active process was listening on the configured ports. |
| Emulator UI | RESOLVED | `http://127.0.0.1:4000/` returned HTTP 200. |
| Auth emulator | RESOLVED | `http://127.0.0.1:9099/` returned HTTP 200. |
| Firestore emulator | RESOLVED | `http://127.0.0.1:8080/` returned HTTP 200. |
| Storage emulator | RESOLVED | Emulator Hub reports port 9199. The root path returned 501, which does not test its Storage API; the read-only object probe below confirms the API and Rules decision. |
| Functions emulator | RESOLVED — SERVICE ONLY | Emulator Hub reports port 5001; the root path returned 404, expected when there is no function route. No Functions business handlers exist or were tested. |
| Hosting emulator | RESOLVED | `http://127.0.0.1:5005/` returned HTTP 200. |
| Project selection | RESOLVED | Firestore requests for `demo-upsa-marketplace` reached the emulator. The repository's `serve` and `emulators` scripts explicitly pass `--project demo-upsa-marketplace`; `.firebaserc` is absent, so there is no implicit Firebase alias. |
| Firestore Rules loaded | RESOLVED — LIMITED CHECK | Firestore emulator `:securityRules` endpoint returned the contents and path of `firebase/firestore.rules`. A read-only unauthenticated document GET returned HTTP 403 with `PERMISSION_DENIED` (`false for 'get'`). |
| Storage Rules loaded/enforced | RESOLVED — LIMITED CHECK | A read-only GET for a synthetic, nonexistent object returned HTTP 403, `Permission denied. No READ permission.` This matches the configured deny-all `firebase/storage.rules`. No object was written. |
| Formal Rules tests | NOT YET TESTED | `npm run test:rules` exits with code 2: no Security Rules test cases exist, and the runner intentionally refuses to call an empty suite passed. No tests were added in this audit. |

The Firebase CLI warning that the user is not authenticated was informational for this local-emulator inspection; the live emulators responded without CLI authentication. No production project or deployment was accessed.

## Firebase configuration review

- `firebase.json` points Firestore to `firebase/firestore.rules` and `firebase/firestore.indexes.json`, Storage to `firebase/storage.rules`, Functions to `functions/` with runtime `nodejs22`, and Hosting to generated `dist/`.
- Emulator ports match the observed running suite: Auth 9099, Firestore 8080, Functions 5001, Hosting 5005, Storage 9199, UI 4000.
- The project ID is explicitly supplied by the repository npm scripts and by the verified Firestore emulator request: `demo-upsa-marketplace`.
- Firestore indexes are currently empty. No index requirement is evidenced before feature queries exist.
- Firestore and Storage use version 2 deny-all baseline Rules. Emulator evidence shows the configured Firestore source was loaded and both tested read operations were denied.
- The limited read probes do not test writes, authenticated access, any future marketplace authorization, race conditions, or every Rules path.

## Stale statements corrected

Previous audit entries saying Java was unavailable, the emulator suite could not start, or Rules could not be evaluated are stale for this environment and have been superseded by the results above. The statement that there are no formal Rules test cases remains current.

## Next action

No JDK or emulator startup action is needed in this environment. When the team begins Security Rules implementation, add synthetic-data Firestore and Storage Rules test cases and run `npm run test:rules`. Until then, describe Rules status only as the limited deny checks above; do not call the application secure or the Rules suite passed.

No application files, Firebase Rules, or architecture were modified for this audit. No commit or push was made.

**FOUNDATION BLOCKER RESOLVED — FORMAL RULES TEST SUITE NOT YET RUN**
