import { Empty, Space, Typography } from 'antd';
import { useState, type FC } from 'react';
import style from './common-list.module.scss';
import { QuestionCard, type QuestionCardProps } from './components/QuestionCard';
import { ListSearch } from './components/ListSearch';

const rowQuestionList: QuestionCardProps[] = [
  {
    id: 'q1',
    title: '问卷1',
    createdTime: Date.now(),
    isPublished: true,
    isStar: true,
    answerCount: 10,
  },
  {
    id: 'q2',
    title: '问卷2',
    createdTime: Date.now(),
    isPublished: false,
    isStar: true,
    answerCount: 10,
  },
  {
    id: 'q3',
    title: '问卷3',
    createdTime: Date.now(),
    isPublished: true,
    isStar: true,
    answerCount: 10,
  },
  {
    id: 'q4',
    title: '问卷4',
    createdTime: Date.now(),
    isPublished: true,
    isStar: true,
    answerCount: 10,
  },
];
export const StarQuestionList: FC = () => {
  const [questionList, setQuestionList] = useState<QuestionCardProps[]>(rowQuestionList);

  return (
    <>
      <div className={style.header}>
        <Typography.Title level={3}>我的问卷</Typography.Title>
        <ListSearch className={style['list-search']} />
      </div>
      <Space orientation="vertical" className={style.space}>
        {questionList.length === 0 && <Empty />}
        {questionList.length &&
          questionList.map((question) => <QuestionCard key={question.id} {...question} />)}
      </Space>
      <div className={style.footer}>分页</div>
    </>
  );
};
