#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT_DIR"

bash tools/local/verify_quick.sh

run() {
  pnpm exec tsx "$1"
}

pnpm -r run typecheck
pnpm --filter @umaker/api run typecheck:workers
pnpm --filter @umaker/cloudflare-adapters run typecheck
run verification/replay/run_replay.ts
run verification/replay/compare_replay_cases.ts
run verification/diff/compare_outputs.ts
run verification/auditors/check_invariants.ts
