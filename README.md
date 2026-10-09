# AI 学习知识库

面向非技术背景读者的 AI 学习路径网站，涵盖从零认知到 Agent 实战的完整内容体系。

**线上地址**：[ailinkstart.com](https://ailinkstart.com)

**项目性质**：个人项目，对内共享。版权归属与授权范围见 [LICENSE](LICENSE)。

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

# 发布前完整检查（测试、构建、案例、链接与资源）
npm run docs:check
```

## 内容结构

2026-07-28 起为**四大板块**，展示结构与物理目录解耦，逻辑归组由 `docs/.vitepress/stagesData.js` 的清单决定：

- **AI 最新动态**：`hot/`（AI 日报，每日自动同步）+ `frontier/`（AI 前沿，含原 `news/` 新闻与趋势长文，按日期混排）
- **AI 基础学习**：`stage-1/`（AI 快速认知）+ 工具快速上手（跨 stage-2/4/5 清单）+ 使用注意事项（stage-2 清单）
- **AI 进阶实践**：不绑定单一工具的技巧方法，跨 stage-2/3/4；具体归组以 stagesData.js 为准
- **AI 学习小工具**：`exams/`（能力自测）+ `/vocab-book`（AI 学习词汇本）

辅助入口：`cases/` 提供 400 个实践案例（图片 150、视频 190、网站与工具 60），`videos/` 提供 13 条视频课。

```
docs/
├── hot/        AI 日报
├── news/       AI 新闻（展示归 AI 前沿）
├── frontier/   AI 前沿专题
├── stage-1/    AI 快速认知
├── stage-2/    工具上手 / 注意事项 / 部分进阶实践
├── stage-3/    进阶实践（存量目录，不接新稿）
├── stage-4/    进阶实践 / 工具上手
├── stage-5/    AI 编程教程（展示归工具上手，不接新稿）
├── stage-6/    一人公司（展示归 AI 前沿，不接新稿）
├── exams/      能力自测
├── cases/      案例入口与生成详情
├── videos/     视频课
```

侧边栏由 `docs/.vitepress/config.js` 的 `autoItems()` 函数配合 stagesData.js 清单自动维护，新增文章无需手动更新侧边栏。

## 发布

```bash
./publish.sh "本次更新说明"
```

发布前核对待提交文件和远端自动同步提交；`publish.sh` 会执行完整检查，失败时停止提交和推送。每次发布同步维护技术日志 `CHANGELOG.md` 与读者日志 `docs/changelog.md`，后者按「新增内容 → 内容更新 → 功能优化 → 体验修复」排列。

## 注意事项

- 推送前必须先跑 `npm run docs:build`，确认无报错再推送
- `kb-articles/` 目录已加入 `.gitignore`，不会推送到公开仓库
- 配置文件 `CLAUDE.md` 已加入 `.gitignore`，不会推送到公开仓库
- 访问配置唯一来源是 `docs/.vitepress/accessConfig.js`，只保存 SHA-256 摘要；开发与构建会生成词汇页共用配置。前端密码门用于访问提示，私密资料仍不应存放在公开仓库。
- 案例作者原文及其校验摘要必须保留；本站步骤和练习属于编辑建议，不能视为作者原述或生成实测。
- 学习行为只统计固定动作与类别，答案、分数、搜索词和作品不上传；仅正式域名发送事件。本地预览不计入正式统计。
