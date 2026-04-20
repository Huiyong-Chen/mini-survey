import type { MockItem } from '../types/api.mock.api.mjs';
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
