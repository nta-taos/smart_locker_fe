import React from 'react';

import { Button } from 'antd';

import styles from './About.module.scss';
import useAbout from './useAbout';

const About: React.FC = () => {
  const { images, locationCount } = useAbout();
  return (
    <section className={styles.aboutSection}>
      <div className={styles.info}>
        {/* TIÊU ĐỀ CHUNG */}
        <div className={styles.header}>
          <span className={styles.subtitle}>MỘT CHÚT</span>
          <h2 className={styles.title}>VỀ CHÚNG TÔI</h2>
        </div>

        {/* KHỐI VISION */}
        <div className={styles.vmContainer}>
          <h3 className={styles.vmTitleVision}>VISION</h3>
          <div className={styles.vmContent}>
            <p>
              “Trở thành <strong>hệ thống tủ thông minh hàng đầu Việt Nam và khu vực</strong>, tối
              ưu hoá hành trình giao nhận và lưu trữ trong
              <strong> kỷ nguyên đô thị thông minh</strong>.”
            </p>
          </div>
        </div>

        {/* KHỐI MISSION */}
        <div className={styles.vmContainer}>
          <h3 className={styles.vmTitleMission}>MISSION</h3>
          <div className={styles.vmContent}>
            <p>
              “Mang đến{' '}
              <strong>giải pháp giao nhận và lưu trữ an toàn, tiện lợi và linh hoạt 24/7</strong>,
              giúp tiết kiệm thời gian, chi phí, đồng thời thúc đẩy
              <strong> phát triển logistics bền vững</strong>.”
            </p>
          </div>
        </div>

        <div className={styles.btn}>
          <Button className={styles.discoverButton} type="primary" size="large">
            Khám phá ngay
          </Button>
        </div>
      </div>
      <div className={styles.imagesGrid}>
        <img src={images[0]} alt="about1" className={styles.imgTop} />
        <div className={styles.badge}>
          <h1 className={styles.badgeNumber}>{locationCount}+</h1>
          <span className={styles.badgeText}>Địa điểm</span>
        </div>
      </div>
    </section>
  );
};

export default About;
