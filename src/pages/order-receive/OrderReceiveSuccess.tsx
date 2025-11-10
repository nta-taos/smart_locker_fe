import { useNavigate } from 'react-router-dom';

import { CheckCircleTwoTone, HomeOutlined } from '@ant-design/icons';
import { Button, Card, Space, Typography } from 'antd';

const { Title, Text } = Typography;

export default function OrderReceiveSuccess() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to bottom right, #f6ffed, #ffffff)',
        padding: 24,
      }}
    >
      <Card
        style={{
          maxWidth: 480,
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          borderRadius: 16,
        }}
      >
        <Space direction="vertical" align="center" style={{ width: '100%' }}>
          <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: 80 }} />

          <Title level={3} style={{ marginTop: 16 }}>
            Nhận hàng thành công!
          </Title>

          <Text type="secondary" style={{ fontSize: 16 }}>
            Cảm ơn bạn đã sử dụng dịch vụ. Đơn hàng của bạn đã được nhận thành công.
          </Text>

          <div style={{ marginTop: 32 }}>
            <Button
              type="primary"
              icon={<HomeOutlined />}
              size="large"
              onClick={() => navigate('/dashboard')}
            >
              Quay lại trang chủ
            </Button>
          </div>
        </Space>
      </Card>
    </div>
  );
}
