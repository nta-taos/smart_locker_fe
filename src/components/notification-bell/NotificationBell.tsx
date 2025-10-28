import { useState } from 'react';

import { BellOutlined, LoadingOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Drawer, Grid, List, Popover, Spin, Typography } from 'antd';

const { Text } = Typography;
const { useBreakpoint } = Grid;

interface NotificationItem {
  id: number;
  title: string;
  time: string;
  read: boolean;
}

const NotificationBell = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const screens = useBreakpoint();
  const unreadCount = notifications.filter((n) => !n.read).length;

  // 🧩 Mock API giả lập gọi server với phân trang
  const fetchNotifications = async (pageNumber: number) => {
    if (loading || (totalPages && pageNumber > totalPages)) return;
    setLoading(true);

    try {
      // ⏱ Giả lập độ trễ API 1 giây
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 🔢 Cấu hình mock
      const pageSize = 10;
      const totalItems = 35; // tổng 35 thông báo
      const totalPagesMock = Math.ceil(totalItems / pageSize);

      // 🧠 Sinh dữ liệu giả cho mỗi trang
      const data = Array.from({ length: pageSize }, (_, i) => {
        const id = (pageNumber - 1) * pageSize + i + 1;
        return {
          id,
          title: `Thông báo #${id} - Đơn hàng ${1000 + id}`,
          time: `${Math.floor(Math.random() * 60)} phút trước`,
          read: Math.random() > 0.5,
        };
      }).filter((item) => item.id <= totalItems);

      // 📝 Cập nhật state
      setNotifications((prev) => [...prev, ...data]);
      setPage(pageNumber);
      setTotalPages(totalPagesMock);
    } catch (err) {
      console.error('Lỗi khi tải mock data:', err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Gọi lần đầu khi mở Drawer hoặc Popover
  const handleOpen = () => {
    if (notifications.length === 0) fetchNotifications(1);
  };

  // ✅ Đánh dấu tất cả đã đọc
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
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
                description={<Text type="secondary">{item.time}</Text>}
              />
            </List.Item>
          )}
        />
      ) : (
        !loading && (
          <div style={{ textAlign: 'center', padding: '24px 0', color: '#999' }}>
            Không có thông báo
          </div>
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
