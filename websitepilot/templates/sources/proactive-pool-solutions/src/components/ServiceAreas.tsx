import React from 'react';
import { MapPin, ArrowRight, ArrowUpRight, Star } from 'lucide-react';
import { Button } from './UI';

const cities = [
  "Wendell", "Raleigh", "Wake Forest", "Cary",
  "Knightdale", "Zebulon", "Clayton", "Garner",
  "Rolesville", "Apex", "Holly Springs", "Fuquay-Varina"
];

export const ServiceAreas: React.FC = () => {
  return (
    <section className="py-16 md:py-32 bg-slate-50">
      <div className="max-w-[1400px] mx-auto px-4 grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

        {/* Left Content */}
        <div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-8 md:mb-10 tracking-tight leading-[0.95]">
                Serving Wendell, Raleigh and <br/><span className="text-[#06b6d4]">Surrounding Areas</span>
            </h2>

            <p className="text-lg md:text-xl text-slate-800 font-medium mb-8 md:mb-12 leading-relaxed">
                <span className="font-bold text-slate-900">ProActive Pool Solutions</span> is proud to provide the best pool maintenance and cleaning services across Wake County, including:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 md:gap-y-6 gap-x-2 md:gap-x-4 mb-10 md:mb-14">
                {cities.map((city, idx) => (
                    <div key={idx} className="flex items-center gap-2 md:gap-3 text-slate-800 font-bold text-sm md:text-base hover:text-[#06b6d4] transition-colors cursor-default">
                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 text-[#06b6d4]">
                            <MapPin size={14} className="md:w-4 md:h-4 opacity-20" fill="currentColor" strokeWidth={2.5} />
                            <MapPin size={14} className="md:w-4 md:h-4 absolute" strokeWidth={2.5} />
                        </div>
                        {city}
                    </div>
                ))}
                <div className="flex items-center gap-2 md:gap-3 text-slate-500 font-bold text-sm md:text-base italic">
                     <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-400">
                        <MapPin size={14} className="md:w-4 md:h-4" strokeWidth={2.5} />
                    </div>
                    and surrounding areas
                </div>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 md:mb-6 tracking-tight">
                ProActive Pool Solutions is Your Local Pool Service Provider
            </h3>
            <p className="text-slate-700 font-medium leading-relaxed mb-8 md:mb-12 text-base md:text-lg">
                As your local Wendell pool contractors, we're committed to delivering reliable, high-quality solutions that stand the test of time. With extensive experience and a passion for excellence, ProActive Pool Solutions is here to serve you and your community.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                <Button 
                    onClick={() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })} 
                    className="bg-[#06b6d4] hover:bg-[#0891b2] text-white shadow-brutal hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all px-8 md:px-10 py-4 md:py-5 text-base md:text-lg font-bold"
                >
                    Get a Free Estimate <ArrowUpRight size={20} className="ml-2" strokeWidth={3} />
                </Button>
                <Button 
                    variant="white" 
                    onClick={() => document.getElementById('why-us')?.scrollIntoView({ behavior: 'smooth' })}
                    className="border-2 border-slate-900 text-slate-900 hover:bg-slate-50 px-8 md:px-10 py-4 md:py-5 text-base md:text-lg font-bold"
                >
                    Learn More <ArrowRight size={20} className="ml-2" strokeWidth={3} />
                </Button>
            </div>
        </div>

        {/* Right Map */}
        <div className="h-[400px] md:h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl border-[6px] border-white ring-1 ring-slate-200 relative bg-slate-100 group">
             <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3236.3864667240628!2d-78.3548218!3d35.79044460000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89ac474aab57d7e3%3A0x22674f65ced532d1!2sProactive%20Pool%20Solutions%2C%20LLC!5e0!3m2!1sen!2sus!4v1763796839794!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[10%] group-hover:grayscale-0 transition-all duration-700"
             ></iframe>

             {/* Floating Location Card */}
             <div className="absolute top-6 left-6 bg-white p-6 rounded-xl shadow-[0_4px_25px_rgba(0,0,0,0.15)] max-w-[280px] z-10 border border-slate-100 animate-in fade-in slide-in-from-top-4 duration-700 delay-300 hidden sm:block">
                <h4 className="font-black text-slate-900 text-lg mb-2 leading-tight">Proactive Pool Solutions, LLC</h4>
                <div className="flex items-center gap-1.5 mb-3">
                     <span className="font-black text-sm text-slate-700">5.0</span>
                     <div className="flex text-[#fbbf24] text-xs gap-[1px]">
                        <Star size={14} fill="currentColor" strokeWidth={0} />
                        <Star size={14} fill="currentColor" strokeWidth={0} />
                        <Star size={14} fill="currentColor" strokeWidth={0} />
                        <Star size={14} fill="currentColor" strokeWidth={0} />
                        <Star size={14} fill="currentColor" strokeWidth={0} />
                     </div>
                     <span className="text-xs text-slate-400 ml-1 font-bold">(18 reviews)</span>
                </div>
                <a href="https://maps.google.com?cid=2479011596787954385" target="_blank" rel="noreferrer" className="text-[#06b6d4] text-sm font-black hover:underline flex items-center gap-1">
                    View larger map
                </a>
             </div>
        </div>

      </div>
    </section>
  );
};