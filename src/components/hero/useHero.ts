import { useTranslation } from 'react-i18next';

export const useHero = () => {
  const { t } = useTranslation('home');

  const title = t('hero.title');
  const subtitle = t('hero.subtitle');
  const description = t('hero.description');
  const ctaText = t('hero.cta');

  return { title, subtitle, description, ctaText };
};
