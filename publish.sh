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
