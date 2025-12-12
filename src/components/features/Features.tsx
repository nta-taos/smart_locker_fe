import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './Features.module.scss';
import useFeatures from './useFeatures';

const Features: React.FC = () => {
  const features = useFeatures();
  const { t } = useTranslation('home');

  return (
    <section className={styles.featuresSection}>
      <h2 className={styles.title}>{t('features.title')}</h2>
      <p className={styles.subtitle}>
        <i>{t('features.subtitle')}</i>
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
