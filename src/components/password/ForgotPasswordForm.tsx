import { useState } from 'react';

import { MailOutlined } from '@ant-design/icons';
import { Alert, Button, Form, Input, Typography, message } from 'antd';

import { authApi } from '@/api/authApi';
import { extractErrorMessage } from '@/utils/error.utils';

import styles from './ForgotPasswordForm.module.scss';

const { Title, Text } = Typography;

const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (values: { email: string }) => {
    setLoading(true);
    try {
      await authApi.forgotPassword(values.email);
      setSuccess(true);
      message.success('Kiểm tra email của bạn để đặt lại mật khẩu.');
    } catch (error) {
      console.error(error);
      setSuccess(false);
      extractErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <Title level={2} className={styles.title}>
          Quên mật khẩu
        </Title>
        <Text type="secondary" className={styles.subText}>
          Nhập email để nhận liên kết đặt lại mật khẩu.
        </Text>

        {success && (
          <Alert
            type="success"
            showIcon
            message="Đã gửi liên kết đặt lại mật khẩu"
            description="Vui lòng kiểm tra hộp thư, nhấn vào liên kết trong email để tạo mật khẩu mới."
            className={styles.alert}
          />
        )}

        <Form
          layout="vertical"
          onFinish={handleSubmit}
          className={styles.form}
          requiredMark={false}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              { type: 'email', message: 'Email không hợp lệ' },
            ]}
          >
            <Input size="large" placeholder="you@example.com" prefix={<MailOutlined />} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large" loading={loading}>
              Gửi liên kết đặt lại
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
