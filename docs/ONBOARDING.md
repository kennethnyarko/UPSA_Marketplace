# User onboarding flow

This is the approved future user journey, not an implemented workflow.

1. **Landing:** Explain the UPSA marketplace and account access requirement.
2. **Create account:** Student enters a UPSA email and password. Normalize by trimming whitespace and treating the domain case-insensitively. The Firebase Authentication email is authoritative.
3. **Verify email:** Student follows the Firebase verification link. Until verified, marketplace access is unavailable.
4. **Browse:** Verified UPSA-email users can browse active listings read-only. They can see the listing owner’s index number (email local part before `@`), not the full email or domain.
5. **Submit ID:** Student uploads a synthetic ID during development; in real use, this remains pending required approval. Only one submission may be pending. Valid finalization, not opening or failed upload, counts as an attempt.
6. **Review:** Designated administrator approves or rejects with a standard reason. The ID image is deleted after the decision. If cleanup fails, show a pending-cleanup status and block resubmission.
7. **Approved:** Student can create/manage listings, message, and report. After three finalized unsuccessful submissions, show locked status and support route.

Support contact after the attempt limit: `marketassprjt@outlook.com`.

Never tell a user a backend operation succeeded until the trusted operation confirms it. Use synthetic accounts and images for all development and demonstration.
