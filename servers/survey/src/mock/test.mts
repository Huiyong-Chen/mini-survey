import type { MockItem } from './api.mock.types.mts';
import mock from 'mockjs';

const api_test: MockItem<{
  name: string;
}> = {
  url: '/api/test',
  method: 'get',
  response: () => {
    return {
      code: 0,
      data: {
        name: mock.Random.cname(),
      },
    };
  },
};
export const test = [api_test];
