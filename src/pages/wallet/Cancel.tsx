import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Result } from 'antd';

const Cancel: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="error"
      title="Thanh toán thất bại"
      subTitle="Giao dịch đã bị hủy hoặc xảy ra lỗi."
      extra={[
        <Button type="primary" key="console" onClick={() => navigate(-2)}>
          Quay lại
        </Button>,
      ]}
    />
  );
};

export default Cancel;
