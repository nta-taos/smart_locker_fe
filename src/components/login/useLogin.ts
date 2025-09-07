import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { authApi } from '@/api/authApi';
import { authState } from '@/recoil/atom/authAtom';

export const useLogin = () => {
  const setAuth = useSetRecoilState(authState);
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
      const { token, user } = res.data;

      setAuth({
        token: token,
        user: user,
      });

      toast.success('Đăng nhập thành công');
      navigation('/');
    } catch (error) {
      console.log(error);
      toast.error('Sai tài khoản hoặc mật khẩu.');
    }
  };

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
