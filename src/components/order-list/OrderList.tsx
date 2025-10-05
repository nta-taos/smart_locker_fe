import InfiniteScroll from 'react-infinite-scroll-component';

import { Spin } from 'antd';

import { OrderItem, OrderItemVariant } from '../common/order-item/OrderItem';
import styles from './OrderList.module.scss';
import { useOrderList } from './useOrderList';

interface OrderListProps {
  className?: string;
  variant: OrderItemVariant;
  limit?: number;
  status?: 'pending' | 'received' | 'all';
  search?: string;
}

export const OrderList: React.FC<OrderListProps> = ({
  className = '',
  variant = 'detail',
  limit = 5,
  status = 'all',
  search = '',
}) => {
  const { orderAll, orderPending, orderReceived, loadMore, isLoading, isLoadMore } = useOrderList(
    limit,
    status,
    search,
  );

  const classes = [styles.container, className].filter(Boolean).join(' ');

  const renderLoading = () => {
    return (
      <div className={styles.spinLoading}>
        <Spin />
      </div>
    );
  };

  const renderContent = () => {
    const data = status == 'all' ? orderAll : status == 'pending' ? orderPending : orderReceived;
    return (
      <InfiniteScroll
        dataLength={data.orders.length}
        next={loadMore}
        hasMore={data.page < data.totalPages}
        loader={isLoadMore && renderLoading()}
        scrollableTarget="scrollableOrderDiv"
        endMessage={<p style={{ textAlign: 'center' }}>Hết dữ liệu</p>}
        style={{ overflow: 'hidden' }}
      >
        {data.orders.map((order, idx) => (
          <OrderItem key={idx} variant={variant} data={order} />
        ))}
      </InfiniteScroll>
    );
  };

  return (
    <div id="scrollableOrderDiv" className={classes}>
      {isLoading ? renderLoading() : renderContent()}
    </div>
  );
};
