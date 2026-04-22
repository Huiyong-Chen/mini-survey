import type { MockItem } from './api.mock.types.mts';
import mock from 'mockjs';

const question_detail: MockItem<{
  id: string;
  title: string;
}> = {
  url: '/api/question/:id',
  method: 'get',
  response: () => {
    // return {
    //   code: 0,
    //   data: {
    //     id: mock.Random.id(),
    //     title: mock.Random.ctitle(),
    //   },
    // };
    return {
      code: 1002,
      msg: '错误测试',
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
      code: 0,
      data: {
        id: mock.Random.id(),
        title: mock.Random.ctitle(),
      },
    };
  },
};

export const question = [question_detail, question_list];
