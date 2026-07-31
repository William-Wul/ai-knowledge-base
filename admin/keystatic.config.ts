import { config, fields, collection } from '@keystatic/core';
import { block } from '@keystatic/core/content-components';

const customComponents = {
  BilibiliVideo: block({
    label: 'B 站视频',
    schema: {
      bvid: fields.text({ label: 'BV 号', validation: { isRequired: true } }),
      title: fields.text({ label: '标题（可选）' }),
    },
  }),
};

const articleSchema = {
  title: fields.slug({
    name: { label: '标题', validation: { isRequired: true } },
  }),
  description: fields.text({ label: '描述', multiline: true }),
  date: fields.date({ label: '日期（可选）' }),
  content: fields.mdx({
    label: '正文',
    extension: 'md',
    options: {
      image: {
        directory: 'docs/public/images',
        publicPath: '/images/',
      },
    },
    components: customComponents,
  }),
};

const makeCollection = (label: string, path: `docs/${string}/*`) =>
  collection({
    label,
    slugField: 'title',
    path,
    format: { contentField: 'content' },
    schema: articleSchema,
  });

// 注意：collections 按物理目录划分（Keystatic 只能按路径收文件）。
// 网站的展示结构是 2026-07-28 重组后的「四大板块」，与物理目录解耦，
// 由 docs/.vitepress/stagesData.js 的清单决定——这里的标签只提示该目录文章
// 在展示结构里的归属，不影响侧边栏和面包屑。
// stage-3/5/6 不再承接新文章（"内容已搬家"目录），仅为编辑存量文章保留入口。
export default config({
  storage: { kind: 'local' },
  collections: {
    stage1: makeCollection('stage-1 · AI 快速认知（基础学习）', 'docs/stage-1/*'),
    stage2: makeCollection('stage-2 · 工具上手 / 注意事项 / 部分进阶实践', 'docs/stage-2/*'),
    stage3: makeCollection('stage-3 · 进阶实践（存量目录，不接新稿）', 'docs/stage-3/*'),
    stage4: makeCollection('stage-4 · 进阶实践 / 工具上手', 'docs/stage-4/*'),
    stage5: makeCollection('stage-5 · AI 编程教程（展示归工具上手，不接新稿）', 'docs/stage-5/*'),
    stage6: makeCollection('stage-6 · 一人公司（展示归 AI 前沿，不接新稿）', 'docs/stage-6/*'),
    news: makeCollection('news · AI 新闻（展示归 AI 前沿）', 'docs/news/*'),
    hot: makeCollection('hot · AI 日报（每日自动同步，慎改）', 'docs/hot/*'),
    frontier: makeCollection('frontier · AI 前沿专题', 'docs/frontier/*'),
    exams: makeCollection('exams · 能力自测', 'docs/exams/*'),
  },
});
