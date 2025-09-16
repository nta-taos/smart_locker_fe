import React from 'react';

import { Button, Card, Col, Row, Tabs } from 'antd';

import { PartnerIcon1, PartnerIcon2, PartnerIcon3 } from '@/components/common/icon/Partner';
import PartnerForm from '@/components/partner-form/PartnerForm';

import styles from './Partner.module.scss';

const partnersData = [
  {
    key: '1',
    label: (
      <span className={styles.tabLabel}>
        <PartnerIcon1 className={styles.tabIcon} />
        <span className={styles.tabText}>Đối tác chiến lược</span>
      </span>
    ),
    description:
      'Đồng hành cùng Zipbox để kiến tạo cuộc sống thông minh, bứt phá trong kỷ nguyên số và mang lại giá trị bền vững cho doanh nghiệp của bạn.',
    partners: [
      {
        logo: '/images/sugarlogo.png',
        text: 'Đơn vị cung cấp giải pháp thành lập năm 2015 với hai trụ sở chính được đặt tại TP. HCM & Singapore. Suga là một doanh nghiệp hoạt động đa dạng trên nhiều lĩnh vực với quy mô hiện tại gần 200 nhân viên.',
      },
      {
        logo: '/images/sugarlogo.png',
        text: 'Đơn vị cung cấp giải pháp thành lập năm 2015 với hai trụ sở chính đặt tại TP. HCM & Singapore. Suga là một doanh nghiệp hoạt động đa dạng trên nhiều lĩnh vực với quy mô hiện tại gần 200 nhân viên.',
      },
      {
        logo: '/images/sugarlogo.png',
        text: 'Đơn vị cung cấp giải pháp thành lập năm 2015 với hai trụ sở chính đặt tại TP. HCM & Singapore. Suga là một doanh nghiệp hoạt động đa dạng trên nhiều lĩnh vực với quy mô hiện tại gần 200 nhân viên.',
      },
      {
        logo: '/images/sugarlogo.png',
        text: 'Đơn vị cung cấp giải pháp thành lập năm 2015 với hai trụ sở chính đặt tại TP. HCM & Singapore. Suga là một doanh nghiệp hoạt động đa dạng trên nhiều lĩnh vực với quy mô hiện tại gần 200 nhân viên.',
      },
    ],
  },
  {
    key: '2',
    label: (
      <span className={styles.tabLabel}>
        <PartnerIcon2 className={styles.tabIcon} />
        <span className={styles.tabText}>Đối tác chiến lược</span>
      </span>
    ),
    description:
      'Cùng Zipbox kiến tạo hành trình giao nhận tối ưu, nơi tốc độ và độ tin cậy trở thành lợi thế cạnh tranh bền vững cho doanh nghiệp của bạn.',
    partners: [
      {
        logo: '/images/sugarlogo.png',
        text: 'Đơn vị cung cấp giải pháp thành lập năm 2015 với hai trụ sở chính được đặt tại TP. HCM & Singapore. Suga là một doanh nghiệp hoạt động đa dạng trên nhiều lĩnh vực với quy mô hiện tại gần 200 nhân viên.',
      },
      {
        logo: '/images/sugarlogo.png',
        text: 'Đơn vị cung cấp giải pháp thành lập năm 2015 với hai trụ sở chính đặt tại TP. HCM & Singapore. Suga là một doanh nghiệp hoạt động đa dạng trên nhiều lĩnh vực với quy mô hiện tại gần 200 nhân viên.',
      },
      {
        logo: '/images/sugarlogo.png',
        text: 'Đơn vị cung cấp giải pháp thành lập năm 2015 với hai trụ sở chính đặt tại TP. HCM & Singapore. Suga là một doanh nghiệp hoạt động đa dạng trên nhiều lĩnh vực với quy mô hiện tại gần 200 nhân viên.',
      },
      {
        logo: '/images/sugarlogo.png',
        text: 'Đơn vị cung cấp giải pháp thành lập năm 2015 với hai trụ sở chính đặt tại TP. HCM & Singapore. Suga là một doanh nghiệp hoạt động đa dạng trên nhiều lĩnh vực với quy mô hiện tại gần 200 nhân viên.',
      },
    ],
  },
  {
    key: '3',
    label: (
      <span className={styles.tabLabel}>
        <PartnerIcon3 className={styles.tabIcon} />
        <span className={styles.tabText}>Đối tác chiến lược</span>
      </span>
    ),
    description:
      'Hợp tác cùng Zipbox để biến không gian của bạn thành điểm giao nhận tiện lợi, gia tăng giá trị dịch vụ và nâng cao trải nghiệm cho cộng đồng xung quanh.',
    partners: [
      {
        logo: '/images/sugarlogo.png',
        text: 'Đơn vị cung cấp giải pháp thành lập năm 2015 với hai trụ sở chính được đặt tại TP. HCM & Singapore. Suga là một doanh nghiệp hoạt động đa dạng trên nhiều lĩnh vực với quy mô hiện tại gần 200 nhân viên.',
      },
      {
        logo: '/images/sugarlogo.png',
        text: 'Đơn vị cung cấp giải pháp thành lập năm 2015 với hai trụ sở chính đặt tại TP. HCM & Singapore. Suga là một doanh nghiệp hoạt động đa dạng trên nhiều lĩnh vực với quy mô hiện tại gần 200 nhân viên.',
      },
      {
        logo: '/images/sugarlogo.png',
        text: 'Đơn vị cung cấp giải pháp thành lập năm 2015 với hai trụ sở chính đặt tại TP. HCM & Singapore. Suga là một doanh nghiệp hoạt động đa dạng trên nhiều lĩnh vực với quy mô hiện tại gần 200 nhân viên.',
      },
      {
        logo: '/images/sugarlogo.png',
        text: 'Đơn vị cung cấp giải pháp thành lập năm 2015 với hai trụ sở chính đặt tại TP. HCM & Singapore. Suga là một doanh nghiệp hoạt động đa dạng trên nhiều lĩnh vực với quy mô hiện tại gần 200 nhân viên.',
      },
    ],
  },
];

const BodyPage = () => (
  <div className={styles.partnersWrapper}>
    <div className={styles.hero}>
      <img src="./images/partner.png" alt="Hero" className={styles.heroImg} />
      <h2>Cùng hợp tác, cùng phát triển.</h2>
    </div>

    <Tabs
      defaultActiveKey="1"
      type="card"
      className={styles.heroTabs}
      items={partnersData.map((tab) => ({
        key: tab.key,
        label: tab.label,
        children: (
          <div className={styles.partnersSection}>
            <p className={styles.description}>{tab.description}</p>

            <Button type="primary" className={styles.partnerBtn}>
              Đối tác của chúng tôi
            </Button>

            <Row gutter={[24, 24]} style={{ margin: 0 }} className={styles.grid}>
              {tab.partners.map((p, i) => (
                <Col xs={24} sm={12} md={12} lg={12} key={i}>
                  <Card className={styles.partnerCard}>
                    <div className={styles.partnerContent}>
                      <img src={p.logo} className={styles.partnerLogo} />
                      <div className={styles.text}>
                        <p>{p.text}</p>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        ),
      }))}
    />
  </div>
);

const PartnersPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <BodyPage />
      <PartnerForm />
    </div>
  );
};

export default PartnersPage;
