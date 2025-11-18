import Intro from '@/components/intro/Intro';
import Header from '@/components/layout/header/Header';
import ResetPasswordForm from '@/components/password/ResetPasswordForm';

import styles from './ResetPasswordPage.module.scss';

const ResetPasswordPage = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <ResetPasswordForm />
        <Intro />
      </main>
    </div>
  );
};

export default ResetPasswordPage;
