# AI 学习知识库

面向公司内部员工的 AI 学习路径网站，涵盖从零认知到 Agent 实战的完整内容体系。

**线上地址**：[ailinkstart.com](https://ailinkstart.com)

---

## 技术栈

- **框架**：VitePress 1.x（Markdown → 静态网站）
- **部署**：GitHub Pages + GitHub Actions（push main 自动构建，约 1-2 分钟生效）
- **CDN**：Cloudflare（DNS Proxy 开启）
- **Node 版本**：20

## 本地开发

```bash
# 安装依赖（首次）
npm install

# 启动开发服务器
npm run docs:dev

# 构建验证（推送前必须跑）
npm run docs:build
```

## 内容结构

```
docs/
├── stage-1/    快速认知（AI 是什么、术语扫盲）
├── stage-2/    零基础上手（注册、工具、Prompt）
├── stage-3/    AI 进阶概念（Agentic AI 等）
├── stage-4/    工作场景实战（HR/财务/运营等）
├── stage-5/    AI Agent 使用（Claude Code 等）
├── stage-6/    AI 创意与创业
├── news/       AI 新闻
├── frontier/   AI 前沿探讨
├── coding/     AI 编程
└── exams/      学习测试
```

侧边栏由 `docs/.vitepress/config.js` 的 `autoItems()` 函数自动维护，新增文章无需手动更新侧边栏。

## 发布

```bash
./publish.sh "本次更新说明"
```

发布后同步更新 `CHANGELOG.md`。

## 注意事项

- 推送前必须先跑 `npm run docs:build`，确认无报错再推送
- `kb-articles/` 目录已加入 `.gitignore`，不会推送到公开仓库
- 配置文件 `CLAUDE.md` 已加入 `.gitignore`，不会推送到公开仓库
