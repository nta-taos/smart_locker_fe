import React from 'react';

import styles from './Footer.module.scss';
import { useFooter } from './useFooter';

const Footer: React.FC = () => {
  const { year, contacts, products, supports } = useFooter();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Logo + description */}
        <div className={styles.column}>
          <h2 className={styles.logo}>Zipbox</h2>
          <p className={styles.description}>
            Dẫn đầu công nghệ bảo mật thông minh tại Việt Nam với hơn 10 năm kinh nghiệm trong lĩnh
            vực an ninh.
          </p>
          <div className={styles.socials}>
            {/* {socials.map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noreferrer">
                {s.icon}
              </a>
            ))} */}
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
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        © {year} Zipbox. Tất cả quyền được bảo lưu | Công ty TNHH Zipbox Việt Nam
      </div>
    </footer>
  );
};

export default Footer;
