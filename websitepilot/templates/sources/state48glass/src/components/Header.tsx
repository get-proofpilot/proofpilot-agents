import React, { useState } from 'react';
import { Phone, Menu, X, MapPin, Facebook, Instagram, ChevronDown, Shield, Car, Truck, CircleDot } from 'lucide-react';
import { Button } from './UI';
import logo from '@/assets/logo.jpg';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const handleNavClick = () => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  };

  return (
    <header className="w-full flex flex-col z-50 relative font-sans">
      {/* Top Bar */}
      <div className="bg-surface-dark text-white py-2 px-4 text-sm font-medium tracking-wide hidden md:flex justify-end items-center">
        <div className="max-w-[1400px] w-full mx-auto flex justify-end items-center gap-5">
           <div className="flex items-center gap-3 text-white/90">
              <span className="text-sm text-white/60 mr-1 hidden lg:inline">Follow us:</span>
              <a href="#" className="hover:text-primary transition-colors"><Instagram size={16} /></a>
              <a href="#" className="hover:text-primary transition-colors"><Facebook size={16} /></a>
           </div>
           <div className="h-3 w-px bg-white/20"></div>
           <div className="flex items-center gap-2 text-white">
             <MapPin size={16} className="text-primary" fill="currentColor" /> <span>Serving All of Arizona</span>
           </div>
           <div className="h-3 w-px bg-white/20"></div>
           <a href="tel:602-555-0148" className="flex items-center gap-2 text-white hover:text-primary transition-colors">
            <Phone size={16} className="text-primary" fill="currentColor" /> <span>(602) 555-0148</span>
          </a>
        </div>
      </div>

      {/* Main Nav */}
      <div className="bg-white py-4 px-4 md:px-8 sticky top-0 z-50 shadow-sm border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          {/* Logo */}
          <a href="#home" className="block z-50 relative group">
             <img src={logo} alt="State 48 Glass" className="h-16 md:h-24 w-auto" />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-8 font-bold text-slate-800 text-lg tracking-tight">
            <a href="#home" className="hover:text-primary transition-colors scroll-smooth">Home</a>
            
            {/* Mega Menu Trigger */}
            <div className="group relative py-4">
              <a href="#services" className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer">
                Services <ChevronDown size={20} strokeWidth={3} className="group-hover:rotate-180 transition-transform duration-300" />
              </a>

              {/* Mega Menu Dropdown */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[700px] bg-white shadow-2xl rounded-2xl border border-slate-100 p-8 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50 grid grid-cols-2 gap-10">
                  
                  {/* Column 1 */}
                  <div className="space-y-6">
                      <h4 className="text-base font-black text-slate-400 uppercase tracking-widest mb-3">Auto Glass Services</h4>
                      <a href="#services" className="flex items-start gap-5 p-4 rounded-xl hover:bg-slate-50 transition-colors group/item">
                          <div className="w-14 h-14 rounded-lg bg-blue-50 text-primary flex items-center justify-center group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                              <Car size={28} />
                          </div>
                          <div>
                              <div className="font-black text-slate-900 text-lg mb-1">Windshield Replacement</div>
                              <p className="text-base text-slate-500 font-medium leading-relaxed">Complete windshield replacement with OEM quality glass.</p>
                          </div>
                      </a>
                      <a href="#services" className="flex items-start gap-5 p-4 rounded-xl hover:bg-slate-50 transition-colors group/item">
                          <div className="w-14 h-14 rounded-lg bg-blue-50 text-primary flex items-center justify-center group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                              <CircleDot size={28} />
                          </div>
                          <div>
                              <div className="font-black text-slate-900 text-lg mb-1">Chip & Crack Repair</div>
                              <p className="text-base text-slate-500 font-medium leading-relaxed">Quick repairs to prevent further damage.</p>
                          </div>
                      </a>
                  </div>

                  {/* Column 2 */}
                  <div className="space-y-6">
                      <h4 className="text-base font-black text-slate-400 uppercase tracking-widest mb-3">Additional Services</h4>
                      <div className="grid grid-cols-1 gap-3">
                        <a href="#services" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors text-base font-bold text-slate-700 hover:text-primary">
                            <Truck size={22} className="text-primary" /> Fleet Services
                        </a>
                        <a href="#services" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors text-base font-bold text-slate-700 hover:text-primary">
                            <Shield size={22} className="text-primary" /> Insurance Claims
                        </a>
                      </div>
                      
                      <div className="pt-6 border-t border-slate-100 mt-4">
                          <Button size="md" className="w-full text-base" onClick={() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })}>
                              Get A Free Quote
                          </Button>
                      </div>
                  </div>
              </div>
            </div>

            <a href="#why-us" className="hover:text-primary transition-colors scroll-smooth">Why Us?</a>
            <a href="#reviews" className="hover:text-primary transition-colors scroll-smooth">Reviews</a>
            <a href="#contact" className="hover:text-primary transition-colors scroll-smooth">Contact</a>
            
            <Button size="md" className="ml-4 px-10 text-base" onClick={() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })}>
              Get A Quote
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button className="xl:hidden p-2 text-slate-900 z-50 relative" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="xl:hidden bg-white fixed inset-0 z-40 flex flex-col pt-24 px-6 overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="flex flex-col gap-6 font-black text-2xl text-slate-800">
              <a href="#home" onClick={handleNavClick} className="hover:text-primary transition-colors border-b border-slate-100 pb-4">Home</a>
              
              {/* Mobile Services Accordion */}
              <div className="border-b border-slate-100 pb-4">
                <button 
                    onClick={() => setIsServicesOpen(!isServicesOpen)} 
                    className="flex items-center justify-between w-full hover:text-primary transition-colors"
                >
                    Services <ChevronDown size={24} className={`transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isServicesOpen && (
                    <div className="flex flex-col gap-4 mt-6 pl-4 text-xl text-slate-600 font-bold animate-in slide-in-from-top-2">
                        <a href="#services" onClick={handleNavClick} className="flex items-center gap-3"><Car size={20} className="text-primary"/> Windshield Replacement</a>
                        <a href="#services" onClick={handleNavClick} className="flex items-center gap-3"><CircleDot size={20} className="text-primary"/> Chip & Crack Repair</a>
                        <a href="#services" onClick={handleNavClick} className="flex items-center gap-3"><Shield size={20} className="text-primary"/> Insurance Claims</a>
                    </div>
                )}
              </div>

              <a href="#why-us" onClick={handleNavClick} className="hover:text-primary transition-colors border-b border-slate-100 pb-4">Why Us?</a>
              <a href="#reviews" onClick={handleNavClick} className="hover:text-primary transition-colors border-b border-slate-100 pb-4">Reviews</a>
              <a href="#contact" onClick={handleNavClick} className="hover:text-primary transition-colors border-b border-slate-100 pb-4">Contact</a>

              <Button className="w-full mt-4 py-4 text-xl shadow-lg" onClick={() => { handleNavClick(); document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' }); }}>
                Get A Quote
              </Button>
            </div>
        </div>
      )}
    </header>
  );
};