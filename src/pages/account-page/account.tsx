import React, { useState } from 'react';

import {
  CameraOutlined,
  EnvironmentOutlined,
  EyeOutlined,
  MailOutlined,
  PhoneOutlined,
  RightOutlined,
  SafetyOutlined,
  UserOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { Avatar, Card, Col, Divider, Row, Space, Typography, Upload } from 'antd';

import { Transaction } from '../../components/transaction/Transaction';
import styles from './account.module.scss';

const { Text } = Typography;
const userInfo = {
  name: 'Lê Đình Quốc',
  phone: '+840866047652',
  email: '2zipquoc@gmail.com',
  address: '36/6 Mẹ Suốt, Q.Liên Chiểu, TP.Đà Nẵng',
  balance: 100000000,
  verified: false,
  type: 'Khachs hang',
  avatar: '/images/avatar.png',
  background: '/images/backgroundAccount.png',
};
const AccountPage: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const isShipper = userInfo.type === 'Shipper';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (info: any) => {
    const file = info.file.originFileObj;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className={styles.main}>
      {/* <DashboardHeader /> */}
      {/* Background */}
      <div className={styles.backgroundWrapper}>
        <img src={userInfo.background} alt="background" className={styles.backgroundImg} />
      </div>

      {/* Avatar chính giữa */}
      <div className={styles.avatarWrapper} style={{ position: 'relative', width: 250 }}>
        <div style={{ position: 'relative', width: 250 }}>
          <Avatar
            size={250}
            src={imageUrl || userInfo.avatar}
            className={styles.avatar}
            style={{ cursor: 'pointer' }}
          />
          <Upload showUploadList={false} beforeUpload={() => false} onChange={handleChange}>
            <CameraOutlined className={styles.cameraIcon} />
          </Upload>
        </div>
      </div>

      {/* 2 card cân đối */}
      <div className={styles.bodyAccount}>
        <div className={styles.cardsWrapper}>
          <Row align="middle" justify="space-between" className={styles.infoRow}>
            {/* Card trái */}
            {!isShipper ? (
              <Col xs={24} sm={24} md={12} lg={12} style={{ display: 'flex' }}>
                <Card
                  className={styles.infoCard}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'stretch',
                    height: '100%',
                  }}
                >
                  <Row align="middle" justify="space-between">
                    <Col>
                      <Space direction="vertical" size={8} align="start">
                        <Text strong style={{ fontSize: 20, color: '#002B79' }}>
                          Tổng số dư (VND)
                        </Text>
                        <Space>
                          <Text style={{ fontSize: 16, fontWeight: 600, color: '#00A86B' }}>
                            100.000.000 VND
                          </Text>
                          <EyeOutlined style={{ fontSize: 24, color: '#002B79', paddingLeft: 8 }} />
                        </Space>
                      </Space>
                    </Col>
                    <Col>
                      <Divider
                        type="vertical"
                        style={{ height: 60, alignSelf: 'center', backgroundColor: '#e0e0e0' }}
                      />
                    </Col>
                    <Col>
                      <Space
                        direction="vertical"
                        size={8}
                        align="center"
                        style={{ cursor: 'pointer', fontWeight: 600 }}
                      >
                        <WalletOutlined style={{ fontSize: 32, color: '#002B79' }} />

                        <Text strong style={{ fontSize: 16, color: '#00A86B' }}>
                          Nạp tiền
                        </Text>
                      </Space>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ) : (
              <Col xs={24} sm={24} md={12} lg={12} />
            )}

            {/* Card phải */}
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={12}
              style={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <Card
                className={styles.infoCard}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'stretch',
                  height: '100%',
                }}
              >
                <Space style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <Space direction="vertical" size={8} align="start">
                    <Text strong style={{ fontSize: 16, color: '#002B79' }}>
                      <SafetyOutlined style={{ fontSize: 24, color: '#002B79' }} /> Trạng thái tài
                      khoản
                    </Text>
                    <Text strong style={{ fontSize: 16, color: '#002B79' }}>
                      <UserOutlined style={{ fontSize: 24, color: '#002B79' }} /> Loại người dùng
                    </Text>
                  </Space>
                  <Space direction="vertical" size={8} align="end">
                    <Text className={styles.cardValue}>
                      Chưa xác minh
                      <RightOutlined />
                    </Text>
                    <Text className={styles.cardValue}>
                      Khách hàng
                      <RightOutlined />{' '}
                    </Text>
                  </Space>
                </Space>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Thông tin cá nhân */}
        <div className={styles.infoWrapper}>
          <h2 className={styles.sectionTitle}>Thông tin cá nhân</h2>
          <Card className={styles.detailCard} bodyStyle={{ padding: '0 24px' }}>
            {/* Tên người dùng */}
            <Row justify="space-between" align="middle">
              <Col>
                <h3 className={styles.cardLabel}>
                  <UserOutlined style={{ marginRight: 8, fontSize: 24 }} /> Tên người dùng
                </h3>
              </Col>
              <Col>
                <p className={styles.cardValue}>
                  Lê Đình Quốc <RightOutlined />
                </p>
              </Col>
            </Row>
            <Divider style={{ margin: 0 }} />

            {/* Số điện thoại */}
            <Row justify="space-between" align="middle">
              <Col>
                <h3 className={styles.cardLabel}>
                  <PhoneOutlined style={{ marginRight: 8, fontSize: 24 }} /> Số điện thoại
                </h3>
              </Col>
              <Col>
                <p className={styles.cardValue}>
                  0866047651 <RightOutlined />
                </p>
              </Col>
            </Row>
            <Divider style={{ margin: 0 }} />

            {/* Email */}
            <Row justify="space-between" align="middle">
              <Col>
                <h3 className={styles.cardLabel}>
                  <MailOutlined style={{ marginRight: 8, fontSize: 24 }} /> Email
                </h3>
              </Col>
              <Col>
                <p className={styles.cardValue}>
                  lequoc@gmail.com <RightOutlined />
                </p>
              </Col>
            </Row>
            <Divider style={{ margin: 0 }} />

            {/* Địa chỉ */}
            <Row
              justify="space-between"
              align="middle"
              style={{ display: 'flex', flexWrap: 'nowrap' }}
            >
              <Col style={{ minWidth: '30%' }}>
                <h3 className={styles.cardLabel}>
                  <EnvironmentOutlined style={{ marginRight: 8, fontSize: 24 }} /> Địa chỉ
                </h3>
              </Col>
              <Col style={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
                <span className={styles.cardValue}>36/6 Mẹ suốt, Q.Liên Chiểu, TP.Đà Nẵng</span>
                <RightOutlined />
              </Col>
            </Row>
          </Card>
          {!isShipper && <Transaction />}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
