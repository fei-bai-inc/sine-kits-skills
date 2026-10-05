---
name: manage-game-project
description: Manage installation-scoped game projects and generate private 2D game image resources with explicit approval.
---

## Select an installation and sign in

This is the standard domain Skill from https://github.com/fei-bai-inc/sine-kits-skills. Install it through your Agent host’s Skill manager, or use `npx skills add fei-bai-inc/sine-kits-skills --skill manage-game-project` and select your host and scope in that external installer. No host adapter or appended installation binding is required.

Use `@sine-kits/kit-cli` 0.3.0 after that version is published. Ask the user to select their actual installation and operator-provided backend and Console origins, or use values they have already explicitly selected. Replace `<installation-id>`, `<backend-origin>`, and `<console-origin>` in every command with those actual values; replace all record/run/asset/key/file placeholders with actual selected or returned values. Never execute literal placeholders, guess an installation, or change its scope. Consult `agent --help` and each action’s `--help` for supported arguments.

```bash
pnpm dlx @sine-kits/kit-cli@0.3.0 agent --platform <backend-origin> --installation <installation-id> login --console <console-origin>
pnpm dlx @sine-kits/kit-cli@0.3.0 agent --help
```

Login obtains an installation-scoped Agent Grant through explicit owner consent in the browser. The owner reviews the pinned release, selects operations and resource permissions, and sets expiry and run limits; no scope is selected automatically. The browser returns only a short-lived authorization code; the CLI exchanges it with PKCE and stores the credential. Optional `--no-open` disables automatic browser opening, not consent; `--redirect-uri` must match the operator-registered HTTP 127.0.0.1 callback (default `http://127.0.0.1:7203/callback`). Never approve or click for the owner. Never ask for credentials in conversation or read, print, copy or embed the credential file. Do not use curl, direct provider HTTP, publisher login, development credentials, or browser SDK functions for Agent work.

```bash
pnpm dlx @sine-kits/kit-cli@0.3.0 agent --installation <installation-id> --platform <backend-origin> status
pnpm dlx @sine-kits/kit-cli@0.3.0 agent --installation <installation-id> --platform <backend-origin> records list --type game-project
pnpm dlx @sine-kits/kit-cli@0.3.0 agent --installation <installation-id> --platform <backend-origin> records get <record-id>
```

The grant covers the entire installation, not an individual project. The CLI runs as the OS user, not in a sandbox. Run limits are not monetary budgets. Missing, expired or revoked authority is a stop condition: ask the owner to explicitly authorize login in their terminal; never automatically recreate authority. A lost login/token response requires owner inspection and revocation of any newly created grant before a new login, not an automatic retry that creates another grant. `agent ... logout` revokes the current grant and removes its local credential; failed remote revocation retains the credential for explicit retry or Console revocation. `agent ... forget` removes local credentials only, not installed instructions or server authority; Console can revoke grants independently. Revocation cannot undo an external task already dispatched.

## Projects

Obtain explicit user intent before creating a record. `projects.create` accepts `{ "name": string, "brief": string }`, persists a `game-project` record, and needs no provider connection or provider fee. Project creation alone does not generate an image, game or 3D model. The grant needs allowed operation `projects.create` and `records:read`, `records:write`, `runs:read`, `runs:submit`.

Write the user-approved operation input to `project-input.json` in the trusted workspace (not the installed Skill directory):

```json
{ "name": "My game", "brief": "A small 2D puzzle prototype" }
```

Choose and persist a unique stable request key before submission; keep it with the exact input and later run ID. Do not use the literal example key for multiple requests.

```bash
pnpm dlx @sine-kits/kit-cli@0.3.0 agent --installation <installation-id> --platform <backend-origin> runs submit --operation projects.create --input-file project-input.json --idempotency-key <stable-project-request-key>
pnpm dlx @sine-kits/kit-cli@0.3.0 agent --installation <installation-id> --platform <backend-origin> runs wait <run-id>
pnpm dlx @sine-kits/kit-cli@0.3.0 agent --installation <installation-id> --platform <backend-origin> runs get <run-id>
pnpm dlx @sine-kits/kit-cli@0.3.0 agent --installation <installation-id> --platform <backend-origin> records get <returned-record-id>
```

Only report creation after the run succeeds and its returned record is confirmed in this installation.

## Generate a private 2D image

1. Read installation-scoped `game-project` records with the commands above and select an existing project. Do not use a record from another installation or invent a project ID.
2. Ask the owner to ensure the installation's `illustration` slot is bound in Console to an implementation of `media.image.generate@1` with PNG output. Do not request a connection identifier, provider credentials, or model configuration in Kit input. All provider execution flows through the trusted host and OpenConnector.
3. Obtain explicit user intent for the selected project, image name and exact prompt, including acknowledgement that generation can charge the owner's connected provider account. A grant's run limit is not spending authorization. The semantic request is one 1024 × 1024 image; the installation binding owns provider-specific settings. Never infer paid generation intent from project creation.
4. Write `illustration-input.json` in the trusted workspace using the actual selected project ID and approved text:

```json
{ "projectId": "<project-id>", "prompt": "<approved-image-prompt>", "name": "<approved-image-name>" }
```

Name is limited to 120 characters and prompt to 4000; all fields must be non-empty. `illustrations.create` is the same operation used by the site. The handler validates the installation-scoped project and invokes slot `illustration`, stable step `portrait`, with `{ prompt, count: 1, size: '1024x1024' }`. The grant must allow this operation and its required record/resource permissions; the owner must separately authorize the capability binding. Do not broaden permissions yourself.

```bash
pnpm dlx @sine-kits/kit-cli@0.3.0 agent --installation <installation-id> --platform <backend-origin> runs submit --operation illustrations.create --input-file illustration-input.json --idempotency-key <stable-image-request-key>
pnpm dlx @sine-kits/kit-cli@0.3.0 agent --installation <installation-id> --platform <backend-origin> runs wait <run-id>
pnpm dlx @sine-kits/kit-cli@0.3.0 agent --installation <installation-id> --platform <backend-origin> runs get <run-id>
```

5. When `awaiting_approval`, direct the owner to the same run's capability control in Console to review the frozen exact input, implementation revision, configuration and server-provided control link. Only the owner can approve the exact intent and resume that same preserved run. An Agent grant cannot mutate bindings, approve or resume; a checkbox or Kit input field cannot grant provider authority. If no review link is available in the result, use the installation's Console run view rather than inventing a URL.
6. Successful output is `{ "asset": KitAsset, "record": KitRecord, "executionId": string, "usage": JsonValue }`. The asset is a ready private PNG. The persistent `game-image` record contains `assetId`, `projectId`, `prompt`, `name`, `executionId`, and trusted provider `usage`. Confirm the record with `records get <record-id>` and only claim generation after successful output is confirmed. With `assets:read`, inspect and download the private asset using the actual asset ID returned by this run or confirmed record. Choose a new output file in the trusted workspace; do not overwrite an existing user file. Never persist/share bearer URLs, raw provider URLs or base64 content, or manufacture generated images.

```bash
pnpm dlx @sine-kits/kit-cli@0.3.0 agent --installation <installation-id> --platform <backend-origin> assets get <returned-asset-id>
pnpm dlx @sine-kits/kit-cli@0.3.0 agent --installation <installation-id> --platform <backend-origin> assets download <returned-asset-id> --output <new-image-file.png>
```

## Same-key recovery and failure handling

A submission response is acceptance, not completed work. If submission returns an ambiguous network result before a run ID is known, retry only the same operation with the same exact input and original idempotency key. A key conflict requires inspection; never change input under the same key or mint a fresh key to bypass ambiguity. Once a run ID is known, use `runs get`/`runs wait` on that ID, not another submission.

Wait timeout does not mean the underlying run failed. Queued, running, `awaiting_approval` or reconciling states are not success and never justify resubmission. Resume only the same approved run through owner Console, preserving the `portrait` step. The platform owns reconciliation and persisted artifacts. Uncertain approval/resume responses require inspection of that same run, never a fresh paid request. Failed, cancelled, blocked, timed-out or uncertain outcomes are not success; inspect the available run error/request ID and ask the owner for the required action without exposing private content or secrets.

Only when the user explicitly asks to cancel, and the grant allows `runs:cancel`, use:

```bash
pnpm dlx @sine-kits/kit-cli@0.3.0 agent --installation <installation-id> --platform <backend-origin> runs cancel <run-id>
```

Cancellation is limited to this grant's own runs and cannot undo persisted records or completed external effects. Both the site and this Skill share these domain operations, installation-scoped records, private assets and run diagnostics. A standard Skill and host-neutral CLI do not guarantee every host’s compatibility, a paid marketplace, or a 3D-generation capability.
