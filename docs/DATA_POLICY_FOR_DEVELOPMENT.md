# Development data policy

## Synthetic data only

Development, testing, and demonstration must use synthetic data, including fake UPSA-style email addresses, fake student identities and ID images, fake listings and sample images, fake conversations/messages/reports, and synthetic administrator accounts.

Do not copy, upload, review, retain, commit, or demonstrate real student information or real student IDs before the required supervisor, ethics, privacy, or project approval exists. Approval must be evidenced; it must not be assumed.

## Storage and Git

Do not commit emulator exports, real records, private uploads, service-account files, `.firebaserc`, or `.env`. Use ignored local configuration. Remove synthetic exports when no longer required and never restore a production export into local development.

## If real data is found

Stop processing it, do not copy or forward it, restrict access, and notify the project owner through the approved private route. Follow the project’s approved incident process.
