import { Button, List } from 'antd';

// interface  RecentActivityProp

const RecentActivity: React.FC = () => {
  return (
    <List
      style={{ height: '350px', overflowY: 'auto', padding: '12px' }}
      itemLayout="horizontal"
      dataSource={[
        { id: '#28461910', locker: '#12', date: '29/08/25', status: 'Đã nhận' },
        { id: '#28461911', locker: '#12', date: '29/08/25', status: 'Chưa nhận' },
        { id: '#28461912', locker: '#12', date: '29/08/25', status: 'Đã nhận' },
        { id: '#28461910', locker: '#12', date: '29/08/25', status: 'Đã nhận' },
        { id: '#28461911', locker: '#12', date: '29/08/25', status: 'Chưa nhận' },
        { id: '#28461912', locker: '#12', date: '29/08/25', status: 'Đã nhận' },
      ]}
      renderItem={(item) => (
        <List.Item
          actions={[
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {item.status === 'Chưa nhận' && (
                <Button size="small" type="primary" key="receive" style={{ borderRadius: '10px' }}>
                  Nhận ngay
                </Button>
              )}
              <Button
                size="small"
                key="status"
                style={{
                  borderRadius: '10px',
                  backgroundColor: item.status === 'Đã nhận' ? 'green' : 'red',
                  color: 'white',
                  cursor: 'default',
                }}
              >
                {item.status}
              </Button>
            </div>,
          ]}
        >
          <List.Item.Meta
            avatar={
              <img src="/images/locker.png" alt="locker" style={{ width: 60, borderRadius: 8 }} />
            }
            title={
              <div style={{ color: '#002B79' }}>
                <div>
                  Mã đơn: <strong>{item.id}</strong>
                </div>
                <div>
                  Mã tủ: <strong>{item.locker}</strong>
                </div>
              </div>
            }
            description={item.date}
          />
        </List.Item>
      )}
    />
  );
};

export default RecentActivity;
