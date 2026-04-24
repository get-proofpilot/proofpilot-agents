import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import WhyChooseUs from '@/components/WhyChooseUs';
import Process from '@/components/Process';
import Reviews from '@/components/Reviews';
import ServiceMap from '@/components/ServiceMap';
import StatsGallery from '@/components/StatsGallery';
import DumpTrailer from '@/components/DumpTrailer';
import FAQ from '@/components/FAQ';
import InstagramFeed from '@/components/InstagramFeed';
import CTABanner from '@/components/CTABanner';
import Footer from '@/components/Footer';


const Index = () => {
  return (
    <div className="font-sans antialiased">
      <Header />
      <main>
        <Hero />
        <Services />
        <DumpTrailer />
        <WhyChooseUs />
        
        <Process />
        <Reviews />
        <ServiceMap />
        <StatsGallery />
        
        <FAQ />
        <InstagramFeed />
        <CTABanner />
      </main>
      <Footer />
      
    </div>
  );
};

export default Index;
