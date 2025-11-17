import React from 'react';

import { Button, Form, Input, Select } from 'antd';

import { PartnerFormValues } from '../../types/partnerform.types';
import styles from './PartnerForm.module.scss';
import { handlePartnerSubmit } from './usePartnerForm';

const { TextArea } = Input;

const PartnerForm: React.FC = () => {
  return (
    <section className={styles.formSection}>
      <h2 className={styles.formTitle}>ĐĂNG KÝ HỢP TÁC</h2>
      <div className={styles.titleDecor}>
        <span className={styles.line}></span>
        <span className={styles.icon}>
          <img src="./images/partnerformlogo.png" alt="" />
        </span>
        <span className={styles.line}></span>
      </div>

      <div className={styles.formWrap}>
        <Form<PartnerFormValues>
          layout="vertical"
          onFinish={handlePartnerSubmit}
          requiredMark={false}
        >
          <Form.Item name="name" rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}>
            <Input size="large" placeholder="Họ và tên" />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
          >
            <Input size="large" placeholder="Số điện thoại" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              { type: 'email', message: 'Email không hợp lệ' },
            ]}
          >
            <Input size="large" placeholder="Email" />
          </Form.Item>

          <Form.Item name="category">
            <Select
              size="large"
              placeholder="Danh mục hợp tác"
              options={[
                { label: 'Đối tác vận chuyển', value: 'vanchuyen' },
                { label: 'Đối tác địa điểm', value: 'diadiem' },
              ]}
            />
          </Form.Item>

          <Form.Item name="note">
            <TextArea rows={5} placeholder="Thông điệp của bạn..." />
          </Form.Item>

          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
              <Button type="primary" size="large">
                Gửi ngay
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default PartnerForm;
