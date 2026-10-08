# Security checklist

Use this checklist during implementation reviews and before each environment release. It is a work record, not proof by itself. For each item, link the relevant test, code review, configuration, or approval evidence. Foundation Firestore/Storage Rules deny all client access but have not been Emulator-tested; feature permissions remain NOT IMPLEMENTED.

Status vocabulary: `NOT IMPLEMENTED`, `IN PROGRESS`, `IMPLEMENTED — NOT YET TESTED`, `TESTED/PASSED`, `FAILED`, `BLOCKED`, `PENDING APPROVAL`, `POST-MVP`.

## Repository and developer setup

- [ ] **OPEN** No credentials, `.env`, `.firebaserc`, service account keys, production exports, real student details, or real ID images are tracked.
- [ ] **OPEN** Environment guard rejects missing/unsafe environment selection and does not silently fall back to production.
- [ ] **OPEN** Local developer workflow uses only the Emulator Suite and synthetic data.
- [ ] **OPEN** Staging and production project IDs/credentials are separate and access is restricted to named owners.
- [ ] **OPEN** Dependency audit is reviewed and findings are resolved or explicitly accepted before release.
- [ ] **OPEN** Pull requests receive a second IT-student review, including security-sensitive files.

## Authentication and authorization

- [ ] **NOT IMPLEMENTED** Email domain normalization and verified-email requirements are enforced at service boundaries, not only in the UI.
- [ ] **NOT IMPLEMENTED** ID approval is distinct from email verification and is required for listing writes, messaging, and reporting.
- [ ] **NOT IMPLEMENTED** Admin status comes only from trusted Firebase Custom Claims; no client can self-assign or edit it.
- [ ] **NOT IMPLEMENTED** Admin grant, revocation, token refresh, roster ownership, and audit procedure is documented and tested.
- [ ] **NOT IMPLEMENTED** Every Cloud Function verifies caller authentication, claim, target relationship, allowed state, payload, and limits before using Admin SDK.
- [ ] **NOT IMPLEMENTED** Rules deny forged `isAdmin`, owner, sender, index number, attempt count, approval, participant, and reviewer fields.
- [ ] **NOT IMPLEMENTED** Direct Firestore and Storage access is independently protected by least-privilege Rules.
- [ ] **NOT IMPLEMENTED** Browser UI visibility is not used as an authorization control.

## Student ID and private data

- [ ] **PENDING APPROVAL** Required supervisor/ethics/privacy approval for real student data is recorded before real onboarding.
- [ ] **NOT IMPLEMENTED** Development/test/demo use only synthetic identities and fake ID images.
- [ ] **NOT IMPLEMENTED** ID image upload enforces JPG/JPEG/PNG and a 5 MB maximum; one private front image per submission.
- [ ] **NOT IMPLEMENTED** ID objects have no public/shareable URL and unrelated users cannot read them.
- [ ] **NOT IMPLEMENTED** Only named trusted reviewers authorized for the review can read a pending image; the submitting student cannot read/download it after upload.
- [ ] **NOT IMPLEMENTED** One pending submission and three finalized unsuccessful attempts are enforced atomically by trusted logic.
- [ ] **NOT IMPLEMENTED** Rejection uses approved reason codes; student sees a persistent status and support contact.
- [ ] **NOT IMPLEMENTED** Decision cleanup deletes the ID image; failure records `cleanup_pending`, blocks resubmission, and has a tested retry/alert path.
- [ ] **NOT IMPLEMENTED** Verification audit stores only approved minimal fields, expires after 12 months as a project rule, and has tested trusted expiry behavior.
- [ ] **NOT IMPLEMENTED** Public profiles do not contain full email, physical ID details, verification state, reviewer identity, or admin fields.

## Listings, images, messaging, and reports

- [ ] **NOT IMPLEMENTED** Listing writes require approved student status and are limited to the authenticated owner.
- [ ] **NOT IMPLEMENTED** Listing images enforce JPG/JPEG/PNG, maximum 5 MB each, and one-to-five photos per listing.
- [ ] **NOT IMPLEMENTED** Listing image object path, owner and listing association are checked; cross-owner reads/writes/deletes are denied.
- [ ] **NOT IMPLEMENTED** Listing fields, fixed category values, type/price constraints, and state transitions match `DATA_MODEL.md` and `DECISIONS.md`.
- [ ] **NOT IMPLEMENTED** Conversations have immutable participants; sender UID is derived from auth context; nonparticipants are denied.
- [ ] **NOT IMPLEMENTED** Existing conversations continue after listing closure; closed listings cannot start new conversations.
- [ ] **NOT IMPLEMENTED** Message content is bounded, nonempty text, safely rendered, and not exposed to administrators generally.
- [ ] **NOT IMPLEMENTED** Reports are limited to approved target types/reasons; duplicate-open-report policy and admin resolution are enforced.
- [ ] **NOT IMPLEMENTED** Reports do not automatically suspend accounts; only approved admin workflow can remove listings.

## Admin and lifecycle operations

- [ ] **NOT IMPLEMENTED** ID review, report resolution, listing removal, and account deletion require trusted admin authorization and are audited.
- [ ] **NOT IMPLEMENTED** Admin dashboard reads only the queues/fields required for its task.
- [ ] **NOT IMPLEMENTED** Admin claim does not grant general access to private student conversations.
- [ ] **NOT IMPLEMENTED** Account deletion disables sign-in, removes active listings and images, removes profile data, and safely handles messages and unresolved reports per policy.
- [ ] **NOT IMPLEMENTED** Deletion and cleanup operations are idempotent, resumable, observable, and tested under partial failure.
- [ ] **NOT IMPLEMENTED** Authentication deletion is not treated as automatic Firestore/Storage deletion.
- [ ] **NOT IMPLEMENTED** Logs omit credentials, ID content, message bodies, and unnecessary personal information.
- [ ] **OPEN** Retention/ownership for unresolved reports and operational logs is confirmed with project leadership before real-data use.

## Testing and release gates

- [ ] **NOT IMPLEMENTED** Configure and verify local Auth, Firestore, Storage, Functions, and Hosting emulators before feature development.
- [ ] **NOT IMPLEMENTED** Rules tests cover allow and deny for each collection/object path and role/state.
- [ ] **NOT IMPLEMENTED** Function tests cover unauthenticated, non-admin, forged-field, wrong-owner, invalid-state, retry, and duplicate requests.
- [ ] **NOT IMPLEMENTED** Concurrency tests cover simultaneous verification finalization, reports, and lifecycle operations.
- [ ] **NOT IMPLEMENTED** Failure tests cover network interruption, stale tokens, Function errors, failed deletion, and recovery.
- [ ] **NOT IMPLEMENTED** End-to-end tests cover approved and rejected student journeys with synthetic accounts.
- [ ] **NOT IMPLEMENTED** Accessibility and responsive UI review includes keyboard, visible focus, labels, status announcements, and contrast.
- [ ] **OPEN** Staging deployment is verified against the intended staging project and synthetic data only.
- [ ] **PENDING APPROVAL** Production release and any real-data use have explicit project/supervisor approval and documented rollback/incident owners.

## Per-review evidence

For each change, record:

- Feature / pull request:
- Reviewer(s):
- Environment and project ID (never credentials):
- Checklist items changed and status:
- Commands/tests actually executed:
- Evidence location (test register, CI run, sanitized screenshot/log):
- Failures, accepted risks, owner and follow-up date:
