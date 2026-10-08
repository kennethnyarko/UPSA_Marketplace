# Security foundation

**Status: intended controls documented; none are implemented in this skeleton.** The rule files under `firebase/` are comments only and do not protect data.

The intended architecture separates authentication (who signed in) from authorization (what that identity may do). Future Firestore and Storage Rules must enforce direct client access. Cloud Functions may perform privileged operations, but the Admin SDK bypasses Rules; each Function must therefore check authentication, trusted admin role, ownership, workflow state, and limits itself. A hidden button or frontend role flag is never security enforcement.

Student ID images must remain private, visible only to assigned trusted reviewers, and deleted after a decision in accordance with the approved workflow. Never expose shareable ID URLs or place verification details in public profiles. Real student IDs/data remain prohibited until required approvals exist; use synthetic data only.

Never commit service-account keys, private keys, secrets, `.env`, real student information, ID photos, or private exports. No Firebase project is configured here. See `AUTHENTICATION_AND_AUTHORIZATION.md`, `DATA_SECURITY.md`, `THREAT_MODEL.md`, and `SECURITY_CHECKLIST.md` for future design/review guidance.
