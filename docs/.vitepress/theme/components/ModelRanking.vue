<template>
  <div class="mr">
    <!-- 元信息条 -->
    <div class="mr-meta">
      <span class="mr-meta-item">数据来源：<a :href="lb.sourceUrl" target="_blank" rel="noopener">{{ lb.source }}</a></span>
      <span class="mr-meta-item">综合 {{ lb.sourceCount }} 家公开榜单</span>
      <span class="mr-meta-item">原榜更新于 {{ lb.sourceUpdatedAt }}</span>
      <span class="mr-meta-item">本站同步于 {{ syncedText }}</span>
    </div>

    <!-- 表头（桌面端） -->
    <div class="mr-head" aria-hidden="true">
      <span class="c-rank">排名</span>
      <span class="c-model">模型</span>
      <span class="c-date">上线日期</span>
      <span class="c-comp">评测完整度</span>
      <span class="c-price">输入 / 输出成本</span>
      <span class="c-score">共识分</span>
    </div>

    <!-- 榜单行：点击跳转到 AIHOT 该模型的各榜明细页 -->
    <a
      v-for="m in lb.models"
      :key="m.slug"
      class="mr-row"
      :href="`${lb.sourceUrl}/${m.slug}`"
      target="_blank"
      rel="noopener"
    >
      <span class="c-rank">
        <b class="rank-badge" :class="`top-${m.rank}`" v-if="m.rank <= 3">{{ pad(m.rank) }}</b>
        <span v-else class="rank-num">{{ pad(m.rank) }}</span>
      </span>
      <span class="c-model">
        <strong>{{ m.name }}</strong>
        <small>{{ m.provider }}</small>
      </span>
      <span class="c-date">{{ m.releaseDate }}</span>
      <span class="c-comp">
        <i class="comp-bar" aria-hidden="true"><i :style="{ width: m.completeness + '%' }"></i></i>
        {{ m.completeness.toFixed(1) }}%
      </span>
      <span class="c-price">
        <template v-if="m.inputPrice">{{ m.inputPrice }} / {{ m.outputPrice }}</template>
        <span v-else class="na">暂无</span>
      </span>
      <span class="c-score">{{ m.score.toFixed(1) }}</span>

      <!-- 移动端第二行：桌面端隐藏 -->
      <span class="mr-row-sub">
        上线 {{ m.releaseDate }} · 完整度 {{ m.completeness.toFixed(1) }}% ·
        <template v-if="m.inputPrice">成本 {{ m.inputPrice }} / {{ m.outputPrice }}</template>
        <template v-else>成本暂无</template>
      </span>
    </a>

    <!-- 来源与说明 -->
    <div class="mr-footer">
      <p>成本单位：美元 / 百万 Token（OpenRouter 标准 API 参考价，不含缓存、批量与长上下文阶梯价）。</p>
      <p>
        榜单与数据由 <a :href="lb.sourceUrl" target="_blank" rel="noopener">AIHOT</a>
        维护（作者：数字生命卡兹克），本站按其公开使用规则同步，每日更新一次；点击任一模型可查看它在各家榜单中的官方名次与原始分数。
      </p>
      <div class="mr-links">
        <a class="mr-btn primary" :href="lb.sourceUrl" target="_blank" rel="noopener">查看实时原榜 →</a>
        <a class="mr-btn" :href="lb.rulesUrl" target="_blank" rel="noopener">共识分计算规则 →</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import lb from '../../data/leaderboard.json'

const pad = (n) => String(n).padStart(2, '0')

// 同步时间统一转成北京时间展示
const syncedText = (() => {
  try {
    const d = new Date(lb.syncedAt)
    const parts = new Intl.DateTimeFormat('zh-CN', {
      timeZone: 'Asia/Shanghai',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).formatToParts(d)
    const get = (t) => parts.find((p) => p.type === t)?.value || ''
    return `${get('month')}月${get('day')}日 ${get('hour')}:${get('minute')}`
  } catch {
    return ''
  }
})()
</script>

<style scoped>
.mr {
  margin: 24px 0 32px;
  font-size: 14px;
}

/* ===== 元信息条 ===== */
.mr-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 20px;
  padding: 12px 16px;
  margin-bottom: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  font-size: 12.5px;
  color: var(--vp-c-text-2);
}
.mr-meta-item a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}
.mr-meta-item a:hover { text-decoration: underline; }

/* ===== 表头 ===== */
.mr-head {
  display: grid;
  grid-template-columns: 56px minmax(0, 1.6fr) 110px 140px 150px 76px;
  gap: 12px;
  padding: 10px 16px;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 11.5px;
  font-weight: 700;
  color: var(--vp-c-text-3);
  letter-spacing: 0.04em;
}
.mr-head .c-date,
.mr-head .c-comp,
.mr-head .c-price,
.mr-head .c-score { text-align: center; }

/* ===== 榜单行 ===== */
.mr-row {
  display: grid;
  grid-template-columns: 56px minmax(0, 1.6fr) 110px 140px 150px 76px;
  gap: 12px;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid var(--vp-c-divider);
  text-decoration: none;
  color: var(--vp-c-text-1);
  transition: background 0.15s ease;
}
.mr-row:hover { background: var(--vp-c-bg-soft); }

.c-rank { display: flex; align-items: center; }
.rank-num {
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  color: var(--vp-c-text-3);
}
.rank-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 22px;
  border-radius: 6px;
  font-family: var(--vp-font-family-mono);
  font-size: 12.5px;
  font-weight: 700;
}
.rank-badge.top-1 { background: rgba(201, 162, 39, 0.16); color: #a9821a; }
.rank-badge.top-2 { background: rgba(130, 145, 160, 0.18); color: #66788c; }
.rank-badge.top-3 { background: rgba(176, 121, 63, 0.16); color: #96662f; }

.c-model {
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
}
.c-model strong {
  font-size: 14.5px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.c-model small {
  font-size: 11.5px;
  color: var(--vp-c-text-3);
}

.c-date {
  font-family: var(--vp-font-family-mono);
  font-size: 12.5px;
  color: var(--vp-c-text-2);
  text-align: center;
}

.c-comp {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: var(--vp-font-family-mono);
  font-size: 12.5px;
  color: var(--vp-c-text-2);
}
.comp-bar {
  display: inline-block;
  width: 44px;
  height: 5px;
  border-radius: 3px;
  background: var(--vp-c-divider);
  overflow: hidden;
}
.comp-bar i {
  display: block;
  height: 100%;
  border-radius: 3px;
  background: var(--vp-c-brand-2);
}

.c-price {
  font-family: var(--vp-font-family-mono);
  font-size: 12.5px;
  color: var(--vp-c-text-2);
  text-align: center;
}
.c-price .na { color: var(--vp-c-text-3); }

.c-score {
  font-family: var(--vp-font-family-mono);
  font-size: 15px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  text-align: center;
}

.mr-row-sub { display: none; }

/* ===== 来源与说明 ===== */
.mr-footer {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px dashed var(--vp-c-divider);
  font-size: 12.5px;
  color: var(--vp-c-text-3);
  line-height: 1.8;
}
.mr-footer p { margin: 0 0 6px; }
.mr-footer a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}
.mr-footer a:hover { text-decoration: underline; }

.mr-links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 14px;
}
.mr-btn {
  display: inline-flex;
  align-items: center;
  padding: 9px 18px;
  border-radius: 8px;
  border: 1.5px solid var(--vp-c-brand-1);
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-brand-1) !important;
  text-decoration: none !important;
  transition: all 0.2s ease;
}
.mr-btn:hover {
  background: var(--vp-c-brand-soft);
}
.mr-btn.primary {
  background: var(--vp-c-brand-1);
  color: var(--vp-c-bg) !important;
}
.mr-btn.primary:hover {
  background: var(--vp-c-brand-2);
}

/* ===== 移动端：两行卡片式布局 ===== */
@media (max-width: 768px) {
  .mr-head { display: none; }
  .mr-row {
    grid-template-columns: 40px minmax(0, 1fr) 64px;
    grid-template-areas:
      'rank model score'
      'sub  sub   sub';
    row-gap: 6px;
    padding: 12px 14px;
  }
  .c-rank { grid-area: rank; }
  .c-model { grid-area: model; }
  .c-score { grid-area: score; text-align: right; }
  .c-date,
  .c-comp,
  .c-price { display: none; }
  .mr-row-sub {
    display: block;
    grid-area: sub;
    font-size: 11.5px;
    color: var(--vp-c-text-3);
  }
  .mr-meta { gap: 6px 14px; }
}
</style>
