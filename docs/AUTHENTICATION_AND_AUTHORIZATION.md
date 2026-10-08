# Authentication and authorization

**Status:** Approved design, not implemented. This document describes intended access behavior; Firebase configuration is absent and the rule files are comment-only placeholders, not an active deny-by-default policy.

## Core distinction

- **Authentication** identifies the Firebase account making a request (UID) and whether the email address has been verified.
- **Authorization** decides whether that account may perform the requested action on the target record.
- A verified UPSA email does not prove that the person is an approved marketplace student. Student-ID review and administrator claims are separate authorization facts.

The browser may display or hide controls based on state for usability, but it cannot grant permission. Firestore Rules and Storage Rules govern direct client requests. Cloud Functions use trusted server-side privileges and must repeat authorization checks themselves.

## Identity and account journey

1. A student registers using an address at `upsamail.edu.gh`.
2. The app trims whitespace and treats the domain case-insensitively. Firebase Authentication email verification is required before marketplace browsing.
3. The email local part is the candidate public index identity. It is normalized and checked against the submitted ID by a named trusted administrator; email alone does not establish ID approval.
4. Once email is verified, the student can browse read-only while they have not submitted an ID or while a submission is pending.
5. The student submits one ID image at a time. Only a valid finalized submission entering the review queue counts as an attempt. There are at most three finalized unsuccessful submissions.
6. An administrator reviews the private submission and approves or rejects it with an approved reason. A rejection is communicated in-app; the student may resubmit if attempts remain. After three unsuccessful attempts, further submissions are blocked and the student is directed to `marketassprjt@outlook.com`.
7. After approval and completion of ID-image deletion, the student can use approved marketplace actions. A cleanup failure leaves the workflow in `cleanup_pending` and blocks resubmission/completion until retry succeeds.

This describes the product flow, not an existing account screen or deployed Firebase workflow. See `ONBOARDING.md`, `DATA_MODEL.md`, and `DECISIONS.md` for the state names and field-level data decisions.

## Authorization matrix

The table is intended policy. Exact rule predicates must be implemented and tested before each feature ships.

| Principal / state | Browse active listings | Submit/review ID | Create/manage listings | Message | Report | Admin actions |
|---|---|---|---|---|---|---|
| Unauthenticated | No | No | No | No | No | No |
| Signed-in, email unverified | No | No | No | No | No | No |
| Email verified, ID not submitted/pending/rejected with attempts remaining | Read-only | Submit/resubmit own ID and view status; cannot read/download the submitted image or review | No | No | No | No |
| ID approved, email verified | Yes | View own status only | Own listings within policy | As conversation participant | Submit eligible listing/account reports | No, unless separately claimed admin |
| Locked after three unsuccessful finalized submissions | Read-only | No further submission; contact support | No | No | No | No |
| Named administrator with trusted admin claim | Marketplace access only according to their student state | Review assigned/available queue per workflow | No student ownership bypass | No general private-chat access | Resolve/dismiss reports and moderate listings | Approved admin workflows only |

Administrator status is not automatically combined with student approval. Administrators do not receive general access to private conversations. A user who is both a student and administrator may use only the permissions independently granted to each role.

## Permission enforcement locations

| Operation | Enforcement location |
|---|---|
| Public/participant direct reads and permitted direct writes | Firestore Rules, with minimal data exposure |
| Listing image upload/read/delete | Storage Rules plus trusted association validation where required |
| ID submission finalization, attempt counting, decision, audit creation, and ID deletion | Authenticated Cloud Function with current-state checks and idempotent cleanup |
| Admin review, report resolution, listing removal, account deletion orchestration | Cloud Function checks a server-verified Custom Claim and validates the requested transition |
| UI affordances and friendly validation | Browser only; never a security boundary |

Student-ID images use a private Storage path distinct from listing images. Students may submit an image and view status, but may not read/download the stored image; only named trusted reviewers authorized for the review may read it. Never put private verification data in a document readable by marketplace users.

Firestore and Storage Rules must independently protect direct access. They do not protect calls made through the Admin SDK. Every privileged Function must verify the caller UID, role claim, target ownership/relationship, allowed current state, input shape, and applicable limits. Never trust role, sender, owner, reviewer, attempt count, approval state, or target IDs merely because they came from a client.

## Administrator claim lifecycle

- **Who may be an admin:** only named, trusted project administrators approved by project leadership. The roster and approval process must be maintained outside client-controlled records.
- **Grant/revoke:** an authorized project owner assigns or removes Firebase Custom Claims using a controlled trusted process. No public signup, client UI, Firestore profile field, or marketplace Function may grant claims.
- **Refresh:** claim changes may require the administrator to refresh their Firebase ID token/sign in again before the new claim appears. The UI must explain stale access and fail closed.
- **Audit:** record the admin UID, action, target, decision, and timestamp in the minimal appropriate audit record. Do not log ID image bytes or unnecessary personal details.
- **Revocation:** remove the claim promptly; sensitive Functions should use current token/claims checks and an operational procedure for urgent revocation. Record who performed revocation and when through the approved admin process.

## Failure and edge behavior

- Invalid domain, unverified email, missing auth, expired token, or missing role claim: deny protected action.
- Deleted/disabled account or changed account state: deny new access and start the approved deletion/recovery process; Authentication deletion alone does not remove Firestore or Storage data.
- Duplicate/replayed finalization or admin decision: Function operation must be idempotent and must not increment attempts or create multiple audit records twice.
- Simultaneous submissions: enforce the one-pending-submission and three-attempt limits atomically on the trusted backend.
- Stale UI state or a changed role: re-check at the service boundary and return a safe error; do not rely on the last rendered page.
- Function failure after changing state but before deleting an ID photo: persist/recover `cleanup_pending`, block conflicting actions, and retry safely.
- Admin cannot access a private conversation by virtue of the admin claim alone.

## Verification evidence required before release

For each permission row, test both allowed and denied requests in Emulator Suite tests. Include forged role fields, forged sender/owner IDs, unverified email, nonmember conversation access, state transitions, duplicate retries, concurrent submissions, and revoked/stale claims. Record commands, environment, result, and evidence location in `TEST_REGISTER.md`. Until executed, those tests are NOT RUN.
