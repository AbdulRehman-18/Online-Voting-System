import React from 'react';
import HeroSection from '../components/home/HeroSection';
import HowItWorks from '../components/home/HowItWorks';
import FeaturesGrid from '../components/home/FeaturesGrid';
import Testimonials from '../components/home/Testimonials';
import SecuritySection from '../components/home/SecuritySection';
import PricingSection from '../components/home/PricingSection';
import FAQSection from '../components/home/FAQSection';

const HomePage: React.FC = () => {
  // Set page title
  React.useEffect(() => {
    document.title = 'Votera - Secure Online Voting System';
  }, []);
  
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <FeaturesGrid />
      <Testimonials />
      <SecuritySection />
      <PricingSection />
      <FAQSection />
    </>
  );
};

export default HomePage;