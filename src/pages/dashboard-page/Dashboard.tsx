import React from 'react';

import {
  AppstoreOutlined,
  EnvironmentOutlined,
  EyeOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { Card, Col, Layout, Row, Space } from 'antd';

import MapView from '@/components/map/Map';
import RecentActivity from '@/components/recent-activity/RecentActivity';

import styles from './Dashboard.module.scss';

const DashboardPage: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh', padding: '1rem' }}>
      <div className={styles.dashboard}>
        <Row justify="center" gutter={[20, 20]}>
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
                <div>9+ Tủ khả dụng</div>
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
              <Space direction="vertical">
                <Space align="center" style={{ color: '#074CE7' }}>
                  <EyeOutlined style={{ fontSize: 24 }} />
                  <span>Ví của tôi</span>
                </Space>
                <div>100.000.000 VND</div>
              </Space>
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: 20 }} justify="center">
          <Col xs={24} sm={24} md={16}>
            <div className={styles.sectionTitle}>Bản đồ phân bố tủ</div>
            <Card className={styles.mapCard} bodyStyle={{ height: '100%', padding: 0 }}>
              <div className={styles.mapWrapper}>
                <MapView />
              </div>
            </Card>
          </Col>

          <Col xs={24} sm={24} md={8}>
            <div className={styles.sectionTitle}>Hoạt động gần đây</div>
            <Card style={{ borderRadius: '24px', height: '400px' }}>
              <RecentActivity />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: 24 }} justify="center">
          <Col xs={24} sm={24} md={16}>
            <div className={styles.sectionTitle}>Biểu đồ Zipbox</div>
            <Card style={{ height: 300 }}>
              <div style={{ height: '100%', background: '#eaeaea' }}>Map here</div>
            </Card>
          </Col>

          <Col xs={24} sm={24} md={8}>
            <div className={styles.sectionTitle}>Lịch sử giao dịch</div>
            <Card style={{ borderRadius: '24px', height: '400px' }}>
              <RecentActivity />
            </Card>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default DashboardPage;
