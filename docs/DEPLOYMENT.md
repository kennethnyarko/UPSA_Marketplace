# Deployment plan

**Status: production/staging not configured or deployed.** The root `firebase.json` is prepared for local emulators and a static build target. It does not establish Firebase projects, credentials, Hosting sites, or deployment authorization.

The intended path remains local emulators → separate staging project with synthetic data → production after the required readiness and approval gates. The local scripts only build and start emulators; they do not deploy. Do not run `firebase deploy` until the project owner has created and verified the intended target projects, both students understand the selected target, all Rules/tests have evidence, rollback and ownership are defined, and any real-data approval exists.

The owner must create and control separate staging/production Firebase projects and ensure at least two named project owners. Real student IDs/data must not be collected or used until supervisor/ethics/privacy approval is obtained.
