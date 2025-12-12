import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation(['auth', 'validation']);

  const tokenMissing = useMemo(() => !token, [token]);

  const handleSubmit = async (values: { newPassword: string }) => {
    if (!token) return;
    setLoading(true);
    try {
      await authApi.resetPassword(token, values.newPassword);
      message.success(t('auth:resetPassword.successMessage'));
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
          {t('auth:resetPassword.title')}
        </Title>
        <Text type="secondary" className={styles.subText}>
          {t('auth:resetPassword.subtitle')}
        </Text>

        {tokenMissing && (
          <Alert
            type="error"
            showIcon
            message={t('auth:resetPassword.tokenInvalid')}
            description={t('auth:resetPassword.tokenInvalidDescription')}
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
            label={t('auth:resetPassword.newPassword')}
            name="newPassword"
            rules={[
              { required: true, message: t('auth:resetPassword.newPasswordRequired') },
              { min: 8, message: t('validation:password.minLength', { min: 8 }) },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="••••••••"
              iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>

          <Form.Item
            label={t('auth:resetPassword.confirmPassword')}
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: t('auth:resetPassword.confirmPasswordRequired') },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(t('validation:password.notMatch')));
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
              {t('auth:resetPassword.submitButton')}
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
              {t('auth:resetPassword.backToLogin')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
