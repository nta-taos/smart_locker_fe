import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';

import { authApi } from '@/api/authApi';
import { authState } from '@/recoil/atom/authAtom';
import { initSocket } from '@/socket';
import { useSocketListener } from '@/socket/useSocketListener';
import { AuthType } from '@/types/auth.type';

export const useLogin = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const navigation = useNavigate();

  const [phone, setPhone] = useState('');
  const [phoneMessage, setPhoneMessage] = useState('');
  const [password, setPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword((prev) => !prev);
  };

  const validation = () => {
    if (phone == '') {
      setPhoneMessage('Hãy nhập số điện thoại');
      return false;
    }

    if (password == '') {
      setPasswordMessage('Hãy nhập mật khẩu');
      return false;
    }

    setPhoneMessage('');
    setPasswordMessage('');
    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validation()) {
      return;
    }

    try {
      const res = await authApi.login(phone, password);
      const { token, user } = res.data.data;

      const newAuth: AuthType = {
        isAuthenticated: true,
        token,
        user,
      };

      setAuth(newAuth);
      localStorage.setItem('auth', JSON.stringify(newAuth));

      toast.success('Đăng nhập thành công');
      navigation('/dashboard');
    } catch (error) {
      console.log(error);
      toast.error('Sai tài khoản hoặc mật khẩu.');
    }
  };

  useEffect(() => {
    if (auth.isAuthenticated && auth.token) {
      initSocket(auth.token);
    }
  }, [auth]);
  useSocketListener();

  return {
    phone,
    setPhone,
    phoneMessage,
    password,
    setPassword,
    passwordMessage,
    isShowPassword,
    toggleShowPassword,
    handleLogin,
  };
};
