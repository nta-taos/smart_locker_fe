import { Outlet } from 'react-router-dom';

import DashboardHeader from '../dashboard-header/Header';
import styles from './AuthLayout.module.scss';

export const AuthLayout: React.FC = () => {
  return (
    <div className={styles.container}>
      <DashboardHeader />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};
