import { EyeInvisibleOutlined, EyeOutlined, GoogleOutlined } from '@ant-design/icons';

import styles from './Login.module.scss';
import { useLogin } from './useLogin';

const Login: React.FC = () => {
  const {
    title,
    phoneLable,
    phonePlaceholder,
    passwordLable,
    passwordPlaceholder,
    rememberLabel,
    forgetPasswordLable,
    loginLable,
    orLable,
    loginWithGooleLable,
    registerTitle,
    registerLable,
    phone,
    setPhone,
    password,
    setPassword,
    isShowPassword,
    toggleShowPassword,
  } = useLogin();

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.loginTitle}>{title} 👋</h1>
      <div className={styles.inputContainer}>
        <label htmlFor="phone">{phoneLable}</label>
        <input
          className={styles.phoneInput}
          type="text"
          id="phone"
          value={phone}
          tabIndex={1}
          placeholder={phonePlaceholder}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="phone">{passwordLable}</label>
        <div className={styles.passwordInput}>
          <input
            type={isShowPassword ? 'text' : 'password'}
            id="password"
            value={password}
            tabIndex={2}
            placeholder={passwordPlaceholder}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={toggleShowPassword}>
            {isShowPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
          </button>
        </div>
      </div>
      <div className={styles.rememberContainer}>
        <div>
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">{rememberLabel}</label>
        </div>
        <a href="http://">{forgetPasswordLable}</a>
      </div>
      <button tabIndex={3} className={styles.loginButton}>
        {loginLable}
      </button>
      <span>{orLable}</span>
      <button className={styles.loginWithGoogleButton}>
        <GoogleOutlined /> {loginWithGooleLable}{' '}
      </button>
      <span>
        {registerTitle} <a href="">{registerLable}</a>
      </span>
    </div>
  );
};

export default Login;
