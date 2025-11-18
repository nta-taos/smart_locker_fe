import { Outlet } from 'react-router-dom';

import ScrollToTop from '@/components/common/scroll/ScrollToTop';

import DashboardHeader from '../dashboard-header/Header';
import styles from './AuthLayout.module.scss';

export const AuthLayout: React.FC = () => {
  return (
    <div className={styles.container}>
      <ScrollToTop />
      <DashboardHeader />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};
