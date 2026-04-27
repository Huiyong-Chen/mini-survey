import { deleteQuestion, updateQuestionDetail } from '@/api/question.mts';
import { Pagination } from '@/components/Pagination';
import { useLoadQuestionList } from '@/hooks/useLoadDataQuestionList.mts';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import {
  Button,
  Empty,
  message,
  Modal,
  Space,
  Spin,
  Table,
  Tag,
  Typography,
  type TableColumnsType,
  type TableProps,
} from 'antd';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router';
import style from './common-list.module.scss';
import { ListSearch } from './components/ListSearch';
import { type QuestionCardProps } from './components/QuestionCard';

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

export function Trash() {
  const [searchParams] = useSearchParams();
  const { loadData } = useLoadQuestionList({ isDeleted: true });

  // 组件第一次请求数据需要显示loading，后续都以蒙层替代
  const [initialized, setInitialized] = useState(false);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // 数据加载成功的回调
  const handleDataLoadSuccess = !initialized
    ? () => {
        setInitialized(true);
      }
    : undefined;
  const {
    data = { list: [], total: 0 },
    loading,
    refresh,
  } = useRequest(loadData, {
    refreshDeps: [searchParams],
    onSuccess: handleDataLoadSuccess,
  });

  const { run: handleRecover } = useRequest(
    async () => {
      for (const id of selectedRowKeys) {
        await updateQuestionDetail(id.toString(), { isDeleted: false });
      }
    },
    {
      manual: true,
      debounceWait: 250,
      onSuccess: () => {
        message.success('恢复成功');
        setSelectedRowKeys([]);
        refresh();
      },
    },
  );

  const { run: handleDelete } = useRequest(
    async () => {
      await deleteQuestion(selectedRowKeys as string[]);
    },
    {
      manual: true,
      debounceWait: 250,
      onSuccess: () => {
        message.success('删除成功');
        setSelectedRowKeys([]);
        refresh();
      },
    },
  );

  const handleDeleteConfirm = () => {
    Modal.confirm({
      title: '确认彻底删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      content: '删除以后无法找回！！！',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        handleDelete();
      },
    });
  };
  const handleRecoverConfirm = () => {
    Modal.confirm({
      title: '确认恢复该问卷？',
      icon: <ExclamationCircleOutlined />,
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        handleRecover();
      },
    });
  };

  const { list, total } = data;
  const rowSelection: TableProps<QuestionCardProps>['rowSelection'] = {
    type: 'checkbox',
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  return (
    <>
      <div className={style.header}>
        <Typography.Title level={3}>我的问卷</Typography.Title>
        <ListSearch className={style['list-search']} />
      </div>
      <Space orientation="vertical" className={style.space}>
        {!initialized ? (
          loading && (
            <Spin size="large" style={{ marginLeft: '50%', transform: 'translateX(-50%)' }} />
          )
        ) : list.length === 0 ? (
          <Empty />
        ) : (
          <>
            <Space>
              <Button
                type="primary"
                disabled={!selectedRowKeys.length}
                onClick={handleRecoverConfirm}
              >
                恢复
              </Button>
              <Button danger disabled={!selectedRowKeys.length} onClick={handleDeleteConfirm}>
                彻底删除
              </Button>
            </Space>
            <Table
              dataSource={list}
              rowSelection={rowSelection}
              rowKey={(q) => q.id}
              columns={columns}
              pagination={false}
            />
          </>
        )}
      </Space>
      <Pagination className={style.footer} total={total} />
    </>
  );
}
