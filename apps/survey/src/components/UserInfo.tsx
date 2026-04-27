import { LOGIN_PATH } from '@/router';
import { Link } from 'react-router';

interface UserInfoProps {
  className?: string;
}
export function UserInfo({ className }: UserInfoProps) {
  return (
    <Link to={LOGIN_PATH} className={className}>
      登陆
    </Link>
  );
}
