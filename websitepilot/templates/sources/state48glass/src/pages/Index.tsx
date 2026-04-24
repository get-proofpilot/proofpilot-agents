import React from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { TrustBadges } from '@/components/TrustBadges';
import { InspectionForm } from '@/components/InspectionForm';
import { CashBackBanner } from '@/components/CashBackBanner';
import { AboutVideo } from '@/components/AboutVideo';
import { Services } from '@/components/Services';
import { DetailedServices } from '@/components/DetailedServices';
import { Statistics } from '@/components/Statistics';
import { Process } from '@/components/Process';
import { Benefits } from '@/components/Benefits';
import { WindshieldInfoTabs } from '@/components/WindshieldInfoTabs';
import { PricingSection } from '@/components/PricingSection';
import { Testimonials } from '@/components/Testimonials';
import { GivingBackSection } from '@/components/GivingBackSection';
import { AftercareSection } from '@/components/AftercareSection';
import { FAQ } from '@/components/FAQ';
import { HoursSection } from '@/components/HoursSection';
import { ServiceAreas } from '@/components/ServiceAreas';
import { LocationContact } from '@/components/LocationContact';
import { Footer } from '@/components/Footer';

function Index() {
  return (
    <div className="min-h-screen font-sans text-slate-800 bg-white">
      <Header />
      <main>
        <div id="home">
          <Hero />
        </div>
        <TrustBadges />
        <div id="quote">
          <InspectionForm />
        </div>
        <CashBackBanner />
        <div id="about">
          <AboutVideo />
        </div>
        <div id="services">
          <Services />
        </div>
        <DetailedServices />
        <Statistics />
        <Process />
        <div id="why-us">
          <Benefits />
        </div>
        <WindshieldInfoTabs />
        <PricingSection />
        <Testimonials />
        <GivingBackSection />
        <AftercareSection />
        <div id="faq">
          <FAQ />
        </div>
        <HoursSection />
        <ServiceAreas />
        <LocationContact />
      </main>
      <Footer />
    </div>
  );
}

export default Index;