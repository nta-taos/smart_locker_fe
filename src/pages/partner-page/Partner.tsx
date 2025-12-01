import React from 'react';

import { Button, Card, Col, Row, Tabs } from 'antd';

import { PartnerIcon2, PartnerIcon3 } from '@/components/common/icon/Partner';
import PartnerForm from '@/components/partner-form/PartnerForm';

import styles from './Partner.module.scss';

const partnersData = [
  {
    key: '1',
    label: (
      <span className={styles.tabLabel}>
        <PartnerIcon2 className={styles.tabIcon} />
        <span className={styles.tabText}>Đối tác vận chuyển</span>
      </span>
    ),
    description:
      'Cùng Zipbox kiến tạo hành trình giao nhận tối ưu, nơi tốc độ và độ tin cậy trở thành lợi thế cạnh tranh bền vững cho doanh nghiệp của bạn.',
    partners: [
      {
        logo: '/images/fulta.png',
        text: 'Một trong những đơn vị chuyển phát nhanh hàng đầu tại Việt Nam, nổi bật với mạng lưới giao hàng rộng khắp và tốc độ vượt trội. ZIPBOX tự hào hợp tác cùng FUTA Express để mang đến trải nghiệm giao nhận hàng hóa liền mạch và đáng tin cậy cho khách hàng.',
      },
      {
        logo: '/images/nhat_tin.jpg',
        text: 'Cung cấp các giải pháp logistics và chuyển phát nhanh chuyên nghiệp, tối ưu hóa cho cả doanh nghiệp và cá nhân. Sự kết hợp giữa Nhất Tín và ZIPBOX đảm bảo các bưu kiện của bạn được xử lý an toàn và giao nhận một cách tiện lợi nhất.',
      },
    ],
  },
  {
    key: '2',
    label: (
      <span className={styles.tabLabel}>
        <PartnerIcon3 className={styles.tabIcon} />
        <span className={styles.tabText}>Đối tác địa điểm</span>
      </span>
    ),
    description:
      'Hợp tác cùng Zipbox để biến không gian của bạn thành điểm giao nhận tiện lợi, gia tăng giá trị dịch vụ và nâng cao trải nghiệm cho cộng đồng xung quanh.',
    partners: [
      {
        logo: '/images/FPT.png',
        text: 'Địa chỉ: Đường Võ Quý Huân, Khu đô thị FPT City, Ngũ Hành Sơn, Đà Nẵng Là tổ hợp căn hộ hiện đại thuộc Khu đô thị FPT City. Tủ khóa thông minh ZIPBOX mang đến giải pháp nhận hàng 24/7 an toàn và chủ động cho cộng đồng cư dân công nghệ cao tại đây.',
      },
      {
        logo: '/images/bau_tram.jpg',
        text: 'Địa chỉ: Lô B4-1, Khu đô thị Bàu Tràm Lakeside, Liên Chiểu, Đà Nẵng Là khu căn hộ có không gian sống yên tĩnh bên hồ. Hệ thống ZIPBOX được lắp đặt để phục vụ nhu cầu nhận hàng linh hoạt, bảo mật cho các gia đình và cư dân.',
      },
      {
        logo: '/images/logo_monarchy.png',
        text: 'Địa chỉ: 535 Trần Hưng Đạo, Sơn Trà, Đà Nẵng The Monarchy là một trong những khu căn hộ phức hợp cao cấp ven sông Hàn. Tủ ZIPBOX tại Monarchy giúp nâng tầm trải nghiệm sống tiện nghi, đảm bảo các bưu kiện của cư dân luôn được bảo vệ an toàn.',
      },
      {
        logo: '/images/mobiphone.webp',
        text: 'Địa chỉ: 586 Nguyễn Hữu Thọ, Cẩm Lệ, Đà Nẵng Là trung tâm văn phòng và giao dịch quan trọng, tòa nhà Mobifone quy tụ lượng lớn nhân viên văn phòng. ZIPBOX cung cấp giải pháp nhận hàng cá nhân tiện lợi, giúp nhân viên chủ động nhận đồ mà không làm gián đoạn công việc.',
      },
      {
        logo: '/images/vinaconex.webp',
        text: 'Địa chỉ: 320 đường 2/9, Hải Châu, Đà Nẵng Tòa nhà Vinaconex là một trong những cao ốc văn phòng nổi bật của thành phố. Tủ ZIPBOX tại đây đảm bảo các nhân viên và công ty có thể nhận bưu kiện, tài liệu một cách nhanh chóng và an toàn mọi lúc.',
      },
    ],
  },
];

const BodyPage = () => (
  <div className={styles.partnersWrapper}>
    <div className={styles.hero}>
      <img src="/images/partner.webp" alt="Hero" className={styles.heroImg} />
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
