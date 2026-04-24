import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from './UI';
import windshieldClean from '@/assets/windshield-clean.jpg';
import chipRepair from '@/assets/chip-repair.jpg';
import mobileService from '@/assets/mobile-service.jpg';
import happyCustomer from '@/assets/happy-customer.jpg';

const detailedServices = [
  {
    title: "Windshield Replacement",
    subtitle: "Phoenix's Premier Windshield Service",
    description: "Our dedicated team quickly evaluates the damage and employs OEM-grade materials for a flawless installation. With a strong focus on quality and customer satisfaction, we make sure you're back on the road safely in no time!",
    details: [
      "Most windshield replacements completed in 60-90 minutes",
      "OEM or OEE quality glass for every vehicle",
      "Mobile service at your home, office, or any location",
      "All makes and models, including hard-to-find glass",
      "Same-day appointments available for most vehicles"
    ],
    cta: "Get Replacement Quote",
    imagePosition: "right",
    image: windshieldClean
  },
  {
    title: "Chip & Crack Repair",
    subtitle: "Quick Repairs to Prevent Further Damage",
    description: "If your crack is less than the size of a quarter, you may just need a quick repair instead of a full replacement. We can fix most chips and small cracks in under 30 minutes, making them nearly invisible while preventing the damage from spreading.",
    details: [
      "Most chip repairs completed in just 20-30 minutes",
      "Prevents small damage from becoming major cracks",
      "Cost-effective alternative to full replacement",
      "Often fully covered by insurance with no deductible",
      "Lifetime chip repair warranty included"
    ],
    cta: "Schedule Chip Repair",
    imagePosition: "left",
    image: chipRepair
  },
  {
    title: "Mobile Service",
    subtitle: "We Come to You — Anywhere in the Valley",
    description: "Can't come to us? No problem! Our fully-equipped mobile units bring the shop to you. Whether you're at home, at work, or anywhere else in the Phoenix metro area, our certified technicians provide the same high-quality service at your location.",
    details: [
      "Service throughout Phoenix metro and Maricopa County",
      "No extra charge for mobile service",
      "Same quality work as in-shop installations",
      "Convenient scheduling that fits your life",
      "We handle everything from setup to cleanup"
    ],
    cta: "Book Mobile Service",
    imagePosition: "right",
    image: mobileService
  },
  {
    title: "Insurance Claims Assistance",
    subtitle: "We Handle All the Paperwork",
    description: "Arizona law requires insurance companies to offer zero-deductible glass coverage. We work with ALL major insurance providers and handle the entire claims process for you. Most customers pay nothing out of pocket and can even receive cash back!",
    details: [
      "We work with ALL Arizona insurance companies",
      "Zero deductible under Arizona state law",
      "We file and process your claim for you",
      "Up to $300 cash back with qualified replacements",
      "No rate increases for glass claims in Arizona"
    ],
    cta: "Start Insurance Claim",
    imagePosition: "left",
    image: happyCustomer
  }
];

export const DetailedServices: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden grain-overlay-light">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="bg-primary text-white px-4 py-1.5 text-sm font-black rounded mb-6 inline-block tracking-wide shadow-sm">Our Services</span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Professional Auto Glass Services in <span className="text-primary">Arizona</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto">
            From quick chip repairs to complete windshield replacements, State 48 Glass provides comprehensive auto glass services with a focus on quality, convenience, and customer satisfaction.
          </p>
        </div>

        <div className="space-y-16 md:space-y-24">
          {detailedServices.map((service, idx) => (
            <div 
              key={idx}
              className={`flex flex-col ${service.imagePosition === 'left' ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-center`}
            >
              {/* Content Side */}
              <div className="lg:w-1/2">
                <div className="mb-4">
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900">{service.title}</h3>
                  <p className="text-primary font-bold">{service.subtitle}</p>
                </div>
                
                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  {service.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {service.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={20} />
                      <span className="text-slate-700">{detail}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  variant="primary"
                  onClick={() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {service.cta}
                </Button>
              </div>

              {/* Image Side */}
              <div className="lg:w-1/2">
                <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-100">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-[300px] md:h-[400px] object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
