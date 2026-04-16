import { BarsOutlined, DeleteOutlined, PlusOutlined, StarOutlined } from '@ant-design/icons';
import { Button, Layout, Space } from 'antd';
import type { FC } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import style from './manage-layout.module.scss';

const LINKS = {
  list: '/manage/list',
  star: '/manage/star',
  trash: '/manage/trash',
};

export const ManageLayout: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getButtonType = (pathname: string) =>
    location.pathname.startsWith(pathname) ? 'link' : 'text';

  const handleRouteToList = () => {
    void navigate(LINKS.list);
  };
  const handleRouteToStar = () => {
    void navigate(LINKS.star);
  };
  const handleRouteToTrash = () => {
    void navigate(LINKS.trash);
  };

  return (
    <Layout className={style.layout}>
      <Layout.Sider className={style.sider}>
        <Space orientation="vertical" className={style.space}>
          <Button type="primary" size="large" className={style.add} icon={<PlusOutlined />}>
            新建问卷
          </Button>
          <Button
            type={getButtonType(LINKS.list)}
            size="large"
            icon={<BarsOutlined />}
            onClick={handleRouteToList}
          >
            我的问卷
          </Button>
          <Button
            type={getButtonType(LINKS.star)}
            size="large"
            icon={<StarOutlined />}
            onClick={handleRouteToStar}
          >
            星标问卷
          </Button>
          <Button
            type={getButtonType(LINKS.trash)}
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
