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

export default config({
  storage: { kind: 'local' },
  collections: {
    stage1: makeCollection('阶段一 · 快速认知', 'docs/stage-1/*'),
    stage2: makeCollection('阶段二 · 零基础上手', 'docs/stage-2/*'),
    stage3: makeCollection('阶段三 · AI 进阶概念', 'docs/stage-3/*'),
    stage4: makeCollection('阶段四 · 工作场景实战', 'docs/stage-4/*'),
    stage5: makeCollection('阶段五 · AI Agent 使用', 'docs/stage-5/*'),
    stage6: makeCollection('阶段六 · AI 创意与创业', 'docs/stage-6/*'),
    news: makeCollection('AI 新闻', 'docs/news/*'),
    hot: makeCollection('AI 热点日报', 'docs/hot/*'),
    frontier: makeCollection('AI 前沿', 'docs/frontier/*'),
    exams: makeCollection('学习测试', 'docs/exams/*'),
  },
});
