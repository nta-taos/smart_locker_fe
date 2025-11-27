import React from 'react';
import { FaWallet } from 'react-icons/fa';

import { Button, Card, Grid, Typography } from 'antd';

import styles from './LockerFlow.module.scss';

const { Text, Title } = Typography;
const { useBreakpoint } = Grid;

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface PaymentMethodProps {
  methods: PaymentMethod[];
  walletBalance: number;
  total: number;
  onTopUp: () => void;
  formatCurrency: (amount: number) => string;
}

const PaymentMethodCard: React.FC<PaymentMethodProps> = ({
  methods,
  walletBalance,
  total,
  onTopUp,
  formatCurrency,
}) => {
  const screens = useBreakpoint();

  return (
    <Card
      title={
        <Title level={4} className={styles.sectionTitle}>
          <FaWallet size={screens.sm ? 20 : 16} className={styles.sectionIconOrange} /> Phương thức
          thanh toán
        </Title>
      }
      className={styles.antdCard}
    >
      <div className={styles.paymentMethodContainer}>
        {methods.map((method) => {
          const hasEnoughBalance = walletBalance >= total;

          return (
            <div key={method.id} className={styles.walletCard}>
              <div className={styles.walletInfo}>
                <Text className={styles.walletIcon}>{method.icon}</Text>
                <div className={styles.walletDetails}>
                  <Text strong className={styles.walletName}>
                    {method.name}
                  </Text>
                  <div className={styles.walletBalance}>
                    <Text type="secondary" className={styles.walletBalanceLabel}>
                      Số dư:
                    </Text>
                    <Text
                      strong
                      className={`${styles.walletBalanceAmount} ${
                        hasEnoughBalance
                          ? styles['walletBalanceAmount--sufficient']
                          : styles['walletBalanceAmount--insufficient']
                      }`}
                    >
                      {formatCurrency(walletBalance)}
                    </Text>
                  </div>
                </div>
              </div>
              <Button onClick={onTopUp} size="middle">
                Nạp tiền
              </Button>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default PaymentMethodCard;
