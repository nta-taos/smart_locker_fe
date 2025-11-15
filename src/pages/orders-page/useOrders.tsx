import { useState } from 'react';

import { TabsProps } from 'antd';

import { OrderList } from '@/components/order-list/OrderList';

import styles from './Orders.module.scss';

export const useOrders = () => {
  const [search, setSearch] = useState('');
  const tabItems: TabsProps['items'] = [
    {
      key: '1',
      label: 'Tất cả',
      children: (
        <OrderList className={styles.orderList} variant="detail" status="all" search={search} />
      ),
    },
    {
      key: '2',
      label: 'Chưa nhận',
      children: (
        <OrderList className={styles.orderList} variant="detail" status="pending" search={search} />
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
          search={search}
        />
      ),
    },
  ];

  return {
    search,
    setSearch,
    tabItems,
  };
};
