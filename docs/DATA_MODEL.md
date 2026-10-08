# Data model

The following logical records and field names are approved. This document describes intended data, not records currently present in a Firebase project.

## Collections

### `users/{uid}` — minimal marketplace identity

Fields: `uid`, `indexNumber`, optional approved `displayName`, `createdAt`, `updatedAt`.

`indexNumber` is the normalized Firebase Authentication email local part before `@`. The full email remains in Firebase Authentication and is never exposed in the public profile. Do not store physical student-ID number/image, verification/audit data, admin secrets, or unnecessary private fields here.

### `verification/{uid}` — private workflow state

Fields: `uid`, `state`, `attemptCount`, `pendingSubmissionId`, `currentSubmissionId`, `currentImagePath`, `decision`, `rejectionReasonCode`, `rejectionExplanation`, `submittedAt`, `reviewedAt`, `reviewerUid`, `cleanupStatus`, `cleanupPendingSince`, `updatedAt`.

Only fields necessary for the workflow are stored. Client users cannot modify workflow-controlled values. Image bytes are in private Storage, not Firestore.

### `verificationAudit/{auditId}` — minimal retained decision record

Fields: `studentUid`, `decision`, `decisionAt`, `administratorUid`, `expiresAt`.

Retain for 12 months after decision; a trusted scheduled backend deletes expired records. The duration is a project rule, not a statutory period.

### `listings/{listingId}`

Fields: `listingId`, `ownerUid`, `ownerIndexNumber`, `title`, `description`, `type`, `category`, `price`, `status`, `imageIds`, `createdAt`, `updatedAt`.

Types: `sell`, `wanted`, `free`. Categories: `fashion_beauty`, `electronics`, `food_drinks`, `academic`, `hostels_accommodation`, `services`, `other`. Sell requires price; Wanted and Free have absent/null price. Do not add optional fields.

### `conversations/{conversationId}`

Fields: `conversationId`, `listingId`, `participantUids`, `createdAt`, `updatedAt`, `lastMessageAt`. Participants are fixed after creation.

### `conversations/{conversationId}/messages/{messageId}`

Fields: `messageId`, `conversationId`, `senderUid`, `text`, `createdAt`. Sender identity comes from trusted authentication context.

### `reports/{reportId}`

Fields: `reportId`, `reportingUid`, `targetType`, `targetId`, `reasonCode`, `explanation`, `status`, `createdAt`, `updatedAt`, `resolvedAt`, `resolvedByUid`, `resolutionNote`.

Targets are listings/accounts. Statuses: `open`, `resolved`, `dismissed`. Reports do not automatically suspend accounts.

## Privacy classes

- Public marketplace identity: index number; only other specifically approved display information if applicable.
- Private workflow data: verification records, ID image paths, reviewer/decision workflow details.
- Restricted audit: minimal verification decision record with expiry.
- Marketplace data: listings and listing image references.
- Participant-only data: conversation and messages.
- Moderation data: reports and resolution details, restricted to reporter and authorized administrators as designed.

## Storage objects

- Student IDs: `verification/{uid}/{submissionId}/student-id` — private, reviewer access only, deleted after decision.
- Listing photos: `listings/{uid}/{listingId}/{imageId}` — separate path and Rules policy; 1–5 images, JPG/JPEG/PNG, at most 5 MB each.

Do not expose document/object paths or IDs as public user-facing identity.
