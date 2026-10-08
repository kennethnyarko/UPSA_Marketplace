# Decision register

These are resolved project decisions. They are not implementation or test evidence.

| ID | Decision |
|---|---|
| D-01 | Plain HTML, CSS, and browser JavaScript; no frontend framework for MVP. |
| D-02 | Firebase Authentication email is authoritative; accepted domain `upsamail.edu.gh`; trim whitespace and treat domain case-insensitively. |
| D-03 | Public index identity is normalized email local part before `@`; do not invent a format or enrollment-matching rule. Full email/domain are private. |
| D-04 | Users with verified UPSA email may browse read-only before ID approval. Approved student required for listing writes, messaging, and reporting. |
| D-05 | Logical Firestore collections and field schemas are in `DATA_MODEL.md`; private verification is separate from public profile. |
| D-06 | Admin authorization uses Firebase Authentication Custom Claims, assigned/revoked only through a trusted administrative process. |
| D-07 | Verification states: `needs_id`, `pending_review`, `cleanup_pending`, `rejected_resubmit`, `approved`, `locked`. |
| D-08 | One pending verification at a time; maximum three finalized unsuccessful submissions; only valid finalization into queue counts. |
| D-09 | ID image path `verification/{uid}/{submissionId}/student-id`; private; JPG/JPEG/PNG, max 5 MB; deletion after decision; retry and block during cleanup pending. |
| D-10 | Listing image path `listings/{uid}/{listingId}/{imageId}`; 1–5 images, JPG/JPEG/PNG, max 5 MB each; backend validates ownership and association. |
| D-11 | Listing types `sell`, `wanted`, `free`; fixed categories are in `DATA_MODEL.md`; no unapproved optional listing fields. |
| D-12 | Listing states `draft`, `active`, `closed`, `removed`; removed listings cannot be restored in MVP. |
| D-13 | Listing owner index number is visible; full email, physical ID details, verification/audit/admin details are not. |
| D-14 | Cursor pagination, 20 active listings initially, stable creation ordering with deterministic secondary order. |
| D-15 | Messaging is listing-linked, text-only, max 2,000 characters, nonempty/non-whitespace, links plain text/no preview, safe rendering. |
| D-16 | Existing conversations continue after listing closure; no new conversation from closed listing. No message reporting or general admin access to private chats. |
| D-17 | Reports target listings/accounts; states `open`, `resolved`, `dismissed`; no automatic suspension. No duplicate open report by same reporter/target/reason; after closure a genuinely new concern may be reported. |
| D-18 | Account deletion is admin-assisted and follows the ordered, retryable/idempotent cascade in `DATA_MODEL.md` and Documents 1–3. |
| D-19 | Verification audit fields are minimal; retained 12 months after decision using trusted scheduled expiry; project rule, not statutory period. |
| D-20 | Environments: local Emulator Suite, separate synthetic staging project, separate production project. No silent production fallback. |
| D-21 | Listing images remain with historical listing during its approved moderation/retention period; account deletion removes them unless limited retention is needed for unresolved case. |
| D-22 | Admin/IT owner is responsible for important operational failures; reliable server logging and stuck-workflow response process required; no sophisticated analytics required. |
| D-23 | No real student IDs/data until required supervisor/ethics/privacy approval. Synthetic data only during development/testing/demo. |
| D-24 | Payment processing, message reporting, automatic suspension, admin-managed categories, advanced search, listing restoration, fraud detection, and safety guarantees are outside MVP. |
| D-25 | Students who exhaust verification attempts use the confirmed support contact `marketassprjt@outlook.com`. |

## Remaining external approval boundary

**PENDING APPROVAL:** Use of real student IDs and real student data. Project owner must record actual approval evidence before enabling that use.
