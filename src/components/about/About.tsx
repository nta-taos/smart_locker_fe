import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button } from 'antd';

import styles from './About.module.scss';
import useAbout from './useAbout';

const About: React.FC = () => {
  const navigate = useNavigate();
  const { locationCount } = useAbout();
  const { t } = useTranslation('home');
  return (
    <section className={styles.aboutSection}>
      <div className={styles.info}>
        {/* TIÊU ĐỀ CHUNG */}
        <div className={styles.header}>
          <span className={styles.subtitle}>{t('about.subtitle')}</span>
          <h2 className={styles.title}>{t('about.title')}</h2>
        </div>

        {/* KHỐI VISION */}
        <div className={styles.vmContainer}>
          <h3 className={styles.vmTitleVision}>{t('about.visionTitle')}</h3>
          <div className={styles.vmContent}>
            <p dangerouslySetInnerHTML={{ __html: t('about.visionContent') }} />
          </div>
        </div>

        {/* KHỐI MISSION */}
        <div className={styles.vmContainer}>
          <h3 className={styles.vmTitleMission}>{t('about.missionTitle')}</h3>
          <div className={styles.vmContent}>
            <p dangerouslySetInnerHTML={{ __html: t('about.missionContent') }} />
          </div>
        </div>

        <div className={styles.btn}>
          <Button
            className={styles.discoverButton}
            type="primary"
            size="large"
            onClick={() => navigate('/support')}
          >
            {t('about.discoverButton')}
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
          <span className={styles.badgeText}>{t('about.locationBadge')}</span>
        </div>
      </div>
    </section>
  );
};

export default About;
