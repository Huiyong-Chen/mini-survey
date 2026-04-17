import { Button, Typography } from 'antd';
import type { FC } from 'react';
import style from './home.module.scss';

export const Home: FC = () => {
  return (
    <div className={style.container}>
      <Typography.Title>问卷调查 ｜ 在线投票</Typography.Title>
      <Typography.Paragraph>
        已累计创建问卷 100 份，发布问卷 90 份，收到答卷 980 份
      </Typography.Paragraph>
      <Button type="primary" size="large">
        开始使用
      </Button>
    </div>
  );
};
