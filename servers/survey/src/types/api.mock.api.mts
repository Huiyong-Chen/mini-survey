export type MockItem<T> = {
  url: string;
  method: 'get' | 'post';
  response: () => { error: number; data: T };
};
