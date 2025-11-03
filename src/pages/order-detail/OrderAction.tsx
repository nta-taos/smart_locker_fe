'use client';

import { useState } from 'react';

import {
  CheckCircleOutlined,
  PhoneOutlined,
  UnlockOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import {
  Alert,
  Avatar,
  Button,
  Card,
  Col,
  Input,
  Modal,
  Row,
  Space,
  Typography,
  message,
} from 'antd';

import { OrderItemType } from '@/types/order.type';

const { Text } = Typography;

interface OrderActionsProps {
  order: OrderItemType;
  isReceiving: boolean;
}

export function OrderActions({ order, isReceiving }: OrderActionsProps) {
  const [action, setAction] = useState<string | null>(null);
  const [authCode, setAuthCode] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newName, setNewName] = useState('');

  const handleReceive = () => setAction('receive');
  const handleAuthorize = () => setAction('authorize');
  const handleOpenLocker = () => setAction('open-locker');

  const handleCancel = () => {
    if (isReceiving) return;
    setAction(null);
    setAuthCode('');
    setNewName('');
    setNewPhone('');
  };

  const confirmAction = () => {
    console.log(`Đang thực thi hành động: ${action} cho Order ID: ${order.id}`);

    setTimeout(() => {
      message.success(`Hành động '${action}' đã được xử lý thành công`);
      handleCancel();
    }, 1500);
  };

  return (
    <>
      <Card title="Nhận hàng">
        <Text type="secondary" style={{ display: 'block', marginBottom: 24 }}>
          Chọn một trong các cách sau để nhận hàng từ tủ:
        </Text>

        <Row gutter={[16, 16]}>
          {/* Receive by phone */}
          <Col xs={24} md={8}>
            <Card
              hoverable
              onClick={isReceiving ? undefined : handleReceive}
              style={{ opacity: isReceiving ? 0.5 : 1 }}
            >
              <Card.Meta
                avatar={
                  <Avatar
                    style={{ backgroundColor: '#e6f7ff', color: '#1677ff' }}
                    icon={<PhoneOutlined />}
                  />
                }
                title="Nhận hàng"
                description="Xác nhận với số điện thoại"
              />
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card
              hoverable
              onClick={isReceiving ? undefined : handleAuthorize}
              style={{ opacity: isReceiving ? 0.5 : 1 }}
            >
              <Card.Meta
                avatar={
                  <Avatar
                    style={{ backgroundColor: '#f6ffed', color: '#52c41a' }}
                    icon={<UsergroupAddOutlined />}
                  />
                }
                title="Ủy quyền nhận"
                description="Cho người khác nhận hàng"
              />
            </Card>
          </Col>

          {/* Open locker */}
          <Col xs={24} md={8}>
            <Card
              hoverable
              onClick={isReceiving ? undefined : handleOpenLocker}
              style={{ opacity: isReceiving ? 0.5 : 1, height: '100%' }}
            >
              <Card.Meta
                avatar={
                  <Avatar
                    style={{ backgroundColor: '#f9f0ff', color: '#722ed1' }}
                    icon={<UnlockOutlined />}
                  />
                }
                title="Mở tủ"
                description="Gửi mã mở tủ"
              />
            </Card>
          </Col>
        </Row>
      </Card>

      {/* Modals */}

      {/* Receive Modal */}
      <Modal
        title={
          <Space>
            <CheckCircleOutlined style={{ color: '#1677ff' }} />
            Nhận hàng
          </Space>
        }
        open={action === 'receive'}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel} disabled={isReceiving}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isReceiving}
            onClick={confirmAction}
            disabled={!authCode}
          >
            {isReceiving ? 'Đang xử lý...' : 'Xác nhận'}
          </Button>,
        ]}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Text type="secondary">Xác nhận nhận hàng bằng số điện thoại</Text>
          <div>
            <Text>Số điện thoại người nhận</Text>
            <Input type="tel" value={order.receiver_phone} disabled style={{ marginTop: 8 }} />
          </div>
          <div>
            <Text>Mã OTP</Text>
            <Input
              type="text"
              placeholder="Nhập mã OTP gửi tới số điện thoại"
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
              style={{ marginTop: 8 }}
            />
          </div>
        </Space>
      </Modal>

      {/* Authorize Modal */}
      <Modal
        title={
          <Space>
            <UsergroupAddOutlined style={{ color: '#52c41a' }} />
            Ủy quyền nhận hàng
          </Space>
        }
        open={action === 'authorize'}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel} disabled={isReceiving}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
            loading={isReceiving}
            onClick={confirmAction}
            disabled={!authCode || !newName || !newPhone}
          >
            {isReceiving ? 'Đang xử lý...' : 'Gửi ủy quyền'}
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
            <Text>Số điện thoại</Text>
            <Input
              type="tel"
              placeholder="Nhập số điện thoại"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              style={{ marginTop: 8 }}
            />
          </div>
          <div>
            <Text>Mã xác thực</Text>
            <Input
              type="text"
              placeholder="Nhập mã OTP của BẠN"
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
              style={{ marginTop: 8 }}
            />
          </div>
        </Space>
      </Modal>

      {/* Open Locker Modal */}
      <Modal
        title={
          <Space>
            <UnlockOutlined style={{ color: '#722ed1' }} />
            Mở tủ
          </Space>
        }
        open={action === 'open-locker'}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel} disabled={isReceiving}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            style={{ backgroundColor: '#722ed1', borderColor: '#722ed1' }}
            loading={isReceiving}
            onClick={() => {
              // SỬA LỖI: Xóa 'setAuthCode('pending');' không cần thiết
              confirmAction();
            }}
          >
            {isReceiving ? 'Đang gửi...' : 'Gửi mã'}
          </Button>,
        ]}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Text type="secondary">Yêu cầu mã mở tủ được gửi tới số điện thoại</Text>
          <div>
            <Text>Số điện thoại</Text>
            <Input type="tel" value={order.receiver_phone} disabled style={{ marginTop: 8 }} />
          </div>
          <Alert
            type="info"
            message="Mã sẽ được gửi tới số điện thoại"
            description="Chúng tôi sẽ gửi mã OTP để mở tủ trong giây lát"
          />
        </Space>
      </Modal>
    </>
  );
}
