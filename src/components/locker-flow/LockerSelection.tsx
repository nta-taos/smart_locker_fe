import React from 'react';
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

const SlotItem = ({
  slotId,
  lockerCode,
  lockerFloor,
  lockerId,
  selectedSize,
  selectedLocker,
  onLockerSelect,
}: {
  slotId: number;
  lockerId: number;
  lockerCode: string;
  lockerFloor: string | null;
  selectedSize: number;
  selectedLocker: SelectedLocker | null;
  onLockerSelect: (locker: SelectedLocker) => void;
}) => {
  const slot = useRecoilValue(slotAtom(slotId));
  if (!slot) return null;
  if (slot.size !== selectedSize || slot.status !== 0) {
    return null;
  }

  const slotCode = `${lockerCode}-${slotId}`;
  const isSelected = selectedLocker?.lockerId === lockerId && selectedLocker?.size === slot.size;

  return (
    <Col xs={8} sm={6} md={4} lg={3} key={slotId}>
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

            {lockerFloor && <Text className={styles.lockerFloor}>F{lockerFloor}</Text>}

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
};

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
  if (!locker || !locker.slots) return null;

  return (
    <>
      {locker.slots.map((slotId: number) => (
        <SlotItem
          key={`${lockerId}-${slotId}`}
          slotId={slotId}
          lockerId={lockerId}
          lockerCode={locker.code}
          lockerFloor={locker.floor !== null ? String(locker.floor) : null}
          selectedSize={selectedSize}
          selectedLocker={selectedLocker}
          onLockerSelect={onLockerSelect}
        />
      ))}
    </>
  );
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

  return (
    <Card
      title={
        <div className={styles.sectionHeader}>
          <Title level={4} className={styles.sectionTitle}>
            <FaLock size={screens.sm ? 20 : 16} className={styles.sectionIcon} /> Chọn tủ cụ thể
          </Title>
          <span className={styles.availableLockerTag}>{count} tủ khả dụng</span>
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
            Không có tủ size {sizeOptions.find((s) => s.id === selectedSize)?.name} khả dụng
          </Text>
          <Text type="secondary" className={styles.noLockerSubText}>
            Vui lòng chọn size khác
          </Text>
        </div>
      )}
    </Card>
  );
};
