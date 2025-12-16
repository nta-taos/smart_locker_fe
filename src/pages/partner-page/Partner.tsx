import React from 'react';
import { useTranslation } from 'react-i18next';

import { Card, Col, Row, Tabs } from 'antd';

import { PartnerIcon2, PartnerIcon3 } from '@/components/common/icon/Partner';
import PartnerForm from '@/components/partner-form/PartnerForm';

import styles from './Partner.module.scss';

const Partner: React.FC = () => {
  const { t } = useTranslation('partner');

  const partnersData = [
    {
      key: '1',
      label: (
        <span className={styles.tabLabel}>
          <PartnerIcon2 className={styles.tabIcon} />
          <span className={styles.tabText}>{t('tabs.delivery')}</span>
        </span>
      ),
      description: t('delivery.description'),
      partners: [
        {
          logo: '/images/fulta.png',
          text: t('delivery.fulta'),
        },
        {
          logo: '/images/nhat_tin.jpg',
          text: t('delivery.nhat_tin'),
        },
      ],
    },
    {
      key: '2',
      label: (
        <span className={styles.tabLabel}>
          <PartnerIcon3 className={styles.tabIcon} />
          <span className={styles.tabText}>{t('tabs.location')}</span>
        </span>
      ),
      description: t('location.description'),
      partners: [
        {
          logo: '/images/FPT.png',
          text: t('location.fpt'),
        },
        {
          logo: '/images/bau_tram.jpg',
          text: t('location.bau_tram'),
        },
        {
          logo: '/images/logo_monarchy.png',
          text: t('location.monarchy'),
        },
        {
          logo: '/images/mobiphone.webp',
          text: t('location.mobifone'),
        },
        {
          logo: '/images/vinaconex.webp',
          text: t('location.vinaconex'),
        },
      ],
    },
  ];

  return (
    <div className={styles.partnersWrapper}>
      <div className={styles.hero}>
        <img src="/images/partner.webp" alt="Hero" className={styles.heroImg} />
        <h1 className={styles.heroTitle}>{t('hero.title')}</h1>
      </div>

      <Tabs
        defaultActiveKey="1"
        type="card"
        className={styles.heroTabs}
        items={partnersData.map((tab) => ({
          key: tab.key,
          label: tab.label,
          children: (
            <div className={styles.partnersSection}>
              <Row gutter={[24, 24]} style={{ margin: 0 }} className={styles.grid}>
                {tab.partners.map((p, i) => (
                  <Col xs={24} sm={12} md={12} lg={12} key={i}>
                    <Card className={styles.partnerCard}>
                      <div className={styles.partnerContent}>
                        <img src={p.logo} className={styles.partnerLogo} />
                        <div className={styles.text}>
                          <p>{p.text}</p>
                        </div>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          ),
        }))}
      />

      <PartnerForm />
    </div>
  );
};

export default Partner;
