import React from 'react';

import { Button } from 'antd';

import styles from './Hero.module.scss';
import { useHero } from './useHero';

const Hero: React.FC = () => {
  const { title, subtitle, ctaText } = useHero();

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        {/* Left content */}
        <div className={styles.content}>
          <div className={styles.contentWrapper}>
            <h1>
              {title}
              <br /> <span>{subtitle} </span>
            </h1>
            <p style={{ textAlign: 'justify' }}>
              <b>ZipBox</b> là mô hình tủ giao nhận hàng thông minh tích hợp công nghệ{' '}
              <b>IoT (Internet of Things)</b> và ứng dụng <b>PWA (Progressive Web App)</b>, cho phép
              người dùng gửi hay nhận hàng mà <b>không cần tiếp xúc trực tiếp.</b>
            </p>
            <Button type="primary" size="large">
              {ctaText}
            </Button>
          </div>
        </div>

        {/* Right image */}
        <div className={styles.image}>
          <div className={styles.heroBackground}></div>
          <div className={styles.heroImages}>
            <img src="/images/people-left.png" alt="Hero people 1" className={styles.peopleLeft} />
            <img
              src="/images/people-right.png"
              alt="Hero people 2"
              className={styles.peopleRight}
            />
            <img src="/images/locker.png" alt="Hero locker" className={styles.locker} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
