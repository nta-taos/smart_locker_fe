import React from 'react';
import { useTranslation } from 'react-i18next';

import { TransactionItemType } from '@/types/transaction.type';
import { formatCurrency } from '@/utils/format-currentcy';
import { formatDateTime } from '@/utils/format-datetime';

import WalletSvg from '../icon/WalletSvg';
import styles from './TransactionItem.module.scss';

interface TransactionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  data: TransactionItemType;
  className?: string;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ data, className = '', ...props }) => {
  const isCredit = data.type === 1;
  const variant = isCredit ? 'add' : 'minus';
  const classes = [styles.container, styles[variant], className].filter(Boolean).join(' ');
  const { t } = useTranslation('wallet');

  const amount = formatCurrency(data.amount);
  const datetime = formatDateTime(data.created_at);
  return (
    <div className={classes} {...props}>
      <div className={styles.left}>
        <WalletSvg />
        <div className={styles.content}>
          <h1>{isCredit ? t('transactions.deposit') : t('transactions.payment')}</h1>
          <p>{data.description}</p>
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles[variant]}>{isCredit ? `+ ${amount} VND` : `- ${amount} VND`}</h1>
        <p>{datetime}</p>
      </div>
    </div>
  );
};

export default TransactionItem;
