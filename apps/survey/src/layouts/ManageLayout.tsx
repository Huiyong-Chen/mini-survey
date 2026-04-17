import { MANAGE_LIST_PATH, MANAGE_STAR_PATH, MANAGE_TRASH_PATH } from '@/router';
import { BarsOutlined, DeleteOutlined, PlusOutlined, StarOutlined } from '@ant-design/icons';
import { Button, Layout, Space } from 'antd';
import type { FC } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import style from './manage-layout.module.scss';

export const ManageLayout: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getButtonType = (pathname: string) =>
    location.pathname.startsWith(pathname) ? 'link' : 'text';

  const handleRouteToList = () => {
    void navigate(MANAGE_LIST_PATH);
  };
  const handleRouteToStar = () => {
    void navigate(MANAGE_STAR_PATH);
  };
  const handleRouteToTrash = () => {
    void navigate(MANAGE_TRASH_PATH);
  };

  return (
    <Layout className={style.layout}>
      <Layout.Sider className={style.sider}>
        <Space orientation="vertical" className={style.space}>
          <Button type="primary" size="large" className={style.add} icon={<PlusOutlined />}>
            新建问卷
          </Button>
          <Button
            type={getButtonType(MANAGE_LIST_PATH)}
            size="large"
            icon={<BarsOutlined />}
            onClick={handleRouteToList}
          >
            我的问卷
          </Button>
          <Button
            type={getButtonType(MANAGE_STAR_PATH)}
            size="large"
            icon={<StarOutlined />}
            onClick={handleRouteToStar}
          >
            星标问卷
          </Button>
          <Button
            type={getButtonType(MANAGE_TRASH_PATH)}
            size="large"
            icon={<DeleteOutlined />}
            onClick={handleRouteToTrash}
          >
            回收站
          </Button>
        </Space>
      </Layout.Sider>
      <Layout.Content className={style.content}>
        <section>
          <Outlet />
        </section>
      </Layout.Content>
    </Layout>
  );
};
