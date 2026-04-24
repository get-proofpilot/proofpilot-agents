import React from 'react';
import { Button } from './UI';
import { Phone, Mail, MapPin, ArrowRight, Clock, Instagram, Facebook, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-surface-dark text-white">
      
      {/* CTA Section with Wave Top */}
      <div className="relative bg-primary pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden grunge-overlay-dark">
         {/* Top Wave SVG */}
         <div className="absolute top-[-1px] left-0 w-full overflow-hidden z-10 leading-none">
             <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-[40px] md:h-[100px] fill-white">
                 <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,42.7C672,32,768,32,864,42.7C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
             </svg>
         </div>

         <div className="relative max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 text-center lg:text-left z-20">
            <div className="lg:w-2/3">
                <h2 className="text-3xl md:text-5xl font-black text-white mb-4 md:mb-6 leading-[0.95] tracking-tight">
                  Ready For The State 48 Experience?
                </h2>
                <p className="text-blue-100 font-medium text-lg md:text-xl max-w-2xl leading-relaxed mx-auto lg:mx-0">
                  Don't let a cracked windshield slow you down. Get your free quote today and experience why we're Arizona's go-to auto glass company.
                </p>
            </div>
            
            <div className="relative group w-full md:w-auto">
                <Button variant="secondary" size="lg" onClick={() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })} className="w-full md:w-auto px-10 py-5 text-base shadow-2xl border-2 border-white/20 hover:bg-white hover:text-primary hover:border-white">
                    Get Your Quote
                </Button>
            </div>
         </div>
      </div>

      {/* Main Footer Grid */}
      <div className="pt-16 md:pt-20 pb-10 bg-surface-dark border-t border-white/10">
        <div className="max-w-[1600px] mx-auto px-4">
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-10 md:gap-12 mb-12 md:mb-16">
                
                {/* Column 1: Brand Identity */}
                <div className="lg:col-span-2 pr-0 md:pr-8">
                    <div className="mb-6 md:mb-8 inline-block bg-white p-4 rounded-xl">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-black text-slate-800 tracking-tighter">STATE</span>
                            <div className="relative w-8 h-8">
                                <svg viewBox="0 0 100 100" className="w-full h-full">
                                    <polygon points="50,10 90,50 50,90 10,50" className="fill-state48-copper" />
                                    <circle cx="50" cy="50" r="15" className="fill-surface-dark" />
                                    <text x="50" y="58" textAnchor="middle" fill="white" fontSize="18" fontWeight="900">48</text>
                                </svg>
                            </div>
                            <span className="text-2xl font-black text-slate-800 tracking-tighter">GLASS</span>
                        </div>
                    </div>
                    <p className="text-slate-400 font-medium leading-relaxed max-w-sm mb-8 text-lg md:text-xl">
                        State 48 Glass is Arizona's premier windshield replacement company. Clean. Humble. Perfection. Every windshield we replace, we donate a portion to Phoenix Children's Hospital.
                    </p>
                    <div className="flex items-center gap-2 text-slate-400 mb-6">
                        <Heart className="text-red-400" size={20} fill="currentColor" />
                        <span className="font-medium">Supporting Phoenix Children's Hospital</span>
                    </div>
                    <div className="flex gap-4">
                        <a href="#" className="w-14 h-14 rounded-lg bg-white/5 flex items-center justify-center text-white hover:bg-primary transition-colors border border-white/10">
                            <Instagram size={28} />
                        </a>
                        <a href="#" className="w-14 h-14 rounded-lg bg-white/5 flex items-center justify-center text-white hover:bg-primary transition-colors border border-white/10">
                            <Facebook size={28} />
                        </a>
                    </div>
                </div>

                {/* Column 2: Services */}
                <div>
                    <h4 className="font-black text-white mb-6 tracking-wide text-2xl">Our Services</h4>
                    <ul className="space-y-4 text-slate-400 font-medium text-lg">
                        <li><a href="#services" className="hover:text-primary transition-colors flex items-center gap-2"><ArrowRight size={18} className="text-primary"/> Windshield Replacement</a></li>
                        <li><a href="#services" className="hover:text-primary transition-colors flex items-center gap-2"><ArrowRight size={18} className="text-primary"/> Chip & Crack Repair</a></li>
                        <li><a href="#services" className="hover:text-primary transition-colors flex items-center gap-2"><ArrowRight size={18} className="text-primary"/> Insurance Claims</a></li>
                        <li><a href="#services" className="hover:text-primary transition-colors flex items-center gap-2"><ArrowRight size={18} className="text-primary"/> Mobile Service</a></li>
                        <li><a href="#services" className="hover:text-primary transition-colors flex items-center gap-2"><ArrowRight size={18} className="text-primary"/> Back & Side Glass</a></li>
                    </ul>
                </div>

                {/* Column 3: Service Areas */}
                <div>
                    <h4 className="font-black text-white mb-6 tracking-wide text-2xl">Service Areas</h4>
                    <ul className="space-y-4 text-slate-400 font-medium text-lg">
                        <li><a href="#" className="hover:text-primary transition-colors">Phoenix, AZ</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Scottsdale, AZ</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Mesa, AZ</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Tempe, AZ</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Chandler, AZ</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Gilbert, AZ</a></li>
                    </ul>
                </div>

                {/* Column 4: Contact Info */}
                <div>
                    <h4 className="font-black text-white mb-6 tracking-wide text-2xl">Contact Us</h4>
                    <div className="space-y-5 text-slate-400 font-medium text-lg">
                         <div className="flex items-start gap-4">
                            <MapPin className="text-primary mt-1 shrink-0" size={24} />
                            <span>Phoenix, AZ<br/>Serving All of Arizona</span>
                         </div>
                         <div className="flex items-center gap-4">
                            <Phone className="text-primary shrink-0" size={24} />
                            <a href="tel:602-555-0148" className="hover:text-white transition-colors">(602) 555-0148</a>
                         </div>
                         <div className="flex items-center gap-4">
                            <Mail className="text-primary shrink-0" size={24} />
                            <a href="mailto:info@state48glass.com" className="hover:text-white transition-colors">info@state48glass.com</a>
                         </div>
                         <div className="flex items-start gap-4 pt-2">
                            <Clock className="text-primary mt-1 shrink-0" size={24} />
                            <span>Mon - Sat: 7am - 6pm<br/>Sunday: By Appointment</span>
                         </div>
                    </div>
                </div>
            </div>

            {/* Bottom Copyright */}
            <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-lg font-bold text-white/50 tracking-wider text-center md:text-left">
                <div>&copy; {new Date().getFullYear()} State 48 Glass. All Rights Reserved.</div>
                <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                    <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
};