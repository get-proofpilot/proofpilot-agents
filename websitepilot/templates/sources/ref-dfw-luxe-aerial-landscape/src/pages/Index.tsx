import Header from '../components/Header';
import Hero from '../components/Hero';
import TrustSignalsRow from '../components/TrustSignalsRow';
import Services from '../components/Services';
import LandscapeDroneReelGrid from '../components/LandscapeDroneReelGrid';
import DroneAerialAboutFounder from '../components/DroneAerialAboutFounder';
import GalleryMasonryAerials from '../components/GalleryMasonryAerials';
import Process from '../components/Process';
import Reviews from '../components/Reviews';
import InlineQuoteForm from '../components/InlineQuoteForm';
import ServiceArea from '../components/ServiceArea';
import CTABand from '../components/CTABand';
import Footer from '../components/Footer';

/**
 * Pre-composed bundle: dfw-luxe-aerial base + LANDSCAPE / OUTDOOR LIVING vertical.
 *
 * Section rhythm (per spec):
 *   1.  Header                        — logo + nav + Google star pill CTA
 *   2.  Hero                          — full-bleed aerial w/ 138deg navy overlay
 *   3.  TrustSignalsRow               — 4-up trust signals
 *   4.  Services                      — 6-card landscape services grid
 *   5.  LandscapeDroneReelGrid        [vertical] — looping drone reels (Pro Outdoor)
 *   6.  GalleryMasonryAerials         [vertical] — 4-col masonry w/ 2x2 hero tile
 *   7.  DroneAerialAboutFounder       [vertical] — navy-band founder block + stat badge
 *   8.  Process                       — design-build process
 *   9.  Reviews                       — Google review pull-quotes
 *  10.  InlineQuoteForm               — quote form
 *  11.  ServiceArea                   — programmatic areas-served
 *  12.  CTABand                       — chunky offset-shadow final CTA
 *  13.  Footer
 *
 * Reels are the conversion centerpiece. Masonry sits behind reels as a secondary
 * gallery for still-image work the drone footage misses. Founder block follows
 * portfolio so the buyer falls in love with work first, then meets the person.
 */
export default function Index() {
  return (
    <main className="bg-white">
      <Header />
      <Hero />
      <TrustSignalsRow />
      <Services />
      <LandscapeDroneReelGrid
        brand={{ ink: '#121A1E', accent: '#2D6A4F', surface: '#E8F2EC' }}
      />
      <GalleryMasonryAerials
        eyebrow="Portfolio"
        headlineLead="From"
        headlineAccent="400 feet up"
        headlineTrail="and ground-level."
        viewAllLabel="See All Projects"
        viewAllHref="#portfolio"
        tiles={[
          { label: 'Estate · Outdoor Living', span2x2: true },
          { label: 'Modern Pool & Hardscape' },
          { label: 'Front Approach + Lighting' },
          { label: 'Pavilion & Kitchen' },
          { label: 'Plunge Pool & Deck' },
          { label: 'Garden & Pathway' },
        ]}
      />
      <DroneAerialAboutFounder
        headlineLead="Designed by"
        headlineAccent="the same person"
        headlineTrail="who walks your property on day one."
        body="I started this studio because the landscape industry runs on hand-offs &mdash; designer to estimator to crew, with the original vision lost somewhere in the middle. We do it the opposite way: one designer from sketch through final walkthrough. The result is properties that feel intentional from the air and from the front door."
        portraitAlt="Founder portrait"
        badge={{ value: '15+', label: 'Years Designing' }}
        stats={[
          { value: '300+', label: 'Properties Delivered' },
          { value: '98%', label: 'Referral Rate' },
        ]}
      />
      <Process />
      <Reviews />
      <InlineQuoteForm />
      <ServiceArea />
      <CTABand />
      <Footer />
    </main>
  );
}
