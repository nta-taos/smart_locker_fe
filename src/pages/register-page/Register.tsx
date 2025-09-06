import Intro from '@/components/intro/Intro';
import Header from '@/components/layout/header/Header';
import Register from '@/components/register/Register';

import styles from './Register.module.scss';

const RegisterPage: React.FC = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Register />
        <Intro />
      </main>
    </div>
  );
};

export default RegisterPage;
