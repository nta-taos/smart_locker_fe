import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Checkbox, Divider, Form, Input, Modal, Typography } from 'antd';

import styles from './Login.module.scss';
import { useLogin } from './useLogin';

const { Title, Text, Link } = Typography;

export default function Login() {
  const {
    handleLogin,
    loading,
    handleGoogleLogin,
    googleLoading,
    completeLoading,
    showPhonePopup,
    setShowPhonePopup,
    handleCompleteGoogleRegistration,
  } = useLogin();

  const [popupForm] = Form.useForm<{ phone: string }>();

  const onGoogleSuccess = (credentialResponse: CredentialResponse) => {
    const idToken = credentialResponse.credential;
    if (idToken) {
      handleGoogleLogin(idToken);
    } else {
      toast.error('Không thể lấy thông tin từ Google.');
    }
  };

  const onGoogleError = () => {
    toast.error('Đăng nhập Google thất bại.');
  };

  const handleCancelPopup = () => {
    setShowPhonePopup(false);
    popupForm.resetFields();
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginCard}>
        <Title level={2} className={styles.loginTitle}>
          Chào mừng trở lại
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

          <div className={styles.googleButtonContainer}>
            {googleLoading ? (
              <Button size="large" block loading>
                Đang xử lý...
              </Button>
            ) : (
              <GoogleLogin
                onSuccess={onGoogleSuccess}
                onError={onGoogleError}
                type="standard"
                theme="outline"
                size="large"
                logo_alignment="center"
              />
            )}
          </div>

          <div className={styles.registerText}>
            <Text>Bạn chưa có tài khoản? </Text>
            <Link href="/register">Đăng ký ngay</Link>
          </div>
        </Form>
      </div>
      <Modal
        title="Hoàn tất đăng ký"
        open={showPhonePopup}
        onCancel={handleCancelPopup}
        footer={null} // Tắt footer mặc định để dùng nút của Form
        closable={!completeLoading} // Không cho đóng khi đang loading
        maskClosable={!completeLoading}
      >
        <Text type="secondary" style={{ marginBottom: 24, display: 'block' }}>
          Tài khoản Google này chưa được đăng ký. Vui lòng nhập SĐT của bạn để hoàn tất.
        </Text>
        <Form
          form={popupForm}
          layout="vertical"
          onFinish={handleCompleteGoogleRegistration}
          requiredMark={false}
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

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large" loading={completeLoading}>
              Hoàn tất
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <ToastContainer position="top-right" autoClose={3000} theme="light" />
    </div>
  );
}
