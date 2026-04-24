import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Phone, ArrowRight, ChevronDown, MapPin } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceQuoteCTA from '@/components/ServiceQuoteCTA';
import ServiceAreaMap from '@/components/ServiceAreaMap';
import heroImg from '@/assets/dumptrailer-hero.jpg';
import ctaBg from '@/assets/dumptrailer-cta-bg.jpg';

import {
  HardHatIcon, LicensedInsuredIcon, TransparentPricingIcon, SameDayEstimateIcon,
} from '@/components/icons/DemolitionIcons';
import {
  NoDamageIcon, AllInclusiveIcon, FlexibleLoadingIcon, LocallyOwnedIcon,
} from '@/components/icons/DumpTrailerIcons';
import stepBook from '@/assets/dumptrailer-step-1-book.png';
import stepDeliver from '@/assets/dumptrailer-step-2-deliver.png';
import stepLoad from '@/assets/dumptrailer-step-3-load.png';
import stepPickup from '@/assets/dumptrailer-step-4-pickup.png';
import stepDispose from '@/assets/dumptrailer-step-5-dispose.png';
import iconHomeCleanout from '@/assets/dumptrailer-icon-home-cleanout.svg';
import iconYardWaste from '@/assets/dumptrailer-icon-yard-waste.svg';
import iconDirtGravel from '@/assets/dumptrailer-icon-dirt-gravel.svg';
import iconConstructionDebris from '@/assets/dumptrailer-icon-construction-debris.svg';
import iconRoofing from '@/assets/dumptrailer-icon-roofing.svg';
import iconConcreteMasonry from '@/assets/dumptrailer-icon-concrete-masonry.svg';
import iconMoveOut from '@/assets/dumptrailer-icon-move-out.svg';
import iconEventCleanup from '@/assets/dumptrailer-icon-event-cleanup.svg';
import iconJunkRemoval from '@/assets/dumptrailer-icon-junk-removal.svg';

/* ── Services / Common Uses ── */
const services = [
  { img: iconHomeCleanout, title: "Home Cleanouts", desc: "Garages, attics, basements, and storage units. Old furniture, boxes, broken appliances, and years of accumulated stuff — gone in one trailer load." },
  { img: iconYardWaste, title: "Yard Waste & Landscaping", desc: "Tree trimmings, branches, shrubs, dead plants, and landscaping debris. Drop the trailer next to the work zone and load straight in." },
  { img: iconDirtGravel, title: "Dirt, Gravel & Rock", desc: "Pool dig-outs, lot grading, trenching spoils, and old gravel removal. Our 14,000 lb GVWR trailers handle heavy material loads without issue." },
  { img: iconConstructionDebris, title: "Construction Debris", desc: "Drywall, framing lumber, flooring, tile, insulation, and general construction waste. The trailer stays on site until you're finished." },
  { img: iconRoofing, title: "Roofing Tear-Offs", desc: "Shingles, underlayment, flashing, and old roofing materials. Drop the trailer next to the house and toss debris straight in from the roof." },
  { img: iconConcreteMasonry, title: "Concrete & Masonry", desc: "Broken concrete, pavers, brick, block, and stone. Rated for heavy material — concrete loads come off the slab and onto our trailer." },
  { img: iconMoveOut, title: "Move-Out & Estate Cleanouts", desc: "Moving out and need to dump everything you're not taking? Handling an estate cleanout? A dump trailer is the fastest way to empty a home." },
  { img: iconEventCleanup, title: "Event & Site Cleanup", desc: "Post-event waste from parties, weddings, community events, or job sites. Load it all in and we take care of the disposal." },
  { img: iconJunkRemoval, title: "General Junk Removal", desc: "Mattresses, appliances, broken furniture, and household junk. Skip the multiple landfill runs — one trailer load handles it all." },
];

/* ── Why Choose Us ── */
const whyUs = [
  { icon: NoDamageIcon, title: "Zero Driveway Damage", desc: "Roll-off dumpsters routinely crack and scratch concrete driveways with their metal edges. Our dump trailers sit on rubber tires, so your driveway looks the same when we leave as it did when we arrived." },
  { icon: AllInclusiveIcon, title: "Delivery, Pickup & Disposal Included", desc: "This is not a self-tow rental. You don't need a truck. You don't need a hitch. You don't drive to the landfill. We deliver the trailer, you load it, and we haul everything to the appropriate disposal facility — all in one price." },
  { icon: FlexibleLoadingIcon, title: "Load on Your Schedule", desc: "Daily and weekly rental periods give you time to load at your own pace. Need more time? Extra days are available for a flat daily fee. The trailer stays on your property until you're done." },
  { icon: LocallyOwnedIcon, title: "Locally Owned, Phoenix Trusted", desc: "We're a Phoenix-based, family-owned operation. We answer the phone, show up when we say we will, and treat your property like our own. No corporate dispatch, no missed windows." },
];

/* ── 5-Step Process ── */
const processSteps = [
  { img: stepBook, alt: "Book a dump trailer rental online with Rocking S Hauling — calendar booking on smartphone", step: "01", title: "Call or Book Online", desc: "Tell us what you're hauling, where the trailer goes, and when you need it. We'll recommend the right size and walk you through pricing." },
  { img: stepDeliver, alt: "Rocking S Hauling delivering a loaded dump trailer to a Phoenix job site", step: "02", title: "We Deliver", desc: "We bring the dump trailer to your driveway, job site, or property — placed exactly where you need it. No truck or hitch required from you." },
  { img: stepLoad, alt: "Customer loading boxes and debris into a rented dump trailer", step: "03", title: "You Load It", desc: "Fill the trailer at your own pace during your rental window. Stack furniture, toss in debris, shovel in dirt — whatever fits the job." },
  { img: stepPickup, alt: "Rocking S Hauling dump truck picking up a full rental trailer", step: "04", title: "We Pick It Up", desc: "When you're done loading, give us a call. We come back, hook up, and pull the trailer off your property — same-day or next-day." },
  { img: stepDispose, alt: "Dump trailer raised and dumping debris at a licensed disposal facility", step: "05", title: "We Dispose", desc: "We haul your load to the appropriate disposal or recycling facility. Concrete to recycling, mixed debris to licensed transfer stations. One invoice." },
];

/* ── Pricing ── */
const pricingRows = [
  { type: "Daily Rental (Drop, Load, Pickup)", range: "Starting at $300", factors: "Includes delivery, pickup, disposal" },
  { type: "Weekend Rental (Fri – Mon)", range: "Custom Quote", factors: "Extended loading window" },
  { type: "Weekly Rental (7 Days)", range: "Custom Quote", factors: "Best value for long projects" },
  { type: "Extra Day Fee", range: "Flat Daily Rate", factors: "Need more time? Add days as needed" },
  { type: "Heavy Material (Concrete / Dirt)", range: "Same Base Rate", factors: "Up to 14,000 lbs GVWR per load" },
  { type: "Standard Trailer (~6 cu yd)", range: "Included", factors: "14' × 7' × 24\" walls — heavy material" },
  { type: "High-Side Trailer (~9 cu yd)", range: "Included", factors: "14' × 7' × 36\" walls — bulky items" },
  { type: "Same-Day Delivery", range: "Subject to availability", factors: "Call early in the day for best chance" },
  { type: "Out-of-Area Delivery", range: "Custom Quote", factors: "Outside core Phoenix metro" },
  { type: "Hazardous Material Handling", range: "Not Accepted", factors: "Paint, asbestos, chemicals — call for guidance" },
];

/* ── When You Need a Dump Trailer ── */
const useCases = [
  "You're cleaning out a garage, attic, basement, or storage unit and have more than fits in a pickup truck.",
  "You're doing a kitchen, bath, or interior remodel and need a place for drywall, flooring, cabinets, and tile.",
  "You're tearing off and replacing your roof and need a trailer parked next to the house for shingles and underlayment.",
  "You're trimming trees, clearing brush, or redoing landscaping and have a pile of yard waste to get rid of.",
  "You're removing an old concrete patio, driveway, or walkway and need to haul off broken slabs.",
  "You're prepping or finishing a pool dig and have dirt or gravel that has to leave the property.",
  "You're a contractor needing a dump trailer on-site for ongoing demo, framing, or finish-out debris.",
  "You're cleaning out a rental property between tenants and want everything gone in a single trip.",
  "You're handling an estate cleanout and need to empty an entire home of furniture and personal items.",
];

/* ── Trailer Reality / What You Should Know ── */
const trailerFacts = [
  { title: "Two Trailer Sizes Available", desc: "We run two 14-foot by 7-foot trailers. The standard has 24-inch walls (~6 cubic yards) and is best for heavy materials like dirt, gravel, and concrete. The high-side has 36-inch walls (~9 cubic yards) and is best for bulky items like furniture, brush, and roofing." },
  { title: "Weight Limit Is 14,000 lbs GVWR", desc: "Each trailer is rated to haul roughly 10,000 lbs of material per load. Concrete, wet dirt, and tile fill the weight limit fast — even when the trailer doesn't look full. We help you size your project before delivery." },
  { title: "What We Cannot Accept", desc: "We can't take hazardous chemicals, paint, solvents, motor oil, gasoline, asbestos, medical waste, or compressed gas cylinders. If you're not sure about a material, call us first." },
  { title: "Driveway, HOA, and Access", desc: "Our trailers fit in standard driveways, HOA communities, and tighter Phoenix lot lines that roll-off dumpsters cannot. The rubber tires won't crack your concrete or paver surface." },
  { title: "Same-Day & Next-Day Availability", desc: "We schedule deliveries throughout the day and offer same-day or next-day drop-offs depending on trailer availability. Call early in the day for the best chance at same-day service." },
];

/* ── Service Areas ── */
const eastValley = ["Mesa", "Gilbert", "Chandler", "Tempe", "Scottsdale", "Queen Creek", "Apache Junction", "Cave Creek", "Anthem"];
const westValley = ["Glendale", "Peoria", "Surprise", "Goodyear", "Avondale", "Buckeye", "Litchfield Park", "El Mirage", "Tolleson"];
const centralPhoenix = ["Phoenix", "Paradise Valley", "Arcadia", "Ahwatukee", "Laveen", "South Mountain"];

/* ── FAQs ── */
const faqs = [
  { q: "How much does it cost to rent a dump trailer in Phoenix?", a: "Dump trailer rental in Phoenix starts at $300 per day. Pricing depends on rental duration and what's included. Rocking S Hauling includes delivery, pickup, and disposal in every rental — no separate dump fees." },
  { q: "Do I need a truck or trailer hitch to rent a dump trailer?", a: "No. We deliver the trailer to your location and pick it up when you're done. You do not need a truck, hitch, or any towing equipment. We handle every part of the transportation." },
  { q: "How long can I keep the dump trailer?", a: "Daily and weekly rental periods are available. Need more time? Extra days are added for a flat daily fee. The trailer stays on your property the entire rental window so you can load at your own pace." },
  { q: "What sizes of dump trailers do you offer?", a: "Two trailers, both 14 feet by 7 feet. The standard trailer has 24-inch walls (~6 cubic yards) for heavy materials like dirt and concrete. The high-side trailer has 36-inch walls (~9 cubic yards) for bulkier items like furniture and brush." },
  { q: "How much weight can I put in the dump trailer?", a: "Both trailers are rated at 14,000 lbs GVWR. Plan on roughly 10,000 lbs of material per load. Dense materials like concrete or wet dirt fill the weight limit quickly even when the trailer is not visually full." },
  { q: "What can I put in the dump trailer?", a: "Almost anything non-hazardous. Household junk, furniture, appliances, yard waste, dirt, gravel, concrete, construction debris, roofing materials, fencing, and general trash. We do not accept hazardous chemicals, paint, asbestos, medical waste, or flammable liquids." },
  { q: "Do you offer same-day delivery?", a: "We offer same-day and next-day delivery depending on trailer availability. Call early in the day for the best shot at same-day service." },
  { q: "Where do you take the material after pickup?", a: "We haul your load to the appropriate Phoenix-area disposal or recycling facility. Clean concrete and dirt go to recycling. Mixed debris goes to licensed transfer stations or landfills." },
  { q: "What areas in Phoenix do you serve?", a: "We serve the entire Phoenix metropolitan area including Mesa, Gilbert, Chandler, Tempe, Scottsdale, Glendale, Peoria, Surprise, Goodyear, Avondale, Buckeye, Queen Creek, and everywhere in between." },
  { q: "What is the difference between a dump trailer and a roll-off dumpster?", a: "A dump trailer sits on rubber tires and won't damage your driveway. A roll-off dumpster is a heavy metal box that frequently cracks or scratches concrete. Dump trailers are also lower to the ground and easier to load. For most residential projects, a dump trailer is the better option." },
  { q: "Does Home Depot rent dump trailers?", a: "Home Depot rents small self-tow dump trailers. You provide the truck and hitch, tow it yourself, and handle dump fees. Rocking S Hauling delivers, picks up, and disposes of everything for you. No truck or hitch needed." },
  { q: "Is renting a dump trailer worth it?", a: "For any project with more debris than fits in a truck bed, yes. One dump trailer load replaces multiple landfill runs. You save time, fuel, dump fees, and wear on your vehicle." },
  { q: "Can I put concrete in the dump trailer?", a: "Yes. Our trailers are rated for 14,000 lbs GVWR and handle concrete, brick, block, and stone. Concrete is extremely heavy — a small pile fills the weight limit fast even when the trailer isn't visually full." },
  { q: "How do you place the trailer on my property?", a: "We back the trailer into your driveway, side yard, or job site exactly where you direct us. We need a relatively flat spot with clear overhead access. We can place it on concrete, gravel, or packed dirt." },
  { q: "Do I need to be home for delivery and pickup?", a: "No, as long as we know where to drop the trailer and where to pick it up. Many of our customers leave instructions and we handle delivery and pickup while they're at work." },
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
  "description": "Phoenix dump trailer rental with delivery, pickup, and disposal included. No truck or hitch needed. Serving the entire Phoenix Valley.",
  "url": "https://rockingshauling.com/dump-trailer-rental-phoenix-az",
  "address": { "@type": "PostalAddress", "addressLocality": "Phoenix", "addressRegion": "AZ", "addressCountry": "US" },
  "areaServed": ["Phoenix","Mesa","Gilbert","Chandler","Scottsdale","Tempe","Glendale","Peoria","Surprise","Goodyear","Buckeye","Queen Creek"].map(c => ({ "@type": "City", "name": c })),
  "serviceType": ["Dump Trailer Rental","Junk Removal","Debris Hauling","Construction Debris Removal","Yard Waste Removal","Concrete Removal"]
};

const DumpTrailerService = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Dump Trailer Rental Phoenix AZ | Rocking S Hauling</title>
        <meta name="description" content="Dump trailer rental in Phoenix starting at $300. We deliver, you load, we haul. No truck or hitch needed. Serving the entire Phoenix Valley." />
        <link rel="canonical" href="https://rockingshauling.com/dump-trailer-rental-phoenix-az" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      </Helmet>

      <Header />

      {/* ── HERO ── */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-end overflow-hidden">
        <img src={heroImg} alt="Dump trailer rental in Phoenix AZ" className="absolute inset-0 w-full h-full object-cover object-center" width={1920} height={1080} loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/70 to-foreground/50" />
        <div className="relative z-10 container-custom pb-12 md:pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-3 block">Services</span>
            <h1 className="text-4xl md:text-6xl xl:text-7xl font-black uppercase text-background leading-none mb-4">
              Dump Trailer Rental<br />in <span className="text-primary">Phoenix, AZ</span>
            </h1>
            <p className="text-background/95 text-lg md:text-xl max-w-2xl font-medium">
              We drop it off. You load it. We haul it away. No truck, no hitch, no landfill runs. Starting at $300 with delivery, pickup, and disposal included.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <a href="/#contact" className="bg-primary text-primary-foreground px-8 py-4 text-sm font-black uppercase tracking-widest hover:bg-background hover:text-foreground transition-all inline-flex items-center justify-center gap-2">
                Reserve Your Trailer <ArrowRight className="w-4 h-4" />
              </a>
              <a href="tel:4801234567" className="border-2 border-background text-background px-8 py-4 text-sm font-black uppercase tracking-widest hover:bg-background hover:text-foreground transition-all inline-flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" /> Questions? Call Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES / COMMON USES ── */}
      <section className="section-padding relative overflow-hidden -mt-px bg-foreground">
        <div className="container-custom max-w-6xl relative z-10">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase mb-4 text-background">
              What Our Trailers <span className="text-primary">Haul</span>
            </h2>
            <p className="text-background/90 text-lg max-w-3xl mx-auto">
              From garage cleanouts to roofing tear-offs to concrete demo — one trailer handles it all. Drop, load, haul, done.
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
                  <img src={svc.img} alt={svc.title} className="w-full h-full object-contain" />
                </div>
                <h3 className="font-black uppercase text-sm mb-2 tracking-wide text-foreground">{svc.title}</h3>
                <p className="text-foreground text-base leading-relaxed">{svc.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
      </section>

      {/* ── WHAT IS A DUMP TRAILER ── */}
      <section className="section-padding bg-background">
        <div className="container-custom max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-6 text-foreground">
              What Is a <span className="text-primary">Dump Trailer Rental?</span>
            </h2>
            <div className="space-y-5 text-muted-foreground text-base md:text-lg leading-relaxed">
              <p>A dump trailer rental is the easier, cleaner alternative to a roll-off dumpster. We bring a 14-foot trailer to your driveway, side yard, or job site. You load it on your own schedule. We come back, pick it up, and haul everything to the appropriate disposal facility.</p>
              <p>This is <strong>not</strong> a self-tow rental like Home Depot or U-Haul. You don't need a truck. You don't need a trailer hitch. You don't drive to the landfill. Rocking S Hauling handles delivery, pickup, and disposal in every rental — one flat price, no surprise fees.</p>
              <p>Compared to a roll-off dumpster, our trailers sit on rubber tires (no driveway damage), are lower to the ground (easier loading), and fit in tighter spaces (HOA communities, narrow Phoenix lot lines, side yards). For most residential and small commercial jobs, a dump trailer is the better option.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="section-padding bg-muted">
        <div className="container-custom max-w-6xl">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase mb-4 text-foreground">
              Why Phoenix Rents From <span className="text-primary">Rocking S?</span>
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
              Reserve Your Trailer
            </a>
          </div>
        </div>
      </section>

      {/* ── 5-STEP PROCESS ── */}
      <section className="section-padding bg-foreground">
        <div className="container-custom max-w-6xl">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase mb-4 text-background">
              How Dump Trailer <span className="text-primary">Rental Works</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-12 items-stretch">
            {processSteps.map((item, idx) => (
              <motion.div key={idx} className="bg-background border border-border p-6 text-center flex flex-col h-full" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
                <div className="flex justify-center mb-5">
                  <div className="w-28 h-28 flex items-center justify-center">
                    <img src={item.img} alt={item.alt} className="w-full h-full object-contain" loading="lazy" />
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
              Reserve Your Trailer
            </a>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="section-padding bg-foreground text-background border-t border-background/10">
        <div className="container-custom max-w-5xl">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase mb-4">
              Dump Trailer Rental <span className="text-primary">Pricing</span>
            </h2>
            <p className="text-background/90 text-lg max-w-3xl mx-auto">
              Honest, simple pricing. Delivery, pickup, and disposal are always included — no surprise dump fees on the back end.
            </p>
          </motion.div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden">
              <thead>
                <tr>
                  <th className="bg-primary text-primary-foreground font-black uppercase text-sm tracking-wider p-5 text-left border-r border-r-primary-foreground/20">Rental Option</th>
                  <th className="bg-primary text-primary-foreground font-black uppercase text-sm tracking-wider p-5 text-left border-r border-r-primary-foreground/20">Pricing</th>
                  <th className="bg-primary text-primary-foreground font-black uppercase text-sm tracking-wider p-5 text-left">What's Included / Notes</th>
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
            Final pricing depends on rental length, delivery distance, and material type. Hazardous materials are not accepted. Call for a custom quote on extended or commercial rentals.
          </p>
        </div>
      </section>

      {/* ── WHEN YOU NEED A DUMP TRAILER ── */}
      <section className="section-padding bg-background">
        <div className="container-custom max-w-4xl">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-4">
              When You Need a <span className="text-primary">Dump Trailer</span>
            </h2>
            <p className="text-muted-foreground text-lg">From cleanouts to remodels to roofing — here's when calling for a dump trailer makes sense.</p>
          </motion.div>
          <div className="space-y-4">
            {useCases.map((item, idx) => (
              <motion.div key={idx} className="flex items-start gap-4 p-4 bg-foreground text-background hover:bg-primary hover:text-primary-foreground transition-colors group" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }}>
                <CheckCircle2 className="w-5 h-5 text-background flex-shrink-0 mt-0.5 group-hover:text-primary-foreground" />
                <p className="text-background font-medium text-sm md:text-base group-hover:text-primary-foreground">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRAILER FACTS / WHAT YOU SHOULD KNOW ── */}
      <section className="section-padding bg-muted">
        <div className="container-custom max-w-4xl">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-4">
              Trailer Sizes, Weight Limits & <span className="text-primary">What You Should Know</span>
            </h2>
            <p className="text-muted-foreground text-lg">Pick the right trailer the first time. Here's how our equipment, weight limits, and material rules work.</p>
          </motion.div>
          <div className="space-y-6">
            {trailerFacts.map((item, idx) => (
              <motion.div key={idx} className="bg-background p-6 border-l-4 border-primary" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
                <h3 className="font-black uppercase text-sm mb-2 tracking-wide">{item.title}</h3>
                <p className="text-foreground/90 leading-relaxed text-base">{item.desc}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-muted-foreground text-xs mt-8 text-center italic">
            Not sure what trailer fits your project? Call us. We size the right trailer based on your material, your timeline, and your access — at no charge.
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
            <p className="text-background/90 text-lg">Dump trailer rental and same-day delivery across the entire Phoenix metropolitan area.</p>
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
          <p className="text-background/80 text-base mt-8 text-center">Not sure if we cover your area? Call us. If you're within the Phoenix metro, we deliver.</p>
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

      <ServiceQuoteCTA backgroundImage={ctaBg} />
      <Footer />
    </div>
  );
};

export default DumpTrailerService;
