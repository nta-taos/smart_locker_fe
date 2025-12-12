import { useTranslation } from 'react-i18next';

export const useIntro = () => {
  const { t } = useTranslation('home');

  const title = t('intro.title');
  const image = '/images/intro-bg.png';
  const xName = 'Zipbox';
  const xLink = 'Zipbox';

  const startLable = t('intro.startButton');
  const startLink = '/';

  return {
    title,
    image,
    xName,
    xLink,
    startLable,
    startLink,
  };
};
