# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project overview

This is a **learning wiki** for AE and SE chip engineers to learn Codex and the ae-skills / se-skills ecosystem. Serves as both a structured learning path and self-service reference.

The master planning document is `ai-training-wiki-for-chip-engineers.md` — it contains all design decisions, directory structure, page templates, scope, and constraints. Read it first before creating or editing any wiki page.

## Repository structure

```
ai_propsal/
├── ai-training-wiki-for-chip-engineers.md   ← Master planning doc (read-only reference)
├── M1-快速上手/           ← Module 1: Tool basics (9 pages)
├── M2-能力扩展/           ← Module 2: Value extraction (15 pages)
├── M3-AE实战/             ← Module 3: AE practical (15 pages, powered by ae-skills plugin)
├── M4-SE实战/             ← Module 4: SE practical (11 pages, powered by se-skills plugin)
├── Skills-Plugins/        ← Skills & plugins reference (overviews, versions, storage)
└── 经验之谈/              ← AI usage methodologies & lessons learned
```

## Current scope

M1 + M2 + M3 + M4 — all four modules are live. ~51 pages total.

- M1: installation, basic usage, commands, permissions, IDE integration, bridge-to-skills demo, AI capability appendix
- M2: ae-skills panorama (26 skills), se-skills panorama (16 skills), AGENTS.md authoring, skill creation, MCP plugins, hooks, parallel agents, headless mode, Plan & Goal Mode, Workflow, Memory, Web Search, Permissions, Slash Commands
- M3: AE 实战 — based on ae-skills plugin. Covers interview-me → idea-refine → spec-driven → TDD → incremental → code-review → debugging → shipping workflow
- M4: SE 实战 — based on se-skills plugin. Covers requirements → architecture → spec → design-review → code-review → test-review → traceability → release-review

## Page templates

Every page follows a template defined in the planning doc (see "页面模板" section). Key templates:

- **M1 pages**: 概述 → 快速上手 (with ⚠️常见卡点 + 🔧线上卡点自救) → 详细说明 → 常见问题 → 下一步
- **M2 pages**: 核心价值 (with before/after) → 全景位置 → 怎么触发 → 演示场景 → 下一步
- **M3 pages**: 这个skill做什么 → 什么时候用/不该用 → 怎么触发 → 做对了的标准是什么 (成功 vs 失败输出对比) → 常见误区 → 演示场景 → 进阶
- **MCP pages**: 这个插件做什么 → 怎么使用 → 与skill的配合 → 常见问题

Every page must work in **two modes**: (1) as a sequential walkthrough someone can follow step by step, and (2) as a standalone self-study page someone reads later.

## Critical constraints

- **Troubleshoot-first** — every installation/config step must include self-service troubleshooting so engineers can debug issues independently
- **Internal network only** — all content must be original/internalized, never copy-paste from external docs
- **Wiki is primary, recording is secondary** — video recordings go stale with version changes; wiki must be the durable reference
- **Validation criteria** — every M3 skill page must state "what output counts as success" so engineers can self-verify
- **Company environment** — engineers use **CC Switch** to configure company-provided API Keys (not personal Anthropic accounts). Installation is two-stage: Codex CLI → CC Switch → configure API Key → verify. CC Switch works by setting `ANTHROPIC_BASE_URL` + `ANTHROPIC_AUTH_TOKEN` environment variables.

## Phase 1 lessons (apply to Phase 2 & 3)

These are patterns and pitfalls discovered while building M1. Follow them for all subsequent pages.

### Embedded code must be technically correct down to register level

The audience is chip engineers who read C code and register operations daily. Errors they will catch instantly:

- **ISR design**: never put blocking delays (`delay_us()`, `HAL_Delay()`) in interrupt context. Use non-blocking counters or state machines.
- **API authenticity**: only use real HAL/LL functions (`HAL_I2C_DeInit`, `HAL_I2C_Init`). Never invent API names (`I2C_ResetBus` doesn't exist).
- **Register operations**: use correct clear sequences (`SR1 &= ~I2C_SR1_AF` to clear AF bit, not `SR1 = 0`).
- **Hardware behavior**: IWDG (independent watchdog) runs from its own RC oscillator — it cannot be preempted by interrupt priority. WWDG can.

**Rule**: after writing any code example, run a doubt-driven review (see below). If uncertain about a register/API/hardware behavior, search web to verify before committing.

### Doubt-driven review is mandatory for technical pages

The `/ae-skills:doubt-driven-development` flow caught fatal errors in 1-6 that would have undermined content credibility:

1. Adversarial review found: blocking ISR delay, fabricated API, wrong flag clearing, incorrect watchdog explanation
2. All 15 actionable findings were fixed before content was finalized
3. Web search then verified the fixes against official STM32 docs

**Rule**: for M2/M3 pages that contain code examples, hardware scenarios, or technical claims — run at least one doubt cycle before marking the page Done.

### PowerShell `>` is a redirect operator

When writing copy-pasteable command blocks, do NOT include `>` as a prompt prefix. PowerShell interprets `>` as output redirection and silently creates files instead of running commands. Use plain text for what the user types:

```
❌ > 你好，你是什么模型？
✅ 你好，你是什么模型？
```

Or use `$` for bash examples (since we're targeting Git Bash / WSL users too). Add an explicit warning note: "不要复制 `>` 符号".

### Screenshot strategy

Write content first with descriptive placeholders (`![截图：描述应包含什么](screenshots/filename.png)`). Fill in actual screenshots later in bulk. The placeholder description must be specific enough that a screenshot-capture session doesn't require re-reading the surrounding text.

### CC Switch specifics

- Download: GitHub Releases → `.msi` for Windows
- SmartScreen will block `.msi` — must document "更多信息 → 仍要运行"
- CC Switch minimizes to **system tray** (not closed) — must explicitly mention this
- Supplier switching takes effect in **new terminal windows only** (not hot-reload)
- Known bug: v2.0.65+ may ignore `skipIntroduction`; fallback is manually creating `~/.Codex.json` with `{"hasCompletedOnboarding": true}`
- Different API suppliers use different Key formats (not all start with `sk-`)

### Self-help pitfall coverage standard

For M1 config/install pages: ≥5 pitfalls per page, each with concrete commands (not vague advice).
For M2/M3 pages with config steps: ≥3 pitfalls per page.

Each pitfall entry must be specific enough that a stuck student can follow it without asking for help. Format:
```
| 现象（what the user sees） | 自救方案（exact commands or click paths） |
```

### Dual-use verification

After writing a page, verify it works in both modes:
1. **Walkthrough mode**: can someone follow it sequentially step by step?
2. **Self-study mode**: can a new engineer read it standalone and follow all steps? Are all prerequisites stated at the top?

### Content originality

All content re-internalized from official docs must pass the "rewrite test": if you diff it against the official docs, no sentence should match verbatim. All examples must use embedded/C scenarios, never generic web-dev examples.

## Environment setup

### Git proxy (required for GitHub push on corporate network)

The corporate network blocks direct HTTPS (443) access to GitHub. A local proxy at `127.0.0.1:7897` is required:

```bash
git config --global http.proxy http://127.0.0.1:7897
git config --global https.proxy http://127.0.0.1:7897
```

**Before any `git push`**, verify the proxy is configured:
```bash
git config --global http.proxy
```

If the push fails with "Failed to connect to github.com port 443", the proxy isn't set or isn't running — re-run the config commands above and make sure the proxy client is active.

### MkDocs deployment

The wiki uses **MkDocs Material** for building and **GitHub Actions** for auto-deployment to GitHub Pages.

- `mkdocs build` — build the static site to `site/`
- `mkdocs serve` — local preview at http://127.0.0.1:8000
- Push to `main` → GitHub Actions auto-deploys to `ddddjaak.github.io/ai-training-wiki`
- Pages source must be set to **GitHub Actions** in repo Settings → Pages

## File naming conventions

- Module directories: `MX-角色名/` (e.g., `M1-快速上手/`)
- Page files: `X-N-页面名.md` (e.g., `1-2-基础对话.md`, `3-5-test-driven-development.md`)
- Module README: `README.md` inside each module directory (learning path index)

## Versioning

`v[year].[quarter]` — e.g., `v26.2` = 2026 Q2. Update cadence: M1 semi-annual, M2 quarterly, M3 per skill release cycle.
