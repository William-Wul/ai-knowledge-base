# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "matplotlib>=3.8",
# ]
# ///
"""
为 frontier 文章生成两张配图：
1. skill_vs_gene_scores.png — Skill vs Gene 得分对比
2. skill_vs_gene_structure.png — 两种"说明书"的结构对比
"""

import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch
import matplotlib.font_manager as fm
from pathlib import Path

# macOS 中文字体
for fname in ["PingFang SC", "Heiti SC", "Hiragino Sans GB", "STHeiti", "Arial Unicode MS"]:
    if any(f.name == fname for f in fm.fontManager.ttflist):
        plt.rcParams["font.family"] = fname
        break
plt.rcParams["axes.unicode_minus"] = False

OUT = Path(__file__).parent

# ---------------- 图 1: Skill vs Gene 得分对比 ----------------
# 左：两模型下"什么都不给 vs 给 Skill"的真实数据（强模型反被拖累）
# 右：两模型平均后，Skill vs Gene 的总体差异（Gene 只有均值）
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 6), dpi=200,
                               gridspec_kw={"width_ratios": [1.3, 1]})

# -- 左：各模型下 Skill 的表现 --
models = ["Flash Lite\n（弱模型）", "Pro\n（强模型）"]
baseline = [41.8, 60.1]
skill = [49.0, 50.7]
x = range(len(models))
width = 0.35
b1 = ax1.bar([i - width / 2 for i in x], baseline, width,
             label="① 什么都不给（基线）", color="#9CA3AF")
b2 = ax1.bar([i + width / 2 for i in x], skill, width,
             label="② 一份 2500 字的完整说明书（Skill）", color="#EF4444")

for bars in [b1, b2]:
    for b in bars:
        h = b.get_height()
        ax1.text(b.get_x() + b.get_width() / 2, h + 0.8, f"{h:.1f}",
                 ha="center", va="bottom", fontsize=11, fontweight="bold")

# 画差值箭头
ax1.annotate("", xy=(0 + width / 2, 49.0), xytext=(0 - width / 2, 41.8),
             arrowprops=dict(arrowstyle="->", color="#059669", lw=2))
ax1.text(0, 54, "+7.2", ha="center", color="#047857",
         fontsize=12, fontweight="bold")
ax1.annotate("", xy=(1 + width / 2, 50.7), xytext=(1 - width / 2, 60.1),
             arrowprops=dict(arrowstyle="->", color="#DC2626", lw=2))
ax1.text(1, 56.5, "-9.4", ha="center", color="#B91C1C",
         fontsize=12, fontweight="bold")

ax1.set_ylabel("任务得分（越高越好）", fontsize=12)
ax1.set_title("真实数据：长说明书在强模型上反被拖累",
              fontsize=13, fontweight="bold", pad=14)
ax1.set_xticks(list(x))
ax1.set_xticklabels(models, fontsize=11)
ax1.set_ylim(0, 75)
ax1.legend(loc="upper right", fontsize=9.5, frameon=False)
ax1.spines["top"].set_visible(False)
ax1.spines["right"].set_visible(False)
ax1.grid(axis="y", alpha=0.25, linestyle="--")

# -- 右：两模型均值下 Baseline / Skill / Gene --
avg_baseline = (41.8 + 60.1) / 2   # 50.95
avg_skill = (49.0 + 50.7) / 2      # 49.85，-1.1pp
avg_gene = avg_baseline + 3.0      # 论文原话：Gene 平均高出 3.0pp

labels = ["① 什么都不给\n（基线）",
          "② Skill 说明书\n（2500 字）",
          "③ Gene 控制片\n（230 字）"]
values = [avg_baseline, avg_skill, avg_gene]
colors = ["#9CA3AF", "#EF4444", "#10B981"]

bars = ax2.bar(labels, values, color=colors, width=0.55)
for b, v in zip(bars, values):
    ax2.text(b.get_x() + b.get_width() / 2, v + 0.6, f"{v:.1f}",
             ha="center", va="bottom", fontsize=12, fontweight="bold")

ax2.text(1, avg_skill - 2.5, "-1.1pp", ha="center",
         color="#B91C1C", fontsize=11, fontweight="bold")
ax2.text(2, avg_gene - 2.5, "+3.0pp", ha="center",
         color="#047857", fontsize=11, fontweight="bold")

ax2.set_ylabel("两模型平均得分", fontsize=12)
ax2.set_title("论文均值：Gene 比 Skill 高出约 4 分",
              fontsize=13, fontweight="bold", pad=14)
ax2.set_ylim(0, 65)
ax2.spines["top"].set_visible(False)
ax2.spines["right"].set_visible(False)
ax2.grid(axis="y", alpha=0.25, linestyle="--")

plt.suptitle("同一份底层经验，形态不同 — 效果天差地别",
             fontsize=15, fontweight="bold", y=1.02)
plt.tight_layout()
plt.savefig(OUT / "skill_vs_gene_scores.png", dpi=200, bbox_inches="tight",
            facecolor="white")
plt.close()
print(f"saved: {OUT / 'skill_vs_gene_scores.png'}")


# ---------------- 图 2: Skill vs Gene 结构对比 ----------------
fig, (axL, axR) = plt.subplots(1, 2, figsize=(12, 7.5), dpi=200)

for ax in (axL, axR):
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 10)
    ax.axis("off")

# 左：Skill（大而全的说明书）
axL.text(5, 9.4, "传统做法：Skill 说明书",
         ha="center", fontsize=15, fontweight="bold", color="#991B1B")
axL.text(5, 8.75, "约 2500 字 · 像一份完整 README",
         ha="center", fontsize=11, color="#6B7280")

skill_blocks = [
    ("① 用途介绍（Overview）", "#FCA5A5", "给人看的开场白"),
    ("② 工作流程（Workflow）", "#86EFAC", "← 唯一真正有用的部分"),
    ("③ 常见坑（Pitfalls）", "#FED7AA", "零散的提醒"),
    ("④ 错误处理（Error handling）", "#FED7AA", "冗长的说明"),
    ("⑤ API 用法（Notes）", "#FED7AA", "参考文档"),
    ("⑥ 示例代码（Examples）", "#FED7AA", "体量大"),
    ("⑦ 脚本（Scripts）", "#FED7AA", "附加资源"),
]
y_top = 7.8
block_h = 0.82
for i, (name, color, note) in enumerate(skill_blocks):
    y = y_top - i * (block_h + 0.08)
    axL.add_patch(FancyBboxPatch(
        (0.8, y - block_h), 8.4, block_h,
        boxstyle="round,pad=0.02,rounding_size=0.08",
        facecolor=color, edgecolor="#4B5563", linewidth=0.6))
    axL.text(1.1, y - block_h / 2, name, fontsize=10.5, va="center",
             fontweight="bold")
    axL.text(9.1, y - block_h / 2, note, fontsize=9, va="center",
             ha="right", color="#374151", style="italic")

axL.text(5, 0.9, "[ 论文实测 ]\n喂给强模型反而让得分从 60.1 → 50.7",
         ha="center", fontsize=10, color="#B91C1C", fontweight="bold",
         bbox=dict(boxstyle="round,pad=0.5", facecolor="#FEF2F2",
                   edgecolor="#EF4444", linewidth=1.2))

# 右：Gene（紧凑的控制片）
axR.text(5, 9.4, "新做法：Gene 控制片",
         ha="center", fontsize=15, fontweight="bold", color="#065F46")
axR.text(5, 8.75, "约 230 字 · 像一张便签",
         ha="center", fontsize=11, color="#6B7280")

gene_blocks = [
    ("① Domain keywords\n  （领域关键词）", "#A7F3D0",
     "定位"),
    ("② Summary\n  （一句话目标）", "#A7F3D0",
     "对齐"),
    ("③ Strategy\n  （策略：按顺序执行的步骤）", "#6EE7B7",
     "★ 这层最关键"),
    ("④ AVOID\n  （避坑警告：失败蒸馏成\n    独立短句）", "#34D399",
     "★ 独立的失败警示"),
]
y_top = 7.6
block_h = 1.45
for i, (name, color, note) in enumerate(gene_blocks):
    y = y_top - i * (block_h + 0.12)
    axR.add_patch(FancyBboxPatch(
        (0.8, y - block_h), 8.4, block_h,
        boxstyle="round,pad=0.02,rounding_size=0.08",
        facecolor=color, edgecolor="#047857", linewidth=0.8))
    axR.text(1.1, y - block_h / 2, name, fontsize=10.5, va="center",
             fontweight="bold")
    axR.text(9.1, y - block_h / 2, note, fontsize=9, va="center",
             ha="right", color="#065F46", style="italic")

axR.text(5, 0.9, "[ 论文实测 ]\n得分稳定高于基线约 3 分\n10 倍更短，效果反超",
         ha="center", fontsize=10, color="#047857", fontweight="bold",
         bbox=dict(boxstyle="round,pad=0.5", facecolor="#ECFDF5",
                   edgecolor="#10B981", linewidth=1.2))

plt.suptitle("给 AI 的'说明书'：写成文档 vs 写成控制片",
             fontsize=15, fontweight="bold", y=0.995)
plt.tight_layout()
plt.savefig(OUT / "skill_vs_gene_structure.png", dpi=200, bbox_inches="tight",
            facecolor="white")
plt.close()
print(f"saved: {OUT / 'skill_vs_gene_structure.png'}")
