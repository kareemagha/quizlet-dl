import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    rules: {
      semi: ['error', 'always'],
      'padded-blocks': ['error', 'never'],
      'no-inline-comments': 'error',
      'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
      'eol-last': ['error', 'always'],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
    },
  },
);