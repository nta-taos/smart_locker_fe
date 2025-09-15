import InfiniteScroll from 'react-infinite-scroll-component';

import { Spin } from 'antd';

import { OrderItem, OrderItemVariant } from '../common/order-item/OrderItem';
import styles from './OrderList.module.scss';
import { useOrderList } from './useOrderList';

interface OrderListProps {
  className?: string;
  variant: OrderItemVariant;
}

export const OrderList: React.FC<OrderListProps> = ({ className = '', variant = 'detail' }) => {
  const { orders, loadMore, isLoading, isLoadMore, isHasMore } = useOrderList();

  const classes = [styles.container, className].filter(Boolean).join(' ');

  const renderLoading = () => {
    return (
      <div className={styles.spinLoading}>
        <Spin />
      </div>
    );
  };

  const renderContent = () => {
    return (
      <InfiniteScroll
        dataLength={orders.length}
        next={loadMore}
        hasMore={isHasMore}
        loader={isLoadMore && renderLoading()}
        scrollableTarget="scrollableOrderDiv"
        endMessage={<p style={{ textAlign: 'center' }}>Hết dữ liệu</p>}
        style={{ overflow: 'hidden' }}
      >
        {orders.map((order, idx) => (
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
