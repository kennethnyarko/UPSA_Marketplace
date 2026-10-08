# UPSA Marketplace

UPSA Marketplace is a planned verified student marketplace. This repository now has the local development foundation and file map; **marketplace features remain unimplemented**.

## First local setup

1. Install Node.js 22 and Java JDK 11 or later (Java 17 is the team choice). See [`docs/LOCAL_DEVELOPMENT.md`](docs/LOCAL_DEVELOPMENT.md).
2. From this folder, run `npm ci`.
3. Run `npm run serve` for the local static preview at `http://127.0.0.1:5005/`, or `npm run emulators` to start Hosting plus Auth, Firestore, Storage, and Functions emulators.
4. Stop emulators with Ctrl+C. Restart to clear in-memory synthetic data.

Local scripts use only the emulator-only ID `demo-upsa-marketplace`. This is not a Firebase project. There is no production alias, credential, or deploy script in the local workflow. The current machine lacks Java, so the full emulator suite cannot start until a JDK is installed. The Hosting-only preview does not require Firebase production credentials.

## Where to learn the project

- [Architecture](docs/ARCHITECTURE.md), [structure](docs/PROJECT_STRUCTURE.md), [page map](docs/PAGE_MAP.md)
- [Local development](docs/LOCAL_DEVELOPMENT.md), [student developer guide](docs/STUDENT_DEVELOPER_GUIDE.md), [environments](docs/ENVIRONMENTS.md)
- [Decisions](docs/DECISIONS.md), [implementation roadmap](docs/IMPLEMENTATION_ROADMAP.md), [current status](docs/IMPLEMENTATION_STATUS.md)
- Security guidance: `docs/SECURITY.md`, `docs/AUTHENTICATION_AND_AUTHORIZATION.md`, `docs/DATA_SECURITY.md`, `docs/THREAT_MODEL.md`, and `docs/SECURITY_CHECKLIST.md`

All development/demo information must be synthetic. Real student ID/data remains pending required supervisor/ethics/privacy approval. The Rules currently deny all client access as a safe baseline; they are not complete or emulator-tested marketplace Rules.
