import { useTranslation } from 'react-i18next';

const useTestimonials = () => {
  const { t } = useTranslation('home');

  return {
    testimonials: [
      {
        stars: 5,
        text: t('testimonials.reviews.review1'),
        author: t('testimonials.reviews.author1'),
        position: t('testimonials.reviews.position1'),
        company: t('testimonials.reviews.position1'),
        companyUrl: '#',
      },
      {
        stars: 5,
        text: t('testimonials.reviews.review2'),
        author: t('testimonials.reviews.author2'),
        position: t('testimonials.reviews.position2'),
        company: 'Công ty TNHH 1MT',
        companyUrl: '#',
      },
      {
        stars: 5,
        text: t('testimonials.reviews.review3'),
        author: t('testimonials.reviews.author3'),
        position: t('testimonials.reviews.position3'),
        company: 'Công ty TNHH 1MT',
        companyUrl: '#',
      },
      {
        stars: 5,
        text: t('testimonials.reviews.review4'),
        author: t('testimonials.reviews.author4'),
        position: t('testimonials.reviews.position4'),
        company: 'Công ty TNHH 1MT',
        companyUrl: '#',
      },
    ],
    stats: {
      trust: '99.9%',
      customers: '500+',
      rating: '4.9/5',
    },
  };
};

export default useTestimonials;
