import type { MockItem } from './api.mock.types.mts';
import { question } from './question.mts';
import { test } from './test.mts';

const mockList: MockItem<
  | {
      name: string;
    }
  | {
      id: string;
      title: string;
    }
>[] = [...test, ...question];

export default mockList;
