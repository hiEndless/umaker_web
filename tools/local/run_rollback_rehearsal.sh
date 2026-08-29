#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT_DIR"

echo "rollback rehearsal (template)"
bash tools/local/verify_quick.sh
echo "rollback rehearsal passed"
