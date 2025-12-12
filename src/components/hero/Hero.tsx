import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button } from 'antd';

import styles from './Hero.module.scss';
import { useHero } from './useHero';

const Hero: React.FC = () => {
  const { title, subtitle, ctaText } = useHero();
  const { t } = useTranslation('home');
  const navigate = useNavigate();

  const handleCTA = () => {
    navigate('/dashboard');
  };

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        {/* Left content */}
        <div className={styles.content}>
          <div className={styles.contentWrapper}>
            <h1>
              {title}
              <br /> <span>{subtitle}</span>
            </h1>
            <p
              style={{ textAlign: 'justify' }}
              dangerouslySetInnerHTML={{ __html: t('hero.description') }}
            />
            <Button type="primary" size="large" onClick={handleCTA} className={styles.cta}>
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
            <img src="/images/locker2.png" alt="Hero locker" className={styles.locker} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
