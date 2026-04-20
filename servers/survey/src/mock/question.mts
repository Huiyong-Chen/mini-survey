import type { MockItem } from '../types/api.mock.api.mts';
import mock from 'mockjs';

const question_detail: MockItem<{
  id: string;
  title: string;
}> = {
  url: '/api/question/:id',
  method: 'get',
  response: () => {
    return {
      error: 0,
      data: {
        id: mock.Random.id(),
        title: mock.Random.ctitle(),
      },
    };
  },
};

const question_list: MockItem<{
  id: string;
  title: string;
}> = {
  url: '/api/test',
  method: 'get',
  response: () => {
    return {
      error: 0,
      data: {
        id: mock.Random.id(),
        title: mock.Random.ctitle(),
      },
    };
  },
};

export const question = [question_detail, question_list];
