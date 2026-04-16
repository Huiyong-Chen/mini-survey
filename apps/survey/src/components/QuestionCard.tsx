import { useState, type FC } from 'react';
import style from './question-card.module.scss';

/** 问卷卡片组件Props */
export interface QuestionCardProps {
  /** 问卷 ID */
  id: string;
  /** 问卷标题 */
  title: string;
  /** 问卷创建时间 */
  createdTime: number;
  /** 问卷是否发布 */
  isPublished: boolean;
  /** 问卷是否收藏 */
  isStar: boolean;
  /** 问卷答卷数量 */
  answerCount: number;
}

export const QuestionCard: FC<QuestionCardProps> = ({
  id,
  title,
  createdTime,
  isPublished,
  answerCount,
  isStar,
}) => {
  const handlePublished = () => {};
  const handleEdit = () => {
    console.log('编辑问卷');
  };
  const handleStatistics = () => {
    console.log('统计');
  };
  const handleStar = () => {
    console.log('收藏');
  };
  const handleCopy = () => {
    console.log('复制');
  };
  const handleDelete = () => {
    console.log('删除');
  };
  return (
    <div className={style.container}>
      <div className={style.title}>
        <div className={style.left}>
          <a href="#">{title}</a>
        </div>
        <div className={style.right}>
          {/* disabled={published} onClick={handlePublished} */}
          <span style={{ color: isPublished ? 'green' : '' }}>
            {isPublished ? '已发布' : '未发布'}
          </span>
          <span>答卷：{answerCount}</span>
          <span>{createdTime}</span>
        </div>
      </div>
      <div className={style['button-container']}>
        <div className={style.left}>
          <button onClick={handleEdit}>编辑问卷</button>
          <button onClick={handleStatistics}>数据统计</button>
        </div>
        <div className={style.right}>
          <button onClick={handleStar}>星标</button>
          <button onClick={handleCopy}>复制</button>
          <button onClick={handleDelete}>删除</button>
        </div>
      </div>
    </div>
  );
};
