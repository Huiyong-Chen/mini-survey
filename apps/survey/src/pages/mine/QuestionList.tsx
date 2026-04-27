import type { QuestionInfo } from '@/api/question.mts';
import { List } from '@/components/List';
import { useLoadQuestionList } from '@/hooks/useLoadDataQuestionList.mts';
import { QuestionCard } from './components/QuestionCard';
import { Typography } from 'antd';
import { ListSearch } from './components/ListSearch';
import style from './common-list.module.scss';

export function QuestionList() {
  const { loadData } = useLoadQuestionList();
  return (
    <>
      <div className={style.header}>
        <Typography.Title level={3}>我的问卷</Typography.Title>
        <ListSearch className={style['list-search']} />
      </div>
      <List<QuestionInfo> loadData={loadData} loadMoreOptions={{ page: 1, pageSize: 10 }}>
        {(item) => <QuestionCard key={item.id} {...item} />}
      </List>
    </>
  );
}
