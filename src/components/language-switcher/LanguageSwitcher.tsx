import React from 'react';
import { useTranslation } from 'react-i18next';

import { GlobalOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps } from 'antd';

import styles from './LanguageSwitcher.module.scss';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const items: MenuProps['items'] = [
    {
      key: 'vi',
      label: (
        <div className={styles.menuItem}>
          <span>Tiếng Việt</span>
        </div>
      ),
      onClick: () => handleLanguageChange('vi'),
    },
    {
      key: 'en',
      label: (
        <div className={styles.menuItem}>
          <span>English</span>
        </div>
      ),
      onClick: () => handleLanguageChange('en'),
    },
  ];
  return (
    <Dropdown
      menu={{ items, selectedKeys: [i18n.language] }}
      placement="bottomRight"
      trigger={['click']}
    >
      <div className={styles.switcher}>
        <GlobalOutlined className={styles.icon} />
      </div>
    </Dropdown>
  );
};

export default LanguageSwitcher;
