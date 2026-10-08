# Contributing to UPSA Marketplace

## Workflow

1. Start from an updated `main` branch.
2. Create `feature/<short-name>`, `fix/<short-name>`, or `security/<short-name>`.
3. Make a small change tied to an approved requirement and update documentation/tests with it.
4. Run relevant checks locally using emulators and synthetic data.
5. Commit with a short imperative subject, for example `Document the local emulator workflow`.
6. Push the branch to the existing `origin` remote and open a pull request.
7. The other IT student reviews product alignment, accessibility, privacy, authorization, tests, and docs. Security-sensitive changes require a second-person review.
8. Address feedback, confirm checks actually passed, then merge using the agreed GitHub method.

Do not commit directly to shared `main`, force-push shared branches, or mark unexecuted tests as passed. Use a revert commit/PR to undo a merged change. Tag releases only after the acceptance and deployment gates.

## Pull request template

- Requirement IDs and user-visible change:
- Files/areas changed:
- Security/privacy impact:
- Tests executed (commands and actual outcome):
- Synthetic data used:
- Known limitations or OPEN decisions:
- Evidence links:

Never include real student data, ID images, credentials, or production exports in a PR.
