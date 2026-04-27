import { LOGIN_PATH } from '@/router';
import { UserAddOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Typography, type FormProps } from 'antd';
import { Link } from 'react-router';
import style from './register.module.scss';

interface RegisterForm {
  username: string;
  password: string;
  confirm: string;
  nickname?: string;
}

export function Register() {
  const handleFinish: FormProps<RegisterForm>['onFinish'] = (values) => {
    console.log(values);
  };
  const handleFinishFailed: FormProps<RegisterForm>['onFinishFailed'] = (errorInfo) => {
    console.log(errorInfo);
  };

  return (
    <div className={style.container}>
      <Space>
        <UserAddOutlined />
        <Typography.Title>注册新用户</Typography.Title>
      </Space>
      <Form
        name="register"
        labelCol={{ span: 6 }}
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
      >
        <Form.Item<RegisterForm>
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
        <Form.Item<RegisterForm>
          label="密码："
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item<RegisterForm>
          label="确认密码："
          name="confirm"
          dependencies={['password']}
          rules={[
            { required: true, message: '请确认密码' },
            ({ getFieldValue }) => {
              return {
                validator: (_, value) => {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次密码不一致'));
                },
              };
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item<RegisterForm> label="昵称：" name="nickname">
          <Input />
        </Form.Item>
        <Form.Item<RegisterForm> wrapperCol={{ offset: 4 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              注册
            </Button>
            <Link to={LOGIN_PATH}>已有账户，请登录</Link>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}
