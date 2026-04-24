import React, { useState } from 'react';
import { Phone, Menu, X, MapPin, Facebook, Instagram, UserCircle, ChevronDown, Repeat, ShieldCheck, Sparkles, Wrench, Droplets, ClipboardCheck } from 'lucide-react';
import { Button } from './UI';

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
      <div className="bg-[#1a202c] text-white py-3 px-4 text-base md:text-lg font-bold tracking-wide hidden md:flex justify-end items-center">
        <div className="max-w-[1400px] w-full mx-auto flex justify-end items-center gap-6">
           <div className="flex items-center gap-4 text-white/90">
              <span className="text-lg text-white/60 mr-2 hidden lg:inline">Follow us:</span>
              <a href="#" className="hover:text-[#06b6d4] transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-[#06b6d4] transition-colors"><Facebook size={20} /></a>
           </div>
           <div className="h-4 w-px bg-white/20"></div>
           <div className="flex items-center gap-2">
             <MapPin size={20} className="text-[#06b6d4]" fill="currentColor" /> <span>Wendell, Raleigh, Wake Forest, Cary</span>
           </div>
           <div className="h-4 w-px bg-white/20"></div>
           <a href="tel:919-555-0199" className="flex items-center gap-2 hover:text-[#06b6d4] transition-colors">
            <Phone size={20} className="text-[#06b6d4]" fill="currentColor" /> <span>(919) 555-0199</span>
          </a>
           <div className="h-4 w-px bg-white/20"></div>
           <a href="#" className="flex items-center gap-2 hover:text-[#06b6d4] transition-colors">
             <UserCircle size={20} className="text-[#06b6d4]" /> <span>Client Portal</span>
           </a>
        </div>
      </div>

      {/* Main Nav */}
      <div className="bg-white py-4 px-4 md:px-8 sticky top-0 z-50 shadow-sm border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          {/* Logo */}
          <a href="#home" className="block z-50 relative group">
             <div className="flex flex-col items-start leading-none">
                <div className="flex items-baseline gap-1">
                    <span className="text-3xl md:text-4xl font-black text-slate-800 tracking-tighter">PRO</span>
                    <div className="relative w-6 h-6 md:w-8 md:h-8 mx-0.5">
                        {/* Custom Triangle Logo Icon */}
                        <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-[#06b6d4] stroke-[8px]" style={{ strokeLinejoin: 'round' }}>
                            <path d="M50 10 L90 90 L10 90 Z" />
                            <path d="M50 35 L70 75 L30 75 Z" className="fill-[#06b6d4] stroke-none" />
                        </svg>
                    </div>
                    <span className="text-3xl md:text-4xl font-black text-slate-800 tracking-tighter">CTIVE</span>
                </div>
                <span className="text-[10px] md:text-xs font-bold text-slate-500 tracking-[0.3em] pl-1 uppercase w-full text-center border-t border-slate-200 mt-1 pt-1">Pool Solutions</span>
             </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-8 font-bold text-slate-800 text-lg tracking-tight">
            <a href="#home" className="hover:text-[#06b6d4] transition-colors scroll-smooth">Home</a>
            
            {/* Mega Menu Trigger */}
            <div className="group relative py-4">
              <a href="#services" className="flex items-center gap-1 hover:text-[#06b6d4] transition-colors cursor-pointer">
                Our Services <ChevronDown size={20} strokeWidth={3} className="group-hover:rotate-180 transition-transform duration-300" />
              </a>

              {/* Mega Menu Dropdown */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[900px] bg-white shadow-2xl rounded-2xl border border-slate-100 p-8 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50 grid grid-cols-2 gap-10">
                  
                  {/* Column 1: Recurring Plans */}
                  <div className="space-y-6">
                      <h4 className="text-base font-black text-slate-400 uppercase tracking-widest mb-3">Maintenance Plans</h4>
                      <a href="#services" className="flex items-start gap-5 p-4 rounded-xl hover:bg-slate-50 transition-colors group/item">
                          <div className="w-14 h-14 rounded-lg bg-cyan-50 text-[#06b6d4] flex items-center justify-center group-hover/item:bg-[#06b6d4] group-hover/item:text-white transition-colors">
                              <Repeat size={28} />
                          </div>
                          <div>
                              <div className="font-black text-slate-900 text-lg mb-1">Weekly Maintenance</div>
                              <p className="text-base text-slate-500 font-medium leading-relaxed">Complete hands-off care. We handle everything every week.</p>
                          </div>
                      </a>
                      <a href="#services" className="flex items-start gap-5 p-4 rounded-xl hover:bg-slate-50 transition-colors group/item">
                          <div className="w-14 h-14 rounded-lg bg-cyan-50 text-[#06b6d4] flex items-center justify-center group-hover/item:bg-[#06b6d4] group-hover/item:text-white transition-colors">
                              <ShieldCheck size={28} />
                          </div>
                          <div>
                              <div className="font-black text-slate-900 text-lg mb-1">Bi-Weekly Maintenance</div>
                              <p className="text-base text-slate-500 font-medium leading-relaxed">Perfect for screened pools and budget-conscious owners.</p>
                          </div>
                      </a>
                  </div>

                  {/* Column 2: Specialized Services */}
                  <div className="space-y-6">
                      <h4 className="text-base font-black text-slate-400 uppercase tracking-widest mb-3">Specialized Solutions</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <a href="#services" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors text-base font-bold text-slate-700 hover:text-[#06b6d4]">
                            <Sparkles size={22} className="text-[#06b6d4]" /> Green-to-Clean
                        </a>
                        <a href="#services" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors text-base font-bold text-slate-700 hover:text-[#06b6d4]">
                            <Wrench size={22} className="text-[#06b6d4]" /> Equipment Repair
                        </a>
                        <a href="#services" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors text-base font-bold text-slate-700 hover:text-[#06b6d4]">
                            <Droplets size={22} className="text-[#06b6d4]" /> Chemical Balancing
                        </a>
                        <a href="#services" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors text-base font-bold text-slate-700 hover:text-[#06b6d4]">
                            <ClipboardCheck size={22} className="text-[#06b6d4]" /> Pool Inspections
                        </a>
                      </div>
                      
                      <div className="pt-6 border-t border-slate-100 mt-4">
                          <Button size="md" className="w-full text-base" onClick={() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })}>
                              Get A Custom Quote
                          </Button>
                      </div>
                  </div>
              </div>
            </div>

            <a href="#why-us" className="hover:text-[#06b6d4] transition-colors scroll-smooth">Why Us?</a>
            <a href="#articles" className="hover:text-[#06b6d4] transition-colors scroll-smooth">Articles</a>
            <a href="#contact" className="hover:text-[#06b6d4] transition-colors scroll-smooth">Contact</a>
            
            <Button size="md" className="ml-4 px-10 text-base" onClick={() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })}>
              Get Your Price Now
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
              <a href="#home" onClick={handleNavClick} className="hover:text-[#06b6d4] transition-colors border-b border-slate-100 pb-4">Home</a>
              
              {/* Mobile Services Accordion */}
              <div className="border-b border-slate-100 pb-4">
                <button 
                    onClick={() => setIsServicesOpen(!isServicesOpen)} 
                    className="flex items-center justify-between w-full hover:text-[#06b6d4] transition-colors"
                >
                    Our Services <ChevronDown size={24} className={`transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isServicesOpen && (
                    <div className="flex flex-col gap-4 mt-6 pl-4 text-xl text-slate-600 font-bold animate-in slide-in-from-top-2">
                        <a href="#services" onClick={handleNavClick} className="flex items-center gap-3"><Repeat size={20} className="text-[#06b6d4]"/> Weekly Maintenance</a>
                        <a href="#services" onClick={handleNavClick} className="flex items-center gap-3"><ShieldCheck size={20} className="text-[#06b6d4]"/> Bi-Weekly Maintenance</a>
                        <a href="#services" onClick={handleNavClick} className="flex items-center gap-3"><Sparkles size={20} className="text-[#06b6d4]"/> Green-to-Clean</a>
                        <a href="#services" onClick={handleNavClick} className="flex items-center gap-3"><Wrench size={20} className="text-[#06b6d4]"/> Repairs</a>
                    </div>
                )}
              </div>

              <a href="#why-us" onClick={handleNavClick} className="hover:text-[#06b6d4] transition-colors border-b border-slate-100 pb-4">Why Us?</a>
              <a href="#contact" onClick={handleNavClick} className="hover:text-[#06b6d4] transition-colors border-b border-slate-100 pb-4">Contact</a>
              
              <a href="#" className="flex items-center gap-2 text-xl font-bold text-slate-500 pt-2">
                  <UserCircle size={28} /> Client Portal
              </a>

              <Button className="w-full mt-4 py-4 text-xl shadow-lg" onClick={() => { handleNavClick(); document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' }); }}>
                Get Your Price Now
              </Button>
            </div>
        </div>
      )}
    </header>
  );
};