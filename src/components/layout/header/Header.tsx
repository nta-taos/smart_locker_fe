import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { MenuFoldOutlined } from '@ant-design/icons';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ⭐ CLICK OUTSIDE TO CLOSE
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.logo}></div>

      <div ref={menuRef} className={styles.menuWrapper}>
        <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}>
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
                onClick={() => setIsOpen(false)}
              >
                Trang chủ
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/map"
                className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
                onClick={() => setIsOpen(false)}
              >
                Bản đồ phân bố
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/support"
                className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
                onClick={() => setIsOpen(false)}
              >
                Trung tâm hỗ trợ
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/partner"
                className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
                onClick={() => setIsOpen(false)}
              >
                Đối tác
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
                onClick={() => setIsOpen(false)}
              >
                Đăng nhập
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Toggle (mobile) */}
        <div className={styles.menuToggle} onClick={toggleMenu}>
          <MenuFoldOutlined />
        </div>
      </div>
    </header>
  );
};

export default Header;
