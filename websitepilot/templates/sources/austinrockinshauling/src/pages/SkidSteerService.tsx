import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, ArrowRight, ChevronDown, MapPin, Check, X } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceQuoteCTA from '@/components/ServiceQuoteCTA';
import ServiceAreaMap from '@/components/ServiceAreaMap';
import heroImg from '@/assets/skidsteer-hero.jpg';
import servicesBg from '@/assets/skidsteer-services-bg.jpg';
import skidsteerWhyBg from '@/assets/skidsteer-why-bg.jpg';
import skidsteerQuoteBg from '@/assets/skidsteer-quote-bg.jpg';

import {
  HardHatIcon, LicensedInsuredIcon, TransparentPricingIcon, SameDayEstimateIcon,
} from '@/components/icons/DemolitionIcons';
import stepCall from '@/assets/skidsteer-step-1-estimate.svg';
import stepVisit from '@/assets/skidsteer-step-2-plan.svg';
import stepEstimate from '@/assets/skidsteer-step-3-quote.svg';
import stepWork from '@/assets/skidsteer-step-4-work.svg';
import stepCleanup from '@/assets/skidsteer-step-5-clean.svg';
import iconGradingLeveling from '@/assets/skidsteer-icon-grading-leveling.png';
import iconLandClearing from '@/assets/skidsteer-icon-land-clearing.png';
import iconExcavation from '@/assets/skidsteer-icon-excavation.png';
import iconTrenching from '@/assets/skidsteer-icon-trenching.png';
import iconDemolition from '@/assets/skidsteer-icon-demolition.png';
import iconMaterialHauling from '@/assets/skidsteer-icon-material-hauling.png';
import iconBackfillCompaction from '@/assets/skidsteer-icon-backfill-compaction.png';
import iconAugerPostHoles from '@/assets/skidsteer-icon-auger-post-holes.png';

/* ── Services ── */
const services = [
  { icon: iconGradingLeveling, alt: "Skid steer with grading blade leveling Phoenix yard — grading and leveling icon", title: "Grading & Leveling", desc: "Yards, lots, and building pads graded to elevation and slope. Grading buckets and landplane attachments deliver smooth, level surfaces that direct water away from your foundation." },
  { icon: iconLandClearing, alt: "Skid steer wheel loader clearing brush and vegetation — Phoenix land clearing icon", title: "Land Clearing & Brush", desc: "Desert brush, mesquite, small trees, rocks, and debris cleared down to bare dirt with grapple buckets and brush cutters. Cleared material hauled off in our own dump trailers." },
  { icon: iconExcavation, alt: "Skid steer with bucket scooping a dirt pile — Phoenix excavation and digging icon", title: "Excavation & Digging", desc: "Foundations, footings, pool dig-outs, retention basins, and dry wells. Our skid steers handle Phoenix soil from loose sand to hard caliche and load straight into our trailers." },
  { icon: iconTrenching, alt: "Skid steer cutting a utility trench with lightning bolt — Phoenix trenching service icon", title: "Trenching", desc: "Clean, straight channels for water, sewer, electrical, gas, irrigation, and French drains. Cut to engineer-spec depth and width with the trencher attachment." },
  { icon: iconDemolition, alt: "Skid steer with hydraulic breaker hammer demolishing concrete slab — Phoenix demolition icon", title: "Demolition & Removal", desc: "Concrete slabs, patios, sidewalks, driveways, sheds, and small structures broken with hydraulic breaker, scooped with grapple, and hauled off — all with one machine." },
  { icon: iconMaterialHauling, alt: "Skid steer scooping rocks and gravel into a bucket — Phoenix material moving and hauling icon", title: "Material Moving & Hauling", desc: "Dirt, gravel, rock, mulch, sand, and construction debris moved across your property or loaded into our dump trailers for off-site disposal." },
  { icon: iconBackfillCompaction, alt: "Compact track loader spreading and compacting fill material — Phoenix backfill and compaction icon", title: "Backfill & Compaction", desc: "Foundation, trench, and pool backfill spread in lifts and compacted with vibratory plate to the density your inspector requires. Native, engineered, or ABC fill." },
  { icon: iconGradingLeveling, alt: "Skid steer with blade attachment grading a gravel driveway — Phoenix driveway and road work icon", title: "Driveway & Road Work", desc: "Gravel driveways, construction access roads, and unpaved property roads installed and regraded. We spread base, cut high spots, fill washouts, and compact the finish." },
  { icon: iconAugerPostHoles, alt: "Skid steer with auger attachment drilling a post hole — Phoenix auger and post hole icon", title: "Auger & Post Holes", desc: "Drilled holes 10 to 36 inches in diameter for fences, signs, footings, and pier foundations. Faster and more consistent than digging by hand." },
];

/* ── Why Choose Us ── */
const whyUs = [
  { icon: HardHatIcon, title: "We Run It and Haul It", desc: "Most operators only run the machine — you still need to hire a separate hauling company. We own our dump trailers and load straight from the bucket. One crew, one invoice, no waiting on a second truck." },
  { icon: LicensedInsuredIcon, title: "Right Machine, Right Job", desc: "Full-size skid steers for power, compact track loaders for soft ground, mini skid steers for backyards behind 36-inch gates. We bring the size and attachment your project actually needs." },
  { icon: TransparentPricingIcon, title: "Operator Who Lives In The Seat", desc: "Renting a skid steer means learning the controls on your project. Our operator runs these machines every day on Phoenix dirt — finishing 3x faster with no risk of property damage or utility strikes." },
  { icon: SameDayEstimateIcon, title: "Phoenix Dirt Experience", desc: "Caliche, decomposed granite, sandy loam, clay — every Valley lot is different. We know which attachment cuts what and how to hit grade in soil that turns to concrete in summer heat." },
];

/* ── 5-Step Process ── */
const processSteps = [
  { icon: stepCall, alt: "Person with clipboard estimating a skid steer project — Rocking S Hauling Phoenix free estimate icon", step: "01", title: "Estimate It", desc: "Call or fill out the online form. Describe the project, send photos if you have them. We respond within 24 hours." },
  { icon: stepVisit, alt: "Building permit document — Rocking S Hauling Phoenix skid steer planning and permits icon", step: "02", title: "Plan It", desc: "Our operator walks the site, checks gate access, assesses soil, and confirms which machine and attachments the job requires." },
  { icon: stepEstimate, alt: "Excavator quote sheet — written skid steer quote from Rocking S Hauling Phoenix icon", step: "03", title: "Quote It", desc: "You get a written quote covering the skid steer work, hauling, and cleanup. No hidden fees. No surprise charges for a second crew." },
  { icon: stepWork, alt: "Loaded dump truck — Rocking S Hauling Phoenix skid steer work and material hauling icon", step: "04", title: "Work It", desc: "Our operator shows up on schedule with the right machine and attachments, completes the work, and loads excess material into our trailers." },
  { icon: stepCleanup, alt: "Broom sweeping clean — Rocking S Hauling Phoenix skid steer site cleanup icon", step: "05", title: "Clean It", desc: "We walk the finished site with you, confirm the work meets your expectations, and haul away every bit of debris before we leave." },
];

/* ── Pricing ── */
const pricingRows = [
  { type: "Skid Steer with Operator", range: "$75 – $150", factors: "Per hour" },
  { type: "Mini Skid Steer with Operator", range: "$65 – $110", factors: "Per hour" },
  { type: "Yard Leveling (Avg. Residential)", range: "$800 – $3,000", factors: "Per project" },
  { type: "Land Clearing", range: "$1,200 – $2,400", factors: "Per acre" },
  { type: "Lot Grading (Residential)", range: "$1,500 – $5,000", factors: "Per project" },
  { type: "Concrete Slab Removal", range: "$500 – $2,500", factors: "Per project" },
  { type: "Trenching", range: "$5 – $12", factors: "Per linear foot" },
  { type: "Gravel Driveway Install", range: "$1,200 – $4,000", factors: "Per project" },
  { type: "Debris Hauling", range: "$150 – $400", factors: "Per dump trailer load" },
  { type: "Full Site Prep (Residential)", range: "$3,000 – $15,000", factors: "Per project" },
];

/* ── Attachments ── */
const attachments = [
  { name: "Grading Bucket", does: "Levels and grades soil surfaces", uses: "Yard leveling, lot grading, finish grade" },
  { name: "Grapple Bucket", does: "Grabs and moves brush, debris, large objects", uses: "Land clearing, demo debris, tree removal" },
  { name: "Hydraulic Breaker", does: "Breaks concrete, rock, and caliche", uses: "Slab removal, caliche breaking, demo" },
  { name: "Auger", does: "Drills holes 10 to 36 inches in diameter", uses: "Fence posts, pier holes, sign posts, tree planting" },
  { name: "Trencher", does: "Cuts narrow channels for utilities and drainage", uses: "Water lines, electrical, French drains" },
  { name: "Brush Cutter", does: "Cuts thick vegetation and small trees", uses: "Land clearing, brush removal, lot clearing" },
  { name: "Landplane", does: "Smooths and levels large flat areas", uses: "Finish grading, driveway prep, arena grading" },
  { name: "Power Rake", does: "Rakes and smooths soil for seed bed prep", uses: "Lawn prep, topsoil finishing, seed bed prep" },
  { name: "Pallet Forks", does: "Lifts and moves palletized material", uses: "Material delivery, block and paver moving" },
];

/* ── Rent vs Hire comparison ── */
const comparison = [
  { factor: "Cost", rent: "$325 – $375/day rental + delivery + fuel + damage deposit", hire: "$75 – $150/hr all-in: operator, fuel, basic hauling included" },
  { factor: "Time", rent: "First-timers take 3 to 4x longer than a pro", hire: "Experienced operator finishes most yard jobs in 4 – 8 hours" },
  { factor: "Skill", rent: "You learn controls, grading technique, and safety on your lot", hire: "Our operator runs skid steers every day across Phoenix" },
  { factor: "Hauling", rent: "You arrange a separate truck or trailer to move material", hire: "We haul excess in our own dump trailers — same crew, same invoice" },
  { factor: "Risk", rent: "Property damage, utility strikes, personal injury exposure", hire: "Trained operator, 811 utility coordination, careful work" },
  { factor: "Result", rent: "Uneven grades, poor compaction, drainage problems", hire: "Finished grade to spec, proper compaction, clean site" },
];

/* ── Common Projects ── */
const projects = [
  { title: "Backyard Leveling for Landscaping", desc: "We level your backyard, correct the grade for drainage, and haul off excess dirt. Your hardscape or turf crew arrives to a finished, ready-to-install surface." },
  { title: "New Home Construction Site Prep", desc: "Lot cleared, building pad graded, footings dug, utilities trenched, and excess material hauled off — handed off pad-ready for your foundation crew." },
  { title: "Pool Excavation", desc: "Hole dug to your pool builder's exact dimensions through whatever Phoenix soil sits on the lot, including caliche. Spoil material trailered off-site same day." },
  { title: "Concrete Patio or Driveway Removal", desc: "Hydraulic breaker cracks the concrete, grapple bucket scoops the rubble, dump trailer hauls it to the recycling facility — all from one machine." },
  { title: "Drainage Problem Fix", desc: "Yard regraded to direct water to the right drainage points, with French drains installed where surface grading alone won't solve monsoon flooding." },
  { title: "Vacant Lot Clearing", desc: "Brush, illegal dumping, and desert vegetation cleared down to bare dirt. Surface graded and all debris hauled off for construction prep or code compliance." },
  { title: "ADU or Casita Site Prep", desc: "Mini skid steer fits through your gate, grades the building pad, and trenches for utility tie-in without damaging the existing home or landscaping." },
  { title: "Horse Property & Arena Maintenance", desc: "Arenas, paddocks, turnouts, and access roads graded and leveled with base material spread across equestrian properties throughout the Valley." },
];

/* ── Service Areas ── */
const eastValley = ["Mesa", "Gilbert", "Chandler", "Tempe", "Scottsdale", "Queen Creek", "Apache Junction", "Cave Creek", "Anthem"];
const westValley = ["Glendale", "Peoria", "Surprise", "Goodyear", "Avondale", "Buckeye", "Litchfield Park", "El Mirage", "Tolleson"];
const centralPhoenix = ["Phoenix", "Paradise Valley", "Arcadia", "Ahwatukee", "Laveen", "South Mountain"];

/* ── FAQs ── */
const faqs = [
  { q: "What is a skid steer?", a: "A skid steer is a compact, powerful machine used for earthmoving, grading, digging, and material handling. It steers by driving the left and right wheels at different speeds, allowing it to turn in place. Skid steers accept dozens of attachments — grading buckets, hydraulic breakers, augers, trenchers — that transform the machine for different tasks." },
  { q: "What is the difference between a skid steer and a Bobcat?", a: "Bobcat is a brand name, like Kleenex is to tissues. Bobcat manufactures skid steers, but so do Caterpillar, John Deere, Kubota, and Case. When people say 'Bobcat,' they usually mean any skid steer. Bobcat holds about 40% of the market and is the most recognized name in the category." },
  { q: "How much does it cost to hire a skid steer with an operator in Phoenix?", a: "Phoenix metro rates run $75 to $150 per hour for a skid steer with an experienced operator. The rate depends on machine size, attachments needed, soil conditions, and project complexity. Most residential jobs take 4 to 8 hours. We provide a free written estimate before any work starts." },
  { q: "Is it cheaper to hire someone or rent a skid steer myself?", a: "For most homeowners, hiring an operator costs about the same or less than renting. A daily rental runs $325 to $375 before delivery, fuel, and damage waiver. An operator finishes in a fraction of the time because they run the machine every day — and you avoid the risk of property damage, utility strikes, and arranging your own hauling." },
  { q: "What size skid steer do I need for my project?", a: "Mini skid steers (36 inches wide) fit through backyard gates and handle trenching, small grading, and material moving. Full-size skid steers (5 to 6 feet wide) handle lot grading, excavation, demolition, and heavy material moving. Our operator recommends the right machine during the site visit based on your access and project scope." },
  { q: "What is the difference between a skid steer and a compact track loader?", a: "A skid steer runs on wheels. A compact track loader (CTL) runs on rubber tracks. Tracks provide better traction on soft, muddy, or sandy ground and distribute weight across a larger area, causing less lawn damage. We bring the right machine type for your soil conditions and project requirements." },
  { q: "What attachments do you use?", a: "We run grading buckets, grapple buckets, hydraulic breakers, augers, trenchers, brush cutters, landplanes, power rakes, and pallet forks. The attachment determines what the skid steer does. Our operator selects the right attachment for each phase of your project." },
  { q: "Do you haul away the material after the work is done?", a: "Yes. We own our dump trailers and haul excess dirt, debris, concrete, and vegetation off-site as part of the project. You do not need to hire a separate hauling company. This is one of the biggest advantages of working with Rocking S." },
  { q: "How long does a typical residential skid steer job take?", a: "Most residential projects take 4 to 8 hours. A backyard leveling job often finishes in one day. A full lot clearing and grading job takes 1 to 3 days. An experienced operator works significantly faster than someone renting equipment for the first time." },
  { q: "Do you work in backyards with limited access?", a: "Yes. Our mini skid steers fit through 36-inch gates. We operate in backyards, side yards, and tight spaces where full-size equipment would not fit. If your gate is narrower than 36 inches, we assess alternative access during the site visit." },
  { q: "Do I need to be home during the work?", a: "Not necessarily. If we have access to the work area and clear instructions, we complete the job whether you are home or not. We send photos of the finished work and walk the site with you at your convenience." },
  { q: "What soil conditions do you work in?", a: "Every soil type across the Phoenix Valley: loose sandy soil, decomposed granite, clay, hardpan, and caliche rock. Caliche is the most challenging — our equipment handles it with ripper teeth and hydraulic breaker attachments." },
  { q: "Do you need special permits for skid steer work?", a: "Most residential jobs do not require a separate permit. Larger projects disturbing more than 100 cubic yards of earth or altering drainage may require a grading permit. Maricopa County also requires dust control plans for projects disturbing more than 0.1 acres." },
  { q: "Do you do small jobs?", a: "Yes. We handle projects as small as a single utility trench or a few hours of backyard leveling. We also handle multi-day lot clearing and full site prep. Our minimum is typically 2 to 4 hours depending on travel distance." },
  { q: "How do I get an estimate?", a: "Call or fill out the online form. We schedule a site visit, assess your project, and provide a written estimate. Most estimates come back within 24 to 48 hours of the site visit." },
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
  "description": "Phoenix skid steer services with operator. Grading, clearing, trenching, demolition, and hauling — one crew runs the machine and hauls the material in our own dump trailers.",
  "url": "https://rockingshauling.com/skid-steer-services-phoenix-az",
  "address": { "@type": "PostalAddress", "addressLocality": "Phoenix", "addressRegion": "AZ", "addressCountry": "US" },
  "areaServed": ["Phoenix","Mesa","Gilbert","Chandler","Scottsdale","Tempe","Glendale","Peoria","Surprise","Goodyear","Buckeye","Queen Creek"].map(c => ({ "@type": "City", "name": c })),
  "serviceType": ["Skid Steer Services","Bobcat Services","Grading","Land Clearing","Trenching","Demolition","Material Hauling"]
};

const SkidSteerService = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Skid Steer Services Phoenix AZ | Operator for Hire</title>
        <meta name="description" content="Professional skid steer services in Phoenix. Grading, clearing, trenching, demo, and hauling. We run the machine and haul the material. Free estimates." />
        <link rel="canonical" href="https://rockingshauling.com/skid-steer-services-phoenix-az" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      </Helmet>

      <Header />

      {/* ── HERO ── */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-end overflow-hidden">
        <img src={heroImg} alt="Yellow CAT skid steer grading a Phoenix Arizona residential lot" className="absolute inset-0 w-full h-full object-cover object-center" width={1920} height={1080} loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/70 to-foreground/30" />
        <div className="relative z-10 container-custom pb-12 md:pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-3 block">Services</span>
            <h1 className="text-4xl md:text-6xl xl:text-7xl font-black uppercase text-background leading-none mb-4">
              Skid Steer Services<br />in <span className="text-primary">Phoenix, AZ</span>
            </h1>
            <p className="text-background/95 text-lg md:text-xl max-w-2xl font-medium">
              One machine. Endless jobs. We run the skid steer so you don't have to — grading, clearing, trenching, demo, and hauling. One crew, one call.
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

      {/* ── INTRO ── */}
      <section className="section-padding bg-background">
        <div className="container-custom max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-8 text-foreground">
              One Machine.<br /><span className="text-primary">Endless Jobs.</span>
            </h2>
            <div className="space-y-7 text-foreground text-lg md:text-xl leading-[1.85] tracking-wide">
              <p>You need dirt moved, a lot cleared, a yard leveled, or debris hauled off your property. You do not need to figure out which machine to rent, how to operate it, or where to dump the material afterward.</p>
              <p>Rocking S Hauling brings the skid steer, runs the equipment, and hauls the excess material with our own dump trailers. <span className="text-primary font-black">One call. One crew. One invoice.</span></p>
              <p>We operate compact track loaders, full-size skid steers, and mini skid steers across the Phoenix metro area — residential backyards to commercial lots. Every project gets the right machine for the job, an experienced operator behind the controls, and cleanup included.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WHAT WE DO WITH A SKID STEER ── */}
      <section className="section-padding relative overflow-hidden -mt-px">
        <div className="absolute inset-0 z-0">
          <img src={servicesBg} alt="" className="absolute inset-0 w-full h-full object-cover object-center" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground via-foreground/85 to-foreground/95" />
        </div>
        <div className="container-custom max-w-6xl relative z-10">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-block bg-primary text-primary-foreground font-black uppercase tracking-widest text-xs px-4 py-2 mb-4">What We Do</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase mb-4 text-background">
              What We Do With A <span className="text-primary">Skid Steer</span>
            </h2>
            <p className="text-background/90 text-lg max-w-3xl mx-auto">
              Nine core services run by one machine and one crew — every job sized to your lot, your access, and your soil.
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
                <div className="w-20 h-20 bg-primary flex items-center justify-center mb-4 overflow-hidden">
                  <img src={svc.icon} alt={svc.alt} width={80} height={80} loading="lazy" className="w-full h-full object-contain" />
                </div>
                <h3 className="font-black uppercase text-base mb-2 tracking-wide text-foreground">{svc.title}</h3>
                <p className="text-foreground text-base leading-relaxed">{svc.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section
        className="section-padding bg-muted relative"
        style={{
          backgroundImage: `url(${skidsteerWhyBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/80 to-foreground/60 pointer-events-none" />
        <div className="container-custom max-w-6xl relative z-10">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-block bg-primary text-primary-foreground font-black uppercase tracking-widest text-xs px-4 py-2 mb-4">Why Rocking S</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase mb-4 text-background">
              Why Phoenix Calls <span className="text-primary">Rocking S</span>
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
            <span className="inline-block bg-primary text-primary-foreground font-black uppercase tracking-widest text-xs px-4 py-2 mb-4">How It Works</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase mb-4 text-background">
              Our 5-Step <span className="text-primary">Skid Steer Process</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-12 items-stretch">
            {processSteps.map((item, idx) => (
              <motion.div key={idx} className="bg-background border border-border p-6 text-center flex flex-col h-full" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
                <div className="flex justify-center mb-5">
                  <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center overflow-hidden">
                    <img src={item.icon} alt={item.alt} width={128} height={128} loading="lazy" className="w-[90%] h-[90%] object-contain" />
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
            <a href="/#contact" className="inline-block bg-primary text-primary-foreground font-black uppercase tracking-wider px-8 py-4 text-sm hover:bg-background hover:text-foreground hover:scale-95 transition-all">
              Get a Free Quote
            </a>
          </div>
        </div>
      </section>

      {/* ── OUR EQUIPMENT ── */}
      <section className="section-padding bg-background">
        <div className="container-custom max-w-6xl">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-block bg-primary text-primary-foreground font-black uppercase tracking-widest text-xs px-4 py-2 mb-4">Our Equipment</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase mb-4 text-foreground">
              The Right <span className="text-primary">Machine</span> For Your Job
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">Three machine sizes. Nine attachments. We bring the setup that fits your access and the soil sitting on your lot.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { title: "Full-Size Skid Steers", desc: "Heavy work. Lifts 2,000+ pounds, pushes large material volumes, powers hydraulic breakers and brush cutters. Used for lot grading, commercial site prep, and demolition." },
              { title: "Compact Track Loaders", desc: "Tracks instead of wheels. Better traction on soft, muddy, or sandy ground and reduced surface damage on finished areas. Our pick for soft soil and lawn work." },
              { title: "Mini Skid Steers", desc: "Fits through 36-inch backyard gates. Trenching, small grading, material moving, and tight-access work in spaces full-size machines can't reach." },
            ].map((m, i) => (
              <motion.div key={i} className="bg-foreground text-background p-8 border-t-4 border-primary" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <h3 className="font-black uppercase text-xl mb-3">{m.title}</h3>
                <p className="text-background/90 leading-relaxed text-base">{m.desc}</p>
              </motion.div>
            ))}
          </div>

          <h3 className="text-2xl md:text-3xl font-black uppercase mb-6 text-foreground text-center">
            Attachments We <span className="text-primary">Run</span>
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="bg-primary text-primary-foreground font-black uppercase text-sm tracking-wider p-5 text-left border-r border-r-primary-foreground/20">Attachment</th>
                  <th className="bg-primary text-primary-foreground font-black uppercase text-sm tracking-wider p-5 text-left border-r border-r-primary-foreground/20">What It Does</th>
                  <th className="bg-primary text-primary-foreground font-black uppercase text-sm tracking-wider p-5 text-left">Common Projects</th>
                </tr>
              </thead>
              <tbody>
                {attachments.map((a, i) => (
                  <tr key={i} className="bg-background text-foreground border-b border-b-foreground">
                    <td className="p-5 font-black uppercase text-sm border-r border-r-foreground">{a.name}</td>
                    <td className="p-5 text-base border-r border-r-foreground">{a.does}</td>
                    <td className="p-5 text-foreground/90 text-base">{a.uses}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="section-padding bg-foreground text-background border-t border-background/10">
        <div className="container-custom max-w-5xl">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-block bg-primary text-primary-foreground font-black uppercase tracking-widest text-xs px-4 py-2 mb-4">Pricing</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase mb-4">
              Skid Steer Costs in <span className="text-primary">Phoenix</span>
            </h2>
            <p className="text-background/90 text-lg max-w-3xl mx-auto">
              Honest ranges based on typical Phoenix residential and light commercial work. Soil, access, and hauling volume all move the needle.
            </p>
          </motion.div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden">
              <thead>
                <tr>
                  <th className="bg-primary text-primary-foreground font-black uppercase text-sm tracking-wider p-5 text-left border-r border-r-primary-foreground/20">Service</th>
                  <th className="bg-primary text-primary-foreground font-black uppercase text-sm tracking-wider p-5 text-left border-r border-r-primary-foreground/20">Typical Cost</th>
                  <th className="bg-primary text-primary-foreground font-black uppercase text-sm tracking-wider p-5 text-left">Unit</th>
                </tr>
              </thead>
              <tbody>
                {pricingRows.map((row, idx) => (
                  <tr key={idx} className="bg-background text-foreground border-b border-b-foreground">
                    <td className="p-5 font-black uppercase text-sm border-r border-r-foreground">{row.type}</td>
                    <td className="p-5 text-primary font-black text-base border-r border-r-foreground">{row.range}</td>
                    <td className="p-5 text-foreground/90 text-base">{row.factors}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-background/80 text-base mt-6 text-center">
            Costs based on 2025–2026 Phoenix metro market data. Caliche, access limitations, and hauling volume affect final pricing. Call for a free on-site estimate.
          </p>
        </div>
      </section>

      {/* ── COMMON PROJECTS ── */}
      <section className="section-padding bg-background">
        <div className="container-custom max-w-6xl">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-block bg-primary text-primary-foreground font-black uppercase tracking-widest text-xs px-4 py-2 mb-4">Common Projects</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase mb-4">
              Common Skid Steer Projects in <span className="text-primary">Phoenix</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">From backyard leveling to vacant lot clearing — here's the work we run every week across the Valley.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-5">
            {projects.map((p, i) => (
              <motion.div key={i} className="bg-foreground text-background p-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <h3 className="font-black uppercase text-base md:text-lg tracking-wide mb-3" style={{ color: 'hsl(0 95% 62%)' }}>{p.title}</h3>
                <p className="text-background/90 leading-relaxed text-base">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AREAS WE SERVE ── */}
      <section className="section-padding bg-foreground text-background">
        <div className="container-custom max-w-5xl">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-block bg-primary text-primary-foreground font-black uppercase tracking-widest text-xs px-4 py-2 mb-4">Service Areas</span>
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-4">
              Skid Steer Service <span className="text-primary">Across The Valley</span>
            </h2>
            <p className="text-background/90 text-lg">Operating in every Phoenix metro city — East Valley, West Valley, and Central Phoenix.</p>
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
            <span className="inline-block bg-primary text-primary-foreground font-black uppercase tracking-widest text-xs px-4 py-2 mb-4">FAQ</span>
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

      <ServiceQuoteCTA backgroundImage={skidsteerQuoteBg} />
      <Footer />
    </div>
  );
};

export default SkidSteerService;
