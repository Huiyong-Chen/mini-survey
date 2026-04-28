import type { MockItem } from './api.mock.types.mts';
import { questionApi } from './question.mts';
import { userApi } from './user.mts';

const mockList: MockItem<any>[] = [...userApi, ...questionApi];

export default mockList;
