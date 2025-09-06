import { ToastContainer } from 'react-toastify';

import { EyeInvisibleOutlined, EyeOutlined, GoogleOutlined } from '@ant-design/icons';

import styles from './Register.module.scss';
import { useRegister } from './useRegister';

const Register: React.FC = () => {
  const {
    name,
    setName,
    nameMessage,
    phone,
    setPhone,
    phoneMessage,
    email,
    setEmail,
    emailMessage,
    password,
    setPassword,
    passwordMessage,
    isShowPassword,
    repassword,
    toggleShowPassword,
    setRepassword,
    repasswordMessage,
    isShowRepassword,
    toggleShowRepassword,
    handleRegister,
  } = useRegister();

  return (
    <form className={styles.loginContainer} onSubmit={handleRegister}>
      <h1 className={styles.loginTitle}>Đăng ký</h1>
      <div className={styles.inputContainer}>
        <label htmlFor="phone">Họ và tên</label>
        <input
          className={styles.phoneInput}
          type="text"
          id="phone"
          value={name}
          tabIndex={1}
          placeholder="Nhập họ và tên"
          onChange={(e) => setName(e.target.value)}
        />
        <span className={styles.inputMessage}>{nameMessage || '\u00A0'}</span>
      </div>
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
        <span className={styles.inputMessage}>{phoneMessage || '\u00A0'}</span>
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="email">Email</label>
        <input
          className={styles.phoneInput}
          type="email"
          id="email"
          value={email}
          tabIndex={1}
          placeholder="Nhập email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <span className={styles.inputMessage}>{emailMessage || '\u00A0'}</span>
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
        <span className={styles.inputMessage}>{passwordMessage || '\u00A0'}</span>
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="phone">Nhập lại mật khẩu</label>
        <div className={styles.passwordInput}>
          <input
            type={isShowRepassword ? 'text' : 'password'}
            id="repassword"
            value={repassword}
            tabIndex={2}
            placeholder="Nhập lại mật khẩu"
            onChange={(e) => setRepassword(e.target.value)}
          />
          <button onClick={toggleShowRepassword}>
            {isShowRepassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
          </button>
        </div>
        <span className={styles.inputMessage}>{repasswordMessage || '\u00A0'}</span>
      </div>
      <button tabIndex={3} className={styles.loginButton} type="submit">
        Đăng ký
      </button>
      <p>Hoặc</p>
      <button className={styles.loginWithGoogleButton}>
        <GoogleOutlined /> Đăng nhập với Google
      </button>
      <p>
        Bạn đã có tài khoản ? <a href="/login">Đăng nhập ngay</a>
      </p>
      <div className={styles.circleContainer}>
        <div className={styles.circle}></div>
        <div className={styles.border1}></div>
        <div className={styles.border2}></div>
        <div className={styles.border3}></div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} theme="light" />
    </form>
  );
};

export default Register;
