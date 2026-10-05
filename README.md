# Sine Kits Skills

Standard, host-neutral Agent Skills for Sine Kits. This repository contains public instructions only: no platform source, account credentials, installation data, or Provider keys.

## Install

Use your Agent's standard Skill installer, or the open Skills CLI:

```sh
npx skills add fei-bai-inc/sine-kits-skills --skill manage-game-project
```

Review the instructions and choose the target Agent in the installer. Sine Kits does not maintain per-host adapters or modify host configuration. Any Agent with standard Skill support, command execution, and network access can follow the same CLI workflow; individual hosts still need their own runtime verification.

## Log in

Requires Node.js 24.15.0, pnpm 9.4.0 and Sine Kit CLI 0.3.0. That new CLI version must be published before its download command is available.

```sh
pnpm dlx @sine-kits/kit-cli@0.3.0 agent --platform <backend-origin> --installation <installation-id> login --console <console-origin>
pnpm dlx @sine-kits/kit-cli@0.3.0 agent --platform <backend-origin> --installation <installation-id> status
```

The owner logs into Sine Kits in the browser and reviews the installation, allowed operations, resource permissions, expiry and run limits. The CLI saves the installation-scoped credential privately outside the workspace. Never paste credentials into an Agent conversation, Skill, URL, command argument, or repository. Publisher login is separate and cannot substitute for this authorization.

## First operation

Ask the installed `manage-game-project` Skill to create a game project. `projects.create` stores a real private record without Provider fees; it does not generate a game or a 3D model. The Agent submits with a stable idempotency key, waits for that same run, and reads its returned record. The Kit site shows the same installation data.

`agent logout` revokes that login Grant and removes the local credential. `agent forget` removes only the local file. The owner can also revoke in Console. Run counts are not monetary budgets, and paid image generation requires explicit user intent and owner-controlled capability authorization.

[中文说明](./README.zh-CN.md)
