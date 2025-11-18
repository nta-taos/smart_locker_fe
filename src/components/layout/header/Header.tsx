import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { MenuFoldOutlined } from '@ant-design/icons';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);
  const navigate = useNavigate();

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

      <div className={styles.menuToggle} onClick={toggleMenu}>
        <MenuFoldOutlined />
      </div>
    </header>
  );
};

export default Header;
