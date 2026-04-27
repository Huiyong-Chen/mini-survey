import { getQuestionDetail } from '@/api/question.mts';
import { useRequest } from 'ahooks';
import { useParams } from 'react-router';

export function useLoadQuestionDetail() {
  const { id = '' } = useParams<{ id?: string }>();

  const queryData = async () => {
    if (id) {
      return await getQuestionDetail(id);
    }
    return undefined;
  };

  const { data, loading, error } = useRequest(queryData);

  return { data, loading, error };
}
