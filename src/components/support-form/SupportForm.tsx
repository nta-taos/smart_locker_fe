import React, { useState } from 'react';

import { UploadOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import { SupportFormData } from '../../types/supportform.types';
import styles from './SupportForm.module.scss';
import { defaultFormData, handleChange, handleSubmit } from './useSupportForm';

const SupportForm: React.FC = () => {
  const [form, setForm] = useState<SupportFormData>(defaultFormData);

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <h3>Trợ giúp & Báo cáo sự cố</h3>

      <div className={styles.formGroup}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={(e) => handleChange(form, setForm, e)}
          placeholder="Họ và tên"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={(e) => handleChange(form, setForm, e)}
          placeholder="Số điện thoại"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={(e) => handleChange(form, setForm, e)}
          placeholder="Email"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <textarea
          name="message"
          value={form.message}
          onChange={(e) => handleChange(form, setForm, e)}
          placeholder="Nhập mô tả chi tiết"
          rows={4}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.upload}>
          <span>{form.file ? form.file.name : 'Ảnh đính kèm (nếu có)'}</span>
          <UploadOutlined className={styles.icon} />
          <input
            type="file"
            name="file"
            accept="image/*"
            onChange={(e) => handleChange(form, setForm, e)}
            hidden
          />
        </label>
      </div>

      <Button type="primary" size="large">
        Gửi báo cáo
      </Button>
    </form>
  );
};

export default SupportForm;
