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
  const variant = data.type == 1 ? 'add' : 'minus';
  const classes = [styles.container, styles[variant], className].filter(Boolean).join(' ');

  const amount = formatCurrency(data.amount);
  const datetime = formatDateTime(data.created_at);
  return (
    <div className={classes} {...props}>
      <div className={styles.left}>
        <div>
          <WalletSvg />
        </div>
        <div>
          <h1>{variant == 'add' ? 'Nạp tiền vào ví' : 'Thanh toán'}</h1>
          <p>{data.description}</p>
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={variant}>{`${variant == 'add' ? '+ ' : '- '} ${amount} VND`}</h1>
        <p>{datetime}</p>
      </div>
    </div>
  );
};

export default TransactionItem;
