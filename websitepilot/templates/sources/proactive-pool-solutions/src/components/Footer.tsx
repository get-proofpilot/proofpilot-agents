import React from 'react';
import { Button } from './UI';
import { Phone, Mail, MapPin, ArrowRight, UserCircle, Clock, Instagram, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#111827] text-white">
      
      {/* CTA Section with Wave Top */}
      <div className="relative bg-[#06b6d4] pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
         {/* Top Wave SVG */}
         <div className="absolute top-[-1px] left-0 w-full overflow-hidden z-10 leading-none">
             <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-[40px] md:h-[100px] fill-white">
                 <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,42.7C672,32,768,32,864,42.7C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
             </svg>
         </div>

         <div className="relative max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 text-center lg:text-left z-20">
            <div className="lg:w-2/3">
                <h2 className="text-3xl md:text-5xl font-black text-white mb-4 md:mb-6 leading-[0.95] tracking-tight">
                  Ready For A ProActive Experience?
                </h2>
                <p className="text-cyan-50 font-medium text-lg md:text-xl max-w-2xl leading-relaxed mx-auto lg:mx-0">
                  Stop stressing over chemistry and filters. Let the experts in Wendell & Raleigh handle it. 
                </p>
            </div>
            
            <div className="relative group w-full md:w-auto">
                <Button variant="secondary" size="lg" onClick={() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })} className="w-full md:w-auto px-10 py-5 text-base shadow-2xl border-2 border-white/20 hover:bg-white hover:text-[#06b6d4] hover:border-white">
                    Get Your Quote
                </Button>
            </div>
         </div>
      </div>

      {/* Main Footer Grid */}
      <div className="pt-16 md:pt-20 pb-10 bg-[#111827] border-t border-slate-800">
        <div className="max-w-[1600px] mx-auto px-4">
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-10 md:gap-12 mb-12 md:mb-16">
                
                {/* Column 1: Brand Identity */}
                <div className="lg:col-span-2 pr-0 md:pr-8">
                    <div className="mb-6 md:mb-8 inline-block bg-white p-4 rounded-xl">
                        <div className="flex flex-col items-start leading-none">
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-black text-slate-800 tracking-tighter">PRO</span>
                                <div className="relative w-5 h-5 mx-0.5">
                                    <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-[#06b6d4] stroke-[8px]" style={{ strokeLinejoin: 'round' }}>
                                        <path d="M50 10 L90 90 L10 90 Z" />
                                        <path d="M50 35 L70 75 L30 75 Z" className="fill-[#06b6d4] stroke-none" />
                                    </svg>
                                </div>
                                <span className="text-2xl font-black text-slate-800 tracking-tighter">CTIVE</span>
                            </div>
                            <span className="text-[8px] font-bold text-slate-500 tracking-[0.3em] pl-1 uppercase w-full text-center border-t border-slate-200 mt-1 pt-0.5">Pool Solutions</span>
                        </div>
                    </div>
                    <p className="text-slate-400 font-medium leading-relaxed max-w-sm mb-8 text-lg md:text-xl">
                        ProActive Pool Solutions is Wendell, NC's premier pool service provider. We don't just clean; we ensure longevity, safety, and a worry-free ownership experience for our neighbors.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="w-14 h-14 rounded-lg bg-slate-800 flex items-center justify-center text-white hover:bg-[#06b6d4] transition-colors border border-slate-700">
                            <Instagram size={28} />
                        </a>
                        <a href="#" className="w-14 h-14 rounded-lg bg-slate-800 flex items-center justify-center text-white hover:bg-[#06b6d4] transition-colors border border-slate-700">
                            <Facebook size={28} />
                        </a>
                        <a href="#" className="w-14 h-14 rounded-lg bg-slate-800 flex items-center justify-center text-white hover:bg-[#06b6d4] transition-colors border border-slate-700">
                            <UserCircle size={28} />
                        </a>
                    </div>
                </div>

                {/* Column 2: Services (SEO Keyword Rich) */}
                <div>
                    <h4 className="font-black text-white mb-6 tracking-wide text-2xl">Our Services</h4>
                    <ul className="space-y-4 text-slate-400 font-medium text-lg">
                        <li><a href="#services" className="hover:text-[#06b6d4] transition-colors flex items-center gap-2"><ArrowRight size={18} className="text-[#06b6d4]"/> Weekly Pool Cleaning</a></li>
                        <li><a href="#services" className="hover:text-[#06b6d4] transition-colors flex items-center gap-2"><ArrowRight size={18} className="text-[#06b6d4]"/> Bi-Weekly Maintenance</a></li>
                        <li><a href="#services" className="hover:text-[#06b6d4] transition-colors flex items-center gap-2"><ArrowRight size={18} className="text-[#06b6d4]"/> Green-to-Clean Service</a></li>
                        <li><a href="#services" className="hover:text-[#06b6d4] transition-colors flex items-center gap-2"><ArrowRight size={18} className="text-[#06b6d4]"/> Pool Equipment Repair</a></li>
                        <li><a href="#services" className="hover:text-[#06b6d4] transition-colors flex items-center gap-2"><ArrowRight size={18} className="text-[#06b6d4]"/> Chemical Balancing</a></li>
                        <li><a href="#services" className="hover:text-[#06b6d4] transition-colors flex items-center gap-2"><ArrowRight size={18} className="text-[#06b6d4]"/> Pool Inspections</a></li>
                    </ul>
                </div>

                {/* Column 3: Service Areas (Local SEO) */}
                <div>
                    <h4 className="font-black text-white mb-6 tracking-wide text-2xl">Service Areas</h4>
                    <ul className="space-y-4 text-slate-400 font-medium text-lg">
                        <li><a href="#" className="hover:text-[#06b6d4] transition-colors">Pool Service Wendell, NC</a></li>
                        <li><a href="#" className="hover:text-[#06b6d4] transition-colors">Pool Service Raleigh, NC</a></li>
                        <li><a href="#" className="hover:text-[#06b6d4] transition-colors">Pool Service Wake Forest, NC</a></li>
                        <li><a href="#" className="hover:text-[#06b6d4] transition-colors">Pool Service Cary, NC</a></li>
                        <li><a href="#" className="hover:text-[#06b6d4] transition-colors">Pool Service Knightdale, NC</a></li>
                        <li><a href="#" className="hover:text-[#06b6d4] transition-colors">Pool Service Zebulon, NC</a></li>
                    </ul>
                </div>

                {/* Column 4: Contact Info */}
                <div>
                    <h4 className="font-black text-white mb-6 tracking-wide text-2xl">Contact Us</h4>
                    <div className="space-y-5 text-slate-400 font-medium text-lg">
                         <div className="flex items-start gap-4">
                            <MapPin className="text-[#06b6d4] mt-1 shrink-0" size={24} />
                            <span>Wendell, NC 27591<br/>Serving Wake County</span>
                         </div>
                         <div className="flex items-center gap-4">
                            <Phone className="text-[#06b6d4] shrink-0" size={24} />
                            <a href="tel:919-555-0199" className="hover:text-white transition-colors">(919) 555-0199</a>
                         </div>
                         <div className="flex items-center gap-4">
                            <Mail className="text-[#06b6d4] shrink-0" size={24} />
                            <a href="mailto:service@proactive.io" className="hover:text-white transition-colors">service@proactive.io</a>
                         </div>
                         <div className="flex items-start gap-4 pt-2">
                            <Clock className="text-[#06b6d4] mt-1 shrink-0" size={24} />
                            <span>Mon - Fri: 8am - 6pm<br/>Sat: By Appointment</span>
                         </div>
                    </div>
                </div>
            </div>

            {/* Embedded Map Row */}
            <div className="border-t border-slate-800 pt-10 md:pt-14 pb-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    <div className="lg:col-span-2 h-48 md:h-64 w-full rounded-2xl overflow-hidden border-4 border-slate-800 grayscale hover:grayscale-0 transition-all duration-500 relative group">
                         <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3236.3864667240628!2d-78.3548218!3d35.79044460000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89ac474aab57d7e3%3A0x22674f65ced532d1!2sProactive%20Pool%20Solutions%2C%20LLC!5e0!3m2!1sen!2sus!4v1763796839794!5m2!1sen!2sus" 
                            width="100%" 
                            height="100%" 
                            style={{border:0}} 
                            allowFullScreen={true} 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                         ></iframe>
                         <div className="absolute inset-0 pointer-events-none border-[6px] border-[#111827]/10 rounded-2xl"></div>
                    </div>
                    <div className="lg:col-span-1">
                        <h4 className="font-black text-white text-lg md:text-xl mb-4">Locally Owned & Operated</h4>
                        <p className="text-slate-400 mb-6 leading-relaxed text-base md:text-lg">
                            We are proud to be part of the local community. When you hire ProActive, you aren't just getting a cleaner; you're hiring a neighbor who cares about the health and safety of your backyard oasis.
                        </p>
                        <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:border-[#06b6d4] hover:text-[#06b6d4] text-lg" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                            Contact Our Team
                        </Button>
                    </div>
                </div>
            </div>

            {/* Bottom Copyright */}
            <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-lg font-bold text-slate-600 tracking-wider text-center md:text-left">
                <div>&copy; {new Date().getFullYear()} ProActive Pool Solutions. All Rights Reserved.</div>
                <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                    <a href="#" className="hover:text-[#06b6d4] transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-[#06b6d4] transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-[#06b6d4] transition-colors">Sitemap</a>
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
};