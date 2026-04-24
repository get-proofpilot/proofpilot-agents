import React from 'react';
import { Button } from './UI';
import { CheckCircle, Info } from 'lucide-react';

const pricingData = [
  { service: "Windshield Replacement", avgPrice: "$280", lowPrice: "$170", highPrice: "$1,655+" },
  { service: "Side Window Replacement", avgPrice: "$230", lowPrice: "$165", highPrice: "$825+" },
  { service: "Rear Window Replacement", avgPrice: "$335", lowPrice: "$170", highPrice: "$1,140+" },
  { service: "Chip Repair", avgPrice: "$65", lowPrice: "$45", highPrice: "$85" }
];

const popularVehicles = [
  { vehicle: "2021 Toyota Tacoma 4 Door Crew Cab", price: "$340" },
  { vehicle: "2020 Chrysler Pacifica Mini Van", price: "$300" },
  { vehicle: "2019 Nissan Murano 4 Door Utility", price: "$400" },
  { vehicle: "2017 Chevrolet Cruze 4 Door Sedan", price: "$355" },
  { vehicle: "2014 Honda Pilot 4 Door Utility", price: "$325" },
  { vehicle: "2013 Chrysler 200 4 Door Sedan", price: "$270" },
  { vehicle: "2004 Toyota Avalon 4 Door Sedan", price: "$265" },
  { vehicle: "2004 Toyota Tacoma 2 Door Pickup", price: "$190" }
];

export const PricingSection: React.FC = () => {
  return (
    <section className="py-16 md:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <span className="bg-primary text-white px-4 py-1.5 text-sm font-black rounded mb-6 inline-block tracking-wide shadow-sm">Transparent Pricing</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4 tracking-tight">
            Auto Glass Pricing in <span className="text-primary">Arizona</span>
          </h2>
          <p className="text-slate-600 text-lg md:text-xl font-medium max-w-3xl mx-auto">
            For customers paying out of pocket, we offer some of the most competitive prices in Phoenix. Most insurance customers pay <strong>$0 out of pocket</strong>.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          
          {/* Average Pricing Table */}
          <div className="bg-white rounded-2xl border-2 border-slate-100 overflow-hidden shadow-lg">
            <div className="bg-slate-900 text-white p-6">
              <h3 className="text-xl md:text-2xl font-black">Average Service Prices</h3>
              <p className="text-slate-300 text-sm mt-1">Based on Arizona market data</p>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-slate-100">
                      <th className="text-left py-3 font-black text-slate-900">Service</th>
                      <th className="text-center py-3 font-black text-slate-900">Average</th>
                      <th className="text-center py-3 font-black text-slate-500 text-sm">Range</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingData.map((item, idx) => (
                      <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                        <td className="py-4 font-bold text-slate-800">{item.service}</td>
                        <td className="py-4 text-center">
                          <span className="text-xl font-black text-primary">{item.avgPrice}</span>
                        </td>
                        <td className="py-4 text-center text-sm text-slate-500">
                          {item.lowPrice} - {item.highPrice}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-start gap-2 mt-6 p-4 bg-blue-50 rounded-lg">
                <Info className="text-primary shrink-0 mt-0.5" size={18} />
                <p className="text-sm text-slate-600">
                  *Prices vary by vehicle make, model, and year. Contact us for an exact quote.
                </p>
              </div>
            </div>
          </div>

          {/* Popular Vehicles */}
          <div className="bg-white rounded-2xl border-2 border-slate-100 overflow-hidden shadow-lg">
            <div className="bg-primary text-white p-6">
              <h3 className="text-xl md:text-2xl font-black">Popular Vehicle Estimates</h3>
              <p className="text-blue-100 text-sm mt-1">Windshield replacement starting prices</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {popularVehicles.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                    <span className="font-bold text-slate-800 text-sm md:text-base">{item.vehicle}</span>
                    <span className="font-black text-primary text-lg">{item.price}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-100">
                <h4 className="font-black text-slate-900 mb-4">With Insurance, You Get:</h4>
                <div className="space-y-2">
                  {[
                    "$0 out of pocket (most policies)",
                    "Up to $300 cash back",
                    "No deductible in Arizona",
                    "We handle all paperwork"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-slate-700 font-medium">
                      <CheckCircle className="text-green-500 shrink-0" size={18} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg" 
            onClick={() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get Your Exact Quote
          </Button>
        </div>
      </div>
    </section>
  );
};