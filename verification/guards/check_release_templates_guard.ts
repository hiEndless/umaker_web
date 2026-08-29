import { exists, fail, ok } from "../lib/paths.js";

const REQUIRED = [
  ".github/pull_request_template.md",
  "docs/operations/发布说明模板.md",
  "docs/operations/灰度上线手册模板.md",
  "docs/operations/回滚手册模板.md",
  "docs/operations/验证运行手册.md",
  "docs/cookbook/新增服务.md",
];

const missing = REQUIRED.filter((rel) => !exists(rel));
if (missing.length) fail("release templates guard", missing);
ok("release templates guard passed");
