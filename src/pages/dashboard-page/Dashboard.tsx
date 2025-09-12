import React from 'react';

import { Card } from 'antd';

import { Chart } from '@/components/chart/Chart';
import MapView from '@/components/map/Map';
import { OrderList } from '@/components/order-list/OrderList';
import { TagList } from '@/components/tag-list/TagList';
import { Transaction } from '@/components/transaction/Transaction';

import styles from './Dashboard.module.scss';

const DashboardPage: React.FC = () => {
  return (
    <div className={styles.dashboard}>
      <div>
        <TagList />
      </div>

      <div className={styles.sectionSecond}>
        <div>
          <h1 className={styles.title}>Bản đồ phân bố tủ</h1>
          <Card className={styles.mapCard} bodyStyle={{ height: '100%', padding: 0 }}>
            <div className={styles.mapWrapper}>
              <MapView />
            </div>
          </Card>
        </div>
        <div>
          <h1 className={styles.title}>Hoạt động gần đây</h1>
          <Card className={styles.card}>
            <OrderList variant="shorten" className={styles.itemHeight} />
          </Card>
        </div>
        <div>
          <h1 className={styles.title}>Biểu đồ Zipbox</h1>
          <Card className={styles.card}>
            <Chart className={styles.itemHeight} />
          </Card>
        </div>
        <div>
          <h1 className={styles.title}>Lịch sử giao dịch</h1>
          <Card className={styles.card}>
            <Transaction className={styles.itemHeight} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
