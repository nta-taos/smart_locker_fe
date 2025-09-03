import { createBrowserRouter } from 'react-router-dom';

import Layout from '@/components/layout/layout/Layout';
import MapView from '@/components/map/Map';
import LadingPage from '@/pages/lading-page/Lading';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <LadingPage /> },
      { path: 'map', element: <MapView /> },
    ],
  },
]);
