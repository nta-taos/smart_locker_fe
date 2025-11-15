import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Result } from 'antd';

const Success: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Here we could fetch the latest wallet balance
    // Handled by webhook on backend
  }, []);

  return (
    <Result
      status="success"
      title="Thanh toán thành công!"
      subTitle="Số dư trong ví của bạn đã được cập nhật."
      extra={[
        <Button type="primary" key="console" onClick={() => navigate('/dashboard')}>
          Tiếp tục gửi hàng
        </Button>,
      ]}
    />
  );
};

export default Success;
