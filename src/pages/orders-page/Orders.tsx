import { FilterOutlined, SearchOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';

import styles from './Orders.module.scss';
import { useOrders } from './useOrders';

export const OrdersPage = () => {
  const { search, setSearch, tabItems } = useOrders();

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.searchField}>
          <SearchOutlined />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm đơn hàng"
          />
          <FilterOutlined />
        </div>
        <div className={styles.tabContainer}>
          <Tabs centered defaultActiveKey="1" items={tabItems} />
        </div>
      </div>
    </div>
  );
};
