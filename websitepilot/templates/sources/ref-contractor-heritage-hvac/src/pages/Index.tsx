import PromoBarTop from "../components/PromoBarTop";
import Header from "../components/Header";
import Hero from "../components/Hero";
import TrustBarIcons from "../components/TrustBarIcons";
import HvacThreeDoorEntry from "../components/HvacThreeDoorEntry";
import Services from "../components/Services";
import HvacGuaranteeBadgeRibbon from "../components/HvacGuaranteeBadgeRibbon";
import HvacCoreValuesPillarTrio from "../components/HvacCoreValuesPillarTrio";
import TankVsTanklessSpecCompare from "../components/TankVsTanklessSpecCompare";
import HvacCouponEmbeddedServices from "../components/HvacCouponEmbeddedServices";
import Reviews from "../components/Reviews";
import Plumbing247AvailabilityBand from "../components/Plumbing247AvailabilityBand";
import FinancingCallout from "../components/FinancingCallout";
import FAQLongFormSEO from "../components/FAQLongFormSEO";
import CTABand from "../components/CTABand";
import Footer from "../components/Footer";

/**
 * Pre-composed bundle: contractor-heritage base + HVAC vertical patterns.
 *
 * Section rhythm tuned for residential HVAC (heating + cooling + IAQ):
 *   1.  PromoBarTop                 — financing + 24/7 + tune-up specials strip
 *   2.  Header                      — logo + nav + Get-A-Free-Quote CTA
 *   3.  Hero                        — HvacBrandedVanHero + inline quote form (composed)
 *   4.  TrustBarIcons               — LOCAL / WORKMANSHIP / UPFRONT / ON-TIME
 *   5.  HvacThreeDoorEntry   [vert] — Heating / Cooling / Indoor Air Quality 3 doors
 *   6.  Services                    — detailed services under each door (red/blue/ink columns)
 *   7a. HvacGuaranteeBadgeRibbon [vert] — 5-icon named-program ribbon
 *   7b. HvacCoreValuesPillarTrio [vert] — 3 Cs heritage trust pillars
 *   8.  TankVsTanklessSpecCompare [vert] — heat-pump vs gas-furnace spec compare
 *   9.  HvacCouponEmbeddedServices [vert] — service grid with embedded coupon chips
 *  10.  Reviews                     — Google 5-star pull-quotes
 *  11.  Plumbing247AvailabilityBand [vert] — adapted "24/7 EMERGENCY HVAC" band
 *  12.  FinancingCallout            — 0% APR financing band w/ partner logo
 *  13.  FAQLongFormSEO              — 12-15 question accordion, schema.org/FAQPage ready
 *  14.  CTABand + Footer            — final form + dark footer
 *
 * DO NOT reorder casually. The promo → hero → trust → 3-door rhythm is the
 * HVAC-specialization signature; rearranging pulls it back toward the generic
 * contractor-heritage clone. The red+ink palette stays for primary CTAs while
 * comfort-blue (#1976D2) accents the cooling side of every relevant block.
 */
export default function Index() {
  return (
    <>
      <PromoBarTop />
      <Header />
      <Hero />
      <TrustBarIcons />
      <HvacThreeDoorEntry
        doors={[
          {
            eyebrow: "When the cold hits",
            title: "Heating",
            sub: "Furnaces, heat pumps, and boilers — service the same day, install with financing.",
            icon: "🔥",
            href: "#heating",
            tone: "primary",
          },
          {
            eyebrow: "When summer arrives",
            title: "Cooling",
            sub: "AC repair, new SEER2 systems, and ductless mini-splits sized to your home.",
            icon: "❄️",
            href: "#cooling",
            tone: "outline",
          },
          {
            eyebrow: "What you're breathing",
            title: "Indoor Air Quality",
            sub: "Whole-home purifiers, humidifiers, duct sealing, and smart thermostats.",
            icon: "🌬️",
            href: "#iaq",
            tone: "dark",
          },
        ]}
        brand={{
          ink: "#231F20",
          primary: "#EF3E33",
          primaryInk: "#FFFFFF",
          surface: "#F4F6F8",
          accent: "#1976D2",
        }}
      />
      <Services />
      <HvacGuaranteeBadgeRibbon
        eyebrow="Why {{BRAND_NAME}}"
        headline="Guarantees You Can Bank On"
        items={[
          { title: "0% APR FINANCING", caption: "On approved credit", icon: "💳" },
          { title: "WORKMANSHIP WARRANTY", caption: "In writing, every job", icon: "🛡️" },
          { title: "PREMIUM EQUIPMENT", caption: "Trane, Lennox, Mitsubishi", icon: "⭐" },
          { title: "LOCAL SINCE {{YEAR_FOUNDED}}", caption: "Family-owned, never sold", icon: "🤝" },
          { title: "SAME-DAY SERVICE", caption: "When you call before noon", icon: "⚡" },
        ]}
        ctaLabel="See All Maintenance Plans"
        ctaHref="#maintenance"
        brand={{ ink: "#FFFFFF", primary: "#231F20", primaryInk: "#FFFFFF", surface: "#EF3E33" }}
      />
      <HvacCoreValuesPillarTrio
        eyebrow="Core Values"
        headline="The 3 Cs That Define Every Job"
        pillars={[
          {
            letter: "C",
            name: "Comfort",
            body: "Your home should feel like the most comfortable place you go all day. We make sure your HVAC system never gets in the way of that.",
            icon: "🛋️",
          },
          {
            letter: "C",
            name: "Care",
            body: "Customer care isn't a tagline — it's the reason we still answer the phone after 5pm. Treat your home like ours, every visit.",
            icon: "🤝",
          },
          {
            letter: "C",
            name: "Commitment",
            body: "One-hour arrival windows, clean job sites, and a follow-up call to confirm everything's still right. Every job, every time.",
            icon: "🛡️",
          },
        ]}
        brand={{ ink: "#FFFFFF", primary: "#1976D2", primaryInk: "#FFFFFF", surface: "#231F20" }}
      />
      <TankVsTanklessSpecCompare
        eyebrow="Pick Your Path"
        headline="Heat Pump vs Gas Furnace — Which Fits Your Home?"
        intro="Both heat your home well. The right answer depends on climate, fuel costs, and how long you plan to stay. Here's the honest comparison we walk customers through."
        optionA={{
          name: "Gas Furnace",
          tagline: "Hot air fast, lower up-front cost",
          image: "/services/gas-furnace-placeholder.jpg",
          badge: "Most homes",
          ctaLabel: "Get A Furnace Quote",
          ctaHref: "/quote?type=furnace",
        }}
        optionB={{
          name: "Heat Pump",
          tagline: "Heats AND cools, lower energy bills",
          image: "/services/heat-pump-placeholder.jpg",
          badge: "Best efficiency",
          ctaLabel: "Get A Heat Pump Quote",
          ctaHref: "/quote?type=heat-pump",
        }}
        specs={[
          { attribute: "Up-Front Cost", optionA: "$3,500–$6,500", optionB: "$5,500–$10,000", highlight: "A" },
          { attribute: "Annual Energy Cost", optionA: "Higher when gas spikes", optionB: "20–40% lower in mild climates", highlight: "B" },
          { attribute: "Average Lifespan", optionA: "15–20 years", optionB: "12–15 years", highlight: "A" },
          { attribute: "Heating + Cooling", optionA: "Heating only — pair with AC", optionB: "Both in one system", highlight: "B" },
          { attribute: "Tax Credits / Rebates", optionA: "Limited", optionB: "Up to $2,000 federal credit", highlight: "B" },
          { attribute: "Best For", optionA: "Cold winters, gas already at home", optionB: "Mild winters, all-electric homes" },
        ]}
        brand={{ ink: "#231F20", primary: "#1976D2", surface: "#F4F6F8", cardBg: "#FFFFFF", rowAlt: "#F8FAFC" }}
      />
      <HvacCouponEmbeddedServices
        eyebrow="Service & Savings"
        heading="Service you need, with savings built in."
        services={[
          {
            icon: "🔥",
            title: "Heating",
            bullets: ["Furnace Repair", "Furnace Install", "Heat Pumps", "Boilers"],
            href: "#heating",
            couponLabel: "$89 Heating Tune-Up",
            couponHref: "#coupons",
          },
          {
            icon: "❄️",
            title: "Cooling",
            bullets: ["AC Repair", "AC Install", "Mini-Splits", "Smart Thermostats"],
            href: "#cooling",
            couponLabel: "$50 Off Any AC Repair",
            couponHref: "#coupons",
          },
          {
            icon: "🌬️",
            title: "Indoor Air Quality",
            bullets: ["Air Purifiers", "Humidifiers", "Duct Cleaning", "UV Lights"],
            href: "#iaq",
            couponLabel: "Free IAQ Assessment",
            couponHref: "#coupons",
          },
          {
            icon: "🛡️",
            title: "Maintenance",
            bullets: ["Annual Plans", "Priority Service", "15% Off Repairs", "No Trip Fees"],
            href: "#maintenance",
            couponLabel: "$0 Sign-Up — Comfort Club",
            couponHref: "#coupons",
          },
        ]}
        seeAllLabel="See All Offers"
        seeAllHref="#coupons"
        brand={{
          ink: "#231F20",
          primary: "#1976D2",
          primaryInk: "#FFFFFF",
          couponBg: "#EF3E33",
          couponInk: "#FFFFFF",
          surface: "#F4F6F8",
        }}
      />
      <Reviews />
      <Plumbing247AvailabilityBand
        kicker="24/7"
        headline="HVAC emergencies don't wait for business hours — and neither do we."
        subcopy="A no-heat call at 2am, an AC failure on the hottest day of summer, a smoking furnace on a holiday — we answer."
        phoneLabel="Call {{PHONE_NUMBER}}"
        phoneHref="tel:5555555555"
        textLabel="Text Now"
        textHref="sms:5555555555"
        responsePromise="Typical emergency response: under 90 minutes."
        brand={{ ink: "#231F20", primary: "#EF3E33", primaryInk: "#FFFFFF", dark: "#231F20", onDark: "#FFFFFF" }}
      />
      <FinancingCallout
        red="#EF3E33"
        ink="#231F20"
        heading="Financing Available"
        subheading="New furnace, new AC, or whole-system upgrade — get the comfort you need today, pay over time."
        offer="0% APR for 18 Months"
        terms="On approved credit. Subject to credit approval through our financing partner. Other terms available."
        partnerLogoAlt="{{FINANCING PARTNER LOGO — GoodLeap / Synchrony / FTL}}"
        primaryCta={{ label: "Apply Now", href: "#financing" }}
        secondaryCta={{ label: "Learn More", href: "#" }}
      />
      <FAQLongFormSEO
        red="#EF3E33"
        ink="#231F20"
        heading="HVAC Frequently Asked Questions"
        subheading="Straight answers about heating, cooling, and indoor air quality service in {{CITY}}, {{STATE}}."
        items={[
          {
            q: "How much does a new furnace cost installed in {{CITY}}?",
            a: "Most residential furnace replacements run $3,500–$6,500 installed for an 80–96% AFUE gas furnace, including labor, permits, and haul-away of the old unit. High-efficiency modulating systems run $6,500–$9,000. We quote upfront, in writing, before any work begins.",
          },
          {
            q: "How quickly can you dispatch a technician for a no-heat or no-cool emergency?",
            a: "We target same-day dispatch for calls booked before 12 PM and provide true 24/7 emergency response for no-heat in winter and no-cool in summer. Typical emergency response is under 90 minutes inside our core service area.",
          },
          {
            q: "Are heat pumps really worth it in {{STATE}}?",
            a: "Yes for most homes — modern variable-speed heat pumps stay efficient down to 5°F and save 20–40% on energy bills versus gas in mild winters. We perform a heat-loss calculation before recommending one, so you know the math fits your house, not the brochure.",
          },
          {
            q: "Do you offer free estimates on system replacements?",
            a: "All replacement quotes are free and include a load calculation, equipment options at three price points (good / better / best), permits, labor, and old-unit removal. We don't run pressure-quote sales scripts.",
          },
          {
            q: "Are your technicians licensed and insured?",
            a: "Every technician on our truck is a licensed HVAC professional or registered apprentice under direct license supervision. We carry $2M general liability + workers' comp and are NATE-certified across the senior team.",
          },
          {
            q: "What brands of furnaces and AC systems do you install?",
            a: "We install Trane, Lennox, Mitsubishi (ductless), and Rheem as our core lines. We'll walk you through trade-offs between brands, single-stage vs two-stage vs variable-speed, and warranty length during your free estimate.",
          },
          {
            q: "How long does a full system replacement take?",
            a: "Most furnace + AC swap-outs take a single day, 6–8 hours on site. Heat pump conversions and duct modifications can stretch to 1.5–2 days. We send a 2-tech crew so jobs finish faster and you spend fewer hours without comfort.",
          },
          {
            q: "Do you offer financing on bigger jobs?",
            a: "Yes — we partner with a leading home-improvement lender offering 0% APR for 18 months on approved credit, plus longer fixed-rate plans up to 120 months. Apply online or during your in-home estimate.",
          },
          {
            q: "What areas do you serve?",
            a: "We cover {{CITY_1}}, {{CITY_2}}, {{CITY_3}}, {{CITY_4}}, {{CITY_5}}, and surrounding communities in {{COUNTY}} County. If you're not sure we cover your address, call and we'll confirm.",
          },
          {
            q: "Do you offer maintenance memberships?",
            a: "Yes — our Comfort Club membership covers two annual tune-ups (one heating, one cooling), priority dispatch, no overtime fees, and 15% off all repairs. Most members save 2–3× their membership price in the first year.",
          },
          {
            q: "What happens if a repair issue comes back?",
            a: "Every repair is backed by our workmanship guarantee. If the same issue recurs in the guarantee period, we return and fix it at no labor cost. Parts are covered separately by manufacturer warranty.",
          },
          {
            q: "Can I book online instead of calling?",
            a: "Absolutely. Use the inline quote form anywhere on this page — a real {{CITY}} dispatcher reads every submission and texts back within 30 minutes during business hours.",
          },
          {
            q: "Do you charge a dispatch or trip fee?",
            a: "There's a flat $89 diagnostic fee that is fully credited toward any repair you authorize. Estimates for replacement work (new furnace, AC, heat pump) are always free.",
          },
          {
            q: "How do you size a new system for my home?",
            a: "We perform a Manual J load calculation on every replacement — measuring square footage, insulation, window count, orientation, and infiltration. Oversized systems short-cycle and break early; we never just match the old equipment's tonnage.",
          },
          {
            q: "Do you clean up after the job?",
            a: "Yes. Every tech carries shoe covers, drop cloths, and a small vacuum. Old equipment is hauled away the same day. We leave your home as clean as we found it — that's a house rule.",
          },
        ]}
      />
      <CTABand />
      <Footer />
    </>
  );
}
