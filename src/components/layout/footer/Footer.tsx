import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaFacebook, FaTiktok } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

import { ClockCircleFilled, EnvironmentFilled, MailFilled, PhoneFilled } from '@ant-design/icons';

import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  const { t } = useTranslation('common');

  // ======= SOCIAL LINKS =======
  const socials = [
    { icon: <FaFacebook />, href: 'https://www.facebook.com/profile.php?id=100069962634792' },
    { icon: <FaXTwitter />, href: 'https://x.com/zipboxvn' },
    { icon: <FaTiktok />, href: 'https://www.tiktok.com/@zipbox_' },
  ];

  // ======= PRODUCTS =======
  const products = [t('footer.products.secure'), t('footer.products.smartLock')];

  // ======= SUPPORT =======
  const supports = [
    t('footer.supportItems.guide'),
    t('footer.supportItems.warranty'),
    t('footer.supportItems.policy'),
    t('footer.supportItems.faq'),
  ];

  // ======= CONTACT =======
  const contacts = [
    {
      icon: <EnvironmentFilled />,
      text: t('footer.contactInfo.address'),
    },
    {
      icon: <PhoneFilled />,
      text: t('footer.contactInfo.phone'),
    },
    {
      icon: <MailFilled />,
      text: t('footer.contactInfo.email'),
    },
    {
      icon: <ClockCircleFilled />,
      text: t('footer.contactInfo.workingHours'),
    },
    {
      icon: <ClockCircleFilled />,
      text: t('footer.contactInfo.saturdayHours'),
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Logo + Description + Socials */}
        <div className={styles.column}>
          <h2 className={styles.logo}>{t('footer.companyName')}</h2>

          {/* Social icons */}
          <div className={styles.socials}>
            {socials.map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noreferrer">
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Products */}
        <div className={styles.column}>
          <h3>{t('footer.productsTitle')}</h3>
          <ul>
            {products.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div className={styles.column}>
          <h3>{t('footer.supportTitle')}</h3>
          <ul>
            {supports.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className={styles.column}>
          <h3>{t('footer.contactTitle')}</h3>
          <ul>
            {contacts.map((c, i) => (
              <li key={i} className={styles.contactItem}>
                {c.icon} <span>{c.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        © {year} Zipbox. {t('footer.copyright')} | {t('footer.companyName')}
      </div>
    </footer>
  );
};

export default Footer;
