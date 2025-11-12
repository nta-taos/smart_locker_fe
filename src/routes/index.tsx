import { createBrowserRouter } from 'react-router-dom';

import { AuthLayout } from '@/components/layout/auth-layout/AuthLayout';
import Layout from '@/components/layout/layout/Layout';
import MapView from '@/components/map/Map';
import AccountPage from '@/pages/account-page/account';
import DashboardPage from '@/pages/dashboard-page/Dashboard';
import LadingPage from '@/pages/lading-page/Lading';
import RentalPage from '@/pages/locker-rental/Rental';
import LoginPage from '@/pages/login-page/Login';
import { MapPage } from '@/pages/map-page/Map';
import OrderAuthorizationPage from '@/pages/order-authorization-page/OrderAuthorizationPage';
import AntOrderDetails from '@/pages/order-detail/OrderDetail';
import OrderReceiveSuccess from '@/pages/order-receive/OrderReceiveSuccess';
import { OrdersPage } from '@/pages/orders-page/Orders';
import PartnerPage from '@/pages/partner-page/Partner';
import RegisterPage from '@/pages/register-page/Register';
import SendPage from '@/pages/send-package/SendPackage';
import SupportPage from '@/pages/support-page/Support';
import Cancel from '@/pages/wallet/Cancel';
import Success from '@/pages/wallet/Success';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <LadingPage /> },
      {
        path: 'map',
        element: (
          <div style={{ width: '100wh', height: '100vh' }}>
            <MapView varriant="detail" />{' '}
          </div>
        ),
      },
      { path: 'support', element: <SupportPage /> },
      { path: 'partner', element: <PartnerPage /> },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'lockers', element: <MapPage /> },
      { path: 'orders', element: <OrdersPage /> },
      { path: 'wallet/success', element: <Success /> },
      { path: 'wallet/cancel', element: <Cancel /> },
      { path: 'order-receive/success', element: <OrderReceiveSuccess /> },
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
    path: '/send/:buildingId',
    children: [{ index: true, element: <SendPage /> }],
  },
  {
    path: '/rent/:buildingId',
    children: [{ index: true, element: <RentalPage /> }],
  },
  {
    path: '/order-authorization/:orderId',
    children: [
      {
        index: true,
        element: <OrderAuthorizationPage />,
      },
    ],
  },
  {
    path: '/orders/:orderId',
    children: [
      {
        index: true,
        element: <AntOrderDetails />,
      },
    ],
  },
  {
    path: '/account',
    children: [{ index: true, element: <AccountPage /> }],
  },
]);
