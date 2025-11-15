import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BellOutlined, LoadingOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Drawer, Empty, Grid, List, Popover, Spin, Typography } from 'antd';

import { notificationApi } from '@/api/notificationApi';
import { getSocket } from '@/socket';
import { extractErrorMessage } from '@/utils/error.utils';
import { formatDateTime } from '@/utils/format-datetime';

const { Text } = Typography;
const { useBreakpoint } = Grid;

interface NotificationItem {
  id: number;
  title: string;
  time: string;
  read: boolean;
  type?: number;
  data?: Record<string, unknown> | null;
  orderId?: number | null;
}

const NotificationBell = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const screens = useBreakpoint();
  const unreadCount = notifications.filter((n) => !n.read).length;
  const navigate = useNavigate();

  const getOrderId = (dataObj: Record<string, unknown> | null): number | null => {
    if (!dataObj) return null;
    const v = dataObj['orderId'] ?? dataObj['order_id'];
    if (typeof v === 'number') return v;
    if (typeof v === 'string' && /^[0-9]+$/.test(v)) return Number(v);
    const order = dataObj['order'];
    if (order && typeof order === 'object') {
      const id = (order as Record<string, unknown>)['id'];
      if (typeof id === 'number') return id;
      if (typeof id === 'string' && /^[0-9]+$/.test(id)) return Number(id);
    }
    return null;
  };

  // Fetch notifications from backend with pagination
  const fetchNotifications = useCallback(
    async (pageNumber: number) => {
      if (loading || (totalPages && pageNumber > totalPages)) return;
      setLoading(true);

      try {
        const res = await notificationApi.getNotifications(pageNumber, 10);
        const payload = res.data;
        type BackendNotification = {
          id: number;
          title?: string;
          message?: string;
          created_at?: string;
          createdAt?: string;
          isRead?: boolean;
        };

        const list = (payload.data || []).map((n: BackendNotification) => ({
          id: n.id,
          title: n.title || n.message || 'Thông báo',
          time: n.created_at || n.createdAt || '',
          read: !!n.isRead,
        }));

        setNotifications((prev) => (pageNumber === 1 ? list : [...prev, ...list]));
        setPage(payload.page || pageNumber);
        setTotalPages(payload.totalPages || 1);
      } catch (err) {
        console.error(err);
        extractErrorMessage(err);
      } finally {
        setLoading(false);
      }
    },
    [loading, totalPages],
  );

  // Call API immediately on mount to load notifications
  useEffect(() => {
    fetchNotifications(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Listen for incoming notifications from socket and prepend to list
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handler = (payload: unknown) => {
      try {
        const n = payload as Record<string, unknown>;
        const dataField = (n['data'] ?? null) as Record<string, unknown> | null;
        const orderId = getOrderId(dataField);
        const mapped = {
          id: (n['id'] as number) || 0,
          title: (n['title'] as string) || (n['message'] as string) || 'Thông báo',
          time:
            (n['created_at'] as string) || (n['createdAt'] as string) || new Date().toISOString(),
          read: !!n['isRead'],
          type: (n['type'] as number) || undefined,
          data: dataField,
          orderId,
        };
        setNotifications((prev) => [mapped, ...prev]);
      } catch (e) {
        console.error('Error handling incoming notification', e);
      }
    };

    socket.on('notification:created', handler);
    return () => {
      socket.off('notification:created', handler);
    };
  }, []);

  // ✅ Gọi lần đầu khi mở Drawer hoặc Popover
  const handleOpen = () => {
    if (notifications.length === 0) fetchNotifications(1);
  };

  // ✅ Đánh dấu tất cả đã đọc
  const markAllAsRead = () => {
    // optimistic update
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    notificationApi
      .markAllAsRead()
      .then(() => {
        // optionally refresh or handle response
      })
      .catch((err) => {
        console.error('Lỗi markAllAsRead:', err);
      });
  };

  // ✅ Khi cuộn gần cuối danh sách -> tải thêm trang mới
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop - clientHeight < 10 && !loading && page < totalPages) {
      fetchNotifications(page + 1);
    }
  };

  // ✅ Danh sách hiển thị thông báo
  const NotificationList = (
    <div style={{ width: '100%', maxHeight: '70vh', overflowY: 'auto' }} onScroll={handleScroll}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 8,
        }}
      >
        <Text strong>Thông báo</Text>
        {unreadCount > 0 && (
          <Button type="link" size="small" onClick={markAllAsRead}>
            Đánh dấu đã đọc
          </Button>
        )}
      </div>

      {notifications.length > 0 ? (
        <List
          itemLayout="horizontal"
          dataSource={notifications}
          renderItem={(item) => (
            <List.Item
              style={{
                background: item.read ? '#fff' : '#e6f7ff',
                borderRadius: 4,
                padding: '8px 12px',
                cursor: 'pointer',
              }}
              onClick={async () => {
                if (!item.read) {
                  try {
                    await notificationApi.markAsRead(item.id);
                    setNotifications((prev) =>
                      prev.map((p) => (p.id === item.id ? { ...p, read: true } : p)),
                    );
                  } catch (err) {
                    console.error('Lỗi khi đánh dấu read:', err);
                  }
                }

                if (item.orderId) {
                  setOpenDrawer(false);
                  navigate(`/orders/${item.orderId}`);
                }
              }}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    style={{
                      backgroundColor: item.read ? '#d9d9d9' : '#1890ff',
                    }}
                    icon={<BellOutlined />}
                  />
                }
                title={<Text strong={!item.read}>{item.title}</Text>}
                description={<Text type="secondary">{formatDateTime(item.time)}</Text>}
              />
            </List.Item>
          )}
        />
      ) : (
        !loading && (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Không có thông báo"
            style={{ padding: '24px 0' }}
          />
        )
      )}

      {loading && (
        <div style={{ textAlign: 'center', padding: '12px 0' }}>
          <Spin indicator={<LoadingOutlined spin />} />
        </div>
      )}
    </div>
  );

  // ✅ Mobile -> dùng Drawer
  if (!screens.md) {
    return (
      <>
        <Badge count={unreadCount} overflowCount={99} offset={[0, 0]} style={{ padding: '0 4px' }}>
          <BellOutlined
            style={{
              fontSize: 22,
              cursor: 'pointer',
              color: unreadCount > 0 ? '#1890ff' : '#555',
            }}
            onClick={() => {
              setOpenDrawer(true);
              handleOpen();
            }}
          />
        </Badge>
        <Drawer
          title="Thông báo"
          placement="right"
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          width="100%"
        >
          {NotificationList}
        </Drawer>
      </>
    );
  }

  // ✅ Desktop -> dùng Popover
  return (
    <Popover
      content={<div style={{ width: 320 }}>{NotificationList}</div>}
      trigger={['click']}
      placement="bottomRight"
      overlayStyle={{ padding: 0 }}
      onOpenChange={(visible) => visible && handleOpen()}
    >
      <Badge count={unreadCount} overflowCount={99} offset={[0, 0]} style={{ padding: '0 4px' }}>
        <BellOutlined
          style={{
            fontSize: 22,
            cursor: 'pointer',
            color: unreadCount > 0 ? '#1890ff' : '#555',
          }}
        />
      </Badge>
    </Popover>
  );
};

export default NotificationBell;
