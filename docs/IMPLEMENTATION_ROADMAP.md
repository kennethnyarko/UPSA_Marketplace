# Implementation roadmap

This is an ordered plan, not evidence that any feature is complete.

1. **Foundation:** Verify local emulators, baseline Rules tests, environment guard, docs, tokens, GitHub collaboration.
2. **Authentication:** Add browser Firebase config by explicit environment; sign-up, sign-in, email verification, reset, and access handling; test synthetic accounts and domain restrictions.
3. **User profile/index identity:** Create minimal `users/{uid}` from authoritative Auth email; test normalized local-part display and full-email privacy.
4. **Rules baseline:** Add narrowly scoped Firestore/Storage Rules per feature with emulator allow/deny tests before exposing each access path.
5. **Admin authorization:** Set up trusted Custom Claims assignment/revocation procedure and test non-admin denial. No claims granted by client.
6. **Verification:** Trusted submission/review, one-pending and three-attempt limits, private ID upload, deletion/retry, minimal audit expiry; test races and failures.
7. **Listing images and listings:** Add validated image ownership/path, schema, draft/publish/close/remove flows; tests for authorization and all image boundaries.
8. **Marketplace browse:** Active listing browse, owner index number, category behavior, cursor pagination of 20, privacy; synthetic data only.
9. **Messaging:** Participant-fixed text conversations and closed-listing behavior; permission and validation tests.
10. **Reporting/moderation:** Duplicate-open prevention, report resolution/dismissal, listing removal; tests for all reasons/roles.
11. **Account deletion:** Trusted, idempotent cascade with unresolved-case and audit retention behavior; failure/retry tests.
12. **Integration/security testing:** Full emulator journeys, concurrency/failure suite, accessibility checks, evidence records.
13. **Staging:** Owner-created separate project, synthetic-data integration/security test and review.
14. **Production-readiness review:** Resolve approvals, environment owners, deployment review, operational response, defects, and evidence. Real data stays blocked until approval.

Security dependencies cannot be skipped to meet schedule. Two students should agree on small task ownership in each pull request and review one another’s security-sensitive changes.
