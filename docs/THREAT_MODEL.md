# Threat model

**Status:** Initial design threat model. It identifies plausible risks and planned controls; it is not a penetration-test report or a claim of security.

## Scope and assumptions

System under consideration: plain HTML/CSS/browser JavaScript; Firebase Authentication; Firestore and Cloud Storage protected by Rules; privileged Cloud Functions using the Admin SDK; named administrators; local Emulator Suite, synthetic staging, and separately controlled production.

Assumptions: users can inspect and modify browser code, call Firebase APIs directly, submit malformed/replayed requests, use multiple accounts, and encounter network/retry failures. Admin accounts and developer machines can be compromised. Firebase configuration values are not authorization secrets. Real-data use is prohibited until the required approval exists.

Out of scope for this initial model: Firebase provider infrastructure compromise, university identity-provider integration (not approved), payment processing, automated fraud detection, message reporting, and formal legal conclusions.

## Assets and security objectives

| Asset | Primary security objective |
|---|---|
| Firebase accounts and email verification state | Prevent unverified or unauthorized account access. |
| Private student-ID images and verification records | Confidentiality, least privilege, correct decision workflow, prompt deletion. |
| Public student index identity and listings | Integrity, controlled visibility, protection from impersonation and tampering. |
| Conversations and messages | Confidentiality for fixed participants, integrity of sender attribution, availability of existing conversations. |
| Reports, admin decisions, and audit records | Integrity, restricted access, accountability, defined retention. |
| Admin Custom Claims and trusted Functions | Prevent privilege escalation and unauthorized privileged actions. |
| Project credentials/configuration/environments | Prevent secret disclosure and accidental production access. |
| Account deletion and cleanup state | Complete data lifecycle with safe retries and detectable failures. |

## Trust boundaries

1. **Browser to Firebase client services:** all browser inputs and local role/state values are attacker-controlled; Rules must enforce direct access.
2. **Browser to Cloud Function:** authenticated request is not necessarily authorized. Function validates caller claims, resource relationships, payload, state and limits.
3. **Cloud Function to Admin SDK:** Admin SDK bypasses Rules; a Function bug can read/write broadly. Minimize privileges and validate every operation.
4. **Student to administrator:** private ID review/report workflows expose sensitive information to a small named admin group; admin actions need accountability.
5. **Local/staging to production:** configuration and credentials must remain separated; local commands must use emulator demo project only.
6. **Application data to logs/backups:** derived logs and exports can become sensitive copies and need their own access and retention controls.

## Threat scenarios and planned controls

| ID | Threat / abuse case | Impact | Planned controls | Evidence needed |
|---|---|---|---|---|
| T-01 | User changes frontend `isAdmin`, approval state, attempt count, owner, or sender fields | Privilege escalation, forged content, bypass of review limits | Claims set only by trusted process; Rules and Functions derive UID from auth context; server owns state/attempt updates | Rules and Function tests for forged fields and denied mutations |
| T-02 | Attacker reads another student's ID image or obtains a reusable URL | Sensitive identity exposure | Private Storage path; no public URLs; least-privilege Storage Rules or mediated access; remove access after decision | Storage tests for owner/admin allow cases, unrelated-user denial, URL/access checks |
| T-03 | Student submits multiple simultaneous/replayed verification requests | Attempt-limit bypass or duplicate review records | Atomic trusted finalization, one pending item, idempotency and transaction/state checks | Concurrent and retry tests; exactly-once state/audit assertions |
| T-04 | Malicious user accesses another profile, listing, report, or private conversation | Privacy breach or unauthorized changes | Rules keyed to UID/ownership/participant membership; no general admin chat access | Cross-user Rules tests for each document/object path |
| T-05 | Malicious or oversized image, spoofed MIME type, path mismatch, or overwrite | Harmful/unexpected files, cost, content substitution | Size/format enforcement, server-side association checks, immutable IDs/path ownership, safe rendering | Invalid format/size/path/overwrite tests; emulator upload checks |
| T-06 | Unverified or wrong-domain email accesses marketplace operations | Unauthorized account activity | Verified-email and domain checks at Rules/Function boundary; deny by default | Domain-case, whitespace, unverified, missing-auth test cases |
| T-07 | Admin claim stolen, stale, or granted to wrong account | Unauthorized ID review, moderation or deletion | Named-admin roster, controlled claim assignment/revocation, least privilege, audit and revocation runbook | Admin grant/revoke procedure review and tests with/without claim |
| T-08 | Function uses Admin SDK without verifying caller | Bypass of Rules and arbitrary privileged operations | Shared authorization helper; per-operation validation; code review; tests for unauthenticated/non-admin callers | Function tests with forged/absent claim and unauthorized target |
| T-09 | ID deletion, account cascade, or audit expiry fails halfway | Sensitive data retained, inconsistent account state, blocked student | Explicit state machine, idempotent retries, `cleanup_pending`, bounded retries/alerts, reconciliation runbook | Forced-failure and retry tests; operational alert/recovery exercise |
| T-10 | Client submits malicious text or links in listing/message/report | Script injection, harassment, unsafe external navigation | Text-only messages; escaped/text rendering; bounded input; moderation/report workflow | XSS payload tests, length/empty validation tests, rendering review |
| T-11 | Overly broad query/rules allows scraping or unbounded reads | Data exposure, cost/performance degradation | Minimal public fields, bounded pagination, rules aligned to query conditions and approved browse behavior | Rules query tests, pagination limits and indexes review |
| T-12 | Developer runs against production or commits secrets/real IDs | Real student data exposure or service compromise | Demo project pin, fail-closed guard, ignored local config, synthetic-data policy, secret scanning/review | Environment guard tests, repository secret scan, onboarding review |
| T-13 | Account deletion is assumed to cascade from Firebase Auth | Orphaned profiles, images, conversations or reports | Trusted deletion orchestration and reconciliation; explicit unresolved-case retention | Deletion integration tests and simulated partial failure |
| T-14 | Report floods, duplicate reports, or abusive admin action | Queue exhaustion or unjust moderation | Duplicate-open-report rule, reason codes, limited admin actions, audit and manual resolution | Duplicate/rate/concurrency tests; admin workflow review |
| T-15 | Denial or service outage causes unsafe client fallback | Unauthorized access or misleading approval state | Fail closed; preserve explicit pending/error state; never fall back to production or assume success | Offline, timeout, stale-token, function-error tests |

## Highest-priority implementation gates

Before any real student data:

1. Required supervisor/ethics/privacy approval is documented.
2. Actual Firestore and Storage Rules are least-privilege and have passing emulator tests.
3. Privileged Functions have caller authorization tests and retry/concurrency coverage.
4. ID access, deletion, `cleanup_pending`, retention expiry, and account deletion have tested recovery paths.
5. Staging and production are separate projects; local tests use synthetic data and the emulator.
6. Named admin claim assignment/revocation and incident ownership are documented and practiced.
7. Open release blockers in `SECURITY_CHECKLIST.md` and `IMPLEMENTATION_STATUS.md` are resolved or explicitly accepted by the responsible approver.

## Residual risk and ownership

This MVP relies on manual ID review and small named-admin access; human error and account compromise remain possible. The team must not describe the system as fraud-proof, institutionally verified, or fully secure. The project owner/IT lead owns security issue triage and environment separation; named admins own review actions; supervisor/project leadership owns required real-data approval and retention governance. Revisit this model when data flows, rules, admin operations, or deployment boundaries change.
