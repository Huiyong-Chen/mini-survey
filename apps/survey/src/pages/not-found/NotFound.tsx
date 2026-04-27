import { MANAGE_LIST_PATH } from '@/router';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router';

export function NotFound() {
  const navigate = useNavigate();
  const handleBackQuestionList = () => {
    void navigate(MANAGE_LIST_PATH);
  };
  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，您访问的页面不存在。"
      extra={
        <Button type="primary" onClick={handleBackQuestionList}>
          返回首页
        </Button>
      }
    />
  );
}
