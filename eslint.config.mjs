import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const compatConfig = compat
  .config({
    extends: [
      "next/core-web-vitals",
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
    ],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { varsIgnorePattern: "^_", ignoreRestSiblings: true },
      ],
    },
    parserOptions: {
      ecmaVersion: "latest",
    },
    env: {
      es2024: true,
      node: true,
      browser: true,
    },
  })
  .map((config) => ({
    ...config,
    files: ["src/**/*.{ts,tsx,js,jsx}", "next.config.ts"],
  }));

const config = [
  {
    ignores: [
      "**/.next/**",
      "**/node_modules/**",
      "public/sw.js",
      "public/workbox-*.js",
      "src/lib/unmute.js",
    ],
  },
  ...compatConfig,
  {
    files: ["next.config.ts"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];

export default config;
