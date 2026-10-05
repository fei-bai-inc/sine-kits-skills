# Use example

Run [prompt.md](./prompt.md) with the published `use-sine-kit` Skill and the actual test installation/origins. The prompt specifies the requested title/URL/note but intentionally does not supply operation ID, schema fields or record type.

The Agent must obtain those details using `operations list` and `operations inspect`, not by reading the Kit source. Its result is accepted only when a real run succeeds and an authorized records lookup returns the persisted reading entry. One key and one input identify this intent; uncertain/approved/reconciling states never trigger fresh work.

An operator-approved local disposable account may provision the Grant for controlled protocol acceptance. Normal users complete `agent login --console <origin>` themselves. Do not commit the credential or private cookie, and do not use publisher authority for execution. The subsequent revoked lookup must fail.

This directory is not another Skill. The same prompt structure applies to other domains by changing the user request and the installation, never the universal Skill.
