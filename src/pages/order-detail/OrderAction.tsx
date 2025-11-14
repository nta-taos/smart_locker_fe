import { useState } from 'react';

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
}

export function OrderActions({ order, isReceiving }: OrderActionsProps) {
  const [isReceiveModalOpen, setReceiveModalOpen] = useState(false);
  const [isAuthorizeModalOpen, setAuthorizeModalOpen] = useState(false);

  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [loading, setLoading] = useState(false);

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
      message.success('Nhận hàng thành công!');
      handleCancel();
    } catch (err) {
      console.error(err);
      extractErrorMessage(err);
      setLoading(false);
    }
  };

  const handleAuthorizeConfirm = async () => {
    if (!newName || !newEmail) {
      message.warning('Vui lòng nhập đầy đủ họ tên và email người được ủy quyền.');
      return;
    }

    setLoading(true);
    try {
      const res = await orderAuthApi.createAuthorization(order.id, newEmail, newName);
      const authorization = res.data;
      if (authorization) {
        message.success('Gửi yêu cầu ủy quyền thành công!');
        console.log('Authorization result:', authorization);
        handleCancel();
      } else {
        message.error('Không nhận được phản hồi hợp lệ từ server.');
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
      <Card title="Nhận hàng">
        <Text type="secondary" style={{ display: 'block', marginBottom: 24 }}>
          Chọn một trong các cách sau để nhận hàng từ tủ:
        </Text>

        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={12}>
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
                title={<Text strong>Nhận hàng</Text>}
                description="Xác nhận với số điện thoại"
              />
            </Card>
          </Col>

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
                title={<Text strong>Ủy quyền nhận</Text>}
                description="Cho người khác nhận hàng"
              />
            </Card>
          </Col>
        </Row>
      </Card>

      {/* Receive Modal */}
      <Modal
        title={
          <Space>
            <CheckCircleOutlined style={{ color: '#1677ff' }} /> Xác nhận nhận hàng
          </Space>
        }
        open={isReceiveModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel} disabled={isReceiving}>
            Hủy
          </Button>,
          <Button key="confirm" type="primary" loading={loading} onClick={handleReceiveConfirm}>
            {loading ? 'Đang xử lý...' : 'Nhận hàng ngay'}
          </Button>,
        ]}
      >
        <Text type="secondary">Bạn có chắc chắn muốn nhận hàng ngay bây giờ không?</Text>
      </Modal>

      {/* Authorize Modal */}
      <Modal
        title={
          <Space>
            <UsergroupAddOutlined style={{ color: '#52c41a' }} /> Ủy quyền nhận hàng
          </Space>
        }
        open={isAuthorizeModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel} disabled={isReceiving}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
            loading={loading}
            onClick={handleAuthorizeConfirm}
            disabled={!newName || !newEmail}
          >
            {loading ? 'Đang xử lý...' : 'Gửi ủy quyền'}
          </Button>,
        ]}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Text type="secondary">Nhập thông tin người được ủy quyền nhận hàng</Text>
          <div>
            <Text>Họ tên người nhận</Text>
            <Input
              type="text"
              placeholder="Nhập họ tên"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              style={{ marginTop: 8 }}
            />
          </div>
          <div>
            <Text>Email</Text>
            <Input
              type="email"
              placeholder="Nhập địa chỉ email"
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
