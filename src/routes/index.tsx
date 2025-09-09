import { createBrowserRouter } from 'react-router-dom';

import Layout from '@/components/layout/layout/Layout';
import MapView from '@/components/map/Map';
import DashboardPage from '@/pages/dashboard-page/Dashboard';
import LadingPage from '@/pages/lading-page/Lading';
import LoginPage from '@/pages/login-page/Login';
import RegisterPage from '@/pages/register-page/Register';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <LadingPage /> },
      { path: 'map', element: <MapView /> },
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
]);
