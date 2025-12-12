import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { CheckCircleOutlined, PhoneOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Input, Modal, Row, Space, Typography, message } from 'antd';

import { orderApi } from '@/api/orderApi';
import { orderAuthApi } from '@/api/orderAuthApi';
import { OrderItemType } from '@/types/order.type';
import { extractErrorMessage } from '@/utils/error.utils';

const { Text } = Typography;

interface OrderActionsProps {
  order: OrderItemType;
  isReceiving: boolean;
  canAuthorize: boolean;
}

export function OrderActions({ order, isReceiving, canAuthorize }: OrderActionsProps) {
  const [isReceiveModalOpen, setReceiveModalOpen] = useState(false);
  const [isAuthorizeModalOpen, setAuthorizeModalOpen] = useState(false);
  const { t } = useTranslation('orders');

  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReceiveOpen = () => setReceiveModalOpen(true);
  const handleAuthorizeOpen = () => setAuthorizeModalOpen(true);
  const handleCancel = () => {
    if (isReceiving) return;
    setReceiveModalOpen(false);
    setAuthorizeModalOpen(false);
    setNewName('');
    setNewEmail('');
    setLoading(false);
  };

  const handleReceiveConfirm = async () => {
    setLoading(true);
    try {
      await orderApi.postOpenOrder(order.id);
      message.success(t('actions.receiveSuccess'));
      navigate(-1);

      handleCancel();
    } catch (err) {
      console.error(err);
      extractErrorMessage(err);
      setLoading(false);
    }
  };

  const handleAuthorizeConfirm = async () => {
    if (!newName || !newEmail) {
      message.warning(t('actions.fillRequired'));
      return;
    }

    setLoading(true);
    try {
      const res = await orderAuthApi.createAuthorization(order.id, newEmail, newName);
      const authorization = res.data;
      if (authorization) {
        message.success(t('actions.authorizeSuccess'));
        console.log('Authorization result:', authorization);
        handleCancel();
      } else {
        message.error(t('actions.noResponse'));
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      extractErrorMessage(err);
      setLoading(false);
    }
  };

  return (
    <>
      <Card title={t('actions.receiveTitle')}>
        <Text type="secondary" style={{ display: 'block', marginBottom: 24 }}>
          {t('actions.receiveDescription')}
        </Text>

        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={canAuthorize ? 12 : 24}>
            <Card
              hoverable
              onClick={order.status === 0 || order.status === 2 ? undefined : handleReceiveOpen}
              style={{
                opacity: order.status === 0 || order.status === 2 ? 0.5 : 1,
                height: '100%',
              }}
            >
              <Card.Meta
                avatar={
                  <Avatar
                    size={48}
                    style={{ backgroundColor: '#e6f7ff', color: '#1677ff' }}
                    icon={<PhoneOutlined />}
                  />
                }
                title={<Text strong>{t('actions.receive')}</Text>}
                description={t('actions.receiveWithPhone')}
              />
            </Card>
          </Col>

          {canAuthorize && (
            <Col xs={24} sm={12}>
              <Card
                hoverable
                onClick={order.status === 0 || order.status === 2 ? undefined : handleAuthorizeOpen}
                style={{
                  opacity: order.status === 0 || order.status === 2 ? 0.5 : 1,
                  height: '100%',
                }}
              >
                <Card.Meta
                  avatar={
                    <Avatar
                      size={48}
                      style={{ backgroundColor: '#f6ffed', color: '#52c41a' }}
                      icon={<UsergroupAddOutlined />}
                    />
                  }
                  title={<Text strong>{t('actions.authorize')}</Text>}
                  description={t('actions.authorizeDescription')}
                />
              </Card>
            </Col>
          )}
        </Row>
      </Card>

      {/* Receive Modal */}
      <Modal
        title={
          <Space>
            <CheckCircleOutlined style={{ color: '#1677ff' }} /> {t('actions.confirmReceive')}
          </Space>
        }
        open={isReceiveModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel} disabled={isReceiving}>
            {t('common:actions.cancel')}
          </Button>,
          <Button key="confirm" type="primary" loading={loading} onClick={handleReceiveConfirm}>
            {loading ? t('actions.processing') : t('actions.receiveNow')}
          </Button>,
        ]}
      >
        <Text type="secondary">{t('actions.confirmQuestion')}</Text>
      </Modal>

      {/* Authorize Modal */}
      <Modal
        title={
          <Space>
            <UsergroupAddOutlined style={{ color: '#52c41a' }} /> {t('actions.authorizeTitle')}
          </Space>
        }
        open={isAuthorizeModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel} disabled={isReceiving}>
            {t('common:actions.cancel')}
          </Button>,
          <Button
            key="submit"
            type="primary"
            style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
            loading={loading}
            onClick={handleAuthorizeConfirm}
            disabled={!newName || !newEmail}
          >
            {loading ? t('actions.processing') : t('actions.sendAuthorize')}
          </Button>,
        ]}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Text type="secondary">{t('actions.authorizeInfo')}</Text>
          <div>
            <Text>{t('actions.authorizeRecipient')}</Text>
            <Input
              type="text"
              placeholder={t('actions.enterFullName')}
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              style={{ marginTop: 8 }}
            />
          </div>
          <div>
            <Text>Email</Text>
            <Input
              type="email"
              placeholder={t('actions.enterEmail')}
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              style={{ marginTop: 8 }}
            />
          </div>
        </Space>
      </Modal>
    </>
  );
}
