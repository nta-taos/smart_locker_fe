// @/hooks/useRegister.ts (hoặc đường dẫn tương tự)
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

// Giả sử bạn có type này

export const useRegister = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const navigation = useNavigate();

  // Loading state cho form đăng ký thường
  const [loading, setLoading] = useState(false);
  // Loading state cho nút Google (kiểm tra ban đầu)
  const [googleLoading, setGoogleLoading] = useState(false);
  // Loading state cho modal hoàn tất (gửi SĐT)
  const [completeLoading, setCompleteLoading] = useState(false);

  const [showPhonePopup, setShowPhonePopup] = useState(false);
  const [tempIdToken, setTempIdToken] = useState<string | null>(null);

  /**
   * Hàm trợ giúp: Xử lý khi đăng nhập/đăng ký thành công
   */
  const handleAuthSuccess = (token: string, user: UserType, message: string) => {
    const newAuth: AuthType = {
      isAuthenticated: true,
      token,
      user,
    };

    setAuth(newAuth);
    localStorage.setItem('auth', JSON.stringify(newAuth));
    toast.success(message);
    navigation('/dashboard'); // Chuyển hướng đến dashboard
  };

  /**
   * Xử lý đăng ký bằng form thông thường
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRegister = async (values: any) => {
    setLoading(true);
    try {
      const res = await authApi.register(values.name, values.phone, values.email, values.password);
      const { token, user } = res.data.data;

      handleAuthSuccess(token, user, 'Đăng ký thành công!');
    } catch (error) {
      console.log(error);
      toast.error('Đăng ký thất bại. Số điện thoại hoặc email có thể đã tồn tại.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Xử lý khi nhấn nút Google Login
   */
  const handleGoogleLogin = async (idToken: string) => {
    setGoogleLoading(true);
    try {
      const res = await authApi.googleCheck(idToken);
      const responseData = res.data.data;

      // Case 1: Người dùng đã tồn tại -> Đăng nhập thành công
      if (responseData.token && responseData.user) {
        const { token, user } = responseData;
        handleAuthSuccess(token, user, 'Đăng nhập Google thành công');
      }
      // Case 2: Người dùng mới -> Mở popup yêu cầu SĐT
      else if (responseData.status === 'new_user') {
        toast.info('Tài khoản chưa tồn tại, vui lòng nhập SĐT để hoàn tất đăng ký.');
        setTempIdToken(idToken); // Lưu lại idToken để gửi cùng SĐT
        setShowPhonePopup(true);
      }
      // Case 3: Lỗi không mong muốn
      else {
        throw new Error('Phản hồi API không hợp lệ');
      }
    } catch {
      const message = 'Đăng nhập Google thất bại.';
      toast.error(message);
    } finally {
      setGoogleLoading(false);
    }
  };

  /**
   * Xử lý khi người dùng nhập SĐT trong popup và nhấn "Hoàn tất"
   */
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
      const message = 'Hoàn tất đăng ký thất bại. SĐT có thể đã được sử dụng.';
      toast.error(message);
    } finally {
      setCompleteLoading(false);
    }
  };

  // Khởi tạo socket khi đã xác thực
  useEffect(() => {
    if (auth.isAuthenticated && auth.token) {
      initSocket(auth.token);
    }
  }, [auth]);

  // Lắng nghe các sự kiện socket
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
