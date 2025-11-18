import ResetPasswordForm from '@/components/password/ResetPasswordForm';

import styles from './ResetPasswordPage.module.scss';

const ResetPasswordPage = () => {
  return (
    <div className={styles.layout}>
      <ResetPasswordForm />
    </div>
  );
};

export default ResetPasswordPage;
