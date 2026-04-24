import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import About from '@/components/About';
import AboutSection from '@/components/AboutSection';
import Services from '@/components/Services';
import Process from '@/components/Process';
import WhyChooseUs from '@/components/WhyChooseUs';
import FAQ from '@/components/FAQ';
import Testimonials from '@/components/Testimonials';
import Locations from '@/components/Locations';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="bg-white flex flex-col items-center smooth-scroll">
      <Header />
      
      <main className="w-full flex flex-col items-center">
        <Hero />
        <Stats />
        <About />
        <AboutSection />
        <Services />
        <Process />
        <WhyChooseUs />
        <Testimonials />
        <FAQ />
        <Locations />
        <ContactForm />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

