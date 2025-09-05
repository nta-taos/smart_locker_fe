import { atom, useRecoilState } from 'recoil';

export const phoneState = atom<string>({
  key: 'loginPhone',
  default: '',
});

export const passwordState = atom<string>({
  key: 'loginPassword',
  default: '',
});

export const isShowPasswordState = atom<boolean>({
  key: 'isShowloginPassword',
  default: false,
});

export const useLogin = () => {
  const title = 'Xin chào';
  const phoneLable = 'Số điện thoại';
  const phonePlaceholder = 'Nhập số điện thoại';
  const passwordLable = 'Mật khẩu';
  const passwordPlaceholder = 'Nhập mật khẩu';
  const rememberLabel = 'Ghi nhớ đăng nhập';
  const forgetPasswordLable = 'Quên mật khẩu';
  const loginLable = 'Đăng nhập';
  const orLable = 'Hoặc';
  const loginWithGooleLable = 'Đăng nhập với Google';
  const registerTitle = 'Bạn chưa có tài khoản ?';
  const registerLable = 'Đăng ký ngay';

  const [phone, setPhone] = useRecoilState(phoneState);
  const [password, setPassword] = useRecoilState(passwordState);
  const [isShowPassword, setIsShowPassword] = useRecoilState(isShowPasswordState);

  const toggleShowPassword = () => {
    setIsShowPassword((prev) => !prev);
  };

  return {
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
  };
};
