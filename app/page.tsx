'use client';

import { 
  Navbar, 
  Footer, 
  HeroSection, 
  FeaturesSection, 
  CategoriesSection, 
  HowItWorksSection, 
  CTASection 
} from '@/components/landing';
import { FEATURES, CATEGORIES, HOW_IT_WORKS_STEPS } from '@/lib/constants';

export default function HomePage() {
  // Convert readonly arrays to mutable for component props
  const features = [...FEATURES];
  const steps = [...HOW_IT_WORKS_STEPS];

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection id="features" features={features} />
      {/* <CategoriesSection id="templates" categories={categories} /> */}
      <HowItWorksSection steps={steps} />
      <CTASection />
      <Footer />
    </div>
  );
}
