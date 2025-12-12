import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaLock } from 'react-icons/fa';
import { useRecoilValue } from 'recoil';

import { Card, Col, Grid, Row, Typography } from 'antd';

import { sizeOptions } from '@/constants/sizeOptions';
import { lockerAtom } from '@/recoil/atom/locker.atom';
import { slotAtom } from '@/recoil/atom/slot.atom';

import styles from './LockerFlow.module.scss';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

interface SelectedLocker {
  size: number;
  lockerId: number;
  code: string;
}

interface LockerSelectionProps {
  selectedSize: number;
  selectedLocker: SelectedLocker | null;
  onLockerSelect: (locker: SelectedLocker) => void;
  availableSizesCount?: Record<number, number>;
  lockerIds: number[];
}

const LockerGroup = ({
  lockerId,
  selectedSize,
  selectedLocker,
  onLockerSelect,
}: {
  lockerId: number;
  selectedSize: number;
  selectedLocker: SelectedLocker | null;
  onLockerSelect: (locker: SelectedLocker) => void;
}) => {
  const locker = useRecoilValue(lockerAtom(lockerId));
  const { t } = useTranslation('locker');

  if (!locker || !locker.slots || locker.slots.length === 0) return null;

  // Render all slots and let React filter out the nulls
  // Only the first matching slot will be shown
  const slotElements = locker.slots.map((slotId: number) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const slot = useRecoilValue(slotAtom(slotId));

    if (!slot || slot.size !== selectedSize || slot.status !== 0) {
      return null;
    }

    const slotCode = `${locker.code}`;
    const isSelected = selectedLocker?.lockerId === lockerId && selectedLocker?.size === slot.size;

    return (
      <Col xs={12} sm={6} md={4} lg={4} key={slotId}>
        <div
          className={`${styles.lockerBoxContainer} ${isSelected ? styles.lockerBoxContainerActive : ''}`}
          onClick={() => onLockerSelect({ size: slot.size, lockerId: lockerId, code: slotCode })}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onLockerSelect({ size: slot.size, lockerId: lockerId, code: slotCode });
            }
          }}
        >
          <div
            className={`${styles.lockerBox} ${isSelected ? styles.lockerBoxSelected : styles.lockerBoxDefault}`}
          >
            <div className={styles.lockerContent}>
              <div className={styles.lockerIconWrapper}>
                <FaLock className={styles.lockerBoxIcon} />
              </div>

              <Text className={styles.lockerId}>{slotCode}</Text>

              {locker.floor && (
                <Text className={styles.lockerFloor}>
                  {t('rental.floor')} {locker.floor}
                </Text>
              )}

              {isSelected && (
                <div className={styles.selectedBadge}>
                  <span className={styles.checkmark}>✓</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Col>
    );
  });

  // Only render the first non-null element
  const firstSlot = slotElements.find((el) => el !== null);
  return firstSlot || null;
};

export const LockerSelection: React.FC<LockerSelectionProps> = ({
  selectedSize,
  selectedLocker,
  onLockerSelect,
  availableSizesCount = {},
  lockerIds,
}) => {
  const screens = useBreakpoint();
  const count = availableSizesCount[selectedSize] || 0;
  const { t } = useTranslation('locker');

  return (
    <Card
      title={
        <div className={styles.sectionHeader}>
          <Title level={4} className={styles.sectionTitle}>
            <FaLock size={screens.sm ? 20 : 16} className={styles.sectionIcon} />{' '}
            {t('rental.selectLocker')}
          </Title>
          <span className={styles.availableLockerTag}>
            {count} {t('rental.slotsAvailable')}
          </span>
        </div>
      }
      className={styles.antdCard}
    >
      {count > 0 ? (
        <Row gutter={[12, 12]} className={styles.lockerGrid}>
          {lockerIds.map((lockerId: number) => (
            <LockerGroup
              key={lockerId}
              lockerId={lockerId}
              selectedSize={selectedSize}
              selectedLocker={selectedLocker}
              onLockerSelect={onLockerSelect}
            />
          ))}
        </Row>
      ) : (
        <div className={styles.noLocker}>
          <FaLock size={48} className={styles.noLockerIcon} />
          <Text type="secondary" className={styles.noLockerText}>
            {t('rental.noLockerAvailable', {
              size: sizeOptions.find((s) => s.id === selectedSize)?.nameKey
                ? t(sizeOptions.find((s) => s.id === selectedSize)!.nameKey)
                : '',
            })}
          </Text>
          <Text type="secondary" className={styles.noLockerSubText}>
            {t('rental.selectDifferentSize')}
          </Text>
        </div>
      )}
    </Card>
  );
};
