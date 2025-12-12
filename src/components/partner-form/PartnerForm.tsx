import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Form, Input, Select } from 'antd';

import { PartnerFormValues } from '../../types/partnerform.types';
import styles from './PartnerForm.module.scss';
import { handlePartnerSubmit } from './usePartnerForm';

const { TextArea } = Input;

const PartnerForm: React.FC = () => {
  const { t } = useTranslation('partner');

  return (
    <section className={styles.formSection}>
      <h2 className={styles.formTitle}>{t('form.title')}</h2>
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
          <Form.Item name="name" rules={[{ required: true, message: t('form.fullNameRequired') }]}>
            <Input size="large" placeholder={t('form.fullNamePlaceholder')} />
          </Form.Item>

          <Form.Item name="phone" rules={[{ required: true, message: t('form.phoneRequired') }]}>
            <Input size="large" placeholder={t('form.phonePlaceholder')} />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: t('form.emailRequired') },
              { type: 'email', message: t('form.emailInvalid') },
            ]}
          >
            <Input size="large" placeholder={t('form.emailPlaceholder')} />
          </Form.Item>

          <Form.Item name="category">
            <Select
              size="large"
              placeholder={t('form.categoryPlaceholder')}
              options={[
                { label: t('form.categoryOptionTransport'), value: 'vanchuyen' },
                { label: t('form.categoryOptionLocation'), value: 'diadiem' },
              ]}
            />
          </Form.Item>

          <Form.Item name="note">
            <TextArea rows={5} placeholder={t('form.notePlaceholder')} />
          </Form.Item>

          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
              <Button type="primary" size="large">
                {t('form.submitButton')}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default PartnerForm;
