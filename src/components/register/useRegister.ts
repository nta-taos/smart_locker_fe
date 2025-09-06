import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import axios from 'axios';

import { authApi } from '@/api/authApi';

export const useRegister = () => {
  const navigate = useNavigate();
  const [isStateOne, setIsStateOne] = useState(true);

  const [name, setName] = useState('');
  const [nameMessage, setNameMessage] = useState('');

  const [phone, setPhone] = useState('');
  const [phoneMessage, setPhoneMessage] = useState('');

  const [email, setEmail] = useState('');
  const [emailMessage, setEmailMessage] = useState('');

  const [password, setPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);

  const [repassword, setRepassword] = useState('');
  const [repasswordMessage, setRepasswordMessage] = useState('');
  const [isShowRepassword, setIsShowRepassword] = useState(false);

  const [role, setRole] = useState('user');
  // const [building, setbuilding] = useState('');

  const toggleShowPassword = () => {
    setIsShowPassword((prev) => !prev);
  };
  const toggleShowRepassword = () => {
    setIsShowRepassword((prev) => !prev);
  };

  const toggleUser = () => {
    setRole('user');
  };

  const toggleShipper = () => {
    setRole('shipper');
  };

  const validation = () => {
    if (name == '') {
      setNameMessage('Hãy nhập họ và tên');
      return false;
    }
    if (phone == '') {
      setPhoneMessage('Hãy nhập số điện thoại');
      return false;
    }
    if (email == '') {
      setEmailMessage('Hãy nhập email');
      return false;
    }
    if (password.length < 8) {
      setPasswordMessage('Hãy nhập mật khẩu dài hơn 8 ký tự');
      return false;
    }
    if (password != repassword) {
      setRepasswordMessage('Nhập lại mật khẩu không khớp');
      return false;
    }

    setPhoneMessage('');
    setPasswordMessage('');
    return true;
  };

  const handleRegisterStateOne = () => {
    if (!validation()) {
      return;
    }

    setIsStateOne(false);
  };

  const handleBackState = () => {
    setIsStateOne(true);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validation()) {
      return;
    }

    try {
      const res = await authApi.register(name, phone, email, password, role);
      console.log(res);
      navigate('/login');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || 'Đăng ký không thành công');
      } else {
        toast.error('Lỗi không xác định');
      }
    }
  };

  return {
    isStateOne,
    handleRegisterStateOne,
    handleBackState,
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
    role,
    toggleUser,
    toggleShipper,
    handleRegister,
  };
};
