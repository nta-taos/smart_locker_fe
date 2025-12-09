import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { authState } from '@/recoil/atom/authAtom';

const GuestRoute = () => {
  const auth = useRecoilValue(authState);

  if (auth.isAuthenticated && auth.user) {
    // Redirect based on user role
    // UserRole: USER=0, ADMIN=1
    if (auth.user.role >= 1) {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
