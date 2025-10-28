import React from 'react';
import { NavLink } from 'react-router-dom';

import { MenuFoldOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

import NotificationBell from '@/components/notification-bell/NotificationBell';

import styles from './Header.module.scss';
import useDashboardHeader from './useHeader';

const DashboardHeader: React.FC = () => {
  const { user, isOpen, toggleMenu } = useDashboardHeader();

  return (
    <header className={styles.header}>
      {/* Logo */}
      <div className={styles.logo}></div>

      {/* Menu desktop + mobile */}
      <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}>
        <ul>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
              end
            >
              Trang chủ
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/lockers"
              className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
            >
              Tủ thông minh
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/orders"
              className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
            >
              Đơn hàng của tôi
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
            >
              Hồ sơ cá nhân
            </NavLink>
          </li>
        </ul>
      </nav>
      <div>
        <div className={styles.right}>
          <NotificationBell />
          {/* USE */}
          <div className={styles.user}>
            <Avatar src={user?.avatar} size={40} alt={user?.name} icon={<UserOutlined />}></Avatar>
          </div>
          {/* Icon toggle (mobile) */}
          <div className={styles.menuToggle} onClick={toggleMenu}>
            <MenuFoldOutlined />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
