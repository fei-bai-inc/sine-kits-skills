# Observed acceptance — 2026-10-05

[Machine-readable proof](./2026-10-05.json) records the actual host sessions, command sequence and backend results. The Agent was Codex CLI 0.160.0; it is a verification tool, not a Skill dependency or adapter.

## develop-sine-kit

The actual Agent loaded the Skill from the public repository, read the natural-language requirements and wrote the [Reading List Kit source](../develop-kit/reading-list-kit). It used developer CLI identity/project/link, ran check/tsc/build, exercised a real local operation runner and meaningful invalid inputs, then published exactly one immutable preview deployment. Worker verification and status reached `ready`.

- Release: `1635c749-7539-4696-a652-cc06870bf118`
- Deployment: `f626bdb2-d646-44ff-bf7d-3bf1ee4a4e44`
- Original acceptance artifact: `eae03363228c5b37fdc15a051bc72b4e74eea2a04f74183c284b49e15a0b4a18`, 10 files.
- No `skills` manifest field or per-Kit Skill source.

A real development `format: uri` schema initially failed in the local runner. The Agent preserved URL pattern/handler validation and reran the example successfully. The CLI cause was then fixed to use its existing full JSON formats during local execution, and the original format-bearing path was separately run successfully. This is not evidence that formats are unsupported by the contract.

The portable source snapshot was formatted and annotated after the original deployment. Its own check/tsc/build passed in a separate clean archive-backed directory: digest `bc990d1318accc0fc98c367d620b568e4a10f2695e8934a5e7696402a224489f`, 10 files. It was not redeployed over the original immutable version; the two digests are intentionally recorded separately.

## use-sine-kit

A second isolated workspace contained only installed generic Skill, CLI packages, selection and natural-language prompt, not Kit source or operation names/fields. The actual Agent loaded the Skill, discovered `entries.save`, inspected its JSON schemas, wrote the approved title/URL/note and one stable key, submitted once, waited and read the persisted record.

- Run: `4f76b971-88f6-4372-a6f5-9d5d3c9a1e97`, `succeeded`.
- Record: `d0116251746fd00441016b59b8068d78213f3d85adf83d1c7df861bf1282ade5`, `reading-entry`.
- Owner API saw the identical record and Grant `usedRuns=1`.
- After revocation, an additional actual Skill/CLI lookup returned `FORBIDDEN`, exit 3, request `9f70e0ec-de0b-4f4e-aae0-901f2017145e`; no reauthorization or mutation.

## Exact limits

- Authentication was real code/state/S256 exchange with explicitly bounded consent from a fresh seeded disposable account, driven by the acceptance operator. No existing user's permissions were approved or modified.
- Packages used explicit local contracts/CLI 0.3.0 release archives while npm publication required external user approval; this is **not** public 0.3.0 package consumption.
- Backend, worker, SQL, isolated operation execution and persisted records were real; no mocked API or fake result.
- Visual UI/human-browser consent remains unverified: the model host's Ego bootstrap was inaccessible, and the existing parent browser task remained user-controlled. No alternate browser task or profile was used to bypass control.
- No Provider invocation, content generation, production promotion or remote Cloudflare rollout.

An anonymous deployed site request returned 401 until installation launch. That is authorization denial, not successful authenticated UI proof.

[中文证据](./README.zh-CN.md)
