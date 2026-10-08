# Firebase configuration files

The Firebase CLI configuration is at the repository root in `firebase.json`, its standard discovery location. Firestore Rules, Storage Rules, and Firestore indexes live in this directory and are referenced by that root config.

`firebase.json` configures local emulators and the local Hosting preview. Emulator commands always pass the emulator-only project ID `demo-upsa-marketplace`; it is not a Firebase project. There is no `.firebaserc`, production project ID, credential, or deployment target in this repository.

Current Firestore and Storage Rules are valid fail-closed baselines that deny all client access. They are not the marketplace authorization Rules and have not been emulator-tested. Add feature permissions only alongside relevant tests and review. `firestore.indexes.json` is intentionally empty until actual queries require composite indexes.
