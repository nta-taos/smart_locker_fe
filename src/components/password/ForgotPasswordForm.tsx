import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { ArrowLeftOutlined, MailOutlined } from '@ant-design/icons';
import { Alert, Button, Form, Input, Typography, message } from 'antd';

import { authApi } from '@/api/authApi';
import { extractErrorMessage } from '@/utils/error.utils';

import styles from './ForgotPasswordForm.module.scss';

const { Title, Text } = Typography;

const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation(['auth', 'validation']);

  const handleSubmit = async (values: { email: string }) => {
    setLoading(true);

    try {
      await authApi.forgotPassword(values.email);
      setSuccess(true);
      message.success(t('auth:forgotPassword.successMessage'));
    } catch (error) {
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
          {t('auth:forgotPassword.title')}
        </Title>

        <Text type="secondary" className={styles.subText}>
          {t('auth:forgotPassword.subtitle')}
        </Text>

        {success && (
          <Alert
            type="success"
            showIcon
            message={t('auth:forgotPassword.alertTitle')}
            description={t('auth:forgotPassword.alertDescription')}
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
            label={t('auth:login.email')}
            name="email"
            rules={[
              { required: true, message: t('validation:email.required') },
              { type: 'email', message: t('validation:email.invalid') },
            ]}
          >
            <Input size="large" placeholder="you@example.com" prefix={<MailOutlined />} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large" loading={loading}>
              {t('auth:forgotPassword.submitButton')}
            </Button>
          </Form.Item>

          {/* Nút quay về login */}
          <Form.Item>
            <Button
              type="default"
              block
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate('/login')}
              style={{ height: '48px' }}
            >
              {t('auth:forgotPassword.backToLogin')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
