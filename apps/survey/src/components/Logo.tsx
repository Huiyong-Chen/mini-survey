import { FormOutlined } from '@ant-design/icons';
import { Space, Typography } from 'antd';
import type { FC } from 'react';
import { Link } from 'react-router';
import style from './logo.module.scss';

export const Logo: FC = () => {
  return (
    <Link to="/">
      <Space className={style.container}>
        <Typography.Title>
          <FormOutlined />
        </Typography.Title>
        <Typography.Title>小黑卷问卷</Typography.Title>
      </Space>
    </Link>
  );
};
