import React from 'react';

import styles from './Features.module.scss';
import useFeatures from './useFeatures';

const Features: React.FC = () => {
  const features = useFeatures();
  return (
    <section className={styles.featuresSection}>
      <h2 className={styles.title}>Tính năng đặc biệt</h2>
      <p className={styles.subtitle}>
        <i>Khác biệt nằm ở sự tiện lợi.</i>
      </p>
      <div className={styles.list}>
        {features.map((feature, idx) => (
          <div key={idx} className={styles.card}>
            <img src={feature.image} alt={feature.title} className={styles.image} />
            <div className={styles.icon}>{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
