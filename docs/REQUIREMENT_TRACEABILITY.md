# Requirement traceability

This is a planning map only. The listed components and tests do not yet exist as working code or executed tests. Requirements remain in the approved project documents and decision register.

| Requirement area | Planned page/source location | Planned trusted/security component | Future test/evidence |
|---|---|---|---|
| School email and email verification | `src/pages/auth/`, `src/services/auth/` | Auth configuration, Rules, Functions if required | `tests/security/`, `tests/integration/` |
| Student ID review and attempt limit | `src/pages/verification/`, `src/pages/admin/` | `functions/src/verification/`, private Storage Rules | Security/integration cases in `tests/` |
| Sell/Wanted/Free listings and photos | `src/pages/listings/`, `src/pages/marketplace/` | `functions/src/listings/`, Firestore/Storage Rules | Unit, integration and security tests |
| In-app messaging | `src/pages/messaging/` | `functions/src/messaging/`, Rules | Membership/privacy and closed-listing cases |
| Reports and moderation | `src/pages/reports/`, `src/pages/admin/` | `functions/src/reports/`, `functions/src/admin/` | Authorization and workflow tests |
| Account deletion and retention | `src/pages/account/` | `functions/src/account/` | Partial failure, retry and retention evidence |

When a feature is implemented, replace planned locations with actual file paths and test IDs. Mark status only from inspected implementation and executed test evidence.
