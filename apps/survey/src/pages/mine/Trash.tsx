import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  Button,
  Empty,
  message,
  Modal,
  Space,
  Table,
  Tag,
  Typography,
  type TableColumnsType,
  type TableProps,
} from 'antd';
import { useState, type FC } from 'react';
import style from './common-list.module.scss';
import { type QuestionCardProps } from './components/QuestionCard';
import { ListSearch } from './components/ListSearch';
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

const columns: TableColumnsType<QuestionCardProps> = [
  {
    title: '标题',
    dataIndex: 'title',
  },
  {
    title: '是否发布',
    dataIndex: 'isPublished',
    render: (isPublished: boolean) => (
      <Tag color={isPublished ? 'processing' : undefined}>{isPublished ? '已发布' : '未发布'}</Tag>
    ),
  },
  {
    title: '答卷',
    dataIndex: 'answerCount',
  },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
  },
];

export const Trash: FC = () => {
  const [questionList, setQuestionList] = useState<QuestionCardProps[]>(rowQuestionList);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const rowSelection: TableProps<QuestionCardProps>['rowSelection'] = {
    type: 'checkbox',
    onChange: (selectedRowKeys: React.Key[], selectedRows: QuestionCardProps[]) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  const handleDelete = () => {
    Modal.confirm({
      title: '确认彻底删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      content: '删除以后无法找回！！！',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        message.success('删除成功');
      },
    });
  };
  const handleRecover = () => {
    Modal.confirm({
      title: '确认恢复该问卷？',
      icon: <ExclamationCircleOutlined />,
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        message.success('恢复成功');
      },
    });
  };

  return (
    <>
      <div className={style.header}>
        <Typography.Title level={3}>我的问卷</Typography.Title>
        <ListSearch className={style['list-search']} />
      </div>
      <Space orientation="vertical" className={style.space}>
        {questionList.length === 0 && <Empty />}
        {questionList.length && (
          <>
            <Space>
              <Button type="primary" disabled={!selectedRowKeys.length} onClick={handleRecover}>
                恢复
              </Button>
              <Button danger disabled={!selectedRowKeys.length} onClick={handleDelete}>
                彻底删除
              </Button>
            </Space>
            <Table
              dataSource={questionList}
              rowSelection={rowSelection}
              rowKey={(q) => q.id}
              columns={columns}
              pagination={false}
            />
          </>
        )}
      </Space>
      <div className={style.footer}>loadMore</div>
    </>
  );
};
