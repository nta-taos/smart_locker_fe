import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

import { formatCurrency } from '@/utils/format-currentcy';

import CartSvg from '../common/icon/CartSvg';
import KeyBoxSvg from '../common/icon/KeyBoxSvg';
import LocationSvg from '../common/icon/LocationSvg';
import WalletSvg from '../common/icon/WalletSvg';
import styles from './TagList.module.scss';
import { useTagList } from './useTagList';

interface TagProps {
  className?: string;
}

export const TagList: React.FC<TagProps> = ({ className = '' }) => {
  const { tags, isShow, handleShow } = useTagList();

  const classes = [styles.container, className].filter(Boolean).join(' ');
  return (
    <div className={classes}>
      <div className={styles.itemContainer}>
        <div>
          <KeyBoxSvg />
          <h1 className={styles.title}>ZipBox của tôi</h1>
        </div>
        <div className={styles.bottom}>
          <h1>{tags?.my}</h1>
          <p>Đang sở hữu</p>
        </div>
      </div>
      <div className={styles.itemContainer}>
        <div>
          <LocationSvg />
          <h1 className={styles.title}>ZipBox gần đây</h1>
        </div>
        <div className={styles.bottom}>
          <h1>{tags?.recent}+</h1>
          <p>Tủ khả dụng</p>
        </div>
      </div>
      <div className={styles.itemContainer}>
        <div>
          <CartSvg />
          <h1 className={styles.title}>Đơn hàng tuần này</h1>
        </div>
        <div className={styles.bottom}>
          <h1>{tags?.week}+</h1>
          <p>Đơn hàng mới nhất</p>
        </div>
      </div>
      <div className={styles.itemContainer}>
        <div>
          <WalletSvg />
          <h1 className={styles.title}>Ví của tôi</h1>
        </div>
        <div className={styles.bottom}>
          <h1>VND</h1>
          <p>{isShow ? formatCurrency(tags?.wallet || 0) : '**********'}</p>
          <button onClick={handleShow}>
            {isShow ? <EyeOutlined /> : <EyeInvisibleOutlined />}
          </button>
        </div>
      </div>
    </div>
  );
};
