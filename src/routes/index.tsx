import { createBrowserRouter } from 'react-router-dom';

import Layout from '@/components/layout/layout/Layout';
import MapView from '@/components/map/Map';
import AccountPage from '@/pages/account-page/account';
import DashboardPage from '@/pages/dashboard-page/Dashboard';
import LadingPage from '@/pages/lading-page/Lading';
import LoginPage from '@/pages/login-page/Login';
import RegisterPage from '@/pages/register-page/Register';
import SupportPage from '@/pages/support-page/Support';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <LadingPage /> },
      { path: 'map', element: <MapView /> },
      { path: 'support', element: <SupportPage /> },
    ],
  },
  {
    path: '/login',
    children: [{ index: true, element: <LoginPage /> }],
  },
  {
    path: '/register',
    children: [{ index: true, element: <RegisterPage /> }],
  },
  {
    path: '/dashboard',
    children: [{ index: true, element: <DashboardPage /> }],
  },
  {
    path: '/account',
    children: [{ index: true, element: <AccountPage /> }],
  },
]);
