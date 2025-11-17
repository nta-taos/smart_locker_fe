import React from 'react';
import { FaFacebook, FaTiktok, FaTwitter } from 'react-icons/fa';

import { ClockCircleFilled, EnvironmentFilled, MailFilled, PhoneFilled } from '@ant-design/icons';

import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  // ======= SOCIAL LINKS =======
  const socials = [
    { icon: <FaFacebook />, href: 'https://www.facebook.com/profile.php?id=100069962634792' },
    { icon: <FaTwitter />, href: 'https://x.com/zipboxvn' },
    { icon: <FaTiktok />, href: 'https://www.tiktok.com/@zipbox_' },
  ];

  // ======= PRODUCTS =======
  const products = ['Tủ bảo mật', 'Khóa thông minh'];

  // ======= SUPPORT =======
  const supports = ['Hướng dẫn cài đặt', 'Bảo hành & Sửa chữa', 'Chính sách & Điều khoản', 'FAQ'];

  // ======= CONTACT =======
  const contacts = [
    {
      icon: <EnvironmentFilled />,
      text: '55 Đông Hải 8, Ngũ Hành Sơn, Đà Nẵng',
    },
    {
      icon: <PhoneFilled />,
      text: '+84 835 788 256',
    },
    {
      icon: <MailFilled />,
      text: 'zipboxcorp@gmail.com',
    },
    {
      icon: <ClockCircleFilled />,
      text: 'T2 - T6: 8:00 - 17:00',
    },
    {
      icon: <ClockCircleFilled />,
      text: 'T7: 8:00 - 12:00',
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Logo + Description + Socials */}
        <div className={styles.column}>
          <h2 className={styles.logo}>CÔNG TY TNHH ZIPBOX VIỆT NAM</h2>

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
          <h3>Sản phẩm</h3>
          <ul>
            {products.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div className={styles.column}>
          <h3>Hỗ trợ</h3>
          <ul>
            {supports.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className={styles.column}>
          <h3>Liên hệ</h3>
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
        © {year} Zipbox. Tất cả quyền được bảo lưu | CÔNG TY TNHH ZIPBOX VIỆT NAM
      </div>
    </footer>
  );
};

export default Footer;
