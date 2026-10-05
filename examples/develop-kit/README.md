# Develop example

Run [prompt.md](./prompt.md) with the published `develop-sine-kit` Skill in a trusted independent workspace. The Agent implements a real Reading List Kit using operation descriptions, JSON Schema, a TypeScript handler and a localized independent site.

Prerequisites: Node 24.15.0, pnpm 9.4.0, installed released packages and an explicitly authorized publisher CLI session. Contracts/CLI 0.3.0 local archives are allowed only for clearly labelled release-candidate acceptance, not as proof of public npm consumption.

Expected observed behavior: actual CLI check/TypeScript/build, no per-Kit Skill directory or manifest field, an immutable preview deployment that reaches ready, and server-owned project/release/deployment IDs. Build acceptance must not be called production rollout or a paid product launch.

The `reading-list-kit` snapshot is captured from the actual Agent implementation and excludes local overrides, credentials, generated output and host installation files. This directory is an example, not another Skill.
