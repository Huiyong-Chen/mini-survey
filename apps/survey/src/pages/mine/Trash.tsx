import { QuestionCard, type QuestionCardProps } from '@/components/QuestionCard';
import style from './question-list.module.scss';
import { useState, type FC } from 'react';
const rowQuestionList: QuestionCardProps[] = [
  {
    id: 'q1',
    title: '问卷1',
    createdTime: Date.now(),
    isPublished: false,
    isStar: false,
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
    isStar: false,
    answerCount: 10,
  },
];
export const Trash: FC = () => {
  const [questionList, setQuestionList] = useState<QuestionCardProps[]>(rowQuestionList);

  return (
    <>
      <div className={style.header}>header</div>
      <div className={style.content}>
        {questionList.map((question) => (
          <QuestionCard key={question.id} {...question} />
        ))}
      </div>
      <div className={style.footer}>footer</div>
    </>
  );
};
