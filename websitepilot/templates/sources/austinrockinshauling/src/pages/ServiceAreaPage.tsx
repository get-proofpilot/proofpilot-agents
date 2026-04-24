import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, ArrowRight, ChevronDown, MapPin, Truck, Hammer, Mountain, Wrench } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceQuoteCTA from '@/components/ServiceQuoteCTA';
import ServiceAreaMap from '@/components/ServiceAreaMap';
import dirtworkQuoteBg from '@/assets/dirtwork-quote-bg.jpg';
import dirtTextureBg from '@/assets/dirt-texture-bg.jpg';

export interface City {
  name: string;
  paragraphs: string[];
  projects: string;
  zips: string;
  notable?: string;
}

export interface GlanceRow {
  city: string;
  population: string;
  growth: string;
  soil: string;
  topProjects: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface ServiceAreaPageProps {
  region: 'West Valley' | 'East Valley';
  siblingRegion: 'East Valley' | 'West Valley';
  siblingHref: string;
  canonical: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
  heroIntro: string[];
  cities: City[];
  glanceRows: GlanceRow[];
  faqs: FaqItem[];
  cityLinks: { name: string; href: string }[];
  quoteBgImage?: string;
}

const services = [
  {
    icon: Truck,
    title: 'Dump Trailer Rental',
    href: '/dump-trailer-rental',
  },
  {
    icon: Hammer,
    title: 'Demolition Services',
    href: '/demolition-services',
  },
  {
    icon: Mountain,
    title: 'Dirt Work & Grading',
    href: '/dirt-work-phoenix-az',
  },
  {
    icon: Wrench,
    title: 'Skid Steer Services',
    href: '/skid-steer-services-phoenix-az',
  },
];

const ServiceAreaPage = ({
  region,
  siblingRegion,
  siblingHref,
  canonical,
  metaTitle,
  metaDescription,
  heroImage,
  heroIntro,
  cities,
  glanceRows,
  faqs,
  cityLinks,
  quoteBgImage,
}: ServiceAreaPageProps) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceDescriptions: Record<string, string> = region === 'West Valley'
    ? {
        'Dump Trailer Rental':
          'Load your own material into our 14-foot dump trailers. Standard walls (~6 cubic yards) and high-side walls (~9 cubic yards), both rated ~14,000 lb GVWR. We deliver, you load, we haul.',
        'Demolition Services':
          'We tear down sheds, garages, mobile homes, slabs, patios, and pools — and load every bit of the debris into our own dump trailers. One crew handles teardown and cleanup.',
        'Dirt Work & Grading':
          'Lot grading, land clearing, trenching, backfill, and site prep. West Valley sandy soil grades faster and compacts easier than East Valley caliche.',
        'Skid Steer Services':
          'We bring the skid steer, run the equipment, and haul the material. Full-size, compact track, and mini units for tight-access West Valley backyards.',
      }
    : {
        'Dump Trailer Rental':
          'Two 14-foot dump trailers — standard walls (~6 cubic yards) and high-side walls (~9 cubic yards). We deliver to your East Valley property. You load it. We haul it.',
        'Demolition Services':
          'Residential and light commercial demo across the East Valley. Sheds, garages, pools, slabs, mobile homes, and small structures — demoed and hauled by one crew.',
        'Dirt Work & Grading':
          'East Valley dirt work requires equipment built for caliche. We bring ripper teeth, hydraulic breakers, and the experience to handle Mesa, Gilbert, and Apache Junction conditions.',
        'Skid Steer Services':
          'Full-size skid steers, compact track loaders, and mini skid steers for every East Valley project. Grading, clearing, trenching, demo, and material moving with the operator included.',
      };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Rocking S Hauling',
    description: metaDescription,
    url: canonical,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Phoenix',
      addressRegion: 'AZ',
      addressCountry: 'US',
    },
    areaServed: cities.map((c) => ({ '@type': 'City', name: c.name })),
    serviceType: ['Dump Trailer Rental', 'Demolition', 'Dirt Work', 'Skid Steer Services', 'Material Hauling'],
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      </Helmet>

      <Header />

      {/* ── HERO ── */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-end overflow-hidden">
        <img
          src={heroImage}
          alt={`${region} hauling, demolition, and dirt work services in Phoenix AZ`}
          className="absolute inset-0 w-full h-full object-cover object-center"
          width={1920}
          height={1080}
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/80 to-foreground/60" />
        <div className="relative z-10 container-custom pb-12 md:pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-3 block">
              Service Area
            </span>
            <h1 className="text-4xl md:text-6xl xl:text-7xl font-black uppercase text-background leading-none mb-4">
              {region}<br />Hauling, Demo & <span className="text-primary">Dirt Work</span>
            </h1>
            <p className="text-background/95 text-lg md:text-xl max-w-2xl font-medium">
              Dump trailer rental, demolition, dirt work, and skid steer services across every {region} city. One company. One call.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <a
                href="#quote"
                className="bg-primary text-primary-foreground px-8 py-4 text-sm font-black uppercase tracking-widest hover:bg-background hover:text-foreground transition-all inline-flex items-center justify-center gap-2"
              >
                Free {region} Estimate <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="tel:4801234567"
                className="border-2 border-background text-background px-8 py-4 text-sm font-black uppercase tracking-widest hover:bg-background hover:text-foreground transition-all inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" /> Call (480) 123-4567
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="section-padding bg-background">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-8 text-foreground">
              {region} <span className="text-primary">Service Coverage</span>
            </h2>
            <div className="space-y-6 text-foreground text-lg md:text-xl leading-[1.85]">
              {heroIntro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WHAT WE DO ── */}
      <section className="section-padding bg-foreground">
        <div className="container-custom max-w-6xl">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block bg-primary text-primary-foreground px-4 py-2 text-xs font-black uppercase tracking-widest mb-4">
              What We Do
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase mb-4 text-background">
              What We Do In The <span className="text-primary">{region}</span>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((svc, idx) => (
              <motion.a
                key={idx}
                href={svc.href}
                className="bg-background p-6 border-2 border-primary group hover:bg-primary transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="w-14 h-14 bg-primary group-hover:bg-background flex items-center justify-center mb-4 transition-colors">
                  <svc.icon className="w-7 h-7 text-primary-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-black uppercase text-base mb-3 tracking-wide text-foreground group-hover:text-background transition-colors">
                  {svc.title}
                </h3>
                <p className="text-foreground/80 group-hover:text-background/90 text-sm leading-relaxed mb-4 transition-colors">
                  {serviceDescriptions[svc.title]}
                </p>
                <span className="inline-flex items-center gap-2 text-primary group-hover:text-background font-black uppercase text-xs tracking-widest transition-colors">
                  Learn More <ArrowRight className="w-3 h-3" />
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CITIES WE SERVE ── */}
      <section className="section-padding bg-background">
        <div className="container-custom max-w-6xl">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block bg-primary text-primary-foreground px-4 py-2 text-xs font-black uppercase tracking-widest mb-4">
              Cities We Serve
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase mb-4 text-foreground">
              {region} Cities <span className="text-primary">We Cover</span>
            </h2>
            <p className="text-foreground/85 text-lg max-w-3xl mx-auto font-medium">
              Every neighborhood, every zip code, every project size — handled.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {cities.map((city, idx) => (
              <motion.div
                key={idx}
                className="bg-background p-7 border-l-4 border-primary shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.04 }}
              >
                <h3 className="text-2xl md:text-3xl font-black uppercase mb-4 text-foreground tracking-tight">
                  {city.name}
                </h3>
                <div className="space-y-3 text-foreground/90 text-base leading-relaxed mb-5">
                  {city.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <div className="border-t border-border pt-4 space-y-2 text-sm">
                  <div>
                    <span className="font-black uppercase text-primary tracking-wider text-xs mr-1">
                      Common Projects:
                    </span>{' '}
                    <span className="text-foreground font-medium">{city.projects}</span>
                  </div>
                  <div>
                    <span className="font-black uppercase text-primary tracking-wider text-xs mr-1">
                      Zip Codes:
                    </span>{' '}
                    <span className="text-foreground font-medium">{city.zips}</span>
                  </div>
                  {city.notable && (
                    <div>
                      <span className="font-black uppercase text-primary tracking-wider text-xs mr-1">
                        Notable Areas:
                      </span>{' '}
                      <span className="text-foreground font-medium">{city.notable}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AT A GLANCE TABLE ── */}
      <section className="section-padding bg-foreground text-background">
        <div className="container-custom max-w-6xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase mb-4">
              {region} At A <span className="text-primary">Glance</span>
            </h2>
            <p className="text-background/80 text-lg">
              Population, growth, soil conditions, and the projects we run most often.
            </p>
          </motion.div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="p-4 font-black uppercase text-xs tracking-widest">City</th>
                  <th className="p-4 font-black uppercase text-xs tracking-widest">Population</th>
                  <th className="p-4 font-black uppercase text-xs tracking-widest">Growth</th>
                  <th className="p-4 font-black uppercase text-xs tracking-widest">Soil</th>
                  <th className="p-4 font-black uppercase text-xs tracking-widest">Top Projects</th>
                </tr>
              </thead>
              <tbody>
                {glanceRows.map((row, idx) => (
                  <tr
                    key={idx}
                    className="bg-background text-foreground border-b border-border hover:bg-muted transition-colors"
                  >
                    <td className="p-4 font-black uppercase text-sm">{row.city}</td>
                    <td className="p-4 text-sm font-medium">{row.population}</td>
                    <td className="p-4 text-sm font-medium text-primary">{row.growth}</td>
                    <td className="p-4 text-sm">{row.soil}</td>
                    <td className="p-4 text-sm">{row.topProjects}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-10 p-8 md:p-10 text-center">
            <h3 className="text-2xl md:text-3xl font-black uppercase mb-3 text-background">
              Serving Every {region} City
            </h3>
            <p className="text-background/80 text-base md:text-lg mb-6">
              {region === 'West Valley'
                ? 'Buckeye to Glendale. Peoria to Laveen.'
                : 'Mesa to Apache Junction. Scottsdale to Casa Grande.'}
            </p>
            <a
              href="#quote"
              className="inline-block bg-background text-foreground hover:bg-primary hover:text-primary-foreground px-8 py-4 font-black uppercase tracking-tight text-base md:text-lg transition-all hover:scale-95"
            >
              Free Quote
            </a>
          </div>
        </div>
      </section>

      {/* ── AREAS WE SERVE MAP ── */}
      <section className="section-padding bg-background">
        <div className="container-custom max-w-6xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-4 text-foreground">
              On The <span className="text-primary">Map</span>
            </h2>
            <p className="text-foreground text-lg font-medium">
              Every {region} community we cover — and a quick jump to our sibling{' '}
              <a href={siblingHref} className="text-primary underline font-black">
                {siblingRegion} service area
              </a>.
            </p>
          </motion.div>
          <ServiceAreaMap />
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mt-10">
            {cityLinks.map((c, i) => (
              <div key={i} className="flex items-center gap-2 bg-foreground p-3 border-l-4 border-primary">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-white font-black text-sm uppercase tracking-wide">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-padding bg-muted">
        <div className="container-custom max-w-4xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-4">
              {region} <span className="text-primary">FAQ</span>
            </h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                className="bg-background border border-border overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-primary hover:text-primary-foreground transition-colors group/faq"
                >
                  <span className="font-black uppercase text-sm tracking-wide pr-4 group-hover/faq:text-primary-foreground">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-primary flex-shrink-0 transition-transform group-hover/faq:text-primary-foreground ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 border-t border-border">
                    <p className="text-foreground/90 leading-relaxed pt-4 text-base">{faq.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href={siblingHref}
              className="inline-flex items-center gap-2 text-primary font-black uppercase text-sm tracking-widest hover:text-foreground transition-colors"
            >
              Looking for the {siblingRegion}? <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <ServiceQuoteCTA backgroundImage={quoteBgImage ?? dirtworkQuoteBg} />
      <Footer />
    </div>
  );
};

export default ServiceAreaPage;
