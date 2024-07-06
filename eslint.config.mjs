import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(eslint.configs.recommended, ...tseslint.configs.recommended, eslintConfigPrettier, {
  languageOptions: {
    globals: {
      ...globals.node,
    },
  },
  rules: {
    "no-unused-vars": "error",
    "no-unused-expressions": "error",
    "prefer-const": "error",
    "no-console": "warn",
    "no-undef": "error",
  },
  ignores: ["dist", "node_modules"],
});
