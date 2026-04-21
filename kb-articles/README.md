# kb-articles · AI 文章知识库

本目录由 **article-kb skill** 维护，用来沉淀 William 阅读过的 AI 相关公众号 / 博客文章。

## 目录结构

```
kb-articles/
├── README.md                 # 本文件
├── index.json                # 主索引，所有文章元数据
└── A00N-<slug>/              # 单篇文章目录
    ├── original.json         # 抓取的原文 JSON（gitignore，本地保留）
    ├── notes.md              # 结构化笔记（可公开，带完整出处）
    └── metadata.json         # 索引字段（含飞书文档 token/url）
```

## 使用方法

### 入库（加新文章）

发一个文章链接给 Claude Code，说"入库"或类似意思，skill 自动：
1. 抓原文 → 生成结构化笔记
2. 分配下一个编号（A002、A003...）
3. 存到本地 + 导入飞书「📚 AI 资料库」

### 调用（写 stage 文章）

告诉 Claude Code："**基于 A001、A003 写一篇 stage-3 文章，关于 xxx**"

Skill 会：
1. 读对应的 notes.md
2. 按你 VitePress 项目的 stage 风格写草稿
3. 文末附「扩展阅读」指回原文

## 版权纪律

- 原文 JSON（`original.json`）**不入 git**
- notes.md 是摘要 + 短引用 + 元数据，不是搬运
- 飞书和 VitePress 上的衍生产出都明确注明原作者和原文链接

## 飞书同步位置

「📚 AI 资料库」：https://my.feishu.cn/drive/folder/Rb26fRteil54DCdyi4tc8Qy6nxb
