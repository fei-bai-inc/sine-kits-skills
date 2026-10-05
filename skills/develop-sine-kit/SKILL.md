---
name: develop-sine-kit
description: Build, debug, validate and publish any independent Sine Kit through the shared SDK and developer CLI. Use for Kit authoring and release management, not for operating a user's installed Kit.
---

# Develop a Sine Kit

This is one reusable authoring Skill for every Kit and every compatible Agent host. New Kits do not require new Skills. Put domain semantics in operation descriptions, JSON input/output schemas, handlers and the independent site; never create or publish a per-Kit Skill as part of this workflow.

## Preconditions and authority

Use Node.js 24.15.0, pnpm 9.4.0 and CLI/contracts 0.3.0 once those releases are publicly available. Do not replace missing published dependencies with platform source imports, cross-repository workspace links or invented APIs. Obtain the actual operator-provided backend and web origins. Run `sine-kit --help` and each command's `--help` from the installed CLI before choosing options.

Publisher login is distinct from installation Agent login. Use developer authority only for projects and releases owned by the user. Never read, print, copy or embed credential files or Provider secrets. Do not approve owner installation grants, risk acknowledgements or paid generation on the user's behalf. Local Kit code and dependency installation run with the OS user's permissions; they are not malicious-code sandboxes.

## Create or select an independent project

For a new project, use the released CLI outside the platform workspace:

```sh
pnpm dlx @sine-kits/kit-cli@0.3.0 create <new-directory> --registry https://registry.npmjs.org/
cd <new-directory>
pnpm install --frozen-lockfile
pnpm exec sine-kit --platform <backend-origin> login --web <web-origin>
pnpm exec sine-kit --platform <backend-origin> project list
```

Use an existing publisher-owned project when appropriate. Create a project only after explicit user intent, then use its returned ID:

```sh
pnpm exec sine-kit --platform <backend-origin> project create --name <display-name> --kit-id <stable-kit-id>
pnpm exec sine-kit --platform <backend-origin> link --project <project-id> --env development
```

Never run literal placeholders or guess ownership, project IDs, installation IDs or production configuration. Developer login must complete browser consent; `--no-open` prints a link rather than bypassing authentication.

## Author domain contracts, not new Skills

Maintain one `kit.manifest.json` with stable Kit identity, version, site/runtime declaration and operations. A new manifest needs no `skills` field or Skill folder. Each operation must declare:

- A stable ID and a concise description of purpose, preconditions, result meaning, external effects and limitations.
- Its TypeScript handler plus bundled input/output JSON Schema paths. Include descriptions, required fields, validation boundaries and resource-reference meaning in the schemas. Local schema references must resolve within the bundle; no remote schema fetch.
- Required platform capabilities and optional capability slots, effects and async execution. Declarations are not permissions or spending approval.

The same release contracts serve the site and generic `use-sine-kit` Skill through `operations list/inspect`. Adding an operation or a whole new Kit must not require editing these two public Skills.

Use `defineOperation` from `@sine-kits/kit-sdk/server`. Handlers receive the installation/run-bound context; records, private assets, logging and approved capabilities flow through that context. Do not import platform databases, auth, application-shell internals or Runtime credentials. Never call external Providers directly from Kit code. An optional connection affects only operations that require it, not unrelated operations.

Build an independent localized site using the browser SDK and actual operation contracts. Do not claim generated output for a record-only operation, fabricate results, or hardcode user IDs, credentials or Provider settings. Keep identifiers/comments in English and user-visible strings in the Kit's English/Chinese locales.

## Exercise and build

```sh
pnpm dev
# Stop the foreground watcher before checking or rebuilding.
pnpm check
pnpm exec tsc --noEmit
pnpm build
pnpm preview
```

Inspect the actual development and built surfaces. Exercise real operation success and meaningful rejection states against the same backend/installation. `check` or compilation alone does not prove runtime behavior. Report exact commands, environment, warnings and uncovered scenarios.

## Publish immutably

Only publish after user intent and valid build. Version changes are explicit; never overwrite an existing version with changed bytes.

```sh
pnpm publish:kit
pnpm exec sine-kit status <deployment-id>
pnpm exec sine-kit logs --deployment <deployment-id>
pnpm exec sine-kit releases inspect <release-id>
```

Publication defaults to preview. Wait for the actual deployment to become ready and verify its site/operation behavior. An upload or build is not a ready deployment, review approval, marketplace listing, purchase or production acceptance. Retain digest/release/deployment IDs and inspect an uncertain outcome before any retry.

Independent review and production promotion are separate actions. If explicitly requested and authorized, submit the release for review, read the current environment revision, then promote the approved immutable digest with exact expected revision and production confirmation. Do not approve your own review or guess a CAS revision. Rollback uses an existing approved immutable release; unpublish removes only its permitted deployment and must honor references.

## Recovery and delivery

Never replay successful or unknown paid external work while debugging. Preserve stable operation step/run and idempotency identity; owner approval and reconciliation do not create new intents. Fix the cause, update callers and public contracts, remove obsolete code rather than compatibility shims, and rerun the affected real command or scenario. Deliver actual verification and blockers, not stubs or speculative support. No feature is complete because the Skill instructions say it exists.
