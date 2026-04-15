import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, type Config } from 'eslint/config';
import globals from 'globals';
import baseConfig from './base.mts';

const config: Config[] = defineConfig([
  ...baseConfig,
  reactHooks.configs.flat.recommended,
  reactRefresh.configs.vite,
  {
    files: ['**/*.{mts,tsx}'],
    languageOptions: {
      globals: { ...globals.browser },
    },
  },
]);

export default config;
