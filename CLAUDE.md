# CLAUDE.md — AI 学习知识库工作手册

## 项目定位

面向公司内部约 300 名员工的 AI 学习知识库，读者以无技术背景人群为主。
目标：构建一个内容丰富、专业有收获的 AI 学习路径，william 本人也是目标用户之一。
维护者：william + Claude（双人协作，无其他团队成员）。

### 维护者身份与协作风格

William 是非技术背景的 PM。协作原则：
- 一步步来，每步确认，不跳流程
- 遇到复杂决策，先列出方案选项，由 william 选择后再执行
- 协作模式类似"老板委派员工"：william 定方向和验收，Claude 负责执行和技术判断
- 提需求时使用 `PRODUCT_TEMPLATE.md` 模板，开发完成后按 `TEST_REPORT_TEMPLATE.md` 输出测试报告

## 关键 URL

- **线上网站**：https://ailinkstart.com
- **GitHub 仓库**：https://github.com/William-Wul/ai-knowledge-base
- **GitHub Actions 构建状态**：https://github.com/William-Wul/ai-knowledge-base/actions

## 账号信息（只记位置，不记凭证）

| 平台 | 账号标识 | 用途 |
|------|----------|------|
| GitHub | William-Wul（个人账号） | 代码托管、GitHub Pages 部署 |
| 阿里云 | — | 域名注册；未来 ICP 备案 + OSS/VOD |
| Cloudflare | Google 邮箱登录 | DNS + CDN（Proxy 开启） |
| Netlify | sheebawahid322@gmail.com（站点前缀 animated-beignet-842941） | 曾用于 Decap CMS Identity；账号已因 credit limit 暂停 |

## 技术栈

- **框架**：VitePress 1.x（静态站点生成）
- **部署**：GitHub Pages，push main 分支后 GitHub Actions 自动构建（约 1-2 分钟）
- **域名**：ailinkstart.com，DNS + CDN 走 Cloudflare，CNAME 文件在 `docs/public/CNAME`
- **访问控制**：全站密码门（前端 JS 实现），`<meta name="robots" content="noindex, nofollow">` 屏蔽搜索引擎
- **Analytics**：Google Analytics（已接入，ID 在 vitepress config 的 head 里）
- **Node**：20，包管理器 npm

## 本地路径

个人 Mac 路径：

```
/Users/william/Desktop/claude专用/ai-knowledge-base/
```

2026 年 4 月从工作电脑迁移到个人电脑，工作电脑副本已删除。此后仅在个人电脑开发，不再使用工作电脑。

## 文件结构

```
├── docs/
│   ├── .vitepress/
│   │   └── config.js          # 导航、侧边栏、主题配置（核心文件）
│   ├── public/                # 静态资源（favicon、CNAME 等）
│   ├── stage-1/ ~ stage-6/   # 六阶段学习内容
│   ├── news/                  # AI 新闻专区
│   ├── frontier/              # AI 前沿专区
│   ├── coding/                # AI 编程专区
│   ├── exams/                 # 学习测试专区
│   └── index.md               # 首页
├── CHANGELOG.md               # 版本记录，每次发布后更新
├── PRODUCT_TEMPLATE.md        # 需求提交模板
├── TEST_REPORT_TEMPLATE.md    # 测试报告模板
├── publish.sh                 # 一键发布脚本
└── .github/workflows/deploy.yml
```

## 内容结构

六阶段学习路径：

| 目录    | 阶段名           | 定位                          |
| ------- | ---------------- | ----------------------------- |
| stage-1 | 快速认知         | AI 是什么、术语扫盲           |
| stage-2 | 零基础上手       | 注册、工具全景、Prompt 入门   |
| stage-3 | AI 进阶概念      | Agentic AI、AI Harness        |
| stage-4 | 工作场景实战     | HR/财务/法务/运营/产品/创意   |
| stage-5 | AI Agent 使用    | Claude Code、OpenClaw         |
| stage-6 | AI 创意与创业    | 副业、创业案例                |

特色专区：`news/`（AI 新闻）、`frontier/`（AI 前沿）、`coding/`（AI 编程）、`exams/`（学习测试，链接外部问卷工具）

## 侧边栏管理

侧边栏由 `docs/.vitepress/config.js` 中的 `autoItems()` 函数自动维护：
- **已知文件列表**：按顺序显示，文件删除后自动消失
- **新增文件**：自动追加到对应 section 末尾，标题从 frontmatter `title:` 或第一个 `#` 读取
- **新增文章后无需手动改侧边栏**，但如需控制顺序，要把文件加入 `autoItems()` 的已知列表

## 发布流程

```bash
./publish.sh "更新说明"   # 自动 git add . && commit && push
# GitHub Actions 构建完成后网站自动更新（约 1-2 分钟）
```

发布完成后必须更新 `CHANGELOG.md`。

## 需求协作流程

参考 `PRODUCT_TEMPLATE.md`，标准流程：

1. william 按模板提需求
2. Claude 评审（技术可行性、风险、方案建议）
3. william 确认后开始开发
4. Claude 开发 + 自测，按 `TEST_REPORT_TEMPLATE.md` 输出测试报告
5. william 验收
6. 确认后执行 `./publish.sh`，更新 CHANGELOG

## 当前 Pending 事项

**Decap CMS 后台登录损坏**
- 原因：Netlify 账号因 credit limit 被暂停，Netlify Identity 身份验证失效
- 影响：`/admin` 后台无法登录，网站本身不受影响
- 修复方向：迁移到其他身份验证方案，或放弃 Decap CMS
- 优先级：低（近期重心在内容创作）

**ICP 备案未办**
- 未完成 ICP 备案
- 备案后计划将视频从 Bilibili 迁移到腾讯云 VOD 或阿里云 VOD
- 当前视频通过 Bilibili 嵌入（`BilibiliVideo.vue` 组件），画质限制为 360p

**项目资产归属待正式化**
- 目前代码在个人 GitHub + 个人域名下
- 计划与领导沟通，定位为"个人项目 + 对内共享"

## 踩过的坑 & 硬约束

**必须用 build 验证，不能只跑 dev**
- 改完代码必须执行 `npm run docs:build` 验证构建无报错，再推送
- 历史上因只跑 dev 未跑 build，导致线上 GitHub Actions 部署失败过 2 次

**base 路径**
- 已从 `/ai-knowledge-base/` 改为 `/`（迁移到自定义域名 ailinkstart.com 时修改）
- 任何涉及路径的配置不要用旧的子路径

**Cloudflare Proxy 开启时 GitHub Pages HTTPS 显示灰色**
- Cloudflare Proxy（橙色云朵）处于开启状态
- GitHub Pages 设置里"Enforce HTTPS"会显示灰色不可用，这是正常现象，不需要处理

## 近期优先级

内容创作优先。功能开发和技术债暂缓，Pending 事项按需处理。
