import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import {
  AppstoreOutlined,
  BankOutlined,
  ControlOutlined,
  DashboardOutlined,
  InboxOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Dropdown, Layout, Menu, theme } from 'antd';
import type { MenuProps } from 'antd';

import { authState } from '@/recoil/atom/authAtom';

import './AdminLayout.css';

const { Header, Sider, Content } = Layout;

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useRecoilValue(authState);
  const { token } = theme.useToken();

  const menuItems: MenuProps['items'] = [
    {
      key: '/admin',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      onClick: () => navigate('/admin'),
    },
    {
      key: '/admin/buildings',
      icon: <BankOutlined />,
      label: 'Tòa nhà',
      onClick: () => navigate('/admin/buildings'),
    },
    {
      key: '/admin/lockers',
      icon: <InboxOutlined />,
      label: 'Tủ khóa',
      onClick: () => navigate('/admin/lockers'),
    },
    {
      key: '/admin/slots',
      icon: <AppstoreOutlined />,
      label: 'Ngăn tủ',
      onClick: () => navigate('/admin/slots'),
    },
    {
      key: '/admin/remote-control',
      icon: <ControlOutlined />,
      label: 'Điều khiển từ xa',
      onClick: () => navigate('/admin/remote-control'),
    },
  ];

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      danger: true,
      onClick: () => {
        // Clear localStorage and logout
        localStorage.clear();
        navigate('/login');
      },
    },
  ];

  // Get current selected key from location
  const selectedKey =
    (menuItems
      .filter((item) => location.pathname.startsWith(item?.key as string))
      .sort((a, b) => (b?.key as string).length - (a?.key as string).length)[0]?.key as string) ||
    '/admin';

  console.log(selectedKey);

  return (
    <Layout className="admin-layout">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="admin-sider"
        width={250}
        style={{
          background: token.colorBgContainer,
        }}
      >
        <div className="admin-logo">
          <InboxOutlined style={{ fontSize: 32, color: token.colorPrimary }} />
          {!collapsed && <h2>Smart Locker Admin</h2>}
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          style={{ borderRight: 0 }}
        />
      </Sider>
      <Layout>
        <Header className="admin-header" style={{ background: token.colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div className="admin-header-right">
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <div className="admin-user-info">
                <Avatar icon={<UserOutlined />} src={auth.user?.avatar} />
                <span className="admin-user-name">{auth.user?.name || 'Admin'}</span>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content className="admin-content">
          <div className="admin-content-inner">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
