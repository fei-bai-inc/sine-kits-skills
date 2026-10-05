# 实际验收 — 2026-10-05

[机器可读证据](./2026-10-05.json)记录实际宿主会话、命令、平台结果。宿主为 Codex CLI0.160.0，只是验收工具，不是产品依赖或适配层。

## 开发技能

真实 Agent 加载公开 develop-sine-kit，读取自然语言需求并编写 [Reading List Kit](../develop-kit/reading-list-kit)。它调用 publisher identity/project/link，执行 check、tsc、build，运行实际本地 operation 成功及无效输入场景，然后只发布一次不可变 preview；worker 验证后状态 ready。

- release：`1635c749-7539-4696-a652-cc06870bf118`
- deployment：`f626bdb2-d646-44ff-bf7d-3bf1ee4a4e44`
- 原始验收 digest：`eae03363228c5b37fdc15a051bc72b4e74eea2a04f74183c284b49e15a0b4a18`，10 文件。
- 未新增 Kit 专属 Skill 或 skills 字段。

首次 format:uri 在实际 dev runner 失败，Agent 保留 URL pattern/handler 校验后例子通过。平台 CLI 随后修复根因，使用与检查阶段已有的 fullFormats；原 format-bearing 路径单独实跑 succeeded。不将真实格式功能问题掩盖成合同“不支持”。

公开源码快照在原部署后只做格式与注释整理，单独在干净 archive 目录 check/tsc/build 通过：digest `bc990d1318accc0fc98c367d620b568e4a10f2695e8934a5e7696402a224489f`，10 文件。未覆盖原不可变版本；源码快照与已部署产物两个 digest 分开记载。

## 使用技能

第二个独立目录只含通用 Skill、CLI 包、安装选择与自然语言需求，没有 Kit 源码，也不提供 operation ID/JSON 属性名。真实 Agent 自己发现 entries.save、inspect schema、写精确输入/稳定幂等键、提交一次、等待同 run 并查询 record。

- run：`4f76b971-88f6-4372-a6f5-9d5d3c9a1e97`，succeeded。
- record：`d0116251746fd00441016b59b8068d78213f3d85adf83d1c7df861bf1282ade5`，reading-entry。
- owner API 可见同 record，Grant usedRuns=1。
- 撤销后另一次真实 Skill/CLI 查询返回 FORBIDDEN、exit3、request `9f70e0ec-de0b-4f4e-aae0-901f2017145e`，未重建授权或写入。

## 证据边界

认证为隔离种子测试用户真实 code/state/S256 交换，由验收操作完成有界确认，不修改已有用户权限。0.3.0 contracts/CLI 使用明确标識的本地 release archive，不代表公共 npm 消费。后端、worker、SQL、隔离操作和持久记录都是真实实现，不是 mock API。

浏览器 UI/真人 consent 未覆盖：模型宿主内 Ego bootstrap 不可达，父任务浏览器由用户控制，未换空间或 profile 绕过。不调用 Provider、不生成内容、不 promote production、不部署远端 Cloudflare。部署匿名访问返回401是鉴权拒绝，不是已授权页面验收。
