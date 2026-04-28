import { HOME_PATH, REGISTER_PATH } from '@/router';
import { UserAddOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message, Space, Typography, type FormProps } from 'antd';
import { Link, useNavigate } from 'react-router';
import style from './register.module.scss';
import { useRequest } from 'ahooks';
import { login } from '@/api/user.mts';
import { setToken } from '@/utils/token.mjs';

interface LoginForm {
  username: string;
  password: string;
  remember?: boolean;
}

export function Login() {
  const navigate = useNavigate();
  const { loading, run: handleRegister } = useRequest(
    async (username: string, password: string) => {
      return await login(username, password);
    },
    {
      manual: true,
      onSuccess: (data) => {
        const { token } = data!;
        setToken(token);
        message.success('登录成功');

        void navigate(HOME_PATH);
      },
    },
  );
  const handleFinish: FormProps<LoginForm>['onFinish'] = ({ username, password }) => {
    handleRegister(username, password);
  };
  const handleFinishFailed: FormProps<LoginForm>['onFinishFailed'] = (errorInfo) => {
    console.log(errorInfo);
  };

  return (
    <div className={style.container}>
      <Space>
        <UserAddOutlined />
        <Typography.Title>用户登录</Typography.Title>
      </Space>
      <Form
        name="login"
        labelCol={{ span: 6 }}
        initialValues={{ remember: true }}
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
        disabled={loading}
      >
        <Form.Item<LoginForm>
          label="用户名："
          name="username"
          rules={[
            { required: true, message: '请输入用户名' },
            { type: 'string', min: 5, max: 20, message: '用户名长度在 5-20 之间' },
            { pattern: /^\w+$/, message: '用户名只能是字母、数字、下划线' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item<LoginForm>
          label="密码："
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item<LoginForm> name="remember" valuePropName="checked" label={null}>
          <Checkbox>记住密码</Checkbox>
        </Form.Item>
        <Form.Item<LoginForm> wrapperCol={{ offset: 4 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
            <Link to={REGISTER_PATH}>没有账户，马上注册</Link>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}
