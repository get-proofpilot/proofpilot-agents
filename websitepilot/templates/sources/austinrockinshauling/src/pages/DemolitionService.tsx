import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Phone, ArrowRight, ChevronDown, MapPin, ClipboardCheck, Hammer, Truck, Sparkles, HardHat, ShieldCheck, DollarSign, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceQuoteCTA from '@/components/ServiceQuoteCTA';
import heroImg from '@/assets/demo-hero.webp';
import permitsBg from '@/assets/permits-bg.jpg';
import servicesBg from '@/assets/demo-services-bg.jpg';
import { Helmet } from 'react-helmet-async';
import ServiceAreaMap from '@/components/ServiceAreaMap';
import iconSitePrep from '@/assets/demo-icon-site-prep.svg';
import iconResidential from '@/assets/demo-icon-residential.svg';
import iconCommercial from '@/assets/demo-icon-commercial.svg';
import iconInterior from '@/assets/demo-icon-interior.svg';
import iconGarage from '@/assets/demo-icon-garage.svg';
import iconPool from '@/assets/demo-icon-pool.svg';
import iconConcrete from '@/assets/demo-icon-concrete.svg';
import iconShed from '@/assets/demo-icon-shed.svg';
import iconMobileHome from '@/assets/demo-icon-mobile-home.svg';
import iconFoundation from '@/assets/demo-icon-foundation.svg';
import iconLightDemo from '@/assets/demo-icon-light-demo.svg';
import iconExcavatorCheck from '@/assets/demo-icon-excavator-check.svg';

/* ── Services We Offer ── */
type ServiceItem = {
  image?: string;
  alt?: string;
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
};

const services: ServiceItem[] = [
  { image: iconResidential, alt: "Residential house demolition icon — single-family home tear-down service in Phoenix", title: "Residential Demolition", desc: "Full home tear-downs, additions, and outbuildings. We handle the full project from permit to final cleanup." },
  { image: iconCommercial, alt: "Commercial building demolition icon — office and retail tear-down service", title: "Commercial Demolition", desc: "Retail build-outs, warehouse tear-downs, office strip-outs, and tenant improvement demolition with licensed crews." },
  { image: iconInterior, alt: "Interior demolition icon — selective room and wall tear-out for remodels", title: "Interior Demolition", desc: "Selective tear-outs for kitchen remodels, bathroom renovations, flooring replacement, and full interior gut jobs." },
  { image: iconGarage, alt: "Garage demolition icon — attached and detached garage removal", title: "Garage Demolition", desc: "Attached or detached garages. Slab removal included or left in place. Most garages come down in one to two days." },
  { image: iconPool, alt: "Swimming pool demolition icon — pool removal and fill-in service", title: "Pool Demolition", desc: "Partial fill-in or full pool removal. We break up the shell, haul off the debris, and backfill the area." },
  { image: iconConcrete, alt: "Concrete slab demolition icon — driveway, patio and slab removal", title: "Concrete Demolition & Removal", desc: "Driveways, patios, walkways, slabs, and foundations. We route clean concrete to recycling facilities." },
  { image: iconShed, alt: "Shed and outbuilding demolition icon — backyard structure removal", title: "Shed & Outbuilding Demolition", desc: "Metal sheds, wood sheds, carports, and any backyard structure. Fast removal with same-day haul-off." },
  { image: iconMobileHome, alt: "Mobile home demolition icon — single-wide and double-wide trailer tear-down", title: "Mobile Home Demolition", desc: "Single-wide and double-wide mobile homes. Full tear-down including foundation blocks, utilities, and debris." },
  { image: iconFoundation, alt: "Foundation removal icon — slab, stem wall and footing excavation", title: "Foundation Removal", desc: "Slab foundations, stem walls, and footings. Required when rebuilding on a cleared lot or expanding." },
  { image: iconLightDemo, alt: "Light demolition icon — sledgehammer breaking a single wall for selective demo", title: "Light Demolition", desc: "Single walls, rooms, fencing, decking, and targeted selective demo. Too big for DIY, perfect for our crew." },
  { image: iconSitePrep, alt: "Site preparation icon — bulldozer clearing and grading a lot for new construction", title: "Site Preparation", desc: "Clearing lots for new construction. Tear-down, debris removal, rough grading, and site prep." },
];

/* ── Why Choose Us ── */
const whyUs = [
  { icon: HardHat, title: "Demo & Haul-Off", desc: "We started as Phoenix's dump trailer and hauling service. Now we do both ends of the project. No coordinating multiple contractors. One crew, one quote, one completion date." },
  { icon: ShieldCheck, title: "Licensed & Insured", desc: "Every project is backed by full Arizona contractor licensing and liability coverage. Ask to see our paperwork on any estimate." },
  { icon: DollarSign, title: "Transparent Pricing", desc: "Free on-site estimates with written quotes. No hidden fees. No surprise dump charges. The number we give you is the number you pay." },
  { icon: Clock, title: "Same-Day Estimates", desc: "Call in the morning, we walk your project the same day on most weekdays. Quotes turned around within 24 hours in writing." },
];

/* ── Process ── */
const processSteps = [
  { icon: Phone, step: "01", title: "Estimate It", desc: "We come to your property, walk the project, and give you a firm written quote with no obligation." },
  { icon: ClipboardCheck, step: "02", title: "Permit It", desc: "We handle required demolition permits, mark underground utilities, and coordinate utility shut-offs." },
  { icon: Hammer, step: "03", title: "Demo It", desc: "Our crew arrives with the right equipment — hand tools for interior, excavators and skid steers for structural." },
  { icon: Truck, step: "04", title: "Haul It", desc: "Every piece of debris leaves in our own dump trailers. Concrete to recycling. Metal to scrap. One invoice." },
  { icon: Sparkles, step: "05", title: "Clean It", desc: "We broom-sweep the area, grade the soil, and leave your property ready for the next phase." },
];

/* ── Pricing Table ── */
const pricingRows = [
  { type: "Full House Demolition", range: "$9,200 – $19,400", factors: "Square footage, number of stories, foundation type" },
  { type: "Garage Demolition", range: "$2,400 – $3,900", factors: "Detached vs. attached, slab removal, size" },
  { type: "Pool Demolition", range: "$7,300 – $11,700", factors: "Partial fill-in vs. full removal, pool size" },
  { type: "Concrete Removal", range: "$4 – $5 / sq ft", factors: "Thickness, reinforcement, access" },
  { type: "Interior Demolition", range: "$2 – $7 / sq ft", factors: "Scope, materials, dust containment needs" },
  { type: "Shed Demolition", range: "$500 – $2,000", factors: "Size, materials, foundation" },
  { type: "Mobile Home Demolition", range: "$3,000 – $8,000", factors: "Single-wide vs. double-wide, foundation" },
  { type: "Commercial Strip-Out", range: "Custom Quote", factors: "Square footage, finishes, timeline" },
];

/* ── When You Need a Demo Contractor ── */
const useCases = [
  "You're remodeling a kitchen, bathroom, or full interior and need components torn out before the rebuild starts.",
  "You're replacing an old swimming pool with a yard, patio, or home addition.",
  "You're tearing down an aging garage, shed, carport, or outbuilding.",
  "You're clearing a lot to build a new home, addition, or commercial structure.",
  "You're removing a driveway, patio, walkway, or concrete slab.",
  "You purchased a property with existing structures that need to come down.",
  "You're dealing with fire, flood, or storm damage that has left the structure unsafe.",
  "Your commercial space needs a tenant improvement strip-out before the next buildout.",
  "You're a contractor or builder who needs a reliable demo partner on active projects.",
];

/* ── Permits & Codes ── */
const permits = [
  { title: "Most Structures Require a Permit", desc: "The City of Phoenix and most Valley cities require a demolition permit for full structure removal. Interior-only demolition often does not. We handle the permit application as part of our service." },
  { title: "Utilities Must Be Disconnected First", desc: "Electricity, gas, water, and sewer connections must be properly shut off and capped before any work starts. We coordinate with SRP, APS, City of Phoenix Water Services, and Southwest Gas." },
  { title: "Asbestos Inspection Required for Older Structures", desc: "Arizona law requires an asbestos inspection before demolition of any structure built before 1989. We coordinate inspections and work with abatement contractors when needed." },
  { title: "HOA Approvals Are Often Required", desc: "Many planned communities require HOA approval before any demolition. We recommend checking with your HOA early in the planning process to avoid delays." },
  { title: "Hazardous Materials Must Be Handled Properly", desc: "Lead paint, asbestos, treated wood, and chemicals require proper handling and disposal. Our crews identify these on-site and coordinate correct handling." },
];

/* ── Service Areas ── */
const eastValley = ["Mesa", "Gilbert", "Chandler", "Tempe", "Scottsdale", "Queen Creek", "San Tan Valley", "Apache Junction", "Fountain Hills"];
const westValley = ["Glendale", "Peoria", "Surprise", "Goodyear", "Avondale", "Buckeye", "Litchfield Park", "El Mirage", "Tolleson"];
const centralPhoenix = ["Phoenix", "Paradise Valley", "Arcadia", "Ahwatukee", "Laveen", "South Mountain"];

/* ── FAQs ── */
const faqs = [
  { q: "How much does demolition cost in Phoenix?", a: "Full house demolition typically runs $9,200 to $19,400. Garage demolition runs $2,400 to $3,900. Pool demolition runs $7,300 to $11,700. Concrete removal runs $4 to $5 per square foot. Call for a free on-site estimate." },
  { q: "Do I need a permit for demolition in Phoenix?", a: "Most full-structure demolition projects require a permit from the City of Phoenix or your local municipality. Interior-only demolition often does not. We handle the permit application as part of our service." },
  { q: "How long does a demolition project take?", a: "Most residential projects wrap in one to three days. Interior tear-outs finish in a single day. Full garage demo runs one to two days. Pool demo runs one to three days. Full home demo runs two to five days." },
  { q: "Do you handle debris removal and disposal?", a: "Yes. We own our own dump trailers and handle haul-off in-house. No third-party subcontractors. No separate disposal invoice. Demo and debris removal come from one crew with one quote." },
  { q: "What is the difference between full and selective demolition?", a: "Full demolition takes down the entire structure. Selective demolition removes only specific parts — interior walls, cabinets, flooring, or a single room. Selective demo is common for remodels." },
  { q: "Can you demolish just part of my house?", a: "Yes. We do selective interior demolition for kitchen remodels, bathroom renovations, wall removal, and projects where you keep the main structure. We protect what stays and remove everything else." },
  { q: "Do you remove concrete driveways, patios, and slabs?", a: "Yes. We break up driveways, patios, walkways, and slabs, then haul everything to recycling facilities. Pricing runs roughly $4 to $5 per square foot for standard 4 to 6 inch slabs." },
  { q: "Do you do pool demolition and fill-in?", a: "Yes. We handle both partial fill-in and full pool removal. Partial fill-in breaks up the deck and bottom, then backfills. Full removal takes the entire shell out. We help you choose the right approach." },
  { q: "Is asbestos testing required before demolition?", a: "Arizona law requires asbestos inspection before demolition of any structure built before 1989. If asbestos is found, licensed abatement must happen before demo begins. We coordinate inspections." },
  { q: "What happens to the debris after demolition?", a: "Concrete and masonry go to recycling. Metal goes to scrap recyclers. Usable wood is sorted for reuse. Everything else goes to licensed transfer stations." },
  { q: "Do you offer free estimates?", a: "Yes. Every demolition project starts with a free, no-obligation on-site estimate. We'll walk the property, scope the work, and give you a clear quote before any work begins." },
  { q: "Do you work with contractors and builders?", a: "Yes. We partner with general contractors, builders, and project managers on tenant improvements, strip-outs, site prep, and commercial tear-downs." },
  { q: "How far in advance do I need to book?", a: "Most Phoenix-area projects can be scheduled within one to two weeks of the initial estimate. Rush jobs and smaller projects often happen sooner. Call early for the best scheduling flexibility." },
  { q: "Do you demolish mobile homes?", a: "Yes. We handle single-wide and double-wide mobile home demolition including foundation blocks, utility disconnects, and complete debris removal. Typical cost runs $3,000 to $8,000." },
  { q: "Can I stay in my home during interior demolition?", a: "It depends on scope. For a single-room remodel, most homeowners stay. For larger interior projects with significant dust and noise, many choose to stay elsewhere for the demo days." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(f => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": { "@type": "Answer", "text": f.a }
  }))
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Rocking S Hauling",
  "description": "Licensed Phoenix demolition contractor. Residential, commercial, concrete, pool, and interior demolition. Demo and debris hauling from one crew.",
  "url": "https://rockingshauling.com/demolition-services",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Phoenix",
    "addressRegion": "AZ",
    "addressCountry": "US"
  },
  "areaServed": ["Phoenix","Mesa","Gilbert","Chandler","Scottsdale","Tempe","Glendale","Peoria","Surprise","Goodyear","Avondale","Queen Creek"].map(c => ({ "@type": "City", "name": c })),
  "serviceType": ["Demolition Services","Residential Demolition","Commercial Demolition","Concrete Removal","Pool Demolition","Interior Demolition","Garage Demolition"]
};

const DemolitionService = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Demolition Services Phoenix AZ | Rocking S Hauling</title>
        <meta name="description" content="Licensed Phoenix demolition contractor. Residential, commercial, concrete, pool, and interior demolition. Demo plus debris hauling from one crew. Free on-site estimates." />
        <link rel="canonical" href="https://rockingshauling.com/demolition-services" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      </Helmet>

      <Header />

      {/* ── SECTION 1: HERO ── */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-end overflow-hidden">
        <img src={heroImg} alt="Demolition services in Phoenix AZ" className="absolute inset-0 w-full h-full object-cover object-center" width={1920} height={1080} loading="eager" />
        {/* Overlay gradient - bottom blends to match the dark services section below */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/70 to-foreground/50" />
        <div className="relative z-10 container-custom pb-12 md:pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-3 block">Services</span>
            <h1 className="text-4xl md:text-6xl xl:text-7xl font-black uppercase text-background leading-none mb-4">
              Demolition Services<br />in <span className="text-primary">Phoenix, AZ</span>
            </h1>
            <p className="text-background/95 text-lg md:text-xl max-w-2xl font-medium">
              We demo it, haul it off, and clean the site. One crew, one quote, no surprise disposal fees. Serving homeowners, contractors, and businesses across the entire Phoenix Valley.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <a href="/#contact" className="bg-primary text-primary-foreground px-8 py-4 text-sm font-black uppercase tracking-widest hover:bg-background hover:text-foreground transition-all inline-flex items-center justify-center gap-2">
                Get A Free Estimate <ArrowRight className="w-4 h-4" />
              </a>
              <a href="tel:4801234567" className="border-2 border-background text-background px-8 py-4 text-sm font-black uppercase tracking-widest hover:bg-background hover:text-foreground transition-all inline-flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" /> Questions? Call Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 2: SERVICES WE OFFER ── */}
      <section className="section-padding relative overflow-hidden -mt-px">
        {/* Background Image - continues from hero */}
        <div className="absolute inset-0 z-0">
          <img 
            src={servicesBg} 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover object-bottom" 
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground via-foreground/70 to-foreground/80" />
        </div>
        
        <div className="container-custom max-w-6xl relative z-10">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase mb-4 text-background">
              Demolition Services <span className="text-primary">We Offer</span>
            </h2>
            <p className="text-background/90 text-lg max-w-3xl mx-auto">
              Every demolition project is different. We handle residential tear-downs, commercial strip-outs, and everything in between.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 9).map((svc, idx) => (
              <motion.div 
                key={idx} 
                className="bg-background p-6 border-l-4 border-primary"
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: idx * 0.05 }}
              >
                <div className="w-14 h-14 bg-primary flex items-center justify-center mb-4 overflow-hidden">
                  {svc.image ? (
                    <img src={svc.image} alt={svc.alt ?? svc.title} className="w-full h-full object-cover" loading="lazy" />
                  ) : svc.icon ? (
                    <svc.icon className="w-7 h-7 text-primary-foreground" />
                  ) : null}
                </div>
                <h3 className="font-black uppercase text-sm mb-2 tracking-wide text-foreground">{svc.title}</h3>
                <p className="text-foreground text-base leading-relaxed">{svc.desc}</p>
              </motion.div>
            ))}
          </div>
          {/* Last 2 services - centered */}
          <div className="flex flex-wrap justify-center gap-6 mt-6">
            {services.slice(9).map((svc, idx) => (
              <motion.div 
                key={idx + 9} 
                className="bg-background p-6 border-l-4 border-primary w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-sm"
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: (idx + 9) * 0.05 }}
              >
                <div className="w-14 h-14 bg-primary flex items-center justify-center mb-4 overflow-hidden">
                  {svc.image ? (
                    <img src={svc.image} alt={svc.alt ?? svc.title} className="w-full h-full object-cover" loading="lazy" />
                  ) : svc.icon ? (
                    <svc.icon className="w-7 h-7 text-primary-foreground" />
                  ) : null}
                </div>
                <h3 className="font-black uppercase text-sm mb-2 tracking-wide text-foreground">{svc.title}</h3>
                <p className="text-foreground text-base leading-relaxed">{svc.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
        {/* Gradient blend to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
      </section>

      {/* ── SECTION 3: WHY PHOENIX CHOOSES US ── */}
      <section className="section-padding bg-background">
        <div className="container-custom max-w-6xl">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase mb-4 text-foreground">
              Why Phoenix Chooses <span className="text-primary">Rocking S?</span>
            </h2>
          </motion.div>
          <div className="space-y-4 mb-12">
            {whyUs.map((item, idx) => (
              <motion.div key={idx} className="bg-primary p-6 md:p-8 flex items-start gap-5" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
                <div className="flex-shrink-0 mt-1">
                  <item.icon className="w-10 h-10 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-black uppercase text-sm md:text-base tracking-wider mb-2 text-primary-foreground">{item.title}</h3>
                  <p className="text-primary-foreground leading-relaxed text-base">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <a href="#quote" className="inline-block bg-primary text-primary-foreground font-black uppercase tracking-wider px-8 py-4 text-sm hover:bg-foreground hover:text-background hover:scale-95 transition-all">
              Get a Free Quote
            </a>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: OUR PROCESS ── */}
      <section className="section-padding bg-foreground">
        <div className="container-custom max-w-6xl">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase mb-4 text-background">
              Our Five Step <span className="text-primary">Process</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-12 items-stretch">
            {processSteps.map((item, idx) => (
              <motion.div key={idx} className="bg-background border border-border p-6 text-center flex flex-col h-full" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
                <div className="flex justify-center mb-5">
                  <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center">
                    <item.icon className="w-10 h-10 text-primary-foreground" />
                  </div>
                </div>
                <h3 className="font-black uppercase text-xl tracking-wider mb-4 text-foreground italic">{item.title}</h3>
                <p className="text-foreground leading-relaxed text-base flex-grow">{item.desc}</p>
                <div className="mt-6">
                  <span className="bg-primary text-primary-foreground font-black text-sm uppercase tracking-widest px-5 py-2 inline-block">Step {item.step}</span>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <a href="#quote" className="inline-block bg-primary text-primary-foreground font-black uppercase tracking-wider px-8 py-4 text-sm hover:bg-foreground hover:text-background hover:scale-95 transition-all">
              Get a Free Quote
            </a>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: DEMOLITION COSTS ── */}
      <section className="section-padding bg-foreground text-background">
        <div className="container-custom max-w-5xl">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase mb-4">
              Demolition Costs in <span className="text-primary">Phoenix</span>
            </h2>
            <p className="text-background/90 text-lg max-w-3xl mx-auto">
              Every project is different. Here are honest ranges based on typical Phoenix residential and commercial projects.
            </p>
          </motion.div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden">
              <thead>
                <tr>
                  <th className="bg-primary text-primary-foreground font-black uppercase text-sm tracking-wider p-5 text-left border-r border-r-primary-foreground/20">Project Type</th>
                  <th className="bg-primary text-primary-foreground font-black uppercase text-sm tracking-wider p-5 text-left border-r border-r-primary-foreground/20">Typical Range</th>
                  <th className="bg-primary text-primary-foreground font-black uppercase text-sm tracking-wider p-5 text-left">What Affects Cost</th>
                </tr>
              </thead>
              <tbody>
                {pricingRows.map((row, idx) => (
                  <tr key={idx} className="bg-background text-foreground border-b border-b-foreground">
                    <td className="p-5 font-black uppercase text-sm border-r border-r-foreground text-foreground">{row.type}</td>
                    <td className="p-5 text-primary font-black text-base border-r border-r-foreground">{row.range}</td>
                    <td className="p-5 text-foreground/90 text-base">{row.factors}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-background/80 text-base mt-6 text-center">
            Your final cost depends on project size, site accessibility, permit requirements, hazardous material handling, and total debris volume. Call for a free on-site estimate.
          </p>
        </div>
      </section>

      {/* ── SECTION 6: WHEN YOU NEED A DEMO CONTRACTOR ── */}
      <section className="section-padding bg-background">
        <div className="container-custom max-w-4xl">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-4">
              When You Need a <span className="text-primary">Demolition Contractor</span>
            </h2>
            <p className="text-muted-foreground text-lg">Not every project needs a demolition crew. Here's when it makes sense to call one.</p>
          </motion.div>
          <div className="space-y-4">
            {useCases.map((item, idx) => (
              <motion.div key={idx} className="flex items-center gap-4 p-5 md:p-6 min-h-[88px] bg-foreground text-background hover:bg-primary hover:text-primary-foreground transition-colors group" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }}>
                <img src={iconExcavatorCheck} alt="Excavator with check mark — demolition contractor service indicator" className="w-14 h-14 md:w-16 md:h-16 flex-shrink-0" loading="lazy" />
                <p className="text-background font-medium text-base md:text-lg leading-relaxed group-hover:text-primary-foreground">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 7: PERMITS & CODES ── */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${permitsBg})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/85 via-foreground/80 to-foreground" />
        <div className="container-custom max-w-4xl relative z-10">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-4 text-background">
              Permits, Codes & <span className="text-primary">What You Should Know</span>
            </h2>
            <p className="text-background/90 text-lg">Demolition in Phoenix isn't as simple as showing up with a sledgehammer. Here are the rules.</p>
          </motion.div>
          <div className="space-y-6">
            {permits.map((item, idx) => (
              <motion.div key={idx} className="bg-background p-6 border-l-4 border-primary shadow-xl" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
                <h3 className="font-black uppercase text-sm mb-2 tracking-wide">{item.title}</h3>
                <p className="text-foreground/90 leading-relaxed text-base">{item.desc}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-background/70 text-xs mt-8 text-center italic">
            This content is for general information, not legal advice. Requirements vary by city and project. Call us and we'll walk you through what applies to your project.
          </p>
        </div>
      </section>

      {/* ── SECTION 8: AREAS WE SERVE ── */}
      <section className="section-padding bg-foreground text-background">
        <div className="container-custom max-w-5xl">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-4">
              Areas We <span className="text-primary">Serve</span>
            </h2>
            <p className="text-background/90 text-lg">Rocking S Hauling handles demolition projects across the entire Phoenix metropolitan area.</p>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <ServiceAreaMap />
            </motion.div>
            <div className="grid sm:grid-cols-1 gap-6">
              {[
                { title: "East Valley", cities: eastValley },
                { title: "West Valley", cities: westValley },
                { title: "Central Phoenix", cities: centralPhoenix },
              ].map((area, idx) => (
                <motion.div key={idx} className="bg-background p-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
                  <h3 className="font-black uppercase text-primary mb-4">{area.title}</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {area.cities.map((city, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-primary flex-shrink-0" />
                        <span className="text-foreground text-sm font-medium">{city}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <p className="text-background/80 text-base mt-8 text-center">Not sure if we cover your area? Call us. If you're within the Phoenix metro, we handle it.</p>
        </div>
      </section>

      {/* ── SECTION 11: FAQ ── */}
      <section className="section-padding bg-muted">
        <div className="container-custom max-w-4xl">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-4">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <motion.div key={idx} className="bg-background border border-border overflow-hidden" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.03 }}>
                <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full flex items-center justify-between p-5 text-left hover:bg-primary hover:text-primary-foreground transition-colors group/faq">
                  <span className="font-black uppercase text-sm tracking-wide pr-4 group-hover/faq:text-primary-foreground">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-primary flex-shrink-0 transition-transform group-hover/faq:text-primary-foreground ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 border-t border-border">
                    <p className="text-foreground/90 leading-relaxed pt-4 text-base">{faq.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ServiceQuoteCTA />
      <Footer />
    </div>
  );
};

export default DemolitionService;
