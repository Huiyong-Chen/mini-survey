import { Layout } from 'antd';
import type { FC } from 'react';
import { Outlet } from 'react-router';
import style from './main-layout.module.scss';
import { Logo } from '@/components/Logo';
import { UserInfo } from '@/components/UserInfo';

export const MainLayout: FC = () => {
  return (
    <Layout className={style.layout}>
      <Layout.Header className={style.header}>
        <Logo />
        <UserInfo className={style.right} />
      </Layout.Header>
      <Layout.Content className={style.container}>
        <Outlet />
      </Layout.Content>
      <Layout.Footer className={style.footer}>
        <span>小黑卷问卷 &copy;2026 - present. Created by 小黑卷</span>
      </Layout.Footer>
    </Layout>
  );
};
