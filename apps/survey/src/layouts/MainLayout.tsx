import { Logo } from '@/components/Logo';
import { UserInfo } from '@/components/UserInfo';
import { Layout } from 'antd';
import { Outlet } from 'react-router';
import style from './main-layout.module.scss';

export function MainLayout() {
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
}
