import mock from 'mockjs';
import type { MockItem } from './api.mock.types.mts';

interface QuestionInfo {
  id: string;
  title: string;
  createdTime: number;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  isDeleted: boolean;
}

// 获取问卷列表
const question_list: MockItem<{
  list: QuestionInfo[];
  total: number;
}> = {
  url: '/api/question/list',
  method: 'get',
  response: (ctx) => {
    // ctx.header.pa
    const isStar = Boolean(ctx.req.query('isStar'));
    const isDeleted = Boolean(ctx.req.query('isStar'));
    const pageSize = ctx.req.query('pageSize') ?? 10;
    return {
      code: 0,
      data: mock.mock({
        [`list|${pageSize}`]: [
          {
            id: '@id',
            title: '@ctitle',
            createdTime: () => +mock.Random.now(),
            isPublished: '@boolean',
            isStar: isStar || '@boolean',
            answerCount: '@integer(0, 1000)',
            isDeleted: isDeleted || '@boolean',
          },
        ],
        total: mock.Random.integer(0, 1000),
      }) as {
        list: QuestionInfo[];
        total: number;
      },
    };
  },
};

// 获取单个问卷信息
const question_detail: MockItem<QuestionInfo> = {
  url: '/api/question/detail/:id',
  method: 'get',
  response: () => {
    return {
      code: 0,
      data: {
        id: mock.Random.id(),
        title: mock.Random.ctitle(),
        createdTime: +mock.Random.now(),
        isPublished: mock.Random.boolean(),
        isStar: mock.Random.boolean(),
        answerCount: mock.Random.integer(0, 1000),
        isDeleted: false,
      },
    };
  },
};
// 更新问卷信息
const question_update: MockItem<undefined> = {
  url: '/api/question/update/:id',
  method: 'patch',
  response: () => {
    return {
      code: 0,
    };
  },
};

// 创建问卷
const question_create: MockItem<{
  id: string;
}> = {
  url: '/api/question/create',
  method: 'post',
  response: () => {
    return {
      code: 0,
      data: {
        id: mock.Random.id(),
      },
    };
  },
};
const question_duplicate: MockItem<{ id: string }> = {
  url: '/api/question/duplicate/:id',
  method: 'post',
  response: () => {
    return {
      code: 0,
      data: {
        id: mock.Random.id(),
      },
    };
  },
};

const question_delete: MockItem<undefined> = {
  url: '/api/question/delete',
  method: 'delete',
  response: () => {
    return {
      code: 0,
    };
  },
};

export const question = [
  question_list,
  question_detail,
  question_create,
  question_update,
  question_duplicate,
  question_delete,
];
