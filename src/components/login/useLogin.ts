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
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLogin = async (values: any) => {
    setLoading(true);
    try {
      const res = await authApi.login(values.phone, values.password);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth.isAuthenticated && auth.token) {
      initSocket(auth.token);
    }
  }, [auth]);
  useSocketListener();

  return {
    loading,
    handleLogin,
  };
};
