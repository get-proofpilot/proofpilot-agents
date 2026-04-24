import Header from '../components/Header';
import Hero from '../components/Hero';
import TrustSignalsRow from '../components/TrustSignalsRow';
import Services from '../components/Services';
import About from '../components/About';
import Gallery from '../components/Gallery';
import Process from '../components/Process';
import Reviews from '../components/Reviews';
import InlineQuoteForm from '../components/InlineQuoteForm';
import ServiceArea from '../components/ServiceArea';
import FAQ from '../components/FAQ';
import CTABand from '../components/CTABand';
import Footer from '../components/Footer';

export default function Index() {
  return (
    <main className="bg-white">
      <Header />
      <Hero />
      <TrustSignalsRow />
      <Services />
      <About />
      <Gallery />
      <Process />
      <Reviews />
      <InlineQuoteForm />
      <ServiceArea />
      <FAQ />
      <CTABand />
      <Footer />
    </main>
  );
}
