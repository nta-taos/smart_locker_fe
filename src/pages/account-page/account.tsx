import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';

import {
  CameraOutlined,
  EyeOutlined,
  MailOutlined,
  PhoneOutlined,
  RightOutlined,
  SafetyOutlined,
  UserOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { Avatar, Card, Col, Divider, Row, Space, Typography, Upload } from 'antd';

import DepositModal from '@/components/deposit-modal/DepositModal';
import { authState } from '@/recoil/atom/authAtom';

import { Transaction } from '../../components/transaction/Transaction';
import styles from './account.module.scss';

const { Text } = Typography;

const AccountPage: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const auth = useRecoilValue(authState);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
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
      <div className={styles.backgroundWrapper}>
        <img
          src={'/images/background-account.webp'}
          alt="background"
          className={styles.backgroundImg}
        />
      </div>

      <div className={styles.avatarWrapper} style={{ position: 'relative', width: 250 }}>
        <div style={{ position: 'relative', width: 250 }}>
          <Avatar
            size={250}
            src={imageUrl || auth.user?.avatar}
            icon={!imageUrl && !auth.user?.avatar ? <UserOutlined /> : undefined}
            className={styles.avatar}
            style={{ cursor: 'pointer' }}
          />
          <Upload showUploadList={false} beforeUpload={() => false} onChange={handleChange}>
            <CameraOutlined className={styles.cameraIcon} />
          </Upload>
        </div>
      </div>

      <div className={styles.bodyAccount}>
        <div className={styles.cardsWrapper}>
          <Row align="middle" justify="space-between" className={styles.infoRow}>
            {/* Card trái */}
            {auth.user?.role === 0 ? (
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
                            {`${Number(auth.user?.wallet.balance).toLocaleString('vi-VN')} VND`}
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
                        onClick={() => setIsDepositModalOpen(true)}
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
                      Đã xác minh
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
                  {auth?.user?.name} <RightOutlined />
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
                  {auth?.user?.phone} <RightOutlined />
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
                  {auth?.user?.email} <RightOutlined />
                </p>
              </Col>
            </Row>
            <Divider style={{ margin: 0 }} />
          </Card>
          <div style={{ marginTop: 32 }}>
            <h2 className={styles.sectionTitle}>Lịch sử giao dịch</h2>
            <Card
              className={styles.detailCard}
              bodyStyle={{ padding: 0 }}
              style={{ overflow: 'hidden' }}
            >
              <Transaction />
            </Card>
          </div>
        </div>
      </div>
      <DepositModal isOpen={isDepositModalOpen} onClose={() => setIsDepositModalOpen(false)} />
    </div>
  );
};

export default AccountPage;
