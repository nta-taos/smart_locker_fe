import { createBrowserRouter } from 'react-router-dom';

import DashboardHeader from '@/components/layout/dashboard-header/Header';
import Layout from '@/components/layout/layout/Layout';
import MapView from '@/components/map/Map';
import LadingPage from '@/pages/lading-page/Lading';
import LoginPage from '@/pages/login-page/Login';

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
    path: '/dashboard',
    children: [{ index: true, element: <DashboardHeader /> }],
  },
]);
