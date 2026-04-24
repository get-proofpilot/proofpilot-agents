import React from 'react';
import { Scissors } from 'lucide-react';

const selfWashPrices = [
  { weight: "Up to 20 lbs", price: "$24" },
  { weight: "Up to 100 lbs", price: "$28" },
  { weight: "Over 100 lbs", price: "$32" },
];

const groomerSizes = [
  { label: "Up to 20 lbs", tag: "S" },
  { label: "21–50 lbs", tag: "M" },
  { label: "51–100 lbs", tag: "L" },
  { label: "Over 100 lbs", tag: "XL" },
];

const groomerPrices = {
  bathAllBreeds: [75, 95, 115, 135],
  bathDoodles: [90, 110, 130, 150],
  fullAllBreeds: [90, 105, 125, 155],
  fullDoodles: [105, 125, 145, 175],
};

export const Pricing: React.FC = () => {
  return (
    <div id="pricing" className="py-24 bg-cream scroll-mt-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <p className="text-racing-red font-oswald uppercase tracking-[0.3em] text-sm mb-3">Services</p>
          <h2 className="text-foreground text-4xl md:text-5xl font-oswald font-bold uppercase mb-4">
            Pricing
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-12 bg-foreground"></div>
            <div className="w-2 h-2 bg-racing-red rotate-45"></div>
            <div className="h-px w-12 bg-foreground"></div>
          </div>
        </div>

        {/* Self Wash */}
        <div className="max-w-4xl mx-auto mb-20">
          <h3 className="text-2xl md:text-3xl font-oswald font-bold uppercase text-foreground text-center mb-8">
            Self Wash
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {selfWashPrices.map((item, i) => (
              <div key={i} className="bg-card text-foreground p-8 flex flex-col items-center text-center relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-foreground"></div>
                <p className="text-xs text-muted-foreground mb-4 font-medium tracking-wider uppercase">{item.weight}</p>
                <div className="text-5xl font-oswald font-bold text-racing-red">{item.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Groomer Services */}
        <div className="max-w-5xl mx-auto mb-16">
          <h3 className="text-2xl md:text-3xl font-oswald font-bold uppercase text-foreground text-center mb-2">
            Groomer Services
          </h3>
          <p className="text-center text-muted-foreground text-sm mb-8">Prices starting at</p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-foreground">
                  <th className="py-3 px-3 text-left font-oswald uppercase tracking-wide text-foreground text-xs"></th>
                  <th colSpan={2} className="py-3 px-3 text-center font-oswald uppercase tracking-wide text-foreground text-xs border-l border-border">
                    Bath Only
                  </th>
                  <th colSpan={2} className="py-3 px-3 text-center font-oswald uppercase tracking-wide text-foreground text-xs border-l border-border">
                    Full Service
                  </th>
                </tr>
                <tr className="border-b border-border">
                  <th className="py-2 px-3 text-left font-oswald uppercase tracking-wide text-muted-foreground text-xs">Size</th>
                  <th className="py-2 px-3 text-center font-oswald uppercase tracking-wide text-muted-foreground text-xs border-l border-border">All Breeds</th>
                  <th className="py-2 px-3 text-center font-oswald uppercase tracking-wide text-muted-foreground text-xs">Poodles +</th>
                  <th className="py-2 px-3 text-center font-oswald uppercase tracking-wide text-muted-foreground text-xs border-l border-border">All Breeds</th>
                  <th className="py-2 px-3 text-center font-oswald uppercase tracking-wide text-muted-foreground text-xs">Poodles +</th>
                </tr>
              </thead>
              <tbody>
                {groomerSizes.map((size, i) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="py-4 px-3">
                      <span className="font-medium text-foreground">{size.label}</span>
                      <span className="ml-2 text-xs text-muted-foreground">({size.tag})</span>
                    </td>
                    <td className="py-4 px-3 text-center font-oswald text-lg text-foreground border-l border-border">${groomerPrices.bathAllBreeds[i]}</td>
                    <td className="py-4 px-3 text-center font-oswald text-lg text-foreground">${groomerPrices.bathDoodles[i]}</td>
                    <td className="py-4 px-3 text-center font-oswald text-lg text-racing-red font-bold border-l border-border">${groomerPrices.fullAllBreeds[i]}</td>
                    <td className="py-4 px-3 text-center font-oswald text-lg text-racing-red font-bold">${groomerPrices.fullDoodles[i]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional Services */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 bg-card px-8 py-5 border border-border">
            <Scissors size={18} className="text-racing-red" />
            <span className="font-oswald uppercase tracking-wide text-foreground text-sm">Nail Trim or Nail Grind</span>
            <span className="font-oswald text-2xl font-bold text-racing-red ml-2">$24</span>
          </div>
        </div>
      </div>
    </div>
  );
};
