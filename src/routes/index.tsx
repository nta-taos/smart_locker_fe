import { createBrowserRouter } from 'react-router-dom';

import { AuthLayout } from '@/components/layout/auth-layout/AuthLayout';
import Layout from '@/components/layout/layout/Layout';
import MapView from '@/components/map/Map';
import DashboardPage from '@/pages/dashboard-page/Dashboard';
import LadingPage from '@/pages/lading-page/Lading';
import LoginPage from '@/pages/login-page/Login';
import PartnerPage from '@/pages/partner-page/Partner';
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
      { path: 'partner', element: <PartnerPage /> },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [{ path: 'dashboard', element: <DashboardPage /> }],
  },
  {
    path: '/login',
    children: [{ index: true, element: <LoginPage /> }],
  },
  {
    path: '/register',
    children: [{ index: true, element: <RegisterPage /> }],
  },
]);
