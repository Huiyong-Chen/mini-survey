import { type Configuration } from 'lint-staged';

const config: Configuration = {
  // package.json 优先
  '**/package.json': ['sort-package-json', 'prettier --write'],
  // eslint 只跑代码
  '**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx,vue}': ['eslint --fix', 'pnpm -r lint:fix --color'],
  // prettier 跑全部
  '**/*': ['prettier --write --ignore-unknown'],
};

export default config;
