import { useNavigate } from 'react-router-dom';

import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { Button, Tag } from 'antd';

import { OrderItemType } from '@/types/order.type';
import { formatDateTime, timeAgo } from '@/utils/format-datetime';

import styles from './OrderItem.module.scss';

export type OrderItemVariant = 'detail' | 'shorten' | 'tag';

interface OrderItemProps {
  data: OrderItemType;
  variant: OrderItemVariant;
  className?: string;
}

const statusTags = {
  0: { label: 'Chờ hàng', color: 'warning', icon: <ClockCircleOutlined /> },
  1: { label: 'Đang gửi', color: 'processing', icon: <SyncOutlined spin /> },
  2: { label: 'Đã nhận', color: 'success', icon: <CheckCircleOutlined /> },
  3: { label: 'Quá hạn', color: 'error', icon: <ExclamationCircleOutlined /> },
};

export const OrderItem: React.FC<OrderItemProps> = ({
  data,
  variant = 'shorten',
  className = '',
}) => {
  const navigate = useNavigate();
  const classes = [styles.container, styles[variant], className].filter(Boolean).join(' ');
  const statusInfo = statusTags[data.status as keyof typeof statusTags] ?? statusTags[0];

  const handleDetailClick = () => {
    navigate(`/orders/${data.id}`);
  };

  const renderDetail = () => {
    if (variant === 'detail') {
      return (
        <div>
          <p>
            Người gửi: {data.sender.phone} ({data.sender.name})
          </p>
          <p>
            Người nhận: {data.receiver?.phone} ({data.receiver?.name})
          </p>
          <p>Thời gian gửi: {timeAgo(data.start_time)}</p>
        </div>
      );
    }
  };

  return (
    <div className={classes}>
      <div className={styles.iconContainer}>
        <div className={styles.iconBody}>
          <img src="/images/locker4.webp" alt="" />
        </div>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.iconBody}>
          <img src="/images/locker4.webp" alt="" />
        </div>
        <div>
          <p>Mã đơn: {data.order_code || data.id}</p>
          <p>Mã tủ: {data.lockerSlot.id}</p>
          <p className={styles.time}>{formatDateTime(data.start_time)}</p>
        </div>
        {variant === 'detail' && renderDetail()}
      </div>
      <div className={styles.actionContainer}>
        <Tag
          icon={statusInfo.icon}
          color={statusInfo.color}
          className={variant == 'detail' ? styles.statusTagsDetail : styles.statusTags}
        >
          {statusInfo.label}
        </Tag>

        <Button
          color="blue"
          shape="round"
          size={variant == 'detail' ? 'middle' : 'small'}
          variant="solid"
          style={{ width: '100%' }}
          onClick={handleDetailClick}
        >
          Chi tiết
        </Button>
      </div>
    </div>
  );
};
