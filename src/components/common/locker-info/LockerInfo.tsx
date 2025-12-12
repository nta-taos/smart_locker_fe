import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('locker');
  return (
    <div className={classes}>
      <div className={styles.header}>
        <h1>{type == 'detail' ? building : `${t('info.locker')} ${lockerId}`}</h1>
      </div>
      <div>
        <div className={styles.body}>
          {type == 'detail' && <BoxSvg />}
          {type == 'detail' && (
            <h2>
              {t('info.locker')}: {lockerId}
            </h2>
          )}
          <SlotSvg />
          <h2>
            {t('info.slot')}: {slotId}
          </h2>
          <LocationSvg />
          <h2>{address}</h2>
        </div>
      </div>
    </div>
  );
};
