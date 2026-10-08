# Operations foundation

## Owners

The designated project administrator/IT owner is responsible for operational failures, including stuck ID cleanup, failed privileged Functions, repeated retry failures, and account-deletion failures. Name the primary and backup owners before staging/production use; no real admin claim is assigned by the foundation.

## Events to detect

- Verification in `cleanup_pending` beyond normal processing.
- Failed ID/listing image deletion.
- Failed privileged Function or repeated retries.
- Partial account deletion.
- Unexpected authorization denials or suspected unauthorized access.

## Logs and privacy

Use reliable server-side error logs when Functions are implemented. Include request/workflow identifiers and safe error context, not image contents, credentials, full email addresses, or unnecessary student details. Sophisticated analytics are not required for the MVP.

## Recovery

Privileged operations must be state-checked, retryable, and idempotent. An operator must inspect the workflow state before retrying; do not manually mark cleanup complete or delete audit evidence to clear a queue. Document the action and outcome. Never retry against production using local scripts.

## Incident handling

For a suspected privacy/security incident: stop the affected activity, notify the project owner/IT lead privately, preserve minimum necessary diagnostic records, protect credentials, and follow the supervisor/project response process. Do not put personal data or secrets in GitHub issues.

## Deployment ownership

The owner designates environment owners and deploy operators. Staging remains synthetic. Production real-data use is blocked until required approval is obtained. Record deployment commit, target project, operator, reviewer, and outcome when deployments begin.
