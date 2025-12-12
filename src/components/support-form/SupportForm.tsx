import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { UploadOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import { SupportFormData } from '../../types/SupportForm.types';
import styles from './SupportForm.module.scss';
import { defaultFormData, handleChange, handleSubmit } from './useSupportForm';

const SupportForm: React.FC = () => {
  const [form, setForm] = useState<SupportFormData>(defaultFormData);
  const { t } = useTranslation('support');

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <h3>{t('form.title')}</h3>

      <div className={styles.formGroup}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={(e) => handleChange(form, setForm, e)}
          placeholder={t('form.namePlaceholder')}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={(e) => handleChange(form, setForm, e)}
          placeholder={t('form.phonePlaceholder')}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={(e) => handleChange(form, setForm, e)}
          placeholder={t('form.emailPlaceholder')}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <textarea
          className={styles.textarea}
          name="message"
          value={form.message}
          onChange={(e) => handleChange(form, setForm, e)}
          placeholder={t('form.messagePlaceholder')}
          rows={4}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.upload}>
          <span>{form.file ? form.file.name : t('form.attachmentPlaceholder')}</span>
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
        {t('form.submit')}
      </Button>
    </form>
  );
};

export default SupportForm;
