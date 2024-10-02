module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ["security"],
  extends: [
    "standard-with-typescript",
    "plugin:security/recommended",
    "prettier", // <- keep prettier as last item in extends property.
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "@typescript-eslint/strict-boolean-expressions": [
      "error",
      {
        allowNullableString: true,
        allowAny: true,
      },
    ],
    "@typescript-eslint/prefer-nullish-coalescing": "error",
    "@typescript-eslint/strict-boolean-expressions": "warn",
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/prefer-includes": "off",
    "@typescript-eslint/no-misused-promises": "error",
    "@typescript-eslint/consistent-indexed-object-style": "warn",
    "prefer-const": "error",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { prefer: "no-type-imports" },
    ],
    "@typescript-eslint/restrict-template-expressions": "warn",
    "@typescript-eslint/no-misused-promises": "error",
  },
};
