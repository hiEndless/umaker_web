#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT_DIR"

echo "gray release pipeline (template)"
bash tools/ci/verify_all.sh
echo '{"status":"ready_for_gray"}' > verification/reports/gray_release_manifest.latest.json
echo "gray release pipeline passed"
