import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';

import { LogoutOutlined, MenuFoldOutlined, ProfileOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, MenuProps, message } from 'antd';

import LanguageSwitcher from '@/components/language-switcher/LanguageSwitcher';
import NotificationBell from '@/components/notification-bell/NotificationBell';

import styles from './Header.module.scss';
import useDashboardHeader from './useHeader';

const DashboardHeader: React.FC = () => {
  const navigate = useNavigate();
  const { user, isOpen, toggleMenu, setIsOpen } = useDashboardHeader();
  const { t } = useTranslation(['common', 'auth']);
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
    message.success(t('auth:login.logoutSuccess'));
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
      label: t('auth:menu.profile'),
      icon: <ProfileOutlined />,
      onClick: handleProfile,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: t('auth:menu.logout'),
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
              {t('common:navigation.home')}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/lockers"
              onClick={handleNavClick}
              className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
            >
              {t('common:navigation.smartLocker')}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/orders"
              onClick={handleNavClick}
              className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
            >
              {t('common:navigation.orders')}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="account/support"
              onClick={handleNavClick}
              className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
            >
              {t('common:navigation.support')}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="account/partner"
              onClick={handleNavClick}
              className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
            >
              {t('common:navigation.partner')}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              onClick={handleNavClick}
              className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
            >
              {t('common:navigation.profile')}
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.right}>
        <LanguageSwitcher />
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
