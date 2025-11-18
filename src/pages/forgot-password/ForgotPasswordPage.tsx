import ForgotPasswordForm from '@/components/password/ForgotPasswordForm';

import styles from './ForgotPasswordPage.module.scss';

const ForgotPasswordPage = () => {
  return (
    <div className={styles.layout}>
      <ForgotPasswordForm />
    </div>
  );
};

export default ForgotPasswordPage;
