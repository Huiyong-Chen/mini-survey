export type MockItem<T> = {
  url: string;
  method: 'get' | 'post';
  response: () => { code: number; data?: T; msg?: string };
};
