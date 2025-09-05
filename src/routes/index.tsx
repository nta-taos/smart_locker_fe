import { createBrowserRouter } from 'react-router-dom';

import Layout from '@/components/layout/layout/Layout';
import MapView from '@/components/map/Map';
import LadingPage from '@/pages/lading-page/Lading';
import SignInPage from '@/pages/login-page/Login';

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
    children: [{ index: true, element: <SignInPage /> }],
  },
]);
