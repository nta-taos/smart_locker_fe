import { useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { authApi } from '@/api/authApi';
import { authState } from '@/recoil/atom/authAtom';

export const useLogin = () => {
  const setAuth = useSetRecoilState(authState);

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

  const handleLogin = async () => {
    if (validation()) {
      return;
    }

    const res = await authApi.login(phone, password);
    const { token, user } = res.data;

    setAuth({
      token: token,
      user: user,
    });

    return res;
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
