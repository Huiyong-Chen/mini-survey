import { MANAGE_LIST_PATH } from '@/router';
import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router';
import style from './home.module.scss';

export function Home() {
  const navigate = useNavigate();
  const handleRouteToList = () => {
    void navigate(MANAGE_LIST_PATH);
  };
  return (
    <div className={style.container}>
      <Typography.Title>问卷调查 ｜ 在线投票</Typography.Title>
      <Typography.Paragraph>
        已累计创建问卷 100 份，发布问卷 90 份，收到答卷 980 份
      </Typography.Paragraph>
      <Button type="primary" size="large" onClick={handleRouteToList}>
        开始使用
      </Button>
    </div>
  );
}
