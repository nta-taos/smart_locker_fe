import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { message } from 'antd';

import { authApi } from '@/api/authApi';
import { authState } from '@/recoil/atom/authAtom';
import { initSocket } from '@/socket';
import { useSocketListener } from '@/socket/useSocketListener';
import { AuthType } from '@/types/auth.type';
import { UserType } from '@/types/user.type';
import { extractErrorMessage } from '@/utils/error.utils';

export const useRegister = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const navigation = useNavigate();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [completeLoading, setCompleteLoading] = useState(false);

  const [showPhonePopup, setShowPhonePopup] = useState(false);
  const [tempIdToken, setTempIdToken] = useState<string | null>(null);

  const handleAuthSuccess = (token: string, user: UserType, msg: string) => {
    const newAuth: AuthType = {
      isAuthenticated: true,
      token,
      user,
    };

    setAuth(newAuth);
    localStorage.setItem('auth', JSON.stringify(newAuth));
    message.success(msg);
    navigation('/dashboard');
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRegister = async (values: any) => {
    setLoading(true);
    try {
      const res = await authApi.register(values.name, values.phone, values.email, values.password);
      const { token, user } = res.data;

      handleAuthSuccess(token, user, 'Đăng ký thành công!');
    } catch (error) {
      extractErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (idToken: string) => {
    setGoogleLoading(true);
    try {
      const res = await authApi.googleCheck(idToken);
      const responseData = res.data;

      if (responseData.token && responseData.user) {
        const { token, user } = responseData;
        handleAuthSuccess(token, user, 'Đăng nhập Google thành công');
      } else if (responseData.status === 'new_user') {
        message.info('Tài khoản chưa tồn tại, vui lòng nhập SĐT để hoàn tất đăng ký.');
        setTempIdToken(idToken);
        setShowPhonePopup(true);
      } else {
        throw new Error('Phản hồi API không hợp lệ');
      }
    } catch {
      message.error('Đăng nhập Google thất bại.');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleCompleteGoogleRegistration = async (values: { phone: string }) => {
    if (!tempIdToken) {
      message.error('Lỗi: Không tìm thấy token Google. Vui lòng thử lại.');
      return;
    }

    setCompleteLoading(true);
    try {
      const res = await authApi.googleRegisterComplete(tempIdToken, values.phone);
      const { token, user } = res.data;

      handleAuthSuccess(token, user, 'Đăng ký và đăng nhập thành công!');
      setShowPhonePopup(false);
      setTempIdToken(null);
    } catch (err) {
      console.error(err);
      extractErrorMessage(err);
    } finally {
      setCompleteLoading(false);
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
    googleLoading,
    completeLoading,
    showPhonePopup,
    setShowPhonePopup,
    handleRegister,
    handleGoogleLogin,
    handleCompleteGoogleRegistration,
  };
};
