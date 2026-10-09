# UPSA Marketplace MVP data contract

**Status:** Approved MVP design; **not implemented**. This document defines the logical Firestore contract for the frontend, Firebase Rules, and trusted Cloud Functions to follow. It is not evidence of working features or tested authorization.

## Contract conventions

- Firestore document IDs are the entity IDs. Do not repeat `uid`, `listingId`, `conversationId`, `messageId`, `reportId`, or `auditId` inside their documents.
- Store user UIDs and related document IDs as stable **strings**, not Firestore `DocumentReference` values. A string ID does not guarantee that the target exists; trusted operations must validate relationships.
- Use Firestore **Timestamp** values for all dates. Trusted operations set authoritative timestamps with server time. Do not store ISO date strings or trust a client clock for decisions.
- Enum values are strings and must match the listed values exactly. Validate them in trusted operations and Rules where applicable.
- Use arrays only for bounded lists: listing image IDs (maximum five) and the two conversation participant UIDs. Do not store growing histories in arrays.
- No map fields are needed in this MVP contract. Keep private verification data in its own document; do not put it into a public profile or listing.
- Omit conditional fields when they do not apply. Do not write `null` unless a later implementation decision explicitly requires it.
- The fixed category labels/IDs are an application enum, not Firestore documents. No categories collection is used.
- All records and sample data used during development, testing, and demos must be synthetic. Real student IDs/data remain **PENDING APPROVAL**.

## 1. `users/{uid}` — minimal student profile

**Document ID:** Firebase Authentication UID. No `uid` field.

| Field | Firestore type | Required? | Purpose and relationship |
|---|---|---:|---|
| `indexNumber` | string | Yes | Normalized Auth email local part before `@`; public student identity displayed on listings. Derived from verified Auth email by trusted onboarding logic. |
| `createdAt` | Timestamp | Yes | Profile creation time. |
| `updatedAt` | Timestamp | Yes | Latest permitted profile update. |

The full email remains in Firebase Authentication, not this public profile. Physical student-ID number/photo, verification state, admin role, and private audit data do not belong here.

**Authorization:** Verified-email students may read the minimal profile identity needed for marketplace display; the owner may read their own profile. Profile creation and deletion are performed by trusted onboarding/account-deletion operations. `indexNumber` is immutable to the client. No `displayName` field is in the MVP contract.

## 2. `verification/{uid}` — private current verification state

**Document ID:** Student UID. One current workflow document per student; detailed decisions are recorded separately in `verificationAudit`.

| Field | Firestore type | Required? | Allowed values / purpose and relationship |
|---|---|---:|---|
| `state` | string enum | Yes | `needs_id`, `pending_review`, `cleanup_pending`, `rejected_resubmit`, `approved`, `locked`. Current student verification workflow state. |
| `attemptCount` | integer | Yes | `0`–`3`. Increments exactly once when a valid ID submission is finalized into the review queue. |
| `submissionId` | string | Conditional | Identifier of the one pending/current submission. Replaces both `pendingSubmissionId` and `currentSubmissionId`. Clear after the associated image is deleted. |
| `imagePath` | string | Conditional | Private Storage path for the current submission image, only while it exists and is needed for review/cleanup. Clear after confirmed deletion. |
| `decision` | string enum | Conditional | `approved` or `rejected`; latest decision. |
| `rejectionReasonCode` | string enum | Conditional | `blurry_unreadable`, `incomplete_or_wrong_side`, `details_mismatch`, `altered_or_invalid`, `other`. Present only for rejection. |
| `rejectionExplanation` | string | Conditional | Short explanation when reason is `other`; otherwise absent. Do not put ID details here. |
| `submittedAt` | Timestamp | Conditional | Time the valid submission was finalized into the review queue. |
| `reviewedAt` | Timestamp | Conditional | Time the reviewer made the decision. |
| `reviewerUid` | string | Conditional | UID of the named trusted reviewer who made the latest decision. |
| `cleanupStatus` | string enum | Conditional | `pending` or `complete`. `pending` blocks further submission/completion until deletion succeeds. |
| `cleanupPendingSince` | Timestamp | Conditional | When retryable image cleanup became pending. |
| `updatedAt` | Timestamp | Yes | Time of the latest trusted workflow update. |

State flow: `needs_id` → `pending_review` → `cleanup_pending` while decision-image deletion is unresolved → `approved`, `rejected_resubmit`, or `locked`. Rejection permits resubmission only when fewer than three finalized unsuccessful attempts have been used and cleanup is complete. Approval takes effect only after the image-deletion step completes. The private image is stored at `verification/{uid}/{submissionId}/student-id` and is never a marketplace image or publicly readable.

**Authorization:** Student reads only their own status and cannot read/download the stored ID image. A named trusted reviewer may read the necessary verification record and image for review. Only trusted Cloud Functions may create/update workflow fields, count attempts, decide, and coordinate deletion. No client can write `state`, `attemptCount`, `decision`, reviewer, or cleanup fields. The Storage object is deleted after the decision; this document retains only the minimal latest workflow state needed to present status and allow an eligible retry.

## 3. `verificationAudit/{auditId}` — minimal decision history

**Document ID:** Firestore-generated ID. One record per completed decision.

| Field | Firestore type | Required? | Purpose and relationship |
|---|---|---:|---|
| `studentUid` | string | Yes | Student whose verification was decided; links to `users/{uid}`. |
| `decision` | string enum | Yes | `approved` or `rejected`. No rejection reason or image contents are retained here. |
| `decisionAt` | Timestamp | Yes | Decision time and start of the retention period. |
| `administratorUid` | string | Yes | UID of the named reviewer. |
| `expiresAt` | Timestamp | Yes | 12 months after `decisionAt`; used by the trusted expiry/TTL process. This is a project rule, not a statutory period. |

**Authorization:** Student may read their own audit records; trusted admins may read for authorized administration. Only the review Function creates records. Clients cannot update/delete them. Trusted expiry cleanup removes records after `expiresAt`.

## 4. `listings/{listingId}` — sale, wanted, or free listing

**Document ID:** Firestore-generated ID. No `listingId` field.

| Field | Firestore type | Required? | Allowed values / purpose and relationship |
|---|---|---:|---|
| `ownerUid` | string | Yes | Owner UID; links to `users/{uid}`. Set from Auth, never trusted from submitted client data. |
| `ownerIndexNumber` | string | Yes | Public index identity snapshot displayed to other students. Copied from the owner’s profile by trusted logic. |
| `title` | string | Yes | Listing title. Render as text, not HTML. |
| `description` | string | Yes | Listing or wanted-item details. Render as text, not HTML. |
| `type` | string enum | Yes | `sell`, `wanted`, or `free`. |
| `categoryId` | string enum | Yes | `fashion_beauty`, `electronics`, `food_drinks`, `academic`, `hostels_accommodation`, `services`, `other`. |
| `pricePesewas` | integer | Conditional | Required for an active `sell` listing; absent for `wanted` and `free`. Non-negative amount in Ghana pesewas; e.g. GH₵12.50 is `1250`. The display currency is fixed to GHS, so no floating-point amount or per-record currency field is needed. |
| `status` | string enum | Yes | `draft`, `active`, `closed`, or `removed`. Only `active` listings are visible in marketplace browsing. |
| `imageIds` | array of strings | Yes | Listing image IDs in display order. Draft may have 0–5 while being prepared; an `active` listing must have 1–5. Each image is JPG/JPEG/PNG and no more than 5 MB. |
| `createdAt` | Timestamp | Yes | Creation time. |
| `updatedAt` | Timestamp | Yes | Latest permitted content/state update. |
| `closedReason` | string enum | Conditional | `sold`, `found`, or `given_away`; required when voluntarily closed and appropriate to listing type. |
| `closedAt` | Timestamp | Conditional | Time listing entered `closed`. |
| `removedAt` | Timestamp | Conditional | Admin removal time; only for `removed`. |
| `removedByUid` | string | Conditional | Named admin UID who removed it; only for `removed`. |
| `removalReasonCode` | string enum | Conditional | `suspected_scam_or_fraud`, `prohibited_item_or_service`, `misleading_or_inaccurate`, `duplicate_listing`, `harassment_or_inappropriate_content`, `spam`, `other`; required when removed. These are the approved listing report/removal reasons. |
| `removalNote` | string | Conditional | Optional brief note to the student when removed; plain text. |

Category display labels are fixed: Fashion & Beauty, Electronics, Food & Drinks, Academic, Hostels & Accommodation, Services, Other. Listing image object paths are derived as `listings/{ownerUid}/{listingId}/{imageId}`; do not store public download URLs in the listing document.

**Authorization:** Verified-email students may read active listing data. Owners may read their own drafts/closed listings and edit only allowed content fields. Only approved students may create/publish, close, or message about listings. Trusted operations validate ownership, field shape, category/type/price consistency, image count/association, and state transitions. Admin moderation fields are writable only by a trusted admin operation. No routine client hard-delete; account-deletion workflow handles removal. Storage Rules separately control listing images.

## 5. `conversations/{conversationId}` — one buyer/seller thread per listing

**Document ID:** Deterministic lowercase hex SHA-256 of the canonical JSON tuple `[listingId, buyerUid]`, computed by the trusted conversation-creation operation. A transaction creates the document only if absent; retries return the existing thread. This enforces one conversation per buyer per listing, including concurrent create attempts. The seller UID comes from the listing, never from an untrusted request.

| Field | Firestore type | Required? | Purpose and relationship |
|---|---|---:|---|
| `listingId` | string | Yes | Links to `listings/{listingId}`. |
| `buyerUid` | string | Yes | Approved student who initiated contact; links to `users/{uid}`. |
| `sellerUid` | string | Yes | Listing owner at conversation creation; links to `users/{uid}`. |
| `participantUids` | array of strings | Yes | Exactly `[buyerUid, sellerUid]` as an immutable, bounded membership/query field. Values must match the role fields. |
| `createdAt` | Timestamp | Yes | Conversation creation time. |
| `updatedAt` | Timestamp | Yes | Latest conversation metadata update. |
| `lastMessageAt` | Timestamp | Conditional | Latest message time, for inbox ordering; absent before the first message. |

**Authorization:** Only the buyer and seller may read the conversation and its messages. A trusted creation operation requires an approved buyer and active listing. No new conversation can begin from a closed listing. An existing conversation continues after listing closure. Participant fields never change. An admin claim alone does not grant access to private conversations.

## 6. `conversations/{conversationId}/messages/{messageId}` — immutable text message

**Document ID:** Firestore-generated ID. No `messageId` or `conversationId` field; the path provides both relationships.

| Field | Firestore type | Required? | Purpose and relationship |
|---|---|---:|---|
| `senderUid` | string | Yes | Authenticated participant who sent the message; must equal request Auth UID and be a conversation participant. |
| `text` | string | Yes | Plain text, non-empty after trimming, maximum 2,000 characters. No rich HTML or link previews. |
| `createdAt` | Timestamp | Yes | Server timestamp for message creation. |

**Authorization:** Only conversation participants may read. Only an approved participant may create a message; sender UID and timestamp are trusted/server-derived or Rules-validated. Messages are immutable in the MVP. Account deletion removes messages where possible; only minimum content required for an unresolved report may be retained under the approved case-retention rule.

## 7. `reports/{reportId}` — listing/account report and moderation outcome

**Document ID:** Firestore-generated ID. No `reportId` field. Canonical reporter field name is `reporterUid` (not `reportingUid`).

| Field | Firestore type | Required? | Allowed values / purpose and relationship |
|---|---|---:|---|
| `reporterUid` | string | Yes | Approved student who submitted the report; links to `users/{uid}`. Set from Auth. |
| `targetType` | string enum | Yes | `listing` or `account`. Message reporting is out of MVP. |
| `targetId` | string | Yes | Listing document ID or account UID according to `targetType`. |
| `reasonCode` | string enum | Yes | `suspected_scam_or_fraud`, `prohibited_item_or_service`, `misleading_or_inaccurate`, `duplicate_listing`, `harassment_or_inappropriate_content`, `spam`, `other`. |
| `explanation` | string | Optional | Plain-text details, especially for `other`; keep brief and minimize personal data. |
| `status` | string enum | Yes | `open`, `resolved`, or `dismissed`; new reports start `open`. Reports do not automatically suspend accounts. |
| `createdAt` | Timestamp | Yes | Submission time. |
| `updatedAt` | Timestamp | Yes | Latest report/moderation update. |
| `resolvedAt` | Timestamp | Conditional | Resolution/dismissal time. |
| `resolvedByUid` | string | Conditional | Trusted admin UID who resolved/dismissed it. |
| `resolutionNote` | string | Conditional | Optional brief moderation outcome note; restricted and plain text. |

**Authorization:** Approved students may create reports; the backend sets `reporterUid`, `status`, and timestamps. Reporter may read their own report status. Only named trusted admins may read reports for moderation and update resolution fields. Target users/listing owners and other students cannot read report details. Enforce no duplicate open report by the same reporter/target/reason. Account suspension is not automatic. Delete only after the case is resolved and the approved retention need ends.

## 8. `accountDeletionRequests/{uid}` — deletion workflow state

**Document ID:** Requesting account UID. One active request per account; no duplicate UID field.

| Field | Firestore type | Required? | Allowed values / purpose and relationship |
|---|---|---:|---|
| `status` | string enum | Yes | `requested`, `processing`, `retry_pending`, or `completed`. |
| `currentStep` | string enum | Yes | `disable_auth`, `remove_active_listings`, `delete_id_image`, `delete_listing_images`, `remove_profile`, `remove_messages`, `finalize`. Trusted recovery resumes from this step. |
| `requestedAt` | Timestamp | Yes | Request time. |
| `updatedAt` | Timestamp | Yes | Latest trusted workflow progress. |
| `retryCount` | integer | Yes | Number of trusted retries; not a verification attempt count. |
| `processedByUid` | string | Conditional | Named admin UID who handled the request. |
| `completedAt` | Timestamp | Conditional | Time the deletion workflow completed. |
| `lastErrorCode` | string | Conditional | Sanitized operational code only; no stack trace, ID data, or unnecessary personal information. |

**Authorization:** An authenticated user may submit a request only for their own UID through a trusted request operation. The user may read status while access remains available. Named admins may read/process requests. Only trusted Functions/admin operations update workflow fields; no client can mark completion or change the current step. Delete this record only after completion and the agreed operational/privacy retention need ends. Its exact post-completion retention duration remains an operational decision before real-data use.

The workflow disables sign-in, removes active listings, deletes ID and listing images, removes the profile and messages where possible, and preserves only the minimum report material needed for unresolved cases. Operations must be retryable and idempotent. Firebase Authentication deletion alone does not delete Firestore or Storage data.

## Relationships at a glance

- `users/{uid}` is the identity anchor; its document ID and `ownerUid`, `buyerUid`, `sellerUid`, `reporterUid`, `studentUid`, and reviewer fields use Auth UIDs.
- `verification/{uid}`, `verificationAudit.studentUid`, and `accountDeletionRequests/{uid}` relate to the same user UID.
- `listings.ownerUid` relates to the owner; `ownerIndexNumber` is a public snapshot of the immutable profile identity.
- `conversations.listingId` relates to one listing; `buyerUid` and `sellerUid` relate to two user profiles; `participantUids` must exactly match those two IDs.
- Messages are children of a conversation, so their parent path establishes the conversation relationship.
- `reports.targetId` refers to a listing ID or user UID according to `targetType`; `reporterUid` relates to the reporter.
- Storage image objects are related by deterministic owner/listing/submission path segments and image IDs; an object path is not itself public authorization.

## Type, privacy, and authorization principles

- Use **strings** for stable UIDs, document IDs, enums, category IDs, and Storage image IDs/paths.
- Use **Timestamps** for all dates; authoritative timestamps come from server operations.
- Use **integers** for `attemptCount`, `retryCount`, and `pricePesewas`.
- Use bounded **arrays** only for `imageIds` (0–5 for drafts, 1–5 for active listings) and `participantUids` (exactly two). No map fields are used in this MVP schema.
- Do not use Firestore References as a substitute for authorization or existence validation.
- Public browsing is read-only for authenticated students whose UPSA email is verified, including students awaiting ID review. Listing creation, messaging, and reporting require approved verification.
- Firestore/Storage Rules enforce direct client permissions. Cloud Functions that use the Admin SDK must perform their own authorization and workflow validation because the Admin SDK bypasses Rules.
- Custom Claims are the source of trusted administrator role; never store a client-editable `isAdmin` field.
- Student-ID images remain private, are never returned as listing images or public URLs, and are deleted after the decision. Listing image access follows listing visibility and separate Storage Rules.
- These authorization statements are the contract target. The current Firebase Rules deny all, and none of these product permissions are implemented or tested yet.

## Explicitly excluded from MVP

- **Payments/orders:** no in-app payment or transaction record. Seller and buyer discuss payment offline. A Wanted item is a `listings` record with `type = wanted`, not an order.
- **Favorites:** not included; the repository marks the reserved page OPEN/POST-MVP.
- **Notifications:** no separate notification collection. The MVP presents persistent verification/report/deletion status from the records above; push or notification-inbox behavior has not been approved.
- **Dynamic categories:** fixed category IDs live in application code; no Firestore categories collection.
- **Admin collection:** admin status comes from trusted Firebase Authentication Custom Claims. Moderation outcomes are stored with the listing/report; verification decisions use `verificationAudit`.

## Implementation and testing boundary

This contract is approved design, not application behavior. Before each feature is released, add Firestore/Storage Rules and Cloud Function tests for both allowed and denied access, invalid state transitions, malformed fields, retries, and concurrent operations. Record actual commands and results in `docs/TEST_REGISTER.md`. Do not claim the contract is implemented, secure, or tested merely because it is documented.
