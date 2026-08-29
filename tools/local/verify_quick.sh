#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT_DIR"

run() {
  pnpm exec tsx "$1"
}

run verification/guards/check_structure_guard.ts
run verification/guards/check_app_layout_guard.ts
run verification/guards/check_ddd_import_boundary_guard.ts
run verification/guards/check_contract_change_bundle_guard.ts
run verification/guards/check_release_templates_guard.ts
run verification/guards/check_compatibility_window_guard.ts
run verification/validators/validate_contracts.ts
run verification/validators/validate_fixture_schemas.ts
run verification/validators/validate_contract_index_consistency.ts
pnpm lint
