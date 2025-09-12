import { Button } from 'antd';

import { OrderItemType } from '@/types/order.type';
import { formatDateTime, timeAgo } from '@/utils/format-datetime';

import BoxSvg from '../icon/BoxSvg';
import styles from './OrderItem.module.scss';

export type OrderItemVariant = 'detail' | 'shorten';

interface OrderItemProps {
  data: OrderItemType;
  variant: OrderItemVariant;
  className?: string;
}

export const OrderItem: React.FC<OrderItemProps> = ({
  data,
  variant = 'shorten',
  className = '',
}) => {
  const classes = [styles.container, styles[variant], className].filter(Boolean).join(' ');

  const renderDetail = () => {
    if (variant === 'detail') {
      return (
        <div>
          <p>
            Người gửi: {data.sender.phone} ({data.sender.name})
          </p>
          <p>
            Người nhận: {data.receiver.phone} ({data.receiver.name})
          </p>
          <p>Thời gian gửi: {timeAgo(data.start_time)}</p>
        </div>
      );
    }
  };
  return (
    <div className={classes}>
      <div className={styles.iconContainer}>
        <BoxSvg />
      </div>
      <div className={styles.contentContainer}>
        <div>
          <p>Mã đơn: #{data.id}</p>
          <p>Mã tủ: #{data.lockerSlot.id}</p>
          <p className={styles.time}>{formatDateTime(data.start_time)}</p>
        </div>
        {variant === 'detail' && renderDetail()}
      </div>
      <div className={styles.actionContainer}>
        <Button color="danger" shape="round" size="middle" variant="solid">
          Đã nhận
        </Button>
        <Button color="green" shape="round" size="middle" variant="solid">
          Đã nhận
        </Button>
        <Button color="blue" shape="round" size="middle" variant="solid">
          Đã nhận
        </Button>
      </div>
    </div>
  );
};
