import { LOGIN_PATH } from '@/router';
import type { FC } from 'react';
import { Link } from 'react-router';

interface UserInfoProps {
  className?: string;
}
export const UserInfo: FC<UserInfoProps> = ({ className }) => {
  return (
    <Link to={LOGIN_PATH} className={className}>
      登陆
    </Link>
  );
};
