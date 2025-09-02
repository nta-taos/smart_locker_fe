import React from 'react';

import Testimonials from '@/components/Testimonials/Testimonials';
import About from '@/components/about/About';
import Features from '@/components/features/Features';
import Hero from '@/components/hero/Hero';

const LadingPage: React.FC = () => {
  return (
    <>
      <Hero />
      <Features />
      <About />
      <Testimonials />
    </>
  );
};

export default LadingPage;
