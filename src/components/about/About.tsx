import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from 'antd';

import styles from './About.module.scss';
import useAbout from './useAbout';

const About: React.FC = () => {
  const navigate = useNavigate();
  const { locationCount } = useAbout();
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
          <Button
            className={styles.discoverButton}
            type="primary"
            size="large"
            onClick={() => navigate('/support')}
          >
            Khám phá ngay
          </Button>
        </div>
      </div>
      <div className={styles.imagesGrid}>
        <div className={styles.imageItem1}>
          <img src="/images/about1.webp" alt="Smart locker lobby" />
        </div>
        <div className={styles.imageItem2}>
          <img src="/images/about2.webp" alt="Using smartphone with locker" />
        </div>
        <div className={styles.imageItem3}>
          <img src="/images/about5.webp" alt="Smart locker row" />
        </div>
        <div className={styles.imageItem4}>
          <img src="/images/about4.webp" alt="Delivery to locker" />
        </div>
        <div className={styles.badge}>
          <h1 className={styles.badgeNumber}>{locationCount}+</h1>
          <span className={styles.badgeText}>Địa điểm</span>
        </div>
      </div>
    </section>
  );
};

export default About;
