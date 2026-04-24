import React from 'react';
import { Clock, Phone, MapPin, Calendar } from 'lucide-react';
import { Button } from './UI';

export const HoursSection: React.FC = () => {
  return (
    <section className="py-12 md:py-16 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 items-center">
          
          {/* Hours */}
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center text-white shrink-0">
              <Clock size={28} />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-lg mb-2">Open 7 Days a Week</h3>
              <div className="space-y-1 text-slate-600 font-medium">
                <p>Mon - Fri: <span className="text-slate-900 font-bold">7AM - 7PM</span></p>
                <p>Saturday: <span className="text-slate-900 font-bold">8AM - 5PM</span></p>
                <p>Sunday: <span className="text-slate-900 font-bold">9AM - 4PM</span></p>
              </div>
            </div>
          </div>
          
          {/* Same Day */}
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center text-white shrink-0">
              <Calendar size={28} />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-lg mb-2">Same Day Service</h3>
              <p className="text-slate-600 font-medium mb-3">
                Often available! Call early for best availability. We come to you anywhere in the Valley.
              </p>
              <span className="inline-flex items-center gap-1 text-primary font-bold text-sm">
                <MapPin size={16} /> Valley-Wide Mobile Service
              </span>
            </div>
          </div>
          
          {/* CTA */}
          <div className="text-center md:text-right">
            <a 
              href="tel:602-555-0148" 
              className="inline-flex items-center gap-3 bg-primary hover:bg-state48-blue-dark text-white font-black text-xl px-8 py-4 rounded-lg shadow-lg shadow-primary/30 transition-all hover:scale-105"
            >
              <Phone size={24} />
              (602) 555-0148
            </a>
            <p className="text-slate-500 text-sm font-medium mt-3">
              Call now for instant quote
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
};