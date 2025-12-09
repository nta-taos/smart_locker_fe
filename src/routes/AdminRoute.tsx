import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { authState } from '@/recoil/atom/authAtom';

const AdminRoute = () => {
  const auth = useRecoilValue(authState);

  // Check if user is logged in
  if (!auth.isAuthenticated || !auth.user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has admin role (role >= 1)
  // UserRole: USER=0, ADMIN=1
  // If user is NOT admin (role < 1), redirect to user dashboard
  if (auth.user.role < 1) {
    return <Navigate to="/dashboard" replace />;
  }

  // If user IS admin (role >= 1), allow access
  return <Outlet />;
};

export default AdminRoute;
