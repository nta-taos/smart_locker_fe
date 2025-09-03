import React from 'react';

import styles from './Hero.module.scss';
import { useHero } from './useHero';

const Hero: React.FC = () => {
  const { title, subtitle, description, ctaText } = useHero();

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        {/* Left content */}
        <div className={styles.content}>
          <div className={styles.contentWrapper}>
            <h1>
              {title}❤️ <br /> <span>{subtitle} </span>
            </h1>
            <p>
              <i>{description}</i>
            </p>
            <button className={styles.cta}>{ctaText}</button>
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
