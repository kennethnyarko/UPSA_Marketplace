# Data security

**Status: design guidance only.** This repository has no live Firebase Rules. The files in `firebase/` are comment-only placeholders, so they currently provide no data protection.

Classify future data as public marketplace content, private account information, highly sensitive student-ID submissions, private conversations, and restricted moderation/audit records. Keep private data out of public profiles and minimize what is retained. Student ID images should be private, restricted to named trusted reviewers, and deleted after the decision; the approved minimal verification audit follows the 12-month project retention rule.

Use fake identities, images, listings, messages and reports for development and demonstrations. Real student data is prohibited until required supervisor/ethics/privacy approval. Never put secrets, service-account files, real IDs or private exports in Git. Rules, Storage access, privileged Functions and deletion workflows must be implemented and tested before any real use; this document is not evidence those safeguards exist.
