import InfiniteScroll from 'react-infinite-scroll-component';

import { Spin } from 'antd';

import TransactionItem from '../common/transaction-item/TransactionItem';
import styles from './Transaction.module.scss';
import { useTransaction } from './useTransaction';

export const Transaction = () => {
  const { transactions, loadMore, isLoading, isHasMore, isLoadMore } = useTransaction();

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
        dataLength={transactions.length}
        next={loadMore}
        hasMore={isHasMore}
        loader={isLoadMore && renderLoading()}
        scrollableTarget="scrollableDiv"
        endMessage={<p style={{ textAlign: 'center' }}>Hết dữ liệu</p>}
        style={{ overflow: 'hidden' }}
      >
        {transactions.map((transaction, idx) => (
          <TransactionItem key={idx} data={transaction} />
        ))}
      </InfiniteScroll>
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 className={styles.title}>Lịch sử giao dịch</h1>

      <div id="scrollableDiv" className={styles.transactionContainer}>
        {isLoading ? renderLoading() : renderContent()}
      </div>
    </div>
  );
};
