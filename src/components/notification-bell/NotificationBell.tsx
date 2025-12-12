import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { BellOutlined, LoadingOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Drawer, Empty, Grid, List, Popover, Spin, Typography } from 'antd';

import { notificationApi } from '@/api/notificationApi';
import { getSocket } from '@/socket';
import { extractErrorMessage } from '@/utils/error.utils';
import { formatDateTime } from '@/utils/format-datetime';

const { Text } = Typography;
const { useBreakpoint } = Grid;

export type NotificationDataType = {
  role: string;
  orderId: number;
  totalCost: number;
};

export type NotificationPayload = {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  userId: number;
  type: number;
  title: string;
  message: string;
  isRead: boolean;
  data: NotificationDataType;
};

interface DisplayNotification {
  id: number;
  title: string;
  time: string;
  read: boolean;
  type?: number;
  data?: NotificationDataType | null;
  orderId?: number | null;
}

const NotificationBell = () => {
  const { t } = useTranslation('notifications');
  const [notifications, setNotifications] = useState<DisplayNotification[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const screens = useBreakpoint();
  const navigate = useNavigate();
  const unreadCount = notifications.filter((n) => !n.read).length;

  const fetchNotifications = useCallback(
    async (pageNumber: number) => {
      if (loading || (pageNumber > totalPages && totalPages > 1)) return;
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
          type?: number;
          data?: NotificationDataType;
        };

        const list: DisplayNotification[] = (payload.data || []).map((n: BackendNotification) => ({
          id: n.id,
          title: n.title || n.message || t('defaultTitle'),
          time: n.created_at || n.createdAt || '',
          read: !!n.isRead,
          type: n.type,
          data: n.data || null,
          orderId: n.data?.orderId || null,
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
    [loading, totalPages, t],
  );

  useEffect(() => {
    fetchNotifications(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handler = (payload: NotificationPayload) => {
      try {
        const n = payload;

        const mapped: DisplayNotification = {
          id: n.id || 0,
          title: n.title || n.message || t('defaultTitle'),
          time: n.created_at || new Date().toISOString(),
          read: !!n.isRead,
          type: n.type || undefined,
          data: n.data || null,
          orderId: n.data?.orderId || null,
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
  }, [t]);

  const handleOpen = () => {
    if (notifications.length === 0) fetchNotifications(1);
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    notificationApi
      .markAllAsRead()
      .then(() => {})
      .catch((err) => {
        console.error('Error markAllAsRead:', err);
      });
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 10;

    if (isNearBottom && !loading && page < totalPages) {
      fetchNotifications(page + 1);
    }
  };

  const handleItemClick = async (item: DisplayNotification) => {
    if (!item.read) {
      try {
        await notificationApi.markAsRead(item.id);
        setNotifications((prev) => prev.map((p) => (p.id === item.id ? { ...p, read: true } : p)));
      } catch (err) {
        console.error('Error marking as read:', err);
      }
    }

    const isOrderNotification = item.type === 1 || item.type === 2;

    if (isOrderNotification && item.orderId) {
      setOpenDrawer(false);
      navigate(`/orders/${item.orderId}`);
    }
  };

  const NotificationList = (
    <div style={{ width: '100%', maxHeight: '70vh', overflowY: 'auto' }} onScroll={handleScroll}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 8,
          padding: '0 12px',
        }}
      >
        <Text strong>{t('title')}</Text>
        {unreadCount > 0 && (
          <Button type="link" size="small" onClick={markAllAsRead}>
            {t('markAllRead')}
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
                margin: '0 8px 4px 8px',
              }}
              onClick={() => handleItemClick(item)}
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
            description={t('empty')}
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

  if (!screens.md) {
    return (
      <>
        <Badge count={unreadCount} overflowCount={99} offset={[0, 0]} style={{ padding: '0 4px' }}>
          <BellOutlined
            style={{
              fontSize: 22,
              cursor: 'pointer',
              color: unreadCount > 0 ? '#f7832d' : '#FFFFFF',
            }}
            onClick={() => {
              setOpenDrawer(true);
              handleOpen();
            }}
          />
        </Badge>
        <Drawer
          title={t('title')}
          placement="right"
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          width="100%"
          bodyStyle={{ padding: 0 }}
        >
          {NotificationList}
        </Drawer>
      </>
    );
  }

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
            color: unreadCount > 0 ? '#f7832d' : '#FFFFFF',
          }}
        />
      </Badge>
    </Popover>
  );
};

export default NotificationBell;
