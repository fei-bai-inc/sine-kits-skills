Use the installed `use-sine-kit` Skill with the user-selected Reading List Kit installation and actual operator-provided backend/Console origins.

User-approved nonfee intent: save one reading-list entry titled "Agent Skills verification" for https://agentskills.io/home, with note "Verify the generic Skill discovers the contract and reads the persisted result." The user authorizes this record write only; do not generate content or call a Provider.

You are not given an operation ID, JSON property names or a record type. Discover the installed Kit's actual declared operations, inspect the selected input/output/reference schemas and effects, and construct the exact valid JSON from that contract. Do not infer fields or reuse a domain-specific Skill. Save one stable idempotency key with the input before submission, submit once, persist the run ID, wait on the same run and read the returned record. Do not use a fresh key after an uncertain response.

Login authority must be separately owner-approved. If login is not available, start the ordinary CLI browser login and wait for the owner; never approve it yourself, read credentials, use publisher authority or switch installations. For a controlled local acceptance run the operator may supply an explicitly scoped disposable Grant through private CLI storage before the Agent starts; identify that as pre-authorized fixture evidence, not a completed browser login.

When the operation succeeds, report the exact operation/run/record IDs, returned title/URL/note, and why it is a persisted record rather than generated article content. After the operator revokes the Grant, a second reading attempt must be rejected; do not recreate authority. Never expose credentials or private unrelated data.
