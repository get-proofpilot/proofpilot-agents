import PromoBarTop from "../components/PromoBarTop";
import Header from "../components/Header";
import Hero from "../components/Hero";
import TrustBarIcons from "../components/TrustBarIcons";
import Services from "../components/Services";
import DarkContactBand from "../components/DarkContactBand";
import AboutMascot from "../components/AboutMascot";
import Partnerships from "../components/Partnerships";
import CouponsGrid from "../components/CouponsGrid";
import Reviews from "../components/Reviews";
import ServiceAreaMap from "../components/ServiceAreaMap";
import BlogPosts from "../components/BlogPosts";
import Footer from "../components/Footer";

/**
 * Contractor Heritage reference page order — mirrors Bears Plumbing home.
 * DO NOT reorder casually. The promo-bar → hero-with-inline-form → 4-icon-trust → services
 * rhythm is the Hook-contractor DNA.
 */
export default function Index() {
  return (
    <>
      <PromoBarTop />
      <Header />
      <Hero />
      <TrustBarIcons />
      <Services />
      <DarkContactBand />
      <AboutMascot />
      <Partnerships />
      <CouponsGrid />
      <Reviews />
      <ServiceAreaMap />
      <BlogPosts />
      <Footer />
    </>
  );
}
