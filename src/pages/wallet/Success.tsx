import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { Result, Spin } from 'antd';

import { getWallet } from '@/api/walletApi';
import { authState } from '@/recoil/atom/authAtom';

const Success: React.FC = () => {
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const response = await getWallet();
        const updatedWallet = response.data;

        setAuth((prevAuth) => {
          if (!prevAuth?.user) return prevAuth;
          return {
            ...prevAuth,
            user: {
              ...prevAuth.user,
              wallet: updatedWallet,
            },
          };
        });

        setLoading(false);

        navigate(-2);
      } catch {
        setError(true);
        setLoading(false);
        navigate(-2);
      }
    };

    fetchWallet();
  }, [setAuth, navigate]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <Spin size="large" />
        <div style={{ marginTop: 16 }}>Đang cập nhật số dư...</div>
      </div>
    );
  }

  if (error) {
    return (
      <Result
        status="warning"
        title="Thanh toán thành công!"
        subTitle="Số dư sẽ được cập nhật trong giây lát. Đang chuyển trang..."
      />
    );
  }

  return (
    <Result
      status="success"
      title="Thanh toán thành công!"
      subTitle="Số dư trong ví của bạn đã được cập nhật. Đang chuyển trang..."
    />
  );
};

export default Success;
