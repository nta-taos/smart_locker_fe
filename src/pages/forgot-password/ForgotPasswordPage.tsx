import Intro from '@/components/intro/Intro';
import Header from '@/components/layout/header/Header';
import ForgotPasswordForm from '@/components/password/ForgotPasswordForm';

import styles from './ForgotPasswordPage.module.scss';

const ForgotPasswordPage = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <ForgotPasswordForm />
        <Intro />
      </main>
    </div>
  );
};

export default ForgotPasswordPage;
