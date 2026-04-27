import {
  duplicateQuestionDetail,
  updateQuestionDetail,
  type QuestionInfo,
} from '@/api/question.mts';
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LineChartOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, Divider, message, Modal, Popconfirm, Space, Tag } from 'antd';
import { useRef, useState } from 'react';
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

export function QuestionCard({
  id,
  title,
  createdTime,
  isPublished,
  answerCount,
  isStar,
}: QuestionCardProps) {
  const navigate = useNavigate();
  const [stared, setStared] = useState(isStar);
  const [deleted, setDeleted] = useState(false);
  const handleRequestSuccessRef = useRef<() => void>(undefined);

  const { loading, run: handleUpdateDetail } = useRequest(
    async (newData: Partial<Pick<QuestionInfo, 'isStar' | 'isDeleted'>>) => {
      return await updateQuestionDetail(id, newData);
    },
    {
      manual: true,
      onSuccess: () => {
        if (handleRequestSuccessRef.current) {
          handleRequestSuccessRef.current();
        }
      },
    },
  );

  const { loading: duplicateLoading, run: handleDuplicateDetail } = useRequest(
    async () => {
      return await duplicateQuestionDetail(id);
    },
    {
      manual: true,
      onSuccess: () => {
        void navigate(`/question/edit/${id}`);
        message.success('复制成功！');
      },
    },
  );

  const handlePublished = () => {};
  const handleEdit = () => {
    void navigate(`/question/edit/${id}`);
  };
  const handleStatistics = () => {
    void navigate(`/question/stat/${id}`);
  };

  const handleStar = () => {
    handleRequestSuccessRef.current = () => {
      setStared((prev) => !prev);
      message.success(stared ? '取消收藏' : '收藏成功！');
    };
    handleUpdateDetail({ isStar: !stared });
  };
  const handleDelete = () => {
    Modal.confirm({
      title: '确定删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        handleRequestSuccessRef.current = () => {
          setDeleted(true);
          message.success('删除成功！');
        };
        handleUpdateDetail({ isDeleted: true });
      },
    });
  };
  if (deleted) {
    return null;
  }
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
            disabled={loading}
            onClick={handleStar}
          >
            {stared ? '取消星标' : '星标'}
          </Button>
          <Popconfirm
            title="确定复制该问卷？"
            okText="确定"
            cancelText="取消"
            onConfirm={handleDuplicateDetail}
          >
            <Button type="text" size="small" icon={<CopyOutlined />} disabled={duplicateLoading}>
              复制
            </Button>
          </Popconfirm>
          <Button
            type="text"
            size="small"
            icon={<DeleteOutlined />}
            onClick={handleDelete}
            disabled={loading}
          >
            删除
          </Button>
        </Space>
      </div>
    </>
  );
}
