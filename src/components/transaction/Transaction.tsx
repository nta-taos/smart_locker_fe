import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';

import { Empty, Spin } from 'antd';

import TransactionItem from '../common/transaction-item/TransactionItem';
import styles from './Transaction.module.scss';
import { useTransaction } from './useTransaction';

interface TransactionProps {
  className?: string;
}

export const Transaction: React.FC<TransactionProps> = ({ className = '' }) => {
  const { transactions, loadMore, isLoading, isHasMore, isLoadMore } = useTransaction();
  const { t } = useTranslation('wallet');

  const classes = [styles.container, className].filter(Boolean).join(' ');

  const renderLoading = () => {
    return (
      <div className={styles.spinLoading}>
        <Spin />
      </div>
    );
  };

  const renderContent = () => {
    if (transactions.length === 0) {
      return (
        <div className={styles.emptyContainer}>
          <Empty description={t('transactions.empty')} />
        </div>
      );
    }

    return (
      <InfiniteScroll
        dataLength={transactions.length}
        next={loadMore}
        hasMore={isHasMore}
        loader={isLoadMore && renderLoading()}
        scrollableTarget="scrollableDiv"
        endMessage={<p style={{ textAlign: 'center' }}>{t('transactions.endMessage')}</p>}
        style={{ overflow: 'hidden' }}
      >
        {transactions.map((transaction, idx) => (
          <TransactionItem key={idx} data={transaction} />
        ))}
      </InfiniteScroll>
    );
  };

  return (
    <div id="scrollableDiv" className={classes}>
      {isLoading ? renderLoading() : renderContent()}
    </div>
  );
};
