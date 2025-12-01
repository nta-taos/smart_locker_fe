import { useState } from 'react';

import { TabsProps } from 'antd';
import dayjs from 'dayjs';

import { OrderList } from '@/components/order-list/OrderList';

import styles from './Orders.module.scss';

export const useOrders = () => {
  const [codeFilter, setCodeFilter] = useState<string | undefined>(undefined);
  const today = dayjs().format('YYYY-MM-DD');
  const [dateRange, setDateRange] = useState<[string | undefined, string | undefined] | null>([
    today,
    today,
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
      label: 'Tất cả',
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
      label: 'Chưa nhận',
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
      label: 'Đã nhận',
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
