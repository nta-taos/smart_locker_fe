import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ArrowLeftOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Alert, Button, Form, Input, Typography, message } from 'antd';

import { authApi } from '@/api/authApi';
import { extractErrorMessage } from '@/utils/error.utils';

import styles from './ResetPasswordForm.module.scss';

const { Title, Text } = Typography;

const ResetPasswordForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const [loading, setLoading] = useState(false);

  const tokenMissing = useMemo(() => !token, [token]);

  const handleSubmit = async (values: { newPassword: string }) => {
    if (!token) return;
    setLoading(true);
    try {
      await authApi.resetPassword(token, values.newPassword);
      message.success('Đặt lại mật khẩu thành công. Vui lòng đăng nhập.');
      navigate('/login');
    } catch (error) {
      console.error(error);
      extractErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <Title level={2} className={styles.title}>
          Tạo mật khẩu mới
        </Title>
        <Text type="secondary" className={styles.subText}>
          Nhập mật khẩu mới để hoàn tất quá trình.
        </Text>

        {tokenMissing && (
          <Alert
            type="error"
            showIcon
            message="Token không hợp lệ"
            description="Liên kết đặt lại không hợp lệ hoặc đã hết hạn. Vui lòng yêu cầu lại."
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
            label="Mật khẩu mới"
            name="newPassword"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu mới' },
              { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự' },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="••••••••"
              iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu không khớp'));
                },
              }),
            ]}
          >
            <Input.Password
              size="large"
              placeholder="••••••••"
              iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              disabled={tokenMissing}
              loading={loading}
            >
              Đặt lại mật khẩu
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              type="default"
              block
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate('/login')}
              style={{ height: '48px' }}
            >
              Quay về đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
