import React from 'react';

import { SendOutlined } from '@ant-design/icons';
import { Rate } from 'antd';

import styles from './Testimonials.module.scss';
import useTestimonials from './useTestimonials';

const Testimonials: React.FC = () => {
  const { testimonials, stats } = useTestimonials();
  return (
    <section className={styles.testimonialsSection}>
      <h2 className={styles.title}>Đánh giá của khách hàng</h2>
      <p className={styles.subtitle}>
        <i>Hàng nghìn khách hàng đã tin tưởng và hài lòng với sản phẩm của chúng tôi.</i>
      </p>
      <div className={styles.cards}>
        {testimonials.map((item, idx) => (
          <div key={idx} className={styles.card}>
            <div className={styles.icon}>
              <SendOutlined style={{ fontSize: '24px', color: '#074ce7' }} />
            </div>
            <div className={styles.stars}>
              <Rate disabled defaultValue={item.stars} />
            </div>
            <p className={styles.text}>
              <i>&quot;{item.text}&quot;</i>
            </p>
            <div className={styles.author}>{item.author}</div>
            <div className={styles.position}>{item.position}</div>
            <a href={item.companyUrl} className={styles.company}>
              {item.company}
            </a>
          </div>
        ))}
      </div>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statNumber}>{stats.trust}</span>
          <span className={styles.statLabel}>Độ tin cậy</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNumber}>{stats.customers}</span>
          <span className={styles.statLabel}>Khách hàng</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNumber}>{stats.rating}</span>
          <span className={styles.statLabel}>Đánh giá</span>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
