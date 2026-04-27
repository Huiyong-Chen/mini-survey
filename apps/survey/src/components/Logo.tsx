import { FormOutlined } from '@ant-design/icons';
import { Space, Typography } from 'antd';
import { Link } from 'react-router';
import style from './logo.module.scss';

export function Logo() {
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
}
