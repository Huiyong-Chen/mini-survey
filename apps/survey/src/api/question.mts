import { c_delete, get, patch, post } from './axios.mts';
import type { ListResponse } from './common.types.mts';

export interface QuestionInfo {
  id: string;
  title: string;
  createdTime: number;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  isDeleted: boolean;
}

// 获取问卷列表
export async function getQuestionList({
  keyword,
  isStar,
  isDeleted,
  page = 1,
  pageSize = 10,
}: QuestionListOptions = {}) {
  const url = `/api/question/list`;
  return await get<ListResponse<QuestionInfo>>(url, {
    params: {
      keyword,
      isStar,
      isDeleted,
      page,
      pageSize,
    },
  });
}

// 获取单个问卷信息
export async function getQuestionDetail(id: string) {
  const url = `/api/question/detail/${id}`;
  return await get<QuestionInfo>(url);
}

// 更新问卷信息
export async function updateQuestionDetail(
  id: string,
  questionInfo: Partial<Omit<QuestionInfo, 'id' | 'createdTime'>>,
) {
  const url = `/api/question/update/${id}`;
  return await patch<undefined>(url, {
    data: {
      id,
      ...questionInfo,
    },
  });
}

// 删除问卷
export async function deleteQuestion(ids: string[]) {
  const url = `/api/question/delete`;
  return await c_delete<undefined>(url, { data: { ids } });
}

// 复制问卷信息
export async function duplicateQuestionDetail(id: string) {
  const url = `/api/question/duplicate/${id}`;
  return await post<{ id: string }>(url);
}

export interface QuestionListOptions {
  keyword?: string | null;
  isStar?: boolean;
  isDeleted?: boolean;
  page?: number;
  pageSize?: number;
}
