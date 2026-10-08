# Administrator foundation

## Who may be an administrator

Only named, trusted project administrators designated through the project owner’s approved process may receive administrator access. For MVP, designated administrators are also ID reviewers.

## Authorization lifecycle

Administrator identity is represented using Firebase Authentication Custom Claims. Claims are assigned or revoked only through a trusted owner-controlled administrative process, never from browser code. Record who authorized the change and when through the approved project administration process; do not add public admin fields to student profiles.

The specific person(s) and account-management procedure must be set by the project owner before staging/production use. No admin claim is granted by this foundation.

## Capabilities and limits

Administrators may review verification submissions, record decisions/reasons, handle reports, and remove listings as approved. Each action is authorized server-side and checked against current workflow state. Administrators do not automatically receive general access to private student conversations. Reports do not automatically suspend accounts. Admin access to student-ID images is limited to authorized review while needed.

## Revocation and account safety

The project owner must remove claims promptly when an administrator leaves or loses authorization. Test that a user without a valid claim cannot access administrative Functions even if the UI is manipulated. Do not share admin passwords or service accounts.
