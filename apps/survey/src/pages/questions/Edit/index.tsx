import { useLoadQuestionDetail } from '@/hooks/useLoadDataQuestionDetail.mts';

export function Edit() {
  const { data, loading } = useLoadQuestionDetail();

  return (
    <div>
      <p>Edit page</p>
      {loading ? <p> loading </p> : data ? <>{data.title}</> : <p>data null</p>}
    </div>
  );
}
