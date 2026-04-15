import reactConfig from '@survey/eslint-config/react';
import eslintConfigPrettier from 'eslint-config-prettier';
import { defineConfig, type Config } from 'eslint/config';

const config: Config[] = defineConfig([
  ...reactConfig,
  {
    files: ['**/*.{tsx,mts}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  eslintConfigPrettier,
]);

export default config;
