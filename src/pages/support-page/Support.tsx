import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
  QrcodeOutlined,
} from '@ant-design/icons';
import { Card, Col, Row, Space } from 'antd';
import { Button } from 'antd';

import SupportIcon from '@/components/common/icon/Support';
import SupportForm from '@/components/support-form/SupportForm';

import styles from './Support.module.scss';

// Search Section
const SearchSection = () => {
  const { t } = useTranslation('support');
  return (
    <section className={styles.searchSection}>
      <div className={styles.content}>
        <div className={styles.left}>
          <span className={styles.subTitle}>
            <SupportIcon className={styles.icon} />
            {t('hero.subtitle')}
          </span>
          <h1>{t('hero.title')}</h1>
          <p>{t('hero.description')}</p>

          <div className={styles.searchBox}>
            <input type="text" placeholder={t('hero.searchPlaceholder')} className={styles.input} />

            <Button type="primary" size="large" className={styles.searchBox}>
              {t('hero.searchButton')}
            </Button>
          </div>

          <div className={styles.popular}>
            <span className={styles.label}>{t('hero.popularTitle')}</span>
            <div className={styles.tags}>
              <button className={styles.tag}>{t('hero.popularTags.deposit')}</button>
              <button className={styles.tag}>{t('hero.popularTags.guide')}</button>
              <button className={styles.tag}>{t('hero.popularTags.rental')}</button>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <img src="/images/support.webp" loading="lazy" alt="Support Search" />
        </div>
      </div>
    </section>
  );
};

// Stats Section
const StatsSection = () => {
  const { t } = useTranslation('support');
  return (
    <section className={styles.statsSection}>
      <Row justify="center" gutter={[12, 12]}>
        <Col xs={11} sm={12} md={12} lg={4}>
          <Card
            className={styles.statsCard}
            bodyStyle={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 0,
            }}
          >
            <Space direction="vertical" align="center">
              <Space align="center" style={{ color: '#074CE7' }}>
                <PhoneOutlined style={{ fontSize: 32 }} />
                <span>{t('contact.hotline')}</span>
              </Space>
              <div>{t('contact.hotlineNumber')}</div>
            </Space>
          </Card>
        </Col>

        <Col xs={11} sm={12} md={12} lg={4}>
          <Card
            className={styles.statsCard}
            bodyStyle={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 0,
            }}
          >
            <Space direction="vertical" align="center">
              <Space align="center" style={{ color: '#074CE7' }}>
                <MailOutlined style={{ fontSize: 24 }} />
                <span>{t('contact.email')}</span>
              </Space>
              <div style={{ width: '100%' }}>{t('contact.emailAddress')}</div>
            </Space>
          </Card>
        </Col>

        <Col xs={11} sm={12} md={12} lg={4}>
          <Card
            className={styles.statsCard}
            bodyStyle={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 0,
            }}
          >
            <Space direction="vertical" align="center">
              <Space align="center" style={{ color: '#074CE7' }}>
                <QrcodeOutlined style={{ fontSize: 24 }} />
                <span>{t('contact.qrCode')}</span>
              </Space>
              <div>{t('contact.qrCodeText')}</div>
            </Space>
          </Card>
        </Col>

        <Col xs={11} sm={12} md={12} lg={4}>
          <Card
            className={styles.statsCard}
            bodyStyle={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 0,
            }}
          >
            <Space direction="vertical" align="center">
              <Space align="center" style={{ color: '#074CE7' }}>
                <EnvironmentOutlined style={{ fontSize: 24 }} />
                <span>{t('contact.address')}</span>
              </Space>
              <div>{t('contact.addressText')}</div>
            </Space>
          </Card>
        </Col>
      </Row>
    </section>
  );
};

// Form Section
const FormSection = () => {
  return (
    <section className={styles.formSection}>
      <Row
        gutter={[32, 32]}
        align="middle"
        justify="center"
        style={{ marginLeft: 0, marginRight: 0 }}
      >
        <Col xs={24} md={12} className={styles.formImage}>
          <img src="/images/support2.webp" alt="Support action" />
        </Col>
        <Col xs={24} md={12} className={styles.formBox}>
          <SupportForm />
        </Col>
      </Row>
    </section>
  );
};

// Office Section
const OfficeSection = () => {
  const { t } = useTranslation('support');
  return (
    <section className={styles.office}>
      <div className={styles.officeText}>
        <h2>{t('office.title')}</h2>
        <p>{t('office.description')}</p>
        <ul>
          <EnvironmentOutlined style={{ color: '#074CE7', marginRight: '8px' }} />{' '}
          {t('office.addressLabel')}
          <li></li>
          <li>{t('office.addressText')}</li>
          <ClockCircleOutlined style={{ color: '#074CE7', marginRight: '8px' }} />{' '}
          {t('office.hoursLabel')}
          <li></li>
          <li>{t('office.hoursWeekday')}</li>
          <li>{t('office.hoursSaturday')}</li>
        </ul>

        <Button type="primary" size="large">
          {t('office.viewMapButton')}
        </Button>
      </div>
      <div className={styles.officeMap}>
        <img src="/images/support3.png" alt="Map" />
      </div>
    </section>
  );
};

// Main
const SupportPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <SearchSection />
      <StatsSection />
      <FormSection />
      <OfficeSection />
    </div>
  );
};

export default SupportPage;
