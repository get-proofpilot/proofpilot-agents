import React from 'react';
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';
import logoPrimary from '@/assets/logo-primary.svg';
import geometricPattern from '@/assets/geometric-pattern.svg';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-foreground text-white relative overflow-hidden">
      {/* Subtle geometric pattern accent */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url(${geometricPattern})`,
          backgroundSize: '400px',
          backgroundRepeat: 'repeat',
          filter: 'invert(1)'
        }}
      />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Column 1: Logo */}
            <div className="flex flex-col items-start">
                 <img 
                   src={logoPrimary} 
                   alt="The Doggy Detail" 
                   className="h-20 w-auto brightness-0 invert mb-4"
                 />
                 <p className="text-white/60 text-sm">Premium dog grooming for the distinguished pet.</p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
                <h4 className="font-oswald font-bold text-sm uppercase mb-6 text-white tracking-widest">Quick Links</h4>
                <ul className="space-y-3 text-sm text-white/60">
                    <li><a href="/privacy-policy" className="hover:text-racing-red transition-colors">Privacy Policy</a></li>
                    <li><a href="/terms-conditions" className="hover:text-racing-red transition-colors">Terms & Conditions</a></li>
                </ul>
            </div>

            {/* Column 3: Contact */}
             <div>
                <h4 className="font-oswald font-bold text-sm uppercase mb-6 text-white tracking-widest">Contact</h4>
                <ul className="space-y-3 text-sm text-white/60">
                    <li className="flex items-center gap-2">
                      <Phone size={14} className="text-racing-red" />
                      <span className="text-white font-medium">949-298-6170</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <MapPin size={14} className="text-racing-red mt-0.5" />
                      <span>22421 El Toro Road, Suite F<br/>Lake Forest, CA 92630</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Mail size={14} className="text-racing-red" />
                      <a href="mailto:hello@thedoggydetail.com" className="hover:text-white">hello@thedoggydetail.com</a>
                    </li>
                </ul>
            </div>

            {/* Column 4: Hours & Social */}
             <div>
                <h4 className="font-oswald font-bold text-sm uppercase mb-6 text-white tracking-widest">Follow Us</h4>
                <div className="flex gap-3 mb-6">
                    <a href="https://instagram.com/thedoggydetail_lf" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-racing-red transition-colors text-white">
                        <Instagram size={18} />
                    </a>
                    <a href="mailto:hello@thedoggydetail.com" className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-racing-red transition-colors text-white">
                        <Mail size={18} />
                    </a>
                </div>
                <div className="text-white/60 text-sm space-y-1">
                  <p><span className="text-white font-medium">Mon – Fri:</span> 10am – 7pm</p>
                  <p><span className="text-white font-medium">Sat – Sun:</span> 10am – 5pm</p>
                </div>
            </div>

        </div>
        
        <div className="border-t border-white/10 mt-16 pt-8 text-center text-xs text-white/40 font-sans">
          © 2025 The Doggy Detail. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};
