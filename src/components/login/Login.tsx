import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { EyeInvisibleOutlined, EyeOutlined, GoogleOutlined } from '@ant-design/icons';
import { Button, Checkbox, Divider, Form, Input, Typography } from 'antd';

import styles from './Login.module.scss';
import { useLogin } from './useLogin';

const { Title, Text, Link } = Typography;

export default function Login() {
  const { handleLogin, loading } = useLogin();

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginCard}>
        <Title level={2} className={styles.loginTitle}>
          Chào mừng trở lại 👋
        </Title>
        <Text type="secondary" className={styles.subText}>
          Vui lòng đăng nhập để tiếp tục
        </Text>

        <Form
          layout="vertical"
          onFinish={handleLogin}
          requiredMark={false}
          className={styles.loginForm}
        >
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại' },
              { pattern: /^0\d{9}$/, message: 'Số điện thoại phải là 10 số, bắt đầu bằng 0' },
            ]}
          >
            <Input size="large" placeholder="Nhập số điện thoại" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
          >
            <Input.Password
              size="large"
              placeholder="Nhập mật khẩu"
              iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>

          <div className={styles.rememberContainer}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Ghi nhớ đăng nhập</Checkbox>
            </Form.Item>
            <Link href="#">Quên mật khẩu?</Link>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
              className={styles.loginButton}
            >
              Đăng nhập
            </Button>
          </Form.Item>

          <Divider plain>Hoặc</Divider>

          <Button
            size="large"
            icon={<GoogleOutlined />}
            block
            className={styles.googleButton}
            onClick={() => toast.info('Đang phát triển tính năng Google Login')}
          >
            Đăng nhập với Google
          </Button>

          <div className={styles.registerText}>
            <Text>Bạn chưa có tài khoản? </Text>
            <Link href="/register">Đăng ký ngay</Link>
          </div>
        </Form>
      </div>

      <ToastContainer position="top-right" autoClose={3000} theme="light" />
    </div>
  );
}
