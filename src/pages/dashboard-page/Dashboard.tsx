import React from 'react';

import {
  AppstoreOutlined,
  EnvironmentOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  ShoppingCartOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { Card, Col, Layout, Row, Space } from 'antd';

import { Chart } from '@/components/chart/Chart';
import MapView from '@/components/map/Map';
import { OrderList } from '@/components/order-list/OrderList';
import { Transaction } from '@/components/transaction/Transaction';

import styles from './Dashboard.module.scss';
import { useDashboard } from './useDashboard';

const DashboardPage: React.FC = () => {
  const { auth, isBalanceVisible, toggleBalanceVisibility, userRole } = useDashboard();
  return (
    <Layout className={styles.dashboard}>
      <Row justify="center" gutter={[20, 20]} style={{ paddingTop: '1rem' }}>
        <Col xs={12} sm={12} md={12} lg={6}>
          <Card className={styles.statsCard}>
            <Space direction="vertical">
              <Space align="center" style={{ color: '#074CE7' }}>
                <AppstoreOutlined style={{ fontSize: 24 }} />
                <span>Zipbox của tôi</span>
              </Space>
              <div>2 Đang sở hữu</div>
            </Space>
          </Card>
        </Col>

        <Col xs={12} sm={12} md={12} lg={6}>
          <Card className={styles.statsCard}>
            <Space direction="vertical">
              <Space align="center" style={{ color: '#074CE7' }}>
                <EnvironmentOutlined style={{ fontSize: 24 }} />
                <Space>Zipbox gần đây</Space>
              </Space>
              <div>9+ Tủ </div>
            </Space>
          </Card>
        </Col>

        <Col xs={12} sm={12} md={12} lg={6}>
          <Card className={styles.statsCard}>
            <Space direction="vertical">
              <Space align="center" style={{ color: '#074CE7' }}>
                <ShoppingCartOutlined style={{ fontSize: 24 }} />
                <span>Đơn hàng</span>
              </Space>
              <div>9+ Đơn hàng</div>
            </Space>
          </Card>
        </Col>

        <Col xs={12} sm={12} md={12} lg={6}>
          <Card className={styles.statsCard}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Space align="center" style={{ color: '#074CE7' }}>
                <WalletOutlined style={{ fontSize: 24 }} />
                <span>Ví của tôi</span>
              </Space>
              <div
                onClick={toggleBalanceVisibility}
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                {isBalanceVisible ? (
                  <text style={{ color: '#52c41a' }}>{`${auth.user?.wallet.balance} VND`}</text>
                ) : (
                  '********'
                )}{' '}
                {isBalanceVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 20 }} justify="center">
        <Col xs={24} sm={24} md={16}>
          <div className={styles.sectionTitle}>Bản đồ phân bố tủ</div>
          <Card className={styles.mapCard} styles={{ body: { height: '100%', padding: 0 } }}>
            <div className={styles.mapWrapper}>
              <MapView />
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={24} md={8}>
          <div className={styles.sectionTitle}>Hoạt động gần đây</div>
          <Card
            style={{ borderRadius: '24px', height: '60vh' }}
            styles={{ body: { height: '100%' } }}
          >
            <OrderList variant="shorten" />
          </Card>
        </Col>
      </Row>

      {userRole === 0 && (
        <Row gutter={[16, 16]} style={{ marginTop: 24 }} justify="center">
          <Col xs={24} sm={24} md={16}>
            <div className={styles.sectionTitle}>Biểu đồ Zipbox</div>
            <Card
              style={{ borderRadius: '24px', height: 300 }}
              styles={{ body: { height: '100%', padding: '1rem 1rem 0 0' } }}
            >
              <Chart />
            </Card>
          </Col>

          <Col xs={24} sm={24} md={8}>
            <div className={styles.sectionTitle}>Lịch sử giao dịch</div>
            <Card
              style={{ borderRadius: '24px', height: '300px' }}
              styles={{ body: { height: '100%' } }}
            >
              <Transaction />
            </Card>
          </Col>
        </Row>
      )}
    </Layout>
  );
};

export default DashboardPage;
