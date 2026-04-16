import type { FC } from 'react';
import { Link } from 'react-router';

interface UserInfoProps {
  className?: string;
}
export const UserInfo: FC<UserInfoProps> = ({ className }) => {
  return (
    <Link to="/login" className={className}>
      登陆
    </Link>
  );
};
