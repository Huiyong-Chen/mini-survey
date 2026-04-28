import type { MockItem } from './api.mock.types.mts';
import mock from 'mockjs';

const api_register: MockItem<undefined> = {
  url: '/api/user/register',
  method: 'post',
  response: () => {
    return {
      code: 0,
    };
  },
};

const api_login: MockItem<{
  token: string;
}> = {
  url: '/api/user/login',
  method: 'post',
  response: () => {
    return {
      code: 0,
      data: {
        token: mock.Random.word(20),
      },
    };
  },
};

const api_user_info: MockItem<{
  username: string;
  nickname: string;
}> = {
  url: '/api/user/info',
  method: 'get',
  response: () => {
    return {
      code: 0,
      data: {
        username: mock.Random.title(),
        nickname: mock.Random.cname(),
      },
    };
  },
};
export const userApi = [api_register, api_login, api_user_info];
