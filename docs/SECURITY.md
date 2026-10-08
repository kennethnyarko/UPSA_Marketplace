# Security foundation

**Status: guidance plus a foundation baseline; marketplace controls are not implemented.** The Firestore and Storage Rules files deny all client access, but have not been compiled or tested in the Emulator Suite.

The intended architecture separates authentication (who signed in) from authorization (what that identity may do). Future Firestore and Storage Rules must enforce direct client access. Cloud Functions may perform privileged operations, but the Admin SDK bypasses Rules; each Function must therefore check authentication, trusted admin role, ownership, workflow state, and limits itself. A hidden button or frontend role flag is never security enforcement. Current deny-all Rules are a safe setup baseline, not the full access policy.

Student ID images must remain private, visible only to assigned trusted reviewers, and deleted after a decision in accordance with the approved workflow. Never expose shareable ID URLs or place verification details in public profiles. Real student IDs/data remain prohibited until required approvals exist; use synthetic data only.

Never commit service-account keys, private keys, secrets, `.env`, real student information, ID photos, or private exports. No Firebase project is connected here. See `AUTHENTICATION_AND_AUTHORIZATION.md`, `DATA_SECURITY.md`, `THREAT_MODEL.md`, and `SECURITY_CHECKLIST.md` for future design/review guidance.
