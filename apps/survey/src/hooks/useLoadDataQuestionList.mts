import { getQuestionList, type QuestionListOptions } from '@/api/question.mts';

import {
  LIST_SEARCH_KEYWORD,
  LIST_SEARCH_PAGE,
  LIST_SEARCH_PAGE_SIZE,
} from '@/constant/url-search-key.mts';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router';

export function useLoadQuestionList({
  isStar,
  isDeleted,
}: Omit<QuestionListOptions, 'keyword'> = {}) {
  const [searchParams] = useSearchParams();
  const loadData = useCallback(
    async (
      page: number = +(searchParams.get(LIST_SEARCH_PAGE) ?? 1),
      pageSize: number = +(searchParams.get(LIST_SEARCH_PAGE_SIZE) ?? 10),
    ) => {
      const keyword = searchParams.get(LIST_SEARCH_KEYWORD);
      return await getQuestionList({
        keyword,
        isStar,
        isDeleted,
        page,
        pageSize,
      });
    },
    [isStar, isDeleted, searchParams],
  );

  return { loadData };
}
