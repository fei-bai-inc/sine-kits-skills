# 真实 Skill 示例

示例分别运行公开的 develop-sine-kit 和 use-sine-kit，不新增领域 Skill，也不用 mock API。具体领域是无 Provider 费用的 Reading List Kit：保存阅读条目的标题、文章 URL 和备注，再查询同一持久记录；不生成文章内容。

## 开发示例

安装 develop-sine-kit，在可信仓外目录准备 Node24.15.0、pnpm9.4.0 和版本化包，自己完成测试项目的 publisher CLI 登录，再给 Agent [开发需求](./develop-kit/prompt.md)。观察实际源码、check、tsc、build、不可变 preview 发布与 ready 状态，保留项目、release、deployment、digest。编译通过不等于部署通过。真实 Agent 完成后保留其 Reading List Kit 源码快照；领域只写入描述、Schema、handler 和中英文子站，不编写专属技能。

## 使用示例

独立安装 use-sine-kit，选定测试安装，owner 完成普通 CLI 浏览器登录和有限权限确认。给 Agent [使用需求](./use-kit/prompt.md)、实际安装 ID 和 origins；提示不提供 operation ID 或 JSON 属性名。

从宿主事件确认：读取 Skill → operations list → inspect Schema → 保存精确输入和幂等键 → 提交一次 → 等待同 run → 读取返回 record。平台/子站应看到同一结果。随后撤销或 logout，再用真实 Agent/CLI 读取，应拒绝，不能自动重建授权。

## 证据边界

安装成功、脚本替 Agent 调用、测试 fixture 通过或 Agent 自称完成，都不等于技能可用。证据必须来自实际宿主工具事件与平台状态。

npm 发布待用户批准时，允许明确标识的本地 0.3.0 release archive 验收；不能当作公共包安装。隔离种子账号可以完成真实登录协议且不触碰既有用户，但不等于真人操作浏览器的页面验收。公开示例不包含凭证、cookies、tokens、本机绝对路径或生成输出。
