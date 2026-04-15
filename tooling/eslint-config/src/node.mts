import { defineConfig, type Config } from 'eslint/config';
import globals from 'globals';
import baseConfig from './base.mts';

const config: Config[] = defineConfig([
  ...baseConfig,
  {
    languageOptions: {
      globals: { ...globals.node },
    },
  },
]);

export default config;
