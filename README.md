# Sine Kits Skills

Exactly two standard, host-neutral Skills cover every Kit. Adding a new Kit or operation does not require adding or changing a Skill.

| Skill | Use it for | Authority |
| --- | --- | --- |
| [develop-sine-kit](./skills/develop-sine-kit/SKILL.md) | Create, implement, validate and publish an independent Kit | Publisher CLI login and owned projects |
| [use-sine-kit](./skills/use-sine-kit/SKILL.md) | Discover and invoke any installed Kit's operation contracts; wait and read results | Owner-approved installation Agent Grant |

Domain semantics belong in a Kit's operation descriptions, input/output JSON Schemas, handlers and site. The generic usage Skill discovers those contracts through `operations list/inspect`. New Kits need no `skills` manifest field, per-Kit Skill or custom host adapter. Existing immutable releases can retain historical Skill metadata without making it an authoring requirement.

## Install the role you need

Use your Agent's standard Skill manager, or the external open Skills CLI:

```sh
npx skills add fei-bai-inc/sine-kits-skills --skill develop-sine-kit
npx skills add fei-bai-inc/sine-kits-skills --skill use-sine-kit
```

Review the instructions and choose the host/scope in that installer. Sine Kits neither installs host adapters nor edits Agent configuration. Any host with standard Skill support, command execution and network access uses the same workflow; installation does not prove every host has been runtime-verified.

## Develop a Kit

Requires Node.js 24.15.0, pnpm 9.4.0 and CLI/contracts 0.3.0 once published. Existing SDK 0.2.0 and UI/kit-ui 0.1.0 remain independent dependencies.

```sh
pnpm dlx @sine-kits/kit-cli@0.3.0 create <new-directory> --registry https://registry.npmjs.org/
pnpm exec sine-kit --platform <backend-origin> login --web <web-origin>
```

Follow `develop-sine-kit` for project ownership/linking, domain contracts, local development, checks, immutable preview publication and independent review. Do not use publisher credentials to access another user's installation.

## Use an installed Kit

```sh
pnpm dlx @sine-kits/kit-cli@0.3.0 --json agent --platform <backend-origin> --installation <installation-id> login --console <console-origin>
pnpm dlx @sine-kits/kit-cli@0.3.0 --json agent --platform <backend-origin> --installation <installation-id> operations list
pnpm dlx @sine-kits/kit-cli@0.3.0 --json agent --platform <backend-origin> --installation <installation-id> operations inspect <actual-operation-id>
```

The owner signs in and explicitly approves the installation, pinned release, allowed operations, resource permissions, expiry and run limits. The CLI keeps the restricted credential outside the workspace. Never put credentials in a Skill, conversation, URL or command argument. Follow `use-sine-kit` to construct approved JSON input from the actual discovered schemas, submit one stable intent, wait on the same run and read authorized results shared with the Kit site.

`agent logout` revokes the login Grant and removes the local credential; `agent forget` removes only the local file. Run limits are not monetary budgets. Provider effects require explicit intent and owner-controlled capability authorization.

CLI/contracts 0.3.0 download commands require their separate npm publication; no local archive is presented as public package distribution.

## Real examples

[Reading List Kit examples](./examples/README.md) provide separate developer and usage prompts plus the actual Agent-authored Kit snapshot and dated evidence. The usage prompt intentionally omits operation IDs and input fields, requiring discovery rather than a domain Skill. Example installation needs the published packages or an explicitly labelled release-candidate setup; evidence states that distinction.

[中文说明](./README.zh-CN.md)
