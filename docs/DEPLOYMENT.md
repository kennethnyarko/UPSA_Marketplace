# Deployment plan

**Status: not configured or deployed.** There is no Firebase project, deployable application, Hosting configuration, or deployment command in this skeleton.

The intended release path is local emulators → separate staging project using synthetic data → production only after required approval and a readiness review. Before any deployment, the team must explicitly confirm the selected project ID, Auth configuration, Firestore/Storage Rules, indexes, Functions, Hosting output, secrets, rollback approach, and evidence from tests. Never use a local placeholder or copy production configuration into development.

The owner must create and control the staging/production Firebase projects and ensure at least two named project owners. Real student IDs/data must not be collected or used until supervisor/ethics/privacy approval is obtained. Do not run Firebase deployment commands against the current placeholder files.
