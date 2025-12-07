import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { MdFastfood } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

import {
  AppstoreOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ContainerOutlined,
  DollarCircleOutlined,
  EnvironmentOutlined,
  ExclamationCircleOutlined,
  InboxOutlined,
  PhoneOutlined,
  SyncOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Alert,
  Button,
  Card,
  Col,
  Grid,
  Layout,
  Row,
  Space,
  Spin,
  Tabs,
  Tag,
  Timeline,
  Typography,
  message,
} from 'antd';

import { orderApi } from '@/api/orderApi';
import { authState } from '@/recoil/atom/authAtom';
import { orderState } from '@/recoil/atom/order.atom';
import { OrderItemType } from '@/types/order.type';
import { formatDateTime } from '@/utils/format-datetime';

import { OrderActions } from './OrderAction';
import styles from './OrderDetail.module.scss';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;
const { Content, Header } = Layout;

const statusTags = {
  0: { label: 'Chờ hàng', color: 'warning', icon: <ClockCircleOutlined /> },
  1: { label: 'Đang gửi', color: 'processing', icon: <SyncOutlined spin /> },
  2: { label: 'Đã nhận', color: 'success', icon: <CheckCircleOutlined /> },
  3: { label: 'Quá hạn', color: 'error', icon: <ExclamationCircleOutlined /> },
};

const typeLabels: Record<number, string> = {
  0: 'Thuê tủ',
  1: 'Gửi hàng',
};

const AntOrderDetails: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const auth = useRecoilValue(authState);
  const [orderStateValue] = useRecoilState(orderState);
  const screens = useBreakpoint();
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderItemType | null>(
    orderStateValue.orders.find((o) => o.id === Number(orderId)) || null,
  );
  const [isLoading, setIsLoading] = useState(!order);
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await orderApi.getOrder(Number(orderId));
        const fetchedOrder = res.data as OrderItemType;
        setOrder(fetchedOrder);
      } catch (err) {
        console.error(err);
        message.error('Không tìm thấy đơn hàng hoặc bạn không có quyền xem.');
        navigate('/dashboard', { replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    if (!order) {
      fetchOrder();
    }
  }, [orderId, order, navigate, setOrder]);

  if (isLoading) {
    return <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />;
  }

  if (!order) return null;

  const canReceive = order.receiver.id === auth.user?.id;

  const OrderInfoCard = () => (
    <Card
      title={
        <Space align="center" size="small">
          <ContainerOutlined style={{ color: '#3b82f6' }} />
          <Text strong style={{ fontSize: 16 }}>
            Thông tin đơn hàng
          </Text>
        </Space>
      }
      bordered={false}
      className={styles.actionCard}
    >
      <Row gutter={[32, 16]}>
        <Col xs={24} md={12}>
          <Space direction="vertical" style={{ width: '100%', gap: 10 }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Text type="secondary" style={{ minWidth: 100 }}>
                Loại dịch vụ
              </Text>
              <Space align="center" style={{ color: '#111' }}>
                <AppstoreOutlined style={{ color: '#3b82f6' }} />
                <Text strong>{typeLabels[order.type] || 'Không xác định'}</Text>
              </Space>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Text type="secondary" style={{ minWidth: 100 }}>
                Phí dịch vụ
              </Text>
              <Space align="center">
                <DollarCircleOutlined style={{ color: '#f59e0b' }} />
                <Text strong>{Number(order.fee).toLocaleString('vi-VN')} VND</Text>
              </Space>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Text type="secondary" style={{ minWidth: 100 }}>
                Thanh toán
              </Text>
              {order.payment_status === 0 ? (
                <Space align="center" style={{ color: '#eab308', fontWeight: 500 }}>
                  <ExclamationCircleOutlined />
                  Chưa thanh toán
                </Space>
              ) : (
                <Space align="center" style={{ color: '#22c55e', fontWeight: 500 }}>
                  <CheckCircleOutlined />
                  Đã thanh toán
                </Space>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Text type="secondary" style={{ minWidth: 100 }}>
                Loại hàng
              </Text>
              {order.is_food === 1 ? (
                <Space align="center" style={{ color: '#f59e0b', fontWeight: 500 }}>
                  <MdFastfood /> Đồ ăn / thức uống
                </Space>
              ) : (
                <Space align="center" style={{ color: '#6b7280', fontWeight: 500 }}>
                  <InboxOutlined /> Hàng hóa thường
                </Space>
              )}
            </div>
          </Space>
        </Col>

        <Col xs={24} md={12}>
          <Space direction="vertical" style={{ width: '100%', gap: 10 }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Text type="secondary" style={{ minWidth: 100 }}>
                Thời gian gửi
              </Text>
              <Space align="center" style={{ color: '#111' }}>
                <ClockCircleOutlined style={{ color: '#3b82f6' }} />
                <Text strong>{formatDateTime(order.start_time)}</Text>
              </Space>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Text type="secondary" style={{ minWidth: 100 }}>
                Vị trí tủ
              </Text>
              <Space align="center" style={{ color: '#111' }}>
                <EnvironmentOutlined style={{ color: '#3b82f6' }} />
                <Text strong>{order.lockerSlot.size}</Text>
              </Space>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Text type="secondary" style={{ minWidth: 100 }}>
                Trạng thái
              </Text>
              <Tag
                icon={statusTags[order.status as keyof typeof statusTags].icon}
                color={statusTags[order.status as keyof typeof statusTags].color}
                style={{
                  fontSize: 14,
                  padding: '2px 10px',
                  borderRadius: 8,
                  fontWeight: 500,
                }}
              >
                {statusTags[order.status as keyof typeof statusTags].label}
              </Tag>
            </div>
          </Space>
        </Col>
      </Row>
    </Card>
  );

  const SenderInfoCard = () => (
    <Card
      title={
        <Space>
          <UserOutlined /> Thông tin người gửi
        </Space>
      }
      bordered={false}
      className={styles.actionCard}
    >
      <Row>
        <Col span={8}>
          <Text type="secondary">Họ tên</Text>
        </Col>
        <Col span={16}>
          <Text>{order.sender.name}</Text>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Text type="secondary">Số điện thoại</Text>
        </Col>
        <Col span={16}>
          <Text>
            <Space>
              <PhoneOutlined style={{ color: '#60a5fa' }} />
              {order.receiver_phone}
            </Space>
          </Text>
        </Col>
      </Row>
    </Card>
  );

  const ReceiverInfoCard = () => (
    <Card
      title={
        <Space>
          <UserOutlined /> Thông tin người nhận
        </Space>
      }
      bordered={false}
      className={styles.actionCard}
    >
      <Row>
        <Col span={8}>
          <Text type="secondary">Họ tên</Text>
        </Col>
        <Col span={16}>
          <Text>{order.receiver.name || 'Chưa xác định'}</Text>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Text type="secondary">Số điện thoại</Text>
        </Col>
        <Col span={16}>
          <Text>
            <Space>
              <PhoneOutlined style={{ color: '#60a5fa' }} />
              {order.receiver_phone}
            </Space>
          </Text>
        </Col>
      </Row>
    </Card>
  );

  const trackingTimeline = [
    {
      color: order.status >= 0 ? '#facc15' : 'gray',
      icon: <ContainerOutlined />,
      children: (
        <>
          <Text strong>Đơn hàng được tạo</Text>
          <br />
          <Text type="secondary">{formatDateTime(order.start_time)}</Text>
        </>
      ),
    },
    {
      color: order.status >= 1 ? '#3b82f6' : 'gray',
      icon: <SyncOutlined spin={order.status === 1} />,
      children: (
        <>
          <Text strong>Hàng đang gửi</Text>
          <br />
          <Text type="secondary">{order.status >= 1 ? 'Đã gửi' : 'Chờ gửi'}</Text>
        </>
      ),
    },
    {
      color: order.status >= 2 ? '#34d399' : 'gray',
      icon: <CheckCircleOutlined />,
      children: (
        <>
          <Text strong>Hàng đã được nhận</Text>
          <br />
          <Text type="secondary">
            {order.status >= 2
              ? order.end_time
                ? formatDateTime(order.end_time)
                : 'Đã xác nhận'
              : 'Chờ nhận'}
          </Text>
        </>
      ),
    },
  ];

  const tabItems = [
    {
      label: 'Chi tiết đơn hàng',
      key: 'details',
      children: (
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <OrderInfoCard />
          <SenderInfoCard />
          {order.type === 1 && <ReceiverInfoCard />}
        </Space>
      ),
    },
    {
      label: 'Trạng thái đơn hàng',
      key: 'tracking',
      children: (
        <Card
          title={
            <Space>
              <ClockCircleOutlined /> Lịch sử trạng thái
            </Space>
          }
          bordered={false}
          className={styles.actionCard}
        >
          <Timeline items={trackingTimeline} style={{ paddingTop: 16 }} />
        </Card>
      ),
    },
  ];

  return (
    <Layout className={styles.container}>
      <Header className={styles.antdHeader}>
        <div className={styles.headerContent}>
          <Button
            type="text"
            icon={<FaArrowLeft size={screens.sm ? 24 : 20} />}
            className={styles.backButtonAntd}
            onClick={() => navigate(-1)}
          />
          <div className={styles.headerTitleGroup}>
            <Title level={2} className={styles.pageTitle}>
              Thông tin đơn hàng
            </Title>
          </div>
        </div>
      </Header>

      <Content className={styles.antdContent}>
        <div className={styles.maxWidthWrapper}>
          {order.status === 1 && (
            <Alert
              message="Hàng đã sẵn sàng tại tủ"
              description="Vui lòng nhận hàng trong thời gian quy định để tránh phát sinh phí quá hạn."
              type="warning"
              showIcon
              icon={<ExclamationCircleOutlined />}
            />
          )}
          <Tabs
            defaultActiveKey="details"
            items={tabItems}
            size="large"
            centered
            style={{ paddingBottom: '16px' }}
          />
          {canReceive && <OrderActions order={order} isReceiving={false} />}
        </div>
      </Content>
    </Layout>
  );
};
export default AntOrderDetails;
