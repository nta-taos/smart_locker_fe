import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaBox } from 'react-icons/fa';

import { Card, Col, Grid, Row, Typography } from 'antd';

import styles from './LockerFlow.module.scss';

const { Text, Title } = Typography;
const { useBreakpoint } = Grid;

interface SummaryItem {
  label: string;
  value: string;
}

interface OrderSummaryProps {
  items: SummaryItem[];
  total: string;
  icon?: React.ReactNode;
  title?: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  total,
  icon,
  title = 'Thông tin đơn hàng',
}) => {
  const screens = useBreakpoint();
  const { t } = useTranslation('common');
  const IconComponent = icon || (
    <FaBox size={screens.sm ? 20 : 16} className={styles.sectionIcon} />
  );

  return (
    <Card
      title={
        <Title level={4} className={styles.sectionTitle}>
          {IconComponent} {title || t('orderSummary.title')}
        </Title>
      }
      className={`${styles.antdCard} ${styles.summaryCard}`}
    >
      <div className={styles.summaryList}>
        {items.map((item, index) => (
          <Row key={index} className={styles.summaryRow}>
            <Col span={12}>
              <Text type="secondary">{item.label}:</Text>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Text strong>{item.value}</Text>
            </Col>
          </Row>
        ))}
      </div>
      <div className={styles.totalRowAntd}>
        <Row align="middle">
          <Col span={12}>
            <Text strong className={styles.totalLabel}>
              {t('orderSummary.total')}:
            </Text>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Text strong className={styles.totalAmount}>
              {total}
            </Text>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default OrderSummary;
