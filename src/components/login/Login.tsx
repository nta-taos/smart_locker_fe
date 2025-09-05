import { EyeInvisibleOutlined, EyeOutlined, GoogleOutlined } from '@ant-design/icons';

import styles from './Login.module.scss';
import { useLogin } from './useLogin';

const Login: React.FC = () => {
  const {
    phone,
    setPhone,
    phoneMessage,
    password,
    setPassword,
    passwordMessage,
    isShowPassword,
    toggleShowPassword,
    handleLogin,
  } = useLogin();

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.loginTitle}>Xin chào 👋</h1>
      <div className={styles.inputContainer}>
        <label htmlFor="phone">Số điện thoại</label>
        <input
          className={styles.phoneInput}
          type="text"
          id="phone"
          value={phone}
          tabIndex={1}
          placeholder="Nhập số điện thoại"
          onChange={(e) => setPhone(e.target.value)}
        />
        <p className={styles.inputMessage}>{phoneMessage}</p>
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="phone">Mật khẩu</label>
        <div className={styles.passwordInput}>
          <input
            type={isShowPassword ? 'text' : 'password'}
            id="password"
            value={password}
            tabIndex={2}
            placeholder="Nhập mật khẩu"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={toggleShowPassword}>
            {isShowPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
          </button>
        </div>
        <p className={styles.inputMessage}>{passwordMessage}</p>
      </div>
      <div className={styles.rememberContainer}>
        <div>
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">Ghi nhớ đăng nhập</label>
        </div>
        <a href="http://">Quên mật khẩu</a>
      </div>
      <button tabIndex={3} className={styles.loginButton} onClick={handleLogin}>
        Đăng nhập
      </button>
      <span>Hoặc</span>
      <button className={styles.loginWithGoogleButton}>
        <GoogleOutlined /> Đăng nhập với Google
      </button>
      <span>
        Bạn chưa có tài khoản ? <a href="/register">Đăng ký ngay</a>
      </span>
      <div className={styles.circleContainer}>
        <div className={styles.circle}></div>
        <div className={styles.border1}></div>
        <div className={styles.border2}></div>
        <div className={styles.border3}></div>
      </div>
    </div>
  );
};

export default Login;
