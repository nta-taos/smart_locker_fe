import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TabsProps } from 'antd';

import { OrderList } from '@/components/order-list/OrderList';

import styles from './Orders.module.scss';

export const useOrders = () => {
  const { t } = useTranslation('orders');
  const [codeFilter, setCodeFilter] = useState<string | undefined>(undefined);
  const [dateRange, setDateRange] = useState<[string | undefined, string | undefined] | null>([
    undefined,
    undefined,
  ]);

  const setFilters = (filters: { code?: string; from?: string; to?: string }) => {
    setCodeFilter(filters.code);
    if (filters.from || filters.to) {
      setDateRange([filters.from, filters.to]);
    } else {
      setDateRange(null);
    }
  };

  const tabItems: TabsProps['items'] = [
    {
      key: '1',
      label: t('tabs.all'),
      children: (
        <OrderList
          className={styles.orderList}
          variant="detail"
          status="all"
          codeFilter={codeFilter}
          from={dateRange?.[0]}
          to={dateRange?.[1]}
        />
      ),
    },
    {
      key: '2',
      label: t('tabs.pending'),
      children: (
        <OrderList
          className={styles.orderList}
          variant="detail"
          status="pending"
          codeFilter={codeFilter}
          from={dateRange?.[0]}
          to={dateRange?.[1]}
        />
      ),
    },
    {
      key: '3',
      label: t('tabs.completed'),
      children: (
        <OrderList
          className={styles.orderList}
          variant="detail"
          status="received"
          codeFilter={codeFilter}
          from={dateRange?.[0]}
          to={dateRange?.[1]}
        />
      ),
    },
  ];

  return {
    codeFilter,
    dateRange,
    setFilters,
    tabItems,
  };
};
