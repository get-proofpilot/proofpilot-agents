import React from 'react';
import { Shield, Award, Clock, Users, Wrench, Star } from 'lucide-react';

const badges = [
  {
    icon: Award,
    title: "BBB A+ Rated",
    description: "Better Business Bureau accredited with A+ rating"
  },
  {
    icon: Shield,
    title: "100% Lifetime Warranty",
    description: "Parts & labor guaranteed for your vehicle's lifetime"
  },
  {
    icon: Clock,
    title: "Same Day Service",
    description: "Often available - call to verify availability"
  },
  {
    icon: Users,
    title: "Licensed Technicians",
    description: "Insured pros with 3+ years AZ experience"
  },
  {
    icon: Wrench,
    title: "OEM Quality Glass",
    description: "Original equipment or equivalent glass"
  },
  {
    icon: Star,
    title: "5-Star Reviews",
    description: "Top-rated on Google and Yelp"
  }
];

export const TrustBadges: React.FC = () => {
  return (
    <section className="py-12 md:py-16 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            Why Arizona Drivers Trust State 48 Glass
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {badges.map((badge, idx) => (
            <div 
              key={idx} 
              className="text-center group cursor-default"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 bg-state48-blue-light rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <badge.icon size={28} strokeWidth={2} />
              </div>
              <h3 className="font-black text-slate-900 text-sm md:text-base mb-1">{badge.title}</h3>
              <p className="text-slate-500 text-xs md:text-sm font-medium leading-tight">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};