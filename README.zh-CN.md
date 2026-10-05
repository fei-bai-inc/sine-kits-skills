# Sine Kits Skills

只有两份标准、宿主无关的通用技能；新增 Kit 或操作不需要新增、修改 Skill。

| 技能 | 用途 | 权限 |
| --- | --- | --- |
| [develop-sine-kit](./skills/develop-sine-kit/SKILL.md) | 创建、实现、检查、构建和发布任意独立 Kit | 发布者 CLI 登录与项目所有权 |
| [use-sine-kit](./skills/use-sine-kit/SKILL.md) | 发现任意已安装 Kit 的真实操作合同，调用、等待和读取结果 | owner 批准的安装级 Agent Grant |

领域语义属于操作 description、输入输出 JSON Schema、handler 和子站。通用使用技能通过 `operations list/inspect` 读取合同，不硬编码领域。新 Kit 不需要 `skills` 字段、专属 Skill 或宿主适配。旧不可变发行包可保留历史 Skill 元数据，不代表新作者必须提供。

## 安装所需角色

使用 Agent 自己的标准 Skill 管理器，或通用安装工具：

```sh
npx skills add fei-bai-inc/sine-kits-skills --skill develop-sine-kit
npx skills add fei-bai-inc/sine-kits-skills --skill use-sine-kit
```

审阅指令，在外部安装器中选择宿主和范围。Sine Kits 不安装适配、不修改宿主配置。标准格式和统一 CLI 不代表所有宿主均已实际验收。

## 开发 Kit

需要 Node.js 24.15.0、pnpm 9.4.0 及发布后的 CLI/contracts 0.3.0；已有 SDK 0.2.0、UI/kit-ui 0.1.0 不变。

```sh
pnpm dlx @sine-kits/kit-cli@0.3.0 create <new-directory> --registry https://registry.npmjs.org/
pnpm exec sine-kit --platform <backend-origin> login --web <web-origin>
```

按开发技能关联自己的项目、声明领域合同、开发和验证子站、不可变发布 preview，再走独立审核。发布者凭证不是使用他人安装数据的权限。

## 使用任意安装的 Kit

```sh
pnpm dlx @sine-kits/kit-cli@0.3.0 --json agent --platform <backend-origin> --installation <installation-id> login --console <console-origin>
pnpm dlx @sine-kits/kit-cli@0.3.0 --json agent --platform <backend-origin> --installation <installation-id> operations list
pnpm dlx @sine-kits/kit-cli@0.3.0 --json agent --platform <backend-origin> --installation <installation-id> operations inspect <actual-operation-id>
```

owner 在浏览器登录，明确批准安装、版本、操作、资源权限、到期及次数；CLI 在工作区外保存受限凭证，不复制 token 到提示词或命令。使用技能读取真实 Schema，构造获准输入，保留稳定幂等键，提交一次并查询同一任务；子站共享相同结果。

`agent logout` 撤销该 Grant 后删除本机凭证；`forget` 只删本机文件。次数不是金额预算，外部 Provider 副作用需要明确用户意图和 owner 能力授权。

CLI/contracts 0.3.0 仍须单独 npm 发布，不能用本地 archive 证明公共下载可用。

## 真实示例

[Reading List Kit 示例](./examples/README.zh-CN.md) 分别提供开发/使用提示、真实 Agent 编写的 Kit 快照和日期证据。使用需求不提供 operation ID 或 JSON 字段，必须通过通用技能发现合同，而不是领域 Skill。公开包安装与明确标识的本地 release-candidate 验收分开记录。
