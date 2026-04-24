import React from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { InspectionForm } from '@/components/InspectionForm';
import { AboutVideo } from '@/components/AboutVideo';
import { Services } from '@/components/Services';
import { Process } from '@/components/Process';
import { Benefits } from '@/components/Benefits';
import { Testimonials } from '@/components/Testimonials';
import { FAQ } from '@/components/FAQ';
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
        <div id="quote">
          <InspectionForm />
        </div>
        <div id="about">
          <AboutVideo />
        </div>
        <div id="services">
          <Services />
        </div>
        <Process />
        <Benefits />
        <Testimonials />
        <div id="faq">
          <FAQ />
        </div>
        <ServiceAreas />
        <LocationContact />
      </main>
      <Footer />
    </div>
  );
}

export default Index;