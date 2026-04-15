import { defineConfig, type ViteUserConfig } from 'vitest/config';

const config: ViteUserConfig = defineConfig({
  test: {
    projects: ['apps/*', 'servers/*', 'packages/*'],
    globals: true, // 允许在代码中直接使用 describe/it，不需要 import
    environment: 'node', // 默认环境设为 node
    passWithNoTests: true, // 如果某个包没写测试，不报错
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});

export default config;
