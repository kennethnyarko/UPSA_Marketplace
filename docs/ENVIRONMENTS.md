# Environments

**Status: planned; none are configured or connected.** This document records the intended separation, not a live setup.

- **Local:** Firebase Emulator Suite, synthetic data only.
- **Staging:** separate Firebase project, synthetic data only.
- **Production:** separate Firebase project. Real student data is prohibited until required approval.

Each environment must explicitly identify its Firebase project, Authentication, Firestore, Storage and Functions configuration. Local development must target emulators and fail closed if configuration is missing; it must never silently fall back to production. Project IDs and local configuration belong outside committed source where appropriate; secrets and service-account keys must never be committed.

There is currently no `.firebaserc`, active `firebase.json` configuration, project ID, emulator port map, deploy command, or connected Firebase project. `firebase/firebase.json` is an empty placeholder. Do not run Firebase commands against this skeleton or treat the placeholder as deployable. When implementation starts, document exact setup and verify emulator connections before creating test data.
