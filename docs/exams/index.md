---
title: 学习测试
description: 完成各阶段学习后，通过测验检验自己的掌握程度
---

# 📝 学习测试

完成各阶段学习后，可以通过下方测验检验自己的掌握程度。每个测验都标注了覆盖内容和预计时长，点击"开始测试"即可跳转到考试系统。

<div class="exam-list">

  <div class="exam-card">
    <div class="exam-header">
      <span class="exam-tag">阶段一 · 二</span>
      <span class="exam-duration">⏱ 约 10 分钟</span>
    </div>
    <h3 class="exam-title">AI 基础认知测验</h3>
    <p class="exam-desc">覆盖「快速认知」与「零基础上手」两个阶段的核心内容，包括 AI 基本概念、常见工具、提示词写法及安全使用规范。</p>
    <div class="exam-meta">
      <span>📋 共 20 题</span>
    </div>
    <a class="exam-btn" href="https://example.com/exam-placeholder-1" target="_blank" rel="noopener noreferrer">开始测试 →</a>
  </div>

  <div class="exam-card">
    <div class="exam-header">
      <span class="exam-tag">阶段三 · 四</span>
      <span class="exam-duration">⏱ 约 15 分钟</span>
    </div>
    <h3 class="exam-title">AI 进阶应用测验</h3>
    <p class="exam-desc">覆盖「AI 进阶概念」与「工作场景实战」两个阶段，考察 Agentic AI、AI Harness 框架理解，以及在人资、财务、法务等实际工作场景中的应用能力。</p>
    <div class="exam-meta">
      <span>📋 共 25 题</span>
    </div>
    <a class="exam-btn" href="https://example.com/exam-placeholder-2" target="_blank" rel="noopener noreferrer">开始测试 →</a>
  </div>

</div>

<style>
.exam-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 32px;
}

.exam-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  background: var(--vp-c-bg-soft);
  transition: box-shadow 0.2s;
}

.exam-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.exam-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.exam-tag {
  display: inline-block;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-size: 12px;
  font-weight: 600;
  padding: 2px 10px;
  border-radius: 20px;
}

.exam-duration {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.exam-title {
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 8px 0;
  border: none;
  padding: 0;
}

.exam-desc {
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.7;
  margin: 0 0 16px 0;
}

.exam-meta {
  font-size: 13px;
  color: var(--vp-c-text-3);
  margin-bottom: 20px;
}

.exam-btn {
  display: inline-block;
  background: var(--vp-c-brand-1);
  color: #fff !important;
  font-size: 14px;
  font-weight: 600;
  padding: 8px 20px;
  border-radius: 8px;
  text-decoration: none !important;
  transition: background 0.2s;
}

.exam-btn:hover {
  background: var(--vp-c-brand-2);
}

@media (min-width: 768px) {
  .exam-list {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .exam-card {
    flex: 1 1 calc(50% - 10px);
    min-width: 280px;
  }
}
</style>
