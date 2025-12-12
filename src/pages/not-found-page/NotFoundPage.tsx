import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Button, Result } from 'antd';

const NotFoundPage = () => {
  const { t } = useTranslation('common');
  return (
    <Result
      status="404"
      title="404"
      subTitle={t('notFound.subtitle')}
      extra={
        <Link to="/dashboard">
          <Button type="primary">{t('notFound.backHome')}</Button>
        </Link>
      }
    />
  );
};
export default NotFoundPage;
