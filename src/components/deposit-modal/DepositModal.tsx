import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation(['wallet', 'validation', 'common']);

  const handleDeposit = async (values: { amount: number }) => {
    try {
      setLoading(true);
      const { amount } = values;

      if (!amount || amount <= 0) {
        message.error(t('validation:amount.positive'));
        return;
      }

      const response = await createPaymentRequest(amount);
      console.log(response);
      if (response.paymentUrl) {
        window.location.href = response.paymentUrl;
      } else {
        message.error(t('wallet:deposit.paymentUrlError'));
      }
    } catch (err) {
      console.error('Payment request error:', err);
      extractErrorMessage(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title={t('wallet:deposit.title')} open={isOpen} onCancel={onClose} footer={null}>
      <Form form={form} onFinish={handleDeposit} layout="vertical">
        <Form.Item
          name="amount"
          label={t('wallet:deposit.amountLabel')}
          rules={[
            { required: true, message: t('validation:amount.required') },
            { type: 'number', min: 10000, message: t('wallet:deposit.minAmount') },
          ]}
        >
          <InputNumber
            style={{ width: '100%' }}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
            placeholder={t('wallet:deposit.placeholder')}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            {t('common:actions.confirm')}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DepositModal;
