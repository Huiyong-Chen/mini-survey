import nodeConfig from '@survey/eslint-config/node';
import eslintConfigPrettier from 'eslint-config-prettier';
import { defineConfig, type Config } from 'eslint/config';

const config: Config[] = defineConfig([
  { ignores: ['apps/**'] },
  ...nodeConfig,
  {
    files: ['**/*.mts'],
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
