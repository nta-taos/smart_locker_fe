import React, { useState } from 'react';

import { Button, Form, InputNumber, Modal, message } from 'antd';

import { createPaymentRequest } from '@/api/paymentApi';
import { extractErrorMessage } from '@/utils/error.utils';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DepositModal: React.FC<DepositModalProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleDeposit = async (values: { amount: number }) => {
    try {
      setLoading(true);
      const { amount } = values;

      if (!amount || amount <= 0) {
        message.error('Số tiền phải lớn hơn 0');
        return;
      }

      const response = await createPaymentRequest(amount);
      console.log(response);
      if (response.paymentUrl) {
        window.location.href = response.paymentUrl;
      } else {
        message.error('Không thể tạo liên kết thanh toán.');
      }
    } catch (err) {
      console.error('Payment request error:', err);
      extractErrorMessage(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="Nạp tiền vào ví" open={isOpen} onCancel={onClose} footer={null}>
      <Form form={form} onFinish={handleDeposit} layout="vertical">
        <Form.Item
          name="amount"
          label="Số tiền cần nạp (VNĐ)"
          rules={[
            { required: true, message: 'Vui lòng nhập số tiền' },
            { type: 'number', min: 10000, message: 'Số tiền tối thiểu là 10,000 VNĐ' },
          ]}
        >
          <InputNumber
            style={{ width: '100%' }}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
            placeholder="Ví dụ: 500,000"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DepositModal;
