import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Checkbox, Divider, Form, Input, Modal, Typography, message } from 'antd';

import styles from './Login.module.scss';
import { useLogin } from './useLogin';

const { Title, Text } = Typography;

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

  const { t } = useTranslation(['auth', 'validation']);
  const [popupForm] = Form.useForm<{ phone: string }>();

  const onGoogleSuccess = (credentialResponse: CredentialResponse) => {
    const idToken = credentialResponse.credential;
    if (idToken) {
      handleGoogleLogin(idToken);
    } else {
      message.error(t('auth:login.googleError'));
    }
  };

  const onGoogleError = () => {
    message.error(t('auth:login.googleFailed'));
  };

  const handleCancelPopup = () => {
    setShowPhonePopup(false);
    popupForm.resetFields();
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginCard}>
        <Title level={2} className={styles.loginTitle}>
          {t('auth:login.title')}
        </Title>
        <Text type="secondary" className={styles.subText}>
          {t('auth:login.subtitle')}
        </Text>

        <Form
          layout="vertical"
          onFinish={handleLogin}
          requiredMark={false}
          className={styles.loginForm}
        >
          <Form.Item
            label={t('auth:login.phone')}
            name="phone"
            rules={[
              { required: true, message: t('validation:phone.required') },
              { pattern: /^0\d{9}$/, message: t('validation:phone.invalid') },
            ]}
          >
            <Input size="large" placeholder={t('auth:login.phonePlaceholder')} />
          </Form.Item>

          <Form.Item
            label={t('auth:login.password')}
            name="password"
            rules={[{ required: true, message: t('validation:password.required') }]}
          >
            <Input.Password
              size="large"
              placeholder={t('auth:login.passwordPlaceholder')}
              iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>

          <div className={styles.rememberContainer}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>{t('auth:login.remember')}</Checkbox>
            </Form.Item>
            <RouterLink to="/forgot-password" className={styles.forgotLink}>
              {t('auth:login.forgotPassword')}
            </RouterLink>
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
              {t('auth:login.loginButton')}
            </Button>
          </Form.Item>

          <Divider plain>{t('auth:login.or')}</Divider>

          <div className={styles.googleButtonContainer}>
            {googleLoading ? (
              <Button size="large" block loading>
                {t('auth:login.processing')}
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
            <Text>{t('auth:login.noAccount')} </Text>
            <RouterLink to="/register">{t('auth:login.registerNow')}</RouterLink>
          </div>
        </Form>
      </div>
      <Modal
        title={t('auth:completeRegistration.title')}
        open={showPhonePopup}
        onCancel={handleCancelPopup}
        footer={null}
        closable={!completeLoading}
        maskClosable={!completeLoading}
      >
        <Text type="secondary" style={{ marginBottom: 24, display: 'block' }}>
          {t('auth:completeRegistration.subtitle')}
        </Text>
        <Form
          form={popupForm}
          layout="vertical"
          onFinish={handleCompleteGoogleRegistration}
          requiredMark={false}
        >
          <Form.Item
            label={t('auth:completeRegistration.phone')}
            name="phone"
            rules={[
              { required: true, message: t('validation:phone.required') },
              { pattern: /^0\d{9}$/, message: t('validation:phone.invalid') },
            ]}
          >
            <Input size="large" placeholder={t('auth:completeRegistration.phonePlaceholder')} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large" loading={completeLoading}>
              {t('auth:completeRegistration.submitButton')}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
