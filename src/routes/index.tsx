import { createBrowserRouter } from 'react-router-dom';

import AdminLayout from '@/components/layout/admin-layout/AdminLayout';
// 2. Import Layout và các trang của bạn
import { AuthLayout } from '@/components/layout/auth-layout/AuthLayout';
import Layout from '@/components/layout/layout/Layout';
import AccountPage from '@/pages/account-page/account';
import BuildingManagement from '@/pages/admin-buildings/BuildingManagement';
// Admin pages
import AdminDashboard from '@/pages/admin-dashboard/AdminDashboard';
import LockerManagement from '@/pages/admin-lockers/LockerManagement';
import RemoteControl from '@/pages/admin-remote-control/RemoteControl';
import SlotManagement from '@/pages/admin-slots/SlotManagement';
import DashboardPage from '@/pages/dashboard-page/Dashboard';
import ForgotPasswordPage from '@/pages/forgot-password/ForgotPasswordPage';
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
import ResetPasswordPage from '@/pages/reset-password/ResetPasswordPage';
import SendPage from '@/pages/send-package/SendPackage';
import SupportPage from '@/pages/support-page/Support';
import Cancel from '@/pages/wallet/Cancel';
import Success from '@/pages/wallet/Success';
import AdminRoute from '@/routes/AdminRoute';
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
        element: <MapPage />,
      },
      { path: 'support', element: <SupportPage /> },
      { path: 'partner', element: <PartnerPage /> },
      { path: '/forgot-password', element: <ForgotPasswordPage /> },
    ],
  },
  { path: '/order-authorization/:orderId', element: <OrderAuthorizationPage /> },

  {
    element: <GuestRoute />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '/reset-password', element: <ResetPasswordPage /> },
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
      { path: '/orders/:orderId', element: <AntOrderDetails /> },
    ],
  },

  // Admin Routes
  {
    element: <AdminRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: '/admin', element: <AdminDashboard /> },
          { path: '/admin/buildings', element: <BuildingManagement /> },
          { path: '/admin/lockers', element: <LockerManagement /> },
          { path: '/admin/slots', element: <SlotManagement /> },
          { path: '/admin/remote-control', element: <RemoteControl /> },
        ],
      },
    ],
  },

  { path: '*', element: <NotFoundPage /> },
]);
