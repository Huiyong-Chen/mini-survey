import type { Context } from 'hono';

export type MockItem<T> = {
  url: string;
  method: 'get' | 'post' | 'patch' | 'put' | 'delete';
  response: (ctx: Context) => { code: number; data?: T; msg?: string };
};
