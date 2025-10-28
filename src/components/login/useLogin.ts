import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';

import { authApi } from '@/api/authApi';
import { authState } from '@/recoil/atom/authAtom';
import { initSocket } from '@/socket';
import { useSocketListener } from '@/socket/useSocketListener';
import { AuthType } from '@/types/auth.type';
import { UserType } from '@/types/user.type';

export const useLogin = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const navigation = useNavigate();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [completeLoading, setCompleteLoading] = useState(false);
  const [showPhonePopup, setShowPhonePopup] = useState(false);
  const [tempIdToken, setTempIdToken] = useState<string | null>(null);

  const handleAuthSuccess = (token: string, user: UserType, message: string) => {
    const newAuth: AuthType = {
      isAuthenticated: true,
      token,
      user,
    };

    setAuth(newAuth);
    localStorage.setItem('auth', JSON.stringify(newAuth));
    toast.success(message);
    navigation('/dashboard');
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLogin = async (values: any) => {
    setLoading(true);
    try {
      const res = await authApi.login(values.phone, values.password);
      const { token, user } = res.data.data;
      // Gọi hàm dùng chung
      handleAuthSuccess(token, user, 'Đăng nhập thành công');
    } catch (error) {
      console.log(error);
      toast.error('Sai tài khoản hoặc mật khẩu.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (idToken: string) => {
    setGoogleLoading(true);
    try {
      const res = await authApi.googleCheck(idToken);
      const responseData = res.data.data;

      if (responseData.token && responseData.user) {
        const { token, user } = responseData;
        handleAuthSuccess(token, user, 'Đăng nhập Google thành công');
      } else if (responseData.status === 'new_user') {
        toast.info('Tài khoản chưa tồn tại, vui lòng nhập SĐT để hoàn tất đăng ký.');
        setTempIdToken(idToken);
        setShowPhonePopup(true); // Mở popup
      } else {
        throw new Error('Phản hồi API không hợp lệ');
      }
    } catch {
      const message = 'Đăng nhập Google thất bại.';
      toast.error(message);
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleCompleteGoogleRegistration = async (values: { phone: string }) => {
    if (!tempIdToken) {
      toast.error('Lỗi: Không tìm thấy token Google. Vui lòng thử lại.');
      return;
    }

    setCompleteLoading(true);
    try {
      const res = await authApi.googleRegisterComplete(tempIdToken, values.phone);
      const { token, user } = res.data.data;

      handleAuthSuccess(token, user, 'Đăng ký và đăng nhập thành công!');
      setShowPhonePopup(false);
      setTempIdToken(null);
    } catch {
      const message = 'Hoàn tất đăng ký thất bại.';
      toast.error(message);
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
    handleLogin,
    handleGoogleLogin,
    handleCompleteGoogleRegistration,
  };
};
