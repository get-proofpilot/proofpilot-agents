import Header from "../components/Header";
import Hero from "../components/Hero";
import TrustBar from "../components/TrustBar";
import Services from "../components/Services";
import WhyUs from "../components/WhyUs";
import GuaranteeBand from "../components/GuaranteeBand";
import Reviews from "../components/Reviews";
import Process from "../components/Process";
import ServiceArea from "../components/ServiceArea";
import Faq from "../components/Faq";
import CTABand from "../components/CTABand";
import Footer from "../components/Footer";

/**
 * Section order mirrors voltvikings.com DNA (see /tmp/recon-volt/DNA.md):
 *  1  Header
 *  2  Hero (dark night-sky + mascot peek)
 *  3  TrustBar (cream intro + 4 bullets)
 *  4  Services (dark purple 2×4 grid)
 *  5  WhyUs (cream: 4-pillar row + 6-card "Why Choose Us")
 *  6  GuaranteeBand (orange full-bleed + zigzag separator)
 *  7  Reviews (dark purple, 2 testimonials)
 *  8  Process (cream, 3 numbered steps)
 *  9  ServiceArea (dark purple, city pills)
 * 10  Faq (cream, purple accordion bars)
 * 11  CTABand (dark final drum-roll with mascot)
 * 12  Footer (4-col dark)
 */
export default function Index() {
  return (
    <div className="min-h-screen font-sans">
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <WhyUs />
        <GuaranteeBand />
        <Reviews />
        <Process />
        <ServiceArea />
        <Faq />
        <CTABand />
      </main>
      <Footer />
    </div>
  );
}
