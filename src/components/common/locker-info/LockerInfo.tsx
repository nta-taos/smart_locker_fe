import { joinClass } from '@/utils/join-class';

import BoxSvg from '../icon/BoxSvg';
import SlotSvg from '../icon/DrawerSvg';
import LocationSvg from '../icon/LocationSvg';
import styles from './LockerInfo.module.scss';

interface LockerInfoProps {
  className?: string;
  building: string;
  lockerId: string;
  slotId: string;
  address: string;
  type: 'shorten' | 'detail';
}

export const LockerInfo: React.FC<LockerInfoProps> = ({
  className = '',
  building,
  lockerId,
  slotId,
  address,
  type,
}) => {
  const classes = joinClass([className, styles.container, styles[type]]);
  return (
    <div className={classes}>
      <div className={styles.header}>
        <h1>{type == 'detail' ? building : `Tủ ${lockerId}`}</h1>
      </div>
      <div>
        <div className={styles.body}>
          {type == 'detail' && <BoxSvg />}
          {type == 'detail' && <h2>Tủ: {lockerId}</h2>}
          <SlotSvg />
          <h2>Ngăn tủ: {slotId}</h2>
          <LocationSvg />
          <h2>{address}</h2>
        </div>
      </div>
    </div>
  );
};
