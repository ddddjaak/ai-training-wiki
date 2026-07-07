---
hide:
  - navigation
  - toc
---

<div class="cyber-hero" markdown>

# :material-chip: 解决方案中心 — AI Center

<p class="hero-tagline">从 "AI 能帮我写代码吗" 到 "没有 AI 我不会工作了"</p>

面向 **AE 工程师**和 **SE 工程师**的 Claude Code 实战指南——从安装配置到方案交付，从需求分解到发布审查，把 AI 嵌入芯片开发的每一个环节。

[开始学习](M1-快速上手/README.md){ .md-button .md-button--primary }
[GitHub :fontawesome-brands-github:](https://github.com/ddddjaak/ai-training-wiki){ .md-button }

</div>

---

## :material-chart-box-outline: 知识库速览

<div class="grid cards" markdown>

-   :material-book-open-page-variant:{ .stat-icon } **50 篇**实战文档

    ---

    M1 基础 + M2 进阶 + M3 AE实战 + M4 SE实战，每篇独立可用

-   :material-package-variant-closed:{ .stat-icon } **42 个** Skills

    ---

    ae-skills 26 个 :material-arrow-right: 嵌入式方案交付全流程  
    se-skills 16 个 :material-arrow-right: 系统设计验证全链路

-   :material-puzzle:{ .stat-icon } **5 个** MCP 插件

    ---

    `drawio` · `visio` · `math` · `node_repl` · `sequential-thinking`

-   :material-update:{ .stat-icon } **v26.3** 当前版本

    ---

    2026 Q3 发布，随 Claude Code 和 Skills 版本持续更新

</div>

---

## :material-map: 模块总览

<div class="grid cards" markdown>

-   :material-rocket-launch: **M1 快速上手** · 9 篇 · ~60 min

    ---

    从零安装 Claude Code + CC Switch。学会基础对话、常用命令、权限管理、IDE 集成。**所有人从这里开始。**

    [:material-arrow-right: 进入 M1](M1-快速上手/README.md)

-   :material-tools: **M2 能力扩展** · 15 篇 · ~90 min

    ---

    解锁 Claude Code 的高级能力：55+ 斜杠命令、Skill 体系全景、MCP 插件、Hooks 自动化、并行代理、Plan & Goal Mode、Workflow 多 Agent 编排、Memory 记忆系统。

    [:material-arrow-right: 进入 M2](M2-能力扩展/README.md)

-   :material-bug-check: **M3 AE 实战** · 15 篇 · ~180 min

    ---

    嵌入式/AE 工程师的完整工作流：interview-me 澄清需求 → idea-refine 方案打磨 → spec-driven 规格驱动 → TDD 测试先行 → incremental 增量交付 → code-review → debugging → shipping。

    [:material-arrow-right: 进入 M3](M3-AE实战/README.md)

-   :material-file-document-outline: **M4 SE 实战** · 11 篇 · ~120 min

    ---

    系统工程师的全流程覆盖：需求分解 → 架构设计 → 详细规格 → 设计审查 → 代码静态审查 → 测试审查 → 追溯矩阵 → 发布审查 → Goal Mode 自动编排。

    [:material-arrow-right: 进入 M4](M4-SE实战/README.md)

</div>

---

## :material-compass: 不知道从哪开始？

<div x-data="{ role: '', step: 'unknown' }" class="path-finder">

<p>选择你的角色，获取个性化学习路径推荐：</p>

<div class="path-finder-buttons">
  <button @click="role = 'ae'; step = 'yes'"
          :class="role === 'ae' ? 'active' : ''"
          class="md-button md-button--primary">
    :material-chip: 我是 AE / 嵌入式工程师
  </button>
  <button @click="role = 'se'; step = 'yes'"
          :class="role === 'se' ? 'active' : ''"
          class="md-button md-button--primary">
    :material-file-document: 我是 SE / 系统工程师
  </button>
  <button @click="role = 'new'; step = 'yes'"
          :class="role === 'new' ? 'active' : ''"
          class="md-button md-button--primary">
    :material-run-fast: 我还不确定 / 刚接触
  </button>
</div>

<div x-show="step === 'yes'" x-transition class="path-result">
  <div x-show="role === 'ae'">
    <h4>:material-playlist-check: 推荐路径</h4>
    <p><strong>M1 快速上手</strong>（装好 Claude Code）→ <strong>M2 能力扩展</strong>（学会 skill 体系和高级功能）→ <strong>M3 AE 实战</strong>（从 interview-me 到 shipping 的完整工作流）</p>
    <p><small>:material-clock-outline: 预计总耗时 ~5.5 小时，可分多次完成</small></p>
  </div>
  <div x-show="role === 'se'">
    <h4>:material-playlist-check: 推荐路径</h4>
    <p><strong>M1 快速上手</strong>（装好 Claude Code）→ <strong>M2 能力扩展</strong>（学会 skill 体系和高级功能）→ <strong>M4 SE 实战</strong>（需求 → 架构 → 规格 → 设计审查 → 发布）</p>
    <p><small>:material-clock-outline: 预计总耗时 ~4.5 小时，可分多次完成</small></p>
  </div>
  <div x-show="role === 'new'">
    <h4>:material-playlist-check: 推荐路径</h4>
    <p>从 <strong>M1 快速上手</strong> 开始，装好 Claude Code 体验几天基础对话。觉得有用再看 <strong>M2 能力扩展</strong>——那里才是 Claude Code 真正拉开差距的地方。</p>
    <p><small>:material-clock-outline: M1 约 1 小时即可完成</small></p>
  </div>
</div>

</div>

---

## :material-lightbulb-on-outline: 设计原则

<div class="grid cards" markdown>

-   :material-cog: **芯片场景优先**

    ---

    所有示例用嵌入式/芯片开发的真实场景：ISR 审查、I2C 调试、寄存器配置、RTOS 任务设计。不写 To-Do App。

-   :material-shield-alert: **卡点优先**

    ---

    每个配置页带 ≥3 个常见卡点 + 具体自救命令。工程师可独立排查，不需打断同事问"你装好了吗"。

-   :material-lan: **内网可用**

    ---

    所有内容原创内化，不依赖外部链接。公司内网环境可直接访问，无外网也能学完核心内容。

</div>

---

<div class="page-footer" markdown>

**v26.3**（2026 Q3）— M1 + M2 + M3 + M4 完整覆盖 · 50 篇实战文档

有问题？去 [:fontawesome-brands-github: GitHub](https://github.com/ddddjaak/ai-training-wiki) 提 Issue

</div>
