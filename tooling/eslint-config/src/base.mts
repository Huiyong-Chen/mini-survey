import jsESLint from '@eslint/js';
import { defineConfig, type Config } from 'eslint/config';
import tsESLint from 'typescript-eslint';

const config: Config[] = defineConfig([
  { ignores: ['node_modules/**', 'dist/**'] },
  jsESLint.configs.recommended,
  ...tsESLint.configs.recommendedTypeChecked,
  {
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-assertions': [
        'warn',
        {
          assertionStyle: 'as',
          objectLiteralTypeAssertions: 'never',
        },
      ],
    },
  },
]);

export default config;
