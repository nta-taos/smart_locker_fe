import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { Button, Result, Spin, message } from 'antd';
import { motion } from 'framer-motion';

import { orderAuthApi } from '@/api/orderAuthApi';
import { extractErrorMessage } from '@/utils/error.utils';

const OrderAuthorizationPage = () => {
  const { orderId } = useParams();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const { t } = useTranslation('orders');

  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = async () => {
    if (!token) {
      message.error(t('authorization.noToken'));
      return;
    }

    setLoading(true);
    try {
      await orderAuthApi.confirmAuthorization(Number(orderId), token);
      message.success(t('authorization.unlockSuccess'));
      setConfirmed(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      console.log(err);
      extractErrorMessage(err);
    } finally {
      setLoading(false);
    }
  };

  if (confirmed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        style={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #e0f7fa, #e8f5e9)',
        }}
      >
        <Result
          icon={<UnlockOutlined style={{ fontSize: 80, color: '#52c41a' }} />}
          status="success"
          title={t('authorization.success')}
          subTitle={`${t('orders:detail.orderCode')} #${orderId} ${t('authorization.orderConfirmed')}`}
          extra={
            <Button type="primary" href="/dashboard" size="large">
              {t('authorization.backHome')}
            </Button>
          }
        />
      </motion.div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #f0f5ff 0%, #e6f7ff 100%)',
        padding: '16px',
      }}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          backgroundColor: '#fff',
          padding: '40px 50px',
          borderRadius: 16,
          boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
          textAlign: 'center',
          maxWidth: 480,
          width: '100%',
        }}
      >
        <motion.div
          animate={{ rotate: loading ? 360 : 0 }}
          transition={{ repeat: loading ? Infinity : 0, duration: 1.2, ease: 'linear' }}
          style={{
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#e6f4ff',
            borderRadius: '50%',
            width: 80,
            height: 80,
            marginBottom: 24,
          }}
        >
          <LockOutlined style={{ fontSize: 40, color: '#1677ff' }} />
        </motion.div>

        <h2 style={{ marginBottom: 8, fontSize: 22, color: '#1a1a1a' }}>
          {t('authorization.title')} #{orderId}
        </h2>
        <p style={{ color: '#595959', marginBottom: 28 }}>{t('authorization.description')}</p>

        <Spin spinning={loading}>
          <Button
            type="primary"
            size="large"
            onClick={handleConfirm}
            disabled={!token}
            style={{
              width: '100%',
              height: 48,
              fontSize: 16,
              fontWeight: 500,
              borderRadius: 8,
            }}
          >
            {loading ? t('authorization.confirming') : t('authorization.confirmUnlock')}
          </Button>
        </Spin>

        <p style={{ marginTop: 24, fontSize: 13, color: '#999' }}>
          {t('authorization.ignoreInfo')}
        </p>
      </motion.div>
    </div>
  );
};

export default OrderAuthorizationPage;
