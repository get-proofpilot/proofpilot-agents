import UtilityBar from '../components/UtilityBar';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ServiceRibbon from '../components/ServiceRibbon';
import Intro from '../components/Intro';
import Services from '../components/Services';
import TrustUSPs from '../components/TrustUSPs';
import MidCTABand from '../components/MidCTABand';
import PeaceOfMind from '../components/PeaceOfMind';
import Reviews from '../components/Reviews';
import Comparison from '../components/Comparison';
import SixStepProcess from '../components/SixStepProcess';
import ServiceArea from '../components/ServiceArea';
import FAQ from '../components/FAQ';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';

export default function Index() {
  return (
    <main className="bg-white">
      <UtilityBar />
      <Header />
      <Hero />
      <ServiceRibbon />
      <Intro />
      <Services />
      <TrustUSPs />
      <MidCTABand />
      <PeaceOfMind />
      <Reviews />
      <Comparison />
      <SixStepProcess />
      <ServiceArea />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
