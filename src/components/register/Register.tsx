import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import React from 'react';

import { Button, Col, Divider, Form, Input, Modal, Row, Typography, message } from 'antd';

import styles from './Register.module.scss';
import { useRegister } from './useRegister';

const { Text, Link, Title } = Typography;

const Register: React.FC = () => {
  const [form] = Form.useForm();
  const [popupForm] = Form.useForm<{ phone: string }>();

  const {
    loading,
    googleLoading,
    completeLoading,
    showPhonePopup,
    setShowPhonePopup,
    handleRegister,
    handleGoogleLogin,
    handleCompleteGoogleRegistration,
  } = useRegister();

  const onGoogleSuccess = (credentialResponse: CredentialResponse) => {
    const idToken = credentialResponse.credential;
    if (idToken) {
      handleGoogleLogin(idToken);
    } else {
      message.error('Không thể lấy thông tin từ Google.');
    }
  };

  const onGoogleError = () => message.error('Đăng nhập Google thất bại.');

  const handleCancelPopup = () => {
    if (completeLoading) return;
    setShowPhonePopup(false);
    popupForm.resetFields();
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginCard}>
        <Title level={2} className={styles.registerTitle}>
          Đăng ký tài khoản
        </Title>
        <Text type="secondary" className={styles.registerSubtitle}>
          Tạo tài khoản để bắt đầu hành trình của bạn
        </Text>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleRegister}
          requiredMark={false}
          style={{ marginBottom: '1rem' }}
        >
          <Form.Item
            name="name"
            label="Họ và tên"
            rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
          >
            <Input size="large" placeholder="Nhập họ và tên" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại!' },
              { pattern: /^0\d{9}$/, message: 'Số điện thoại phải là 10 số, bắt đầu bằng 0' },
            ]}
          >
            <Input size="large" placeholder="Nhập số điện thoại" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không đúng định dạng!' },
            ]}
          >
            <Input type="email" size="large" placeholder="Nhập email" />
          </Form.Item>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[
                  { required: true, message: 'Vui lòng nhập mật khẩu!' },
                  { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
                ]}
                hasFeedback
              >
                <Input.Password size="large" placeholder="Nhập mật khẩu" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                name="repassword"
                label="Nhập lại mật khẩu"
                dependencies={['password']}
                hasFeedback
                rules={[
                  { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Hai mật khẩu không khớp!'));
                    },
                  }),
                ]}
              >
                <Input.Password size="large" placeholder="Nhập lại mật khẩu" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item className={styles.submitWrapper}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
              className={styles.submitButton}
            >
              {loading ? 'Đang xử lý...' : 'Đăng ký'}
            </Button>
          </Form.Item>

          <Divider plain style={{ color: '#999', margin: '12px 0' }}>
            Hoặc
          </Divider>

          <div className={styles.googleButtonWrapper}>
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
                text="signup_with"
                width="100%"
              />
            )}
          </div>

          <div className={styles.registerText}>
            <Text>Bạn đã có tài khoản? </Text>
            <Link href="/login">Đăng nhập ngay</Link>
          </div>
        </Form>
      </div>

      <Modal
        title="Hoàn tất đăng ký"
        open={showPhonePopup}
        onCancel={handleCancelPopup}
        footer={null}
        closable={!completeLoading}
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
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={completeLoading}
              className={styles.submitButton}
            >
              Hoàn tất
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Register;
