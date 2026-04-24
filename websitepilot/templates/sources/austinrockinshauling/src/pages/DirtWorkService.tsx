import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, ArrowRight, ChevronDown, MapPin } from 'lucide-react';
import dumptruckCheck from '@/assets/dirtwork-usecase-dumptruck.png';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceQuoteCTA from '@/components/ServiceQuoteCTA';
import ServiceAreaMap from '@/components/ServiceAreaMap';
import heroImg from '@/assets/dirtwork-hero.jpg';
import servicesBg from '@/assets/dirtwork-services-bg.jpg';
import dirtworkQuoteBg from '@/assets/dirtwork-quote-bg.jpg';
import dirtworkWhyBg from '@/assets/dirtwork-why-bg.png';
import dirtTextureBg from '@/assets/dirt-texture-bg.jpg';
import step1Phone from '@/assets/dirtwork-step-1-phone.svg';
import step2Clipboard from '@/assets/dirtwork-step-2-clipboard.svg';
import step3Excavator from '@/assets/dirtwork-step-3-excavator.svg';
import step4DumpTruck from '@/assets/dirtwork-step-4-dumptruck.svg';
import step5Broom from '@/assets/dirtwork-step-5-broom.svg';
import iconLandGrading from '@/assets/dirtwork-icon-land-grading.svg';
import iconExcavation from '@/assets/dirtwork-icon-excavation.svg';
import iconLandClearing from '@/assets/dirtwork-icon-land-clearing.svg';
import iconTrenching from '@/assets/dirtwork-icon-trenching.svg';
import iconBackfillCompaction from '@/assets/dirtwork-icon-backfill-compaction.svg';
import iconSitePreparation from '@/assets/dirtwork-icon-site-preparation.png';
import iconSoilImportExport from '@/assets/dirtwork-icon-soil-import-export.svg';
import iconLotLevelingYardGrading from '@/assets/dirtwork-icon-lot-leveling-yard-grading.svg';
import iconRoadAccessGrading from '@/assets/dirtwork-icon-road-access-grading.svg';
import {
  HardHatIcon, LicensedInsuredIcon, TransparentPricingIcon, SameDayEstimateIcon,
} from '@/components/icons/DemolitionIcons';

/* ── Services ── */
const services = [
  { icon: iconLandGrading, alt: "Bulldozer grading icon representing Phoenix land grading services", title: "Land Grading", desc: "Residential lots, commercial pads, and yard regrading using laser-guided equipment to hit precise grades and direct stormwater away from structures." },
  { icon: iconExcavation, alt: "Excavator digging icon representing Phoenix excavation services", title: "Excavation", desc: "Foundations, pools, retention basins, footings, and basements. We dig through caliche, sand, and everything Phoenix soil throws at us." },
  { icon: iconLandClearing, alt: "Tree with axe icon representing land clearing services in Phoenix", title: "Land Clearing", desc: "Brush, mesquite, palo verde, abandoned slabs, and debris removed down to bare dirt across residential and commercial parcels." },
  { icon: iconTrenching, alt: "Shovel digging icon representing utility trenching services", title: "Trenching", desc: "Water, sewer, electrical, gas, irrigation, and French drain trenches dug to engineer-spec depth and width with utility coordination." },
  { icon: iconBackfillCompaction, alt: "Heavy road roller icon representing backfill and compaction services", title: "Backfill & Compaction", desc: "Foundation, trench, pool, and retaining wall backfill compacted in 6 to 8 inch lifts. Compaction documentation provided when required." },
  { icon: iconSitePreparation, alt: "Construction site icon representing residential and commercial site preparation", title: "Site Preparation", desc: "Full residential and commercial pad prep: clearing, rough grading, excavation, trenching, and compaction handed off ready for footers." },
  { icon: iconSoilImportExport, alt: "Dump truck with dirt icon representing soil import and export hauling services", title: "Soil Import & Export", desc: "Excess dirt hauled out and fill dirt, screened topsoil, or engineered fill brought in — with our own dump trailers, not subcontractors." },
  { icon: iconLotLevelingYardGrading, alt: "Grader machine leveling icon representing lot leveling and yard grading services", title: "Lot Leveling & Yard Grading", desc: "Low spot correction, drainage fixes, monsoon flood repair, and pre-landscape prep using compact track loaders that protect existing landscaping." },
  { icon: iconRoadAccessGrading, alt: "Motor grader on road icon representing road and access grading services", title: "Road & Access Grading", desc: "Unpaved driveways, gravel roads, washout repairs, construction access roads, and horse property arena grading across the outer Valley." },
];

/* ── Why Choose Us ── */
const whyUs = [
  { icon: HardHatIcon, title: "We Dig It and Haul It", desc: "Most dirt work contractors leave you waiting on a separate hauling company. We own our dump trailers and handle the dig, the grade, and the haul-off with one crew. Your project moves faster and your cost stays lower." },
  { icon: LicensedInsuredIcon, title: "Phoenix Desert Soil Experience", desc: "Caliche, hardpan, decomposed granite, and sandy loam — Phoenix soil changes lot to lot. We work in Valley dirt every day and know how to handle whatever sits below the surface of your property." },
  { icon: TransparentPricingIcon, title: "One Crew, One Price", desc: "You get one estimate covering the dig, the grade, the haul-off, and the cleanup. No surprise invoices from a second or third subcontractor showing up mid-project." },
  { icon: SameDayEstimateIcon, title: "Right-Sized Equipment & Fast Turnaround", desc: "Compact track loaders, skid steers, and dump trailers that fit through backyard gates. Most residential dirt work projects complete in 1 to 3 days." },
];

/* ── 5-Step Process ── */
const processSteps = [
  { icon: step1Phone, step: "01", title: "Site Visit & Estimate", desc: "We walk your property, assess the soil, and provide a written estimate flagging caliche and access issues upfront." },
  { icon: step2Clipboard, step: "02", title: "Utilities & Permits", desc: "We call 811 to mark underground utilities and pull any required Maricopa County or municipal grading permits." },
  { icon: step3Excavator, step: "03", title: "Clearing & Excavation", desc: "Crew clears vegetation and debris, then excavates to the depth and dimensions on your plan." },
  { icon: step4DumpTruck, step: "04", title: "Grade, Backfill & Haul", desc: "We grade to finished elevations, backfill in lifts, and haul excess soil off-site in our own dump trailers." },
  { icon: step5Broom, step: "05", title: "Final Walk & Cleanup", desc: "We walk the site with you, verify grades and drainage, and leave the property construction-ready." },
];

/* ── Pricing ── */
const pricingRows = [
  { type: "Land Grading", range: "$80 – $110", factors: "Per hour (equipment + operator)" },
  { type: "Lot Grading (Residential)", range: "$0.45 – $0.85", factors: "Per square foot" },
  { type: "Excavation", range: "$2.50 – $15.00", factors: "Per cubic yard" },
  { type: "Land Clearing", range: "$1,200 – $2,400", factors: "Per acre" },
  { type: "Trenching", range: "$5 – $12", factors: "Per linear foot" },
  { type: "Fill Dirt (Backfill Material)", range: "$5 – $25", factors: "Per cubic yard delivered" },
  { type: "Compaction Testing", range: "$300 – $500", factors: "Per test" },
  { type: "Lot Leveling (Avg. Yard)", range: "$1,500 – $5,000", factors: "Per project" },
  { type: "Full Site Prep (Residential Lot)", range: "$3,000 – $15,000", factors: "Per project" },
  { type: "Soil Hauling / Removal", range: "$150 – $400", factors: "Per dump trailer load" },
];

/* ── When You Need Dirt Work ── */
const useCases = [
  "You're building a new home and need full site prep — clearing, grading, footings, utility trenching, and pad compaction.",
  "You're adding a pool or spa and need excavation through Phoenix caliche plus plumbing and electrical trenching.",
  "Water pools near your foundation or floods your yard during monsoon season and you need drainage corrected.",
  "You're building an ADU or backyard casita and need pad grading, utility trenching, and foundation excavation.",
  "You're prepping for landscaping or hardscape and need a properly graded, compacted subgrade for pavers, turf, or retaining walls.",
  "You purchased an undeveloped lot covered in brush, debris, or old structures that needs to be cleared down to bare dirt.",
  "Your unpaved driveway or access road has washouts, ruts, or low spots that need cutting, filling, and crowning.",
  "You're a builder or general contractor who needs a dirt work partner that reads grading plans and hits engineered specs.",
  "You need fill dirt brought in or excess soil hauled out and want one crew handling the whole material movement.",
];

/* ── Soil Conditions / Permits ── */
const soilNotes = [
  { title: "Caliche", desc: "The most common Phoenix dirt-work obstacle. This calcium carbonate layer sits anywhere from a few inches to several feet down and ranges from crumbly to rock-hard. We handle it with ripping teeth and hydraulic breakers — projects on caliche-heavy lots take longer and cost more." },
  { title: "Sandy & Loamy Soil", desc: "West Phoenix, Buckeye, Goodyear, and parts of Surprise tend toward loose sandy soil. Grades quickly but compacts poorly without proper moisture. We add water during compaction to hit the density your inspector requires." },
  { title: "Clay Soil", desc: "Areas in north Phoenix, Anthem, and Cave Creek have clay-heavy soil that expands wet and shrinks dry. Proper grading and drainage on clay prevents foundation damage from seasonal expansion and contraction." },
  { title: "Grading Permits in Maricopa County", desc: "City of Phoenix requires a grading permit for projects disturbing more than 100 cubic yards or altering drainage. Maricopa County clearing-and-grubbing permits start at $300 plus $10/acre. Properties near washes or in FEMA flood zones require additional review." },
  { title: "Dust Control Requirements", desc: "Maricopa County Air Quality requires dust control plans for projects disturbing more than 0.1 acres. Visible dust violations start at $10,000. We follow dust control protocol on every site we touch." },
];

/* ── Service Areas ── */
const eastValley = ["Mesa", "Gilbert", "Chandler", "Tempe", "Scottsdale", "Queen Creek", "Apache Junction", "Cave Creek", "Anthem"];
const westValley = ["Glendale", "Peoria", "Surprise", "Goodyear", "Avondale", "Buckeye", "Litchfield Park", "El Mirage", "Tolleson"];
const centralPhoenix = ["Phoenix", "Paradise Valley", "Arcadia", "Ahwatukee", "Laveen", "South Mountain"];

/* ── FAQs ── */
const faqs = [
  { q: "What does dirt work include?", a: "Dirt work covers all earthmoving tasks: grading, excavation, trenching, backfilling, compaction, land clearing, and soil hauling. It is the foundation phase that prepares your property for construction, landscaping, or drainage improvement." },
  { q: "How much does dirt work cost in Phoenix?", a: "Costs depend on project scope and soil conditions. Land grading runs $80 to $110 per hour. Residential lot grading costs $0.45 to $0.85 per square foot. Full site prep for a residential lot ranges from $3,000 to $15,000. Caliche-heavy lots cost more because the material takes longer to break and remove." },
  { q: "What is caliche and how does it affect my project?", a: "Caliche is a rock-hard calcium carbonate layer found throughout the Phoenix metro area. It sits anywhere from a few inches to several feet below the surface. Digging through caliche requires ripping teeth or hydraulic breakers, which adds time and cost to your project. Many lots in Mesa, Gilbert, and east Phoenix have significant caliche deposits." },
  { q: "Do I need a permit for dirt work in Phoenix?", a: "The City of Phoenix requires a grading permit for projects disturbing more than 100 cubic yards of earth or altering drainage patterns. Requirements vary by municipality. Maricopa County also requires dust control plans for projects disturbing more than 0.1 acres. Your general contractor typically handles permits, but we coordinate on the dirt work scope." },
  { q: "How long does residential dirt work take?", a: "Most residential projects complete in 1 to 5 days. A simple yard regrading takes 1 day. A full lot prep with clearing, grading, and trenching takes 3 to 5 days. Timelines extend for large lots, heavy caliche, or complex cut-and-fill operations." },
  { q: "What is the difference between grading and excavation?", a: "Grading reshapes the surface of the ground to create a specific slope or elevation. Excavation removes soil and rock to create depth — a foundation, pool hole, or trench. Most projects require both." },
  { q: "Do you provide compaction testing?", a: "We compact all fill and backfill material to standard density in lifts. We coordinate with third-party geotechnical testing labs when your project requires certified compaction reports for building inspections." },
  { q: "What happens to the excess dirt from my project?", a: "We haul excess dirt off-site with our own dump trailers. We dispose of it at approved fill sites or deliver it to other projects that need material. Hauling is included in most project estimates." },
  { q: "Do you haul dirt off-site?", a: "Yes. We own our dump trailers and handle all hauling in-house. You don't need to hire a separate trucking company. This saves time and reduces your total project cost." },
  { q: "What equipment do you use for dirt work?", a: "We run compact track loaders (CTLs), skid steers with attachments (grading buckets, ripper teeth, hydraulic breakers, augers), and dump trailers. Our equipment is sized for residential and light commercial work, including tight-access backyards and narrow lot lines." },
  { q: "Do you work with builders and general contractors?", a: "Yes. We work directly with homeowners and as a subcontractor for builders and general contractors. We read grading plans, follow engineering specifications, and coordinate with other trades on site." },
  { q: "What is the best time of year for dirt work in Phoenix?", a: "October through April offers the best working conditions. Summer temperatures above 110 degrees harden soil and create safety concerns. Monsoon season (June through September) brings rain that turns jobsites into mud. We work year-round but schedule heavier projects for the cooler months when possible." },
  { q: "What is a building pad and do I need one?", a: "A building pad is a level, compacted area of soil prepared to support a structure. Every new home, commercial building, and ADU in Phoenix needs a building pad. We excavate, fill, grade, and compact the pad to the dimensions and density your engineer specifies." },
  { q: "Do you do small residential jobs?", a: "Yes. We handle projects as small as a single yard regrading or a short trench for a utility line. We also take on large multi-acre clearing and grading projects. Our equipment and crew scale to your project size." },
  { q: "How do I get a dirt work estimate?", a: "Call us or fill out our online form. We schedule a site visit, walk your property, review your project scope, and provide a written estimate. Most estimates are returned within 24 to 48 hours of the site visit." },
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
  "description": "Phoenix dirt work, grading, excavation, trenching, land clearing, and site prep. Dig, grade, and haul-off from one crew with our own dump trailers.",
  "url": "https://rockingshauling.com/dirt-work-phoenix-az",
  "address": { "@type": "PostalAddress", "addressLocality": "Phoenix", "addressRegion": "AZ", "addressCountry": "US" },
  "areaServed": ["Phoenix","Mesa","Gilbert","Chandler","Scottsdale","Tempe","Glendale","Peoria","Surprise","Goodyear","Buckeye","Queen Creek"].map(c => ({ "@type": "City", "name": c })),
  "serviceType": ["Dirt Work","Grading","Excavation","Trenching","Land Clearing","Site Preparation","Backfill & Compaction"]
};

const DirtWorkService = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Dirt Work Services Phoenix AZ | Grading, Excavation, Site Prep</title>
        <meta name="description" content="Professional dirt work in Phoenix. Grading, excavation, land clearing, trenching, and backfill. One crew handles the dig and haul-off. Free estimates." />
        <link rel="canonical" href="https://rockingshauling.com/dirt-work-phoenix-az" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      </Helmet>

      <Header />

      {/* ── HERO ── */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-end overflow-hidden">
        <img src={heroImg} alt="Dirt work and grading services in Phoenix AZ" className="absolute inset-0 w-full h-full object-cover object-center" width={1920} height={1080} loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/70 to-foreground/40" />
        <div className="relative z-10 container-custom pb-12 md:pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-3 block">Services</span>
            <h1 className="text-4xl md:text-6xl xl:text-7xl font-black uppercase text-background leading-none mb-4">
              Dirt Work Services<br />in <span className="text-primary">Phoenix, AZ</span>
            </h1>
            <p className="text-background/95 text-lg md:text-xl max-w-2xl font-medium">
              One crew. Dig it, grade it, haul it. Grading, excavation, trenching, and site prep handled by the same team — with our own dump trailers.
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

      {/* ── SERVICES WE OFFER ── */}
      <section className="section-padding relative overflow-hidden -mt-px">
        <div className="absolute inset-0 z-0">
          <img src={servicesBg} alt="" className="absolute inset-0 w-full h-full object-cover object-bottom" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground via-foreground/75 to-foreground/85" />
        </div>
        <div className="container-custom max-w-6xl relative z-10">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase mb-4 text-background">
              Our Dirt Work <span className="text-primary">Services</span>
            </h2>
            <p className="text-background/90 text-lg max-w-3xl mx-auto">
              Every project starts in the dirt. We handle the full earthwork scope — from raw lots to pad-ready sites across the Phoenix Valley.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, idx) => (
              <motion.div
                key={idx}
                className="bg-background p-6 border-l-4 border-primary"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="w-16 h-16 mb-4 flex items-center justify-center overflow-hidden">
                  <img src={svc.icon} alt={svc.alt} width={64} height={64} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <h3 className="font-black uppercase text-sm mb-2 tracking-wide text-foreground">{svc.title}</h3>
                <p className="text-foreground text-base leading-relaxed">{svc.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent z-10" />
      </section>

      {/* ── WHAT IS DIRT WORK ── */}
      <section className="section-padding bg-background">
        <div className="container-custom max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-8 text-foreground">
              What Is <span className="text-primary">Dirt Work?</span>
            </h2>
            <div className="space-y-7 text-foreground text-lg md:text-xl leading-[1.85] tracking-wide">
              <p>Dirt work is the foundation phase of every construction and landscaping project. The term covers all earthmoving tasks that reshape the ground before building begins — grading, excavation, trenching, backfilling, compaction, land clearing, and soil hauling.</p>
              <p>In Phoenix, dirt work comes with unique challenges. Desert soil ranges from loose sand to rock-hard caliche. Monsoon season creates drainage problems on properties without proper grading. Summer temperatures push 115 degrees and harden exposed soil to near-concrete consistency. An experienced crew with the right equipment makes the difference between a project that stays on schedule and one that stalls.</p>
              <p>Every residential and commercial build in Maricopa County starts with dirt work. The grading determines how water flows away from structures. The excavation sets the depth for foundations, utilities, and pools. The compaction ensures the ground supports the weight of what gets built on top.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section
        className="section-padding bg-muted relative"
        style={{
          backgroundImage: `url(${dirtworkWhyBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
        }}
      >
        <div className="absolute inset-0 bg-muted/85 pointer-events-none" />
        <div className="container-custom max-w-6xl relative z-10">
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
            <a href="/#contact" className="inline-block bg-primary text-primary-foreground font-black uppercase tracking-wider px-8 py-4 text-sm hover:bg-foreground hover:text-background hover:scale-95 transition-all">
              Get a Free Quote
            </a>
          </div>
        </div>
      </section>

      {/* ── 5-STEP PROCESS ── */}
      <section className="section-padding bg-foreground">
        <div className="container-custom max-w-6xl">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase mb-4 text-background">
              Our Five Step <span className="text-primary">Dirt Work Process</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-12 items-stretch">
            {processSteps.map((item, idx) => (
              <motion.div key={idx} className="bg-background border border-border p-6 text-center flex flex-col h-full" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
                <div className="flex justify-center mb-5">
                  <div className="w-20 h-20 bg-primary overflow-hidden flex items-center justify-center">
                    <img src={item.icon} alt="" className="w-full h-full object-cover" />
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
            <a href="/#contact" className="inline-block bg-primary text-primary-foreground font-black uppercase tracking-wider px-8 py-4 text-sm hover:bg-foreground hover:text-background hover:scale-95 transition-all">
              Get a Free Quote
            </a>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="section-padding bg-foreground text-background border-t border-background/10">
        <div className="container-custom max-w-5xl">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase mb-4">
              Dirt Work Costs in <span className="text-primary">Phoenix</span>
            </h2>
            <p className="text-background/90 text-lg max-w-3xl mx-auto">
              Honest ranges based on typical Phoenix residential and light commercial projects. Caliche, access, and slope all move the needle.
            </p>
          </motion.div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden">
              <thead>
                <tr>
                  <th className="bg-primary text-primary-foreground font-black uppercase text-sm tracking-wider p-5 text-left border-r border-r-primary-foreground/20">Service</th>
                  <th className="bg-primary text-primary-foreground font-black uppercase text-sm tracking-wider p-5 text-left border-r border-r-primary-foreground/20">Typical Cost Range</th>
                  <th className="bg-primary text-primary-foreground font-black uppercase text-sm tracking-wider p-5 text-left">Unit</th>
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
            Costs based on 2025–2026 Phoenix metro market data. Actual cost depends on lot size, soil conditions (caliche increases cost significantly), access, slope, and project complexity. Call for a free on-site estimate.
          </p>
        </div>
      </section>

      {/* ── WHEN YOU NEED DIRT WORK ── */}
      <section className="section-padding bg-background">
        <div className="container-custom max-w-4xl">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase mb-4">
              When You Need <span className="text-primary">Dirt Work</span>
            </h2>
            <p className="text-muted-foreground text-lg">From new builds to drainage fixes — here's when calling a dirt work crew makes sense.</p>
          </motion.div>
          <div className="space-y-4">
            {useCases.map((item, idx) => (
              <motion.div key={idx} className="flex items-start gap-4 p-4 bg-foreground text-background hover:bg-primary hover:text-primary-foreground transition-colors group" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }}>
                <img src={dumptruckCheck} alt="Dump truck checkmark icon indicating dirt work service use case" width={44} height={44} loading="lazy" className="w-11 h-11 flex-shrink-0 mt-0.5 object-contain" />
                <p className="text-background font-medium text-sm md:text-base group-hover:text-primary-foreground">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOIL & PERMITS ── */}
      <section className="section-padding bg-muted">
        <div className="container-custom max-w-4xl">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-4">
              Phoenix Soil & <span className="text-primary">Permit Reality</span>
            </h2>
            <p className="text-muted-foreground text-lg">What's under your lot — and what the city expects you to do about it.</p>
          </motion.div>
          <div className="space-y-6">
            {soilNotes.map((item, idx) => (
              <motion.div key={idx} className="bg-background p-6 border-l-4 border-primary" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
                <h3 className="font-black uppercase text-sm mb-2 tracking-wide">{item.title}</h3>
                <p className="text-foreground/90 leading-relaxed text-base">{item.desc}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-muted-foreground text-xs mt-8 text-center italic">
            This content is for general information, not legal advice. Requirements vary by city and project. Call us and we'll walk you through what applies to your site.
          </p>
        </div>
      </section>

      {/* ── AREAS WE SERVE ── */}
      <section className="section-padding bg-foreground text-background">
        <div className="container-custom max-w-5xl">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-4">
              Areas We <span className="text-primary">Serve</span>
            </h2>
            <p className="text-background/90 text-lg">Dirt work, grading, and site prep across the entire Phoenix metropolitan area.</p>
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

      {/* ── FAQ ── */}
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

      <ServiceQuoteCTA
        backgroundImage={dirtworkQuoteBg}
        backgroundPosition="right bottom"
        overlayClassName="bg-gradient-to-r from-foreground/95 via-foreground/70 via-60% to-foreground/20"
      />
      <Footer />
    </div>
  );
};

export default DirtWorkService;
