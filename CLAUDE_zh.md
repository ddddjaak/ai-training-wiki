# CLAUDE_zh.md

本文件为 Claude Code（claude.ai/code）在此仓库中工作时提供指导。

## 项目概述

这是一个为 AE 和 SE 芯片工程师编写的**学习 wiki**，用于学习 Claude Code 及 ae-skills / se-skills 生态系统。兼顾结构化学习路径和自助查阅参考。

总体规划文档为 `ai-training-wiki-for-chip-engineers.md`——其中包含所有设计决策、目录结构、页面模板、范围及约束条件。在创建或编辑任何 wiki 页面之前，请先阅读该文档。

## 仓库结构

```
ai_propsal/
├── ai-training-wiki-for-chip-engineers.md   ← 总体规划文档（只读参考）
├── M1-快速上手/           ← 模块1：工具基础（9 页）
├── M2-能力扩展/           ← 模块2：能力扩展（15 页）
├── M3-AE实战/             ← 模块3：AE 实战（15 页，基于 ae-skills 插件）
├── M4-SE实战/             ← 模块4：SE 实战（11 页，基于 se-skills 插件）
├── Skills-Plugins/        ← Skills 与插件参考（概要介绍、版本管理、存储）
└── 经验之谈/              ← AI 使用方法论与经验总结
```

## 当前范围

M1 + M2 + M3 + M4 四个模块全部上线。约 51 页。

- M1：安装、基础使用、命令、权限、IDE 集成、衔接 skill 演示、AI 能力附录
- M2：ae-skills 全景（26 个技能）、se-skills 全景（16 个技能）、CLAUDE.md 编写、skill 创建、MCP 插件、hooks、并行代理、headless 模式、Plan & Goal Mode、Workflow、Memory、Web Search、权限管理、斜杠命令
- M3：AE 实战——基于 ae-skills 插件。覆盖 interview-me → idea-refine → spec-driven → TDD → incremental → code-review → debugging → shipping 完整工作流
- M4：SE 实战——基于 se-skills 插件。覆盖 requirements → architecture → spec → design-review → code-review → test-review → traceability → release-review

## 补充目录

### Skills-Plugins/

存放 skills 与 MCP 插件的参考文档，包括各 skill 的概要介绍、插件使用说明及版本管理。该目录独立于 wiki——wiki 教"怎么用"，这里存"是什么版本、有哪些参数"。当需要查某个 skill 的详细规格或插件 API 时，先看这里。

### 经验之谈/

汇总使用 AI（Claude Code / ae-skills / se-skills）过程中积累的方法论与实战经验。与 wiki 的区别：wiki 是结构化教程（按角色、按场景），经验之谈是散点式洞察（"试了 X 种方法后发现 Y 最快"）。内容随实践持续追加。

## 页面模板

每个页面遵循规划文档中定义的模板（参见"页面模板"章节）。主要模板：

- **M1 页面**：概述 → 快速上手（含 ⚠️常见卡点 + 🔧线上卡点自救）→ 详细说明 → 常见问题 → 下一步
- **M2 页面**：核心价值（含 before/after）→ 全景位置 → 怎么触发 → 演示场景 → 下一步
- **M3 页面**：这个 skill 做什么 → 什么时候用/不该用 → 怎么触发 → 做对了的标准是什么（成功 vs 失败输出对比）→ 常见误区 → 演示场景 → 进阶
- **MCP 页面**：这个插件做什么 → 怎么使用 → 与 skill 的配合 → 常见问题

每个页面必须满足**两种模式**：（1）作为可顺序操作的逐步指南；（2）作为读者可独立阅读的自学页面。

## 关键约束

- **排错优先**——每个安装/配置步骤必须包含自助排查方案，确保工程师能独立排查问题
- **仅限内网**——所有内容必须原创/内化，严禁从外部文档逐句复制粘贴
- **wiki 为主，录屏为辅**——视频录屏随版本变更而过时；wiki 必须是持久的参考资料
- **验证标准**——每个 M3 skill 页面必须说明"什么样的输出才算成功"，以便工程师自我验证
- **公司环境**——工程师使用 **CC Switch** 配置公司提供的 API Key（非个人 Anthropic 账号）。安装分两步：Claude Code CLI → CC Switch → 配置 API Key → 验证。CC Switch 通过设置 `ANTHROPIC_BASE_URL` + `ANTHROPIC_AUTH_TOKEN` 环境变量生效。

## 第一阶段经验教训（适用于第二、三阶段）

以下是在构建 M1 过程中发现的模式和陷阱。所有后续页面均应遵循。

### 嵌入式代码必须在寄存器级别保持技术正确

受众是每天阅读 C 代码和寄存器操作的芯片工程师。他们会立刻发现的错误：

- **ISR 设计**：绝不在中断上下文中放置阻塞延迟（`delay_us()`、`HAL_Delay()`）。使用非阻塞计数器或状态机。
- **API 真实性**：仅使用真实的 HAL/LL 函数（`HAL_I2C_DeInit`、`HAL_I2C_Init`）。绝不编造 API 名称（`I2C_ResetBus` 不存在）。
- **寄存器操作**：使用正确的清零序列（`SR1 &= ~I2C_SR1_AF` 清除 AF 标志位，而非 `SR1 = 0`）。
- **硬件行为**：IWDG（独立看门狗）由自有 RC 振荡器驱动——无法被中断优先级抢占。WWDG 可以。

**规则**：写完任何代码示例后，运行一轮 doubt-driven review（见下文）。若对某一寄存器/API/硬件行为不确定，提交前搜索网络验证。

### 技术页面必须做怀疑驱动审查

`/ae-skills:doubt-driven-development` 流程曾在 1-6 中发现致命错误，若未修复将严重损害培训可信度：

1. 对抗审查发现：阻塞 ISR 延迟、编造的 API、错误的标志清除方式、错误的看门狗解释
2. 全部 15 条可执行的发现均在内容定稿前修复
3. 随后通过网络搜索对照 STM32 官方文档验证了修复

**规则**：对于包含代码示例、硬件场景或技术论断的 M2/M3 页面——至少运行一轮 doubt 审查后再标记为"完成"。

### PowerShell 中 `>` 是重定向操作符

编写可复制的命令块时，不要将 `>` 作为提示符前缀。PowerShell 会将 `>` 解释为输出重定向，静默创建文件而非执行命令。用户输入的内容使用纯文本：

```
❌ > 你好，你是什么模型？
✅ 你好，你是什么模型？
```

或对 bash 示例使用 `$`（因为同时面向 Git Bash / WSL 用户）。添加显式警告："不要复制 `>` 符号"。

### 截图策略

先写内容及描述性占位符（`![截图：描述应包含什么](screenshots/filename.png)`）。后续集中批量补充实际截图。占位符的描述必须足够具体，使截图采集时无需重新阅读上下文。

### CC Switch 特性

- 下载：GitHub Releases → 选择 `.msi`（Windows 版）
- SmartScreen 会拦截 `.msi`——必须文档化"更多信息 → 仍要运行"
- CC Switch 最小化到**系统托盘**（非关闭）——必须显式说明
- 供应商切换仅在**新终端窗口**中生效（非热加载）
- 已知 bug：v2.0.65+ 可能忽略 `skipIntroduction`；备用方案为手动创建 `~/.claude.json` 并填入 `{"hasCompletedOnboarding": true}`
- 不同 API 供应商使用不同 Key 格式（并非全部以 `sk-` 开头）

### 自助卡点覆盖标准

M1 配置/安装页面：每页 ≥ 5 个卡点，每个卡点附具体命令（非模糊建议）。
M2/M3 含配置步骤的页面：每页 ≥ 3 个卡点。

每个卡点条目必须足够具体，使受阻学员无需求助即可自行解决。格式：
```
| 现象（what the user sees） | 自救方案（exact commands or click paths） |
```

### 双用途验证

写完页面后，验证其同时适用于两种模式：
1. **逐步指南模式**：能否让他人按顺序逐步操作？
2. **自学模式**：新工程师能否独立阅读并完成所有步骤？所有前置条件是否在顶部声明？

### 内容原创性

所有从官方文档内化重写的内容必须通过"改写测试"：若将其与官方文档逐句 diff，不应有任何逐字匹配的句子。所有示例必须使用嵌入式/C 场景，严禁通用 web 开发示例。

## 文件命名规范

- 模块目录：`MX-角色名/`（如 `M1-快速上手/`）
- 页面文件：`X-N-页面名.md`（如 `1-2-基础对话.md`、`3-5-test-driven-development.md`）
- 模块 README：各模块目录下的 `README.md`（学习路径索引）

## 版本管理

`v[年份].[季度]` — 如 `v26.2` = 2026 年第二季度。更新频率：M1 每半年、M2 每季度、M3 随 skill 发布周期。
