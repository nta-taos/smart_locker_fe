import { Button } from 'antd';

import { OrderItemType } from '@/types/order.type';
import { formatDateTime, timeAgo } from '@/utils/format-datetime';

import { LockerInfo } from '../locker-info/LockerInfo';
import styles from './OrderItem.module.scss';

export type OrderItemVariant = 'detail' | 'shorten' | 'tag';

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
            Người nhận: {data.receiver?.phone} ({data.receiver?.name})
          </p>
          <p>Thời gian gửi: {timeAgo(data.start_time)}</p>
        </div>
      );
    }
  };

  if (variant === 'tag') {
    return (
      <LockerInfo
        address={data.id + ''}
        lockerId={data.lockerSlot.id + 'lsjdlasjdlasjldajslk'}
        building="âsfasasdsdsadasd"
        slotId={data.lockerSlot.id + ''}
        type="detail"
      />
    );
  }

  return (
    <div className={classes}>
      <div className={styles.iconContainer}>
        <div className={styles.iconBody}>
          <img src="/images/locker.png" alt="" />
        </div>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.iconBody}>
          <img src="/images/locker.png" alt="" />
        </div>
        <div>
          <p>Mã đơn: #{data.id}</p>
          <p>Mã tủ: #{data.lockerSlot.id}</p>
          <p className={styles.time}>{formatDateTime(data.start_time)}</p>
        </div>
        {variant === 'detail' && renderDetail()}
      </div>
      <div className={styles.actionContainer}>
        {data.order_code === 1 && (
          <Button
            color="danger"
            shape="round"
            size={variant == 'detail' ? 'middle' : 'small'}
            variant="solid"
          >
            Chưa nhận
          </Button>
        )}
        {data.order_code === 1 && (
          <Button
            color="blue"
            shape="round"
            size={variant == 'detail' ? 'middle' : 'small'}
            variant="solid"
          >
            Nhận ngay
          </Button>
        )}

        {data.order_code === 2 && (
          <Button
            color="green"
            shape="round"
            size={variant == 'detail' ? 'middle' : 'small'}
            variant="solid"
          >
            Đã nhận
          </Button>
        )}

        {(data.order_code === 0 || !data.order_code) && (
          <Button
            disabled={true}
            shape="round"
            size={variant == 'detail' ? 'middle' : 'small'}
            variant="solid"
          >
            Đang xử lý
          </Button>
        )}
        {data.order_code === 3 && (
          <Button
            disabled={true}
            shape="round"
            size={variant == 'detail' ? 'middle' : 'small'}
            variant="solid"
          >
            Hết hạn
          </Button>
        )}
      </div>
    </div>
  );
};
