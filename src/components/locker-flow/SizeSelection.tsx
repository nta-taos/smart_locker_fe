import React from 'react';
import { FaBox } from 'react-icons/fa';

import { Card, Grid, Typography } from 'antd';

import { sizeOptions } from '@/constants/sizeOptions';

import styles from './LockerFlow.module.scss';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

interface SizeSelectionProps {
  selectedSize: number;
  onSizeChange: (sizeId: number) => void;
  availableSizesCount?: Record<number, number>;
}

export const SizeSelection: React.FC<SizeSelectionProps> = ({
  selectedSize,
  onSizeChange,
  availableSizesCount = {},
}) => {
  const screens = useBreakpoint();

  return (
    <Card
      title={
        <Title level={4} className={styles.sectionTitle}>
          <FaBox size={screens.sm ? 20 : 16} className={styles.sectionIcon} /> Chọn kích thước tủ
        </Title>
      }
      className={styles.antdCard}
    >
      <div className={styles.sizeOptionsContainer}>
        {sizeOptions.map((size) => {
          const count = availableSizesCount[size.id] || 0;
          const isAvailable = count > 0;
          const isSelected = selectedSize === size.id;

          return (
            <div
              key={size.id}
              className={`${styles.sizeOptionButton} ${
                isSelected ? styles.sizeOptionButtonSelected : ''
              } ${!isAvailable ? styles.sizeOptionButtonDisabled : ''}`}
              onClick={() => isAvailable && onSizeChange(size.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && isAvailable) {
                  onSizeChange(size.id);
                }
              }}
            >
              <div className={styles.sizeRadioContent}>
                <div className={styles.sizeRadioText}>
                  <Text strong className={styles.sizeTitle}>
                    Size {size.name}{' '}
                    <Text type={isAvailable ? 'secondary' : 'danger'} className={styles.sizeCount}>
                      ({count})
                    </Text>
                  </Text>
                  <span className={styles.dimensionTag}>{size.dimensions}</span>
                </div>
                <Text type="secondary" className={styles.sizeDescription}>
                  {size.description}
                </Text>
                <div className={styles.priceTag}>
                  <Text className={styles.priceAmount}>{size.priceText}</Text>
                  <Text type="secondary">/giờ</Text>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
