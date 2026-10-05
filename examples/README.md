# Real Skill examples

These examples exercise the two published universal Skills, not a per-Kit Skill or a mocked API. The concrete domain is a nonfee Reading List Kit: persist a title, article URL and note, then read the same record. The user has requested this example record write; it does not generate article content or invoke a Provider.

## Developer example

1. Install `develop-sine-kit` through your host's standard Skill manager.
2. Start a trusted independent workspace with Node 24.15.0 / pnpm 9.4.0 and released Sine Kits packages.
3. Complete publisher CLI login yourself for an owned test project.
4. Give the Agent [develop-kit/prompt.md](./develop-kit/prompt.md).
5. Observe real code changes, CLI check, TypeScript check, build, immutable preview publication and ready status. Retain its IDs and digest; do not count a compiler-only result as deployment proof.

The actual Agent-authored [Reading List Kit source snapshot](./develop-kit/reading-list-kit) is included; its domain lives only in descriptions, JSON Schema, handler and localized site. No additional Skill is needed. [Observed host/backend proof](./evidence/README.md) records the real runs and exact limitations.

## Usage example

1. Install `use-sine-kit` independently of the Kit's source.
2. Select the ready test installation and complete ordinary Agent CLI browser login with bounded owner permission. The example needs permission to read/write its records, read/submit runs and invoke the appropriate discovered operation.
3. Give the Agent [use-kit/prompt.md](./use-kit/prompt.md), the actual installation ID and backend/Console origins. The prompt intentionally omits operation ID and JSON fields.
4. Confirm from host events that it loaded the Skill, listed operations, inspected the selected schemas, saved exact input/idempotency identity, submitted once, waited on that run and read the returned record. Owner/site must see the same persisted result.
5. Revoke/logout the Grant and observe a subsequent actual CLI read rejection; do not let the Agent recreate authority automatically.

## Evidence policy

Only observed host events and platform state are acceptance. A shell script doing the work for the Agent, an installed folder, a successful test fixture, or an Agent's unsupported claim does not prove Skill usability.

The local recorded acceptance may use explicitly identified 0.3.0 release archives while npm publication is awaiting user approval; archive proof is not public package installation. Disposable seeded accounts can authorize the real login protocol without touching existing owner data; that controlled protocol evidence is not a human-operated browser UI claim. No private credentials, cookies, tokens, local absolute paths or generated outputs belong in the public example snapshot.

[中文说明](./README.zh-CN.md)
