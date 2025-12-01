import React from 'react';

import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
  QrcodeOutlined,
} from '@ant-design/icons';
import { Card, Col, Row, Space } from 'antd';
import { Button } from 'antd';

import SupportIcon from '@/components/common/icon/Support';
import SupportForm from '@/components/support-form/SupportForm';

import styles from './Support.module.scss';

// Search Section
const SearchSection = () => (
  <section className={styles.searchSection}>
    <div className={styles.content}>
      <div className={styles.left}>
        <span className={styles.subTitle}>
          <SupportIcon className={styles.icon} />
          Trung tâm hỗ trợ Zipbox
        </span>
        <h1>Chúng tôi ở đây để hỗ trợ bạn</h1>
        <p>
          Tìm câu trả lời nhanh chóng cho mọi thắc mắc về dịch vụ vận chuyển và giao hàng của ZipBox
        </p>

        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Tìm kiếm câu hỏi, hướng dẫn, giải pháp..."
            className={styles.input}
          />

          <Button type="primary" size="large" className={styles.searchBox}>
            Tìm kiếm
          </Button>
        </div>

        <div className={styles.popular}>
          <span className={styles.label}>Tìm kiếm phổ biến:</span>
          <div className={styles.tags}>
            <button className={styles.tag}>Nạp tiền vào ví như thế nào ?</button>
            <button className={styles.tag}>Hướng dẫn sử dụng tủ</button>
            <button className={styles.tag}>Cách thuê tủ ?</button>
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <img src="/images/support.jpg" loading="lazy" alt="Support Search" />
      </div>
    </div>
  </section>
);

// Stats Section
const StatsSection = () => (
  <section className={styles.statsSection}>
    <Row justify="center" gutter={[12, 12]}>
      <Col xs={11} sm={12} md={12} lg={4}>
        <Card
          className={styles.statsCard}
          bodyStyle={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 0,
          }}
        >
          <Space direction="vertical" align="center">
            <Space align="center" style={{ color: '#074CE7' }}>
              <PhoneOutlined style={{ fontSize: 32 }} />
              <span>Hotline</span>
            </Space>
            <div>1900 1000</div>
          </Space>
        </Card>
      </Col>

      <Col xs={11} sm={12} md={12} lg={4}>
        <Card
          className={styles.statsCard}
          bodyStyle={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 0,
          }}
        >
          <Space direction="vertical" align="center">
            <Space align="center" style={{ color: '#074CE7' }}>
              <MailOutlined style={{ fontSize: 24 }} />
              <span>Email</span>
            </Space>
            <div style={{ width: '100%' }}>support@zipbox.vn</div>
          </Space>
        </Card>
      </Col>

      <Col xs={11} sm={12} md={12} lg={4}>
        <Card
          className={styles.statsCard}
          bodyStyle={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 0,
          }}
        >
          <Space direction="vertical" align="center">
            <Space align="center" style={{ color: '#074CE7' }}>
              <QrcodeOutlined style={{ fontSize: 24 }} />
              <span>Zipbox</span>
            </Space>
            <div>QR Code tại điểm nhận</div>
          </Space>
        </Card>
      </Col>

      <Col xs={11} sm={12} md={12} lg={4}>
        <Card
          className={styles.statsCard}
          bodyStyle={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 0,
          }}
        >
          <Space direction="vertical" align="center">
            <Space align="center" style={{ color: '#074CE7' }}>
              <EnvironmentOutlined style={{ fontSize: 24 }} />
              <span>Địa chỉ</span>
            </Space>
            <div> 55 Đông Hải 8, Ngũ Hành Sơn, Đà Nẵng</div>
          </Space>
        </Card>
      </Col>
    </Row>
  </section>
);

// Form Section
const FormSection = () => (
  <section className={styles.formSection}>
    <Row
      gutter={[32, 32]}
      align="middle"
      justify="center"
      style={{ marginLeft: 0, marginRight: 0 }}
    >
      <Col xs={24} md={12} className={styles.formImage}>
        <img src="/images/support2.png" alt="Support action" />
      </Col>
      <Col xs={24} md={12} className={styles.formBox}>
        <SupportForm />
      </Col>
    </Row>
  </section>
);

// Office Section
const OfficeSection = () => (
  <section className={styles.office}>
    <div className={styles.officeText}>
      <h2>Ghé thăm văn phòng của chúng tôi</h2>
      <p>Bạn cũng có thể đến trực tiếp văn phòng để được hỗ trợ tận tình nhất.</p>
      <ul>
        <EnvironmentOutlined style={{ color: '#074CE7', marginRight: '8px' }} /> Địa chỉ
        <li></li>
        <li> 55 Đông Hải 8, Ngũ Hành Sơn, Đà Nẵng</li>
        <ClockCircleOutlined style={{ color: '#074CE7', marginRight: '8px' }} /> Giờ làm việc
        <li></li>
        <li>T2 - T6: 8:00 - 17:00</li>
        <li>T7: 8:00 - 12:00</li>
      </ul>

      <Button type="primary" size="large">
        Xem bản đồ
      </Button>
    </div>
    <div className={styles.officeMap}>
      <img src="/images/support3.png" alt="Map" />
    </div>
  </section>
);

// Main
const SupportPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <SearchSection />
      <StatsSection />
      <FormSection />
      <OfficeSection />
    </div>
  );
};

export default SupportPage;
