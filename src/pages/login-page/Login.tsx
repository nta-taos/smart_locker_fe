import Intro from '@/components/intro/Intro';
import Header from '@/components/layout/header/Header';
import Login from '@/components/login/Login';

import styles from './Login.module.scss';

const LoginPage: React.FC = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Login />
        <Intro />
      </main>
    </div>
  );
};

export default LoginPage;
