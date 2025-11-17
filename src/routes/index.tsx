import { createBrowserRouter } from 'react-router-dom';

// 2. Import Layout và các trang của bạn
import { AuthLayout } from '@/components/layout/auth-layout/AuthLayout';
import Layout from '@/components/layout/layout/Layout';
import MapView from '@/components/map/Map';
import AccountPage from '@/pages/account-page/account';
import DashboardPage from '@/pages/dashboard-page/Dashboard';
import LadingPage from '@/pages/lading-page/Lading';
import RentalPage from '@/pages/locker-rental/Rental';
import LoginPage from '@/pages/login-page/Login';
import { MapPage } from '@/pages/map-page/Map';
import NotFoundPage from '@/pages/not-found-page/NotFoundPage';
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
import GuestRoute from '@/routes/GuestRoute';
// 1. Import các "bảo vệ"
import ProtectedRoute from '@/routes/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <LadingPage /> },
      {
        path: 'map',
        element: (
          <div style={{ width: '100vw', height: '100vh' }}>
            <MapView varriant="detail" />
          </div>
        ),
      },
      { path: 'support', element: <SupportPage /> },
      { path: 'partner', element: <PartnerPage /> },
    ],
  },

  {
    element: <GuestRoute />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
    ],
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: 'dashboard', element: <DashboardPage /> },
          { path: 'lockers', element: <MapPage /> },
          { path: 'orders', element: <OrdersPage /> },
          { path: 'wallet/success', element: <Success /> },
          { path: 'wallet/cancel', element: <Cancel /> },
          { path: 'order-receive/success', element: <OrderReceiveSuccess /> },
          { path: 'profile', element: <AccountPage /> },
          { path: 'account/support', element: <SupportPage /> },
          { path: 'account/partner', element: <PartnerPage /> },
        ],
      },
      { path: '/send/:buildingId', element: <SendPage /> },
      { path: '/rent/:buildingId', element: <RentalPage /> },
      { path: '/order-authorization/:orderId', element: <OrderAuthorizationPage /> },
      { path: '/orders/:orderId', element: <AntOrderDetails /> },
    ],
  },

  { path: '*', element: <NotFoundPage /> },
]);
