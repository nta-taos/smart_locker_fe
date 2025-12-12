import { useTranslation } from 'react-i18next';

import { EnvironmentOutlined, ShoppingCartOutlined, UnlockOutlined } from '@ant-design/icons';

const useFeatures = () => {
  const { t } = useTranslation('home');

  return [
    {
      image: '/images/feature-map.png',
      icon: <EnvironmentOutlined />,
      title: t('features.mapTitle'),
      description: t('features.mapDescription'),
    },
    {
      image: '/images/feature-lock.png',
      icon: <UnlockOutlined />,
      title: t('features.unlockTitle'),
      description: t('features.unlockDescription'),
    },
    {
      image: '/images/feature-order.png',
      icon: <ShoppingCartOutlined />,
      title: t('features.orderTitle'),
      description: t('features.orderDescription'),
    },
  ];
};

export default useFeatures;
