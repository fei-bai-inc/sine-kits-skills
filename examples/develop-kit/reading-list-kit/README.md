# Reading List Kit

This is the actual source produced by the published `develop-sine-kit` Skill in a real Codex CLI acceptance session. It defines one async operation through description, JSON Schema, TypeScript and an English/Chinese site. No per-Kit Skill is included.

## Run

Requires Node 24.15.0 / pnpm 9.4.0 and published contracts/CLI 0.3.0. The public example intentionally contains no machine-specific archive overrides or lockfile claiming an unpublished package.

```sh
pnpm install --no-frozen-lockfile
pnpm check
pnpm exec tsc --noEmit
pnpm build
pnpm exec sine-kit --platform <backend-origin> login --web <web-origin>
pnpm exec sine-kit --platform <backend-origin> project create --name "Reading List" --kit-id reading-list-kit
pnpm exec sine-kit --platform <backend-origin> link --project <returned-project-id> --env development
pnpm dev
```

Stop the watcher before rebuilding. Then build/preview or publish an immutable preview through the ordinary CLI. Use real returned IDs, not placeholders. Keep the generated local lockfile for subsequent frozen installs.

`entries.save` stores a `reading-entry` record after checking a nonblank title, HTTP/HTTPS URL without credentials and a bounded note. It fetches no article and generates no content. Inputs and persisted output are installation-scoped, shared with authorized Agents. Its URL constraints are enforced by Schema pattern and handler parsing, not arbitrary external network calls.

The original local acceptance used explicitly identified exact release archives while 0.3.0 npm publication was awaiting external approval; that distinction is preserved in the example evidence, not hidden in this portable source snapshot. Deployment ready is preview evidence only. Browser UI/authenticated site inspection is a separate acceptance criterion.
