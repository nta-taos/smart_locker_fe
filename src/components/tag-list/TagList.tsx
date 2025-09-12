import { EyeFilled, EyeInvisibleFilled, StepBackwardOutlined } from '@ant-design/icons';

import { formatCurrency } from '@/utils/format-currentcy';

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
          <StepBackwardOutlined />
          <h1 className={styles.title}>ZipBox Của tôi</h1>
        </div>
        <div className={styles.bottom}>
          <h1>{tags?.my}</h1>
          <p>Đang sở hữu</p>
        </div>
      </div>
      <div className={styles.itemContainer}>
        <div>
          <StepBackwardOutlined />
          <h1 className={styles.title}>ZipBox gần đây</h1>
        </div>
        <div className={styles.bottom}>
          <h1>{tags?.recent}</h1>
          <p>Đang sở hữu</p>
        </div>
      </div>
      <div className={styles.itemContainer}>
        <div>
          <StepBackwardOutlined />
          <h1 className={styles.title}>Đơn hàng tuần này</h1>
        </div>
        <div className={styles.bottom}>
          <h1>{tags?.week}</h1>
          <p>Đang sở hữu</p>
        </div>
      </div>
      <div className={styles.itemContainer}>
        <div>
          <StepBackwardOutlined />
          <h1 className={styles.title}>Ví của tôi</h1>
        </div>
        <div className={styles.bottom}>
          <h1>VND</h1>
          <p>{isShow ? formatCurrency(tags?.wallet || 0) : '**********'}</p>
          <button onClick={handleShow}>{isShow ? <EyeFilled /> : <EyeInvisibleFilled />}</button>
        </div>
      </div>
    </div>
  );
};
