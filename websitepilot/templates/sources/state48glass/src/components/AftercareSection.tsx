import React from 'react';
import { Clock, Droplets, Hand, ThermometerSun, Wrench, AlertTriangle } from 'lucide-react';

const aftercareTips = [
  {
    icon: Clock,
    title: "Wait Before Driving",
    description: "Allow the adhesive to cure for at least 1 hour before driving. For optimal safety, wait 2-4 hours if possible."
  },
  {
    icon: Droplets,
    title: "Keep It Dry",
    description: "Avoid washing your car or exposing the windshield to water for 24 hours after installation."
  },
  {
    icon: Hand,
    title: "Handle Gently",
    description: "Don't slam doors for 24 hours. The pressure change can affect the seal while adhesive cures."
  },
  {
    icon: ThermometerSun,
    title: "Avoid Extreme Temps",
    description: "If possible, park in shade the first day. Arizona heat won't damage it, but gradual curing is best."
  },
  {
    icon: Wrench,
    title: "Leave Tape On",
    description: "If retention tape was applied, leave it on for at least 24 hours to help hold the windshield in place."
  },
  {
    icon: AlertTriangle,
    title: "Crack Window Slightly",
    description: "Leave a window cracked 1 inch for the first day to equalize pressure and help the seal set properly."
  }
];

export const AftercareSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Content */}
          <div>
            <span className="bg-primary text-white px-4 py-1.5 text-sm font-black rounded mb-6 inline-block tracking-wide shadow-sm">Aftercare Guide</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
              How to Care for Your <span className="text-primary">New Windshield</span>
            </h2>
            <p className="text-slate-600 text-lg font-medium mb-8 leading-relaxed">
              A properly installed windshield will last the lifetime of your vehicle. Follow these simple steps after your replacement to ensure optimal adhesion and performance.
            </p>
            
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
              <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
                <AlertTriangle className="text-primary" size={20} />
                Important Note
              </h4>
              <p className="text-slate-700 font-medium">
                If you notice any leaks, wind noise, or issues after installation, contact us immediately. Our <strong>lifetime warranty</strong> covers any problems with materials or workmanship at no cost to you.
              </p>
            </div>
          </div>
          
          {/* Right Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {aftercareTips.map((tip, idx) => (
              <div 
                key={idx} 
                className="bg-slate-50 rounded-xl p-5 md:p-6 hover:bg-blue-50 transition-colors group"
              >
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 text-primary group-hover:bg-primary group-hover:text-white transition-colors shadow-sm">
                  <tip.icon size={24} />
                </div>
                <h3 className="font-black text-slate-900 mb-2">{tip.title}</h3>
                <p className="text-slate-600 text-sm font-medium leading-relaxed">{tip.description}</p>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
};