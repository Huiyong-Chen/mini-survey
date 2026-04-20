import type { MockItem } from '../types/api.mock.api.mts';
import mock from 'mockjs';

const api_test: MockItem<{
  name: string;
}> = {
  url: '/api/test',
  method: 'get',
  response: () => {
    return {
      error: 0,
      data: {
        name: mock.Random.cname(),
      },
    };
  },
};
export const test = [api_test];
