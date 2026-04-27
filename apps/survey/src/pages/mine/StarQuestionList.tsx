import type { QuestionInfo } from '@/api/question.mts';
import { List } from '@/components/List';
import { useLoadQuestionList } from '@/hooks/useLoadDataQuestionList.mts';
import { Typography } from 'antd';
import style from './common-list.module.scss';
import { ListSearch } from './components/ListSearch';
import { QuestionCard } from './components/QuestionCard';

export function StarQuestionList() {
  const { loadData } = useLoadQuestionList({
    isStar: true,
  });

  return (
    <>
      <div className={style.header}>
        <Typography.Title level={3}>我的问卷</Typography.Title>
        <ListSearch className={style['list-search']} />
      </div>
      <List<QuestionInfo> loadData={loadData}>
        {(item) => <QuestionCard key={item.id} {...item} />}
      </List>
    </>
  );
}
