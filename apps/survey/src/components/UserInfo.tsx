import { getUserInfo } from '@/api/user.mjs';
import { LOGIN_PATH } from '@/router';
import { getToken, removeToken } from '@/utils/token.mjs';
import { ExclamationCircleOutlined, UserOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, message, Modal } from 'antd';
import { Link, useNavigate } from 'react-router';

interface UserInfoProps {
  className?: string;
}
export function UserInfo({ className }: UserInfoProps) {
  const navigate = useNavigate();
  const { data } = useRequest(async () => {
    if (getToken()) {
      return await getUserInfo();
    }
    return undefined;
  });

  const handleExit = () => {
    Modal.confirm({
      title: '确定退出登录？',
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        removeToken();
        message.success('退出登录成功');
        void navigate(LOGIN_PATH);
      },
    });
  };
  const { username, nickname } = data || {};

  if (username || nickname) {
    return (
      <div className={className}>
        <span style={{ color: '#e8e8e8' }}>
          <UserOutlined />
          {nickname || username}
        </span>
        <Button type="link" onClick={handleExit}>
          退出
        </Button>
      </div>
    );
  }
  return (
    <Link to={LOGIN_PATH} className={className}>
      登陆
    </Link>
  );
}
