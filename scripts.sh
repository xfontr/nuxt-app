#!/bin/bash

# 🎨 Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RESET='\033[0m'

# 🧪 Test targets
tests=(
  "Test: UI|pnpm --filter @portfolio/ui test"
  "Test: App|pnpm --filter @portfolio/app test"
  "Test: Stylegen|pnpm --filter @portfolio/stylegen test"
  "Test: Configs|pnpm --filter @portfolio/configs test"
)

# 📊 Coverage targets
coverage=(
  "Coverage: UI|pnpm --filter @portfolio/ui test:coverage"
  "Coverage: Stylegen|pnpm --filter @portfolio/stylegen test:coverage"
  "Coverage: App|pnpm --filter @portfolio/app test:coverage"
  "Coverage: Configs|pnpm --filter @portfolio/configs test:coverage"
)

# 🧹 Lint targets
lints=(
  "Lint: App|pnpm --filter @portfolio/app lint"
  "Lint: UI|pnpm --filter @portfolio/ui lint"
  "Lint: Stylegen|pnpm --filter @portfolio/stylegen lint"
)

# 📖 Help
show_help() {
  echo ""
  printf "${CYAN}Usage: ./quality.sh [--unit] [--coverage] [--lint]\n${RESET}"
  echo ""
  echo "  --unit       Run unit tests"
  echo "  --coverage   Run test coverage"
  echo "  --lint       Run linter checks"
  echo "  (none)       Run all quality checks"
  echo ""
  exit 0
}

# 🚀 Runner
run() {
  label="$1"
  cmd="$2"

  printf "${YELLOW}▶ %s${RESET}\n" "$label"
  eval "$cmd"

  if [ $? -eq 0 ]; then
    printf "${GREEN}✔ Success: %s${RESET}\n\n" "$label"
  else
    printf "${RED}✖ Failed: %s${RESET}\n\n" "$label"
    exit 1
  fi
}

# 🧠 Parse args
RUN_TESTS=false
RUN_COVERAGE=false
RUN_LINT=false

if [ $# -eq 0 ]; then
  RUN_TESTS=true
  RUN_COVERAGE=true
  RUN_LINT=true
fi

for arg in "$@"; do
  case "$arg" in
    --unit)
      RUN_TESTS=true
      ;;
    --coverage)
      RUN_COVERAGE=true
      ;;
    --lint)
      RUN_LINT=true
      ;;
    -h|--help)
      show_help
      ;;
    *)
      printf "${RED}Unknown option: %s${RESET}\n" "$arg"
      show_help
      ;;
  esac
done

# 🎬 Start
echo ""
printf "${CYAN}🚀 Running code quality checks...\n\n${RESET}"

if $RUN_TESTS; then
  for entry in "${tests[@]}"; do
    IFS="|" read -r label cmd <<< "$entry"
    run "$label" "$cmd"
  done
fi

if $RUN_COVERAGE; then
  for entry in "${coverage[@]}"; do
    IFS="|" read -r label cmd <<< "$entry"
    run "$label" "$cmd"
  done
fi

if $RUN_LINT; then
  for entry in "${lints[@]}"; do
    IFS="|" read -r label cmd <<< "$entry"
    run "$label" "$cmd"
  done
fi

printf "${GREEN}✅ All quality checks passed!${RESET}\n"
echo ""