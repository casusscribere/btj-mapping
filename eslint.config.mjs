import globals from "globals";
import pluginJs from "@eslint/js";
import html from "@html-eslint/eslint-plugin";
import stylisticJs from '@stylistic/eslint-plugin-js';

export default [
  // HTML files.
  {
    ...html.configs["flat/recommended"],
    files: [
      "dist/**/*.html",
    ],
  },
  // JavaScript files.
  {
    languageOptions: { globals: {...globals.browser, ...globals.node} },
    ...pluginJs.configs.recommended,
    plugins: {
      '@stylistic/js': stylisticJs
    },
    files: [
      "src/**/*.js",
    ],
    rules: {
      '@stylistic/js/indent': ['error', 2],
    }
  }
];
