import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';

import { MenuFoldOutlined } from '@ant-design/icons';

import LanguageSwitcher from '@/components/language-switcher/LanguageSwitcher';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);
  const navigate = useNavigate();
  const { t } = useTranslation('common');

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={() => navigate('/')}></div>

      <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
              onClick={() => setIsOpen(false)}
            >
              {t('navigation.home')}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/map"
              className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
              onClick={() => setIsOpen(false)}
            >
              {t('navigation.map')}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/support"
              className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
              onClick={() => setIsOpen(false)}
            >
              {t('navigation.support')}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/partner"
              className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
              onClick={() => setIsOpen(false)}
            >
              {t('navigation.partner')}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
              onClick={() => setIsOpen(false)}
            >
              {t('navigation.login')}
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.right}>
        <LanguageSwitcher />
        <div className={styles.menuToggle} onClick={toggleMenu}>
          <MenuFoldOutlined />
        </div>
      </div>
    </header>
  );
};

export default Header;
