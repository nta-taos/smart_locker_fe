import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Allow all authenticated users (both USER and ADMIN) to access protected routes
  // Admin-specific routes are protected by AdminRoute component
  return <Outlet />;
};

export default ProtectedRoute;
