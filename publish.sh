#!/bin/bash
# =====================================================
# AI 知识库一键发布脚本
# 用法：./publish.sh "更新说明"
# 例如：./publish.sh "新增：HR 场景教程"
# =====================================================

set -e  # 任何步骤出错立即停止

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# 进入项目目录
cd "$(dirname "$0")"

echo -e "${YELLOW}📦 准备发布 AI 知识库...${NC}"

# 检查是否有未保存的变更
if git diff --quiet && git diff --cached --quiet && [ -z "$(git status --porcelain)" ]; then
  echo -e "${YELLOW}⚠️  没有检测到任何变更，无需发布。${NC}"
  exit 0
fi

# 拦截 iCloud 同步冲突副本（如 "xxx 2.md"），避免垃圾文件混进公开仓库
# 只检查 git 会实际提交的文件（已跟踪 + 未被忽略的未跟踪），不误伤 dist 产物
CONFLICTS=$( { git -c core.quotePath=false ls-files --others --exclude-standard; git -c core.quotePath=false ls-files; } | grep -E ' [0-9]+\.[A-Za-z0-9]+$' || true )
if [ -n "$CONFLICTS" ]; then
  echo -e "${RED}❌ 检测到 iCloud 冲突副本将被提交，请先处理后再发布：${NC}"
  echo "$CONFLICTS"
  exit 1
fi

# 未跟踪文件确认门：git add . 会全量提交，先列清单给维护者确认
UNTRACKED=$(git -c core.quotePath=false ls-files --others --exclude-standard)
if [ -n "$UNTRACKED" ]; then
  echo -e "${YELLOW}📋 以下未跟踪文件将被一并提交：${NC}"
  echo "$UNTRACKED"
  if [ -t 0 ]; then
    echo -n -e "${YELLOW}确认无误后输入 y 继续，其他任意键取消：${NC}"
    read -r CONFIRM
    if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
      echo -e "${YELLOW}已取消发布。${NC}"
      exit 1
    fi
  else
    echo -e "${RED}❌ 非交互环境不允许带未跟踪文件发布，请先人工确认文件清单。${NC}"
    exit 1
  fi
fi

# 获取提交说明
if [ -n "$1" ]; then
  COMMIT_MSG="$1"
else
  echo -e "${YELLOW}请输入本次更新说明（直接回车使用默认）：${NC}"
  read -r COMMIT_MSG
  if [ -z "$COMMIT_MSG" ]; then
    COMMIT_MSG="内容更新 $(date '+%Y-%m-%d %H:%M')"
  fi
fi

# 暂存所有变更
echo -e "${GREEN}➕ 暂存变更...${NC}"
git add .

# 提交
echo -e "${GREEN}✅ 提交：${COMMIT_MSG}${NC}"
git commit -m "$COMMIT_MSG"

# 推送
echo -e "${GREEN}🚀 推送到 GitHub...${NC}"
git push

echo ""
echo -e "${GREEN}✨ 发布成功！${NC}"
echo -e "GitHub Actions 正在自动构建，约 1-2 分钟后网站更新。"
echo -e "可在 GitHub 仓库的 Actions 标签页查看构建进度。"
