# Sine Kits Skills

标准、宿主无关的 Agent Skills。公开仓库只包含操作说明，不含平台源码、凭证、安装数据或 Provider 密钥。

## 安装

使用 Agent 自己的标准 Skill 管理器，或通用工具：

```sh
npx skills add fei-bai-inc/sine-kits-skills --skill manage-game-project
```

审阅指令并在安装器中选择目标 Agent。Sine Kits 不维护逐宿主适配，不修改宿主配置；具备标准 Skills、命令执行和网络权限的 Agent 使用同一 CLI。通用格式不代表每个宿主都已实际验收。

## 登录使用

需要 Node.js 24.15.0、pnpm 9.4.0 与 CLI 0.3.0；新版 CLI 发布后才能下载。

```sh
pnpm dlx @sine-kits/kit-cli@0.3.0 agent --platform <backend-origin> --installation <installation-id> login --console <console-origin>
pnpm dlx @sine-kits/kit-cli@0.3.0 agent --platform <backend-origin> --installation <installation-id> status
```

owner 在浏览器登录 Sine Kits，确认安装、操作、资源权限、到期时间与次数。CLI 在工作区外保存私有受限凭证，不需要复制 token。禁止把凭证放进 Agent 对话、Skill、URL、命令参数或仓库；发布者登录不能代替此授权。

让已安装的 `manage-game-project` Skill 创建项目：`projects.create` 无供应商费用，只保存真实私有记录，不生成游戏或 3D 模型。Agent 保存幂等键，提交一次、等待同 run、读取结果；Kit 子站展示相同安装数据。

`agent logout` 撤销该登录 Grant 并删除本机凭证；`agent forget` 只删除本机文件。也可在 Console 撤销。次数不是金额预算，付费图像操作必须有明确用户意图和 owner 控制的能力授权。
