import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LineChartOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons';
import { Button, Divider, message, Modal, Popconfirm, Space, Tag } from 'antd';
import { useState, type FC } from 'react';
import { Link, useNavigate } from 'react-router';
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
  const navigate = useNavigate();

  const [stared, setStared] = useState(isStar);

  const handlePublished = () => {};
  const handleEdit = () => {
    void navigate(`/question/edit/${id}`);
  };
  const handleStatistics = () => {
    void navigate(`/question/stat/${id}`);
  };
  const handleStar = () => {
    setStared(!stared);

    message.success(stared ? '取消收藏' : '收藏成功！');
  };
  const handleCopy = () => {
    message.success('复制成功！');
  };
  const handleDelete = () => {
    Modal.confirm({
      title: '确定删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        message.success('删除成功！');
      },
    });
  };
  return (
    <>
      <div className={style.container}>
        <Space className={style.title}>
          <Link to={isPublished ? `/question/stat/${id}` : `/question/edit/${id}`}>
            <Space>
              {stared && <StarOutlined style={{ color: 'red' }} />}
              {title}
            </Space>
          </Link>
          <Tag color={isPublished ? 'processing' : undefined}>
            {isPublished ? '已发布' : '未发布'}
          </Tag>
          <span>答卷：{answerCount}</span>
          <span>{createdTime}</span>
        </Space>
        <Divider size="small" />
        <Space className={style['button-container']}>
          <Button type="text" size="small" icon={<EditOutlined />} onClick={handleEdit}>
            编辑问卷
          </Button>
          <Button
            type="text"
            size="small"
            icon={<LineChartOutlined />}
            disabled={!isPublished}
            onClick={handleStatistics}
          >
            数据统计
          </Button>
          <Button
            type="text"
            size="small"
            icon={stared ? <StarFilled style={{ color: '#ffaa00' }} /> : <StarOutlined />}
            onClick={handleStar}
          >
            {stared ? '取消星标' : '星标'}
          </Button>
          <Popconfirm
            title="确定复制该问卷？"
            okText="确定"
            cancelText="取消"
            onConfirm={handleCopy}
          >
            <Button type="text" size="small" icon={<CopyOutlined />}>
              复制
            </Button>
          </Popconfirm>
          <Button type="text" size="small" icon={<DeleteOutlined />} onClick={handleDelete}>
            删除
          </Button>
        </Space>
      </div>
    </>
  );
};
