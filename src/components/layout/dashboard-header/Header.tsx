import React, { useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { LogoutOutlined, MenuFoldOutlined, ProfileOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, MenuProps, message } from 'antd';

import NotificationBell from '@/components/notification-bell/NotificationBell';

import styles from './Header.module.scss';
import useDashboardHeader from './useHeader';

const DashboardHeader: React.FC = () => {
  const navigate = useNavigate();
  const { user, isOpen, toggleMenu, setIsOpen } = useDashboardHeader();
  const headerRef = useRef<HTMLElement>(null);

  // Click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

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

  const handleAvatar = () => {
    navigate('/');
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
    <header className={styles.header} ref={headerRef}>
      <div className={styles.logo} onClick={handleAvatar}></div>

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
              Đơn hàng
            </NavLink>
          </li>
          <li>
            <NavLink
              to="account/support"
              onClick={handleNavClick}
              className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
            >
              Hỗ trợ
            </NavLink>
          </li>
          <li>
            <NavLink
              to="account/partner"
              onClick={handleNavClick}
              className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
            >
              Đối tác
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              onClick={handleNavClick}
              className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
            >
              Cá nhân
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
