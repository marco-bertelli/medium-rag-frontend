module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['**/config/*.js', '**/scripts/*.js', '**/src/types/*'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    'no-unused-vars': ['off'],
    'no-duplicate-imports': ['warn'],
    'no-unused-private-class-members': ['error'],
    'vars-on-top': ['error'],
    'max-params': ['warn', 4],
    'max-len': ['warn', 400],
    'func-style': ['off'],
    'no-magic-numbers': ['off'],
    'no-nested-ternary': ['warn'],
    'sort-imports': ['off'],
    'react-hooks/exhaustive-deps': ['off'],
    'react/self-closing-comp': ['error'],
    'no-explicit-any': ['off'],
  },
}
