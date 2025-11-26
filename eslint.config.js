module.exports = {
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    globals: {
      node: 'readonly',
    },
  },
  plugins: {
    '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
  },
  rules: {
    '@typescript-eslint/no-empty-function': 0,
  },
  ignores: ['node_modules/**', 'dist/**', 'coverage/**'],
};
