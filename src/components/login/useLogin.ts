import { useState } from 'react';

export const useLogin = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword((prev) => !prev);
  };

  return {
    phone,
    setPhone,
    password,
    setPassword,
    isShowPassword,
    toggleShowPassword,
  };
};
