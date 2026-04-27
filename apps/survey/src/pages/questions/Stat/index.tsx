import { useLoadQuestionDetail } from '@/hooks/useLoadDataQuestionDetail.mts';

export function Stat() {
  const { data, loading } = useLoadQuestionDetail();

  return (
    <div>
      <p>Stat page</p>
      {loading ? <p> loading </p> : data ? <>{data.title}</> : <p>data null</p>}
    </div>
  );
}
