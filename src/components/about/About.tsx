import React from 'react';

import { Button } from 'antd';

import styles from './About.module.scss';
import useAbout from './useAbout';

const About: React.FC = () => {
  const { title, subtitle, description, images, locationCount } = useAbout();
  return (
    <section className={styles.aboutSection}>
      <div className={styles.info}>
        <span className={styles.subtitle}>{subtitle}</span>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <Button type="primary" size="large">
          Tìm hiểu ngay
        </Button>
      </div>
      <div className={styles.imagesGrid}>
        <img src={images[0]} alt="about1" className={styles.imgTop} />
        <img src={images[1]} alt="about2" className={styles.imgMid} />
        <div className={styles.imgBottomWrap}>
          <img src={images[2]} alt="about3" className={styles.imgBottom} />
          <div className={styles.badge}>
            <span className={styles.badgeNumber}>{locationCount}+</span>
            <span className={styles.badgeText}>Địa điểm</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
