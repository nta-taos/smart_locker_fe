import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { LogoutOutlined, MenuFoldOutlined, ProfileOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, MenuProps, message } from 'antd';

import NotificationBell from '@/components/notification-bell/NotificationBell';

import styles from './Header.module.scss';
import useDashboardHeader from './useHeader';

const DashboardHeader: React.FC = () => {
  const navigate = useNavigate();
  const { user, isOpen, toggleMenu } = useDashboardHeader();

  const handleNavClick = () => {
    if (isOpen) toggleMenu();
  };

  const handleLogout = () => {
    localStorage.removeItem('auth');
    message.success('Đăng xuất thành công');
    navigate('/login', { replace: true });
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  const items: MenuProps['items'] = [
    {
      key: 'profile',
      label: 'Hồ sơ cá nhân',
      icon: <ProfileOutlined />,
      onClick: handleProfile,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: 'Đăng xuất',
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.logo}></div>

      <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}>
        <ul>
          <li>
            <NavLink
              to="/dashboard"
              onClick={handleNavClick}
              className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
              end
            >
              Trang chủ
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/lockers"
              onClick={handleNavClick}
              className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
            >
              Tủ thông minh
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/orders"
              onClick={handleNavClick}
              className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
            >
              Đơn hàng của tôi
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              onClick={handleNavClick}
              className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
            >
              Hồ sơ cá nhân
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.right}>
        <NotificationBell />

        {/* Avatar + Dropdown */}
        <Dropdown menu={{ items }} placement="bottomRight" arrow>
          <div className={styles.user} style={{ cursor: 'pointer' }}>
            <Avatar src={user?.avatar} size={40} alt={user?.name} icon={<UserOutlined />} />
          </div>
        </Dropdown>

        <div className={styles.menuToggle} onClick={toggleMenu}>
          <MenuFoldOutlined />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
