import React, { useState } from 'react';
import { Menu, X, Phone, MapPin, Instagram } from 'lucide-react';
import { Button } from './ui/button';
import { PawPrint } from './PawPrint';
import { BookingDialog } from './BookingDialog';
import logoHorizontal from '@/assets/logo-horizontal.svg';
import brandMark from '@/assets/brand-mark.svg';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-foreground text-white text-xs py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="https://maps.google.com/?q=22421+El+Toro+Rd+F,+Lake+Forest,+CA+92630" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-racing-red transition-colors">
              <MapPin size={12} />
              <span className="hidden sm:inline">22421 El Toro Rd F, Lake Forest, CA 92630</span>
              <span className="sm:hidden">Lake Forest, CA</span>
            </a>
            <a href="tel:949-298-6170" className="flex items-center gap-1.5 hover:text-racing-red transition-colors">
              <Phone size={12} />
              <span>949-298-6170</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://instagram.com/thedoggydetail_lf" target="_blank" rel="noopener noreferrer" className="hover:text-racing-red transition-colors">
              <Instagram size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white text-foreground shadow-sm font-oswald uppercase">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-16 md:h-20 relative">
            {/* Left Links - Desktop */}
            <div className="hidden lg:flex items-center gap-10 text-sm font-medium tracking-wider absolute left-0">
              <a href="#pricing" className="relative group py-2 transition-colors hover:text-racing-red flex items-center gap-1.5">
                <PawPrint size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                Services
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-racing-red transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#about" className="relative group py-2 transition-colors hover:text-racing-red flex items-center gap-1.5">
                <PawPrint size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                About Us
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-racing-red transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>

            {/* Logo - Centered */}
            <a href="/" className="flex-shrink-0 flex flex-col items-center cursor-pointer">
              <img 
                src={brandMark} 
                alt="The Doggy Detail" 
                className="md:hidden h-10 w-auto"
              />
              <img 
                src={logoHorizontal} 
                alt="The Doggy Detail" 
                className="hidden md:block h-14 w-auto"
              />
              <span className="hidden md:block text-[10px] tracking-[0.25em] text-foreground font-light mt-1 uppercase">
                Self Service Dog Wash and Spa
              </span>
            </a>

            <div className="hidden lg:flex items-center gap-10 text-sm font-medium tracking-wider absolute right-0">
              <a href="#club" className="relative group py-2 transition-colors hover:text-racing-red flex items-center gap-1.5">
                <PawPrint size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                The Club
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-racing-red transition-all duration-300 group-hover:w-full"></span>
              </a>
              <Button variant="secondary" className="rounded px-6 h-9 text-sm tracking-widest group" onClick={() => setBookingOpen(true)}>
                <PawPrint size={14} color="white" className="opacity-70 mr-1" />
                Book Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden absolute right-0">
              <button onClick={() => setIsOpen(!isOpen)} className="text-foreground focus:outline-none p-2">
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-border absolute w-full left-0 shadow-xl">
            <div className="flex flex-col px-6 py-5 space-y-3 font-oswald text-base tracking-wide">
              <a href="#pricing" onClick={() => setIsOpen(false)} className="block hover:text-racing-red py-2 border-b border-border">Services</a>
              <a href="#about" onClick={() => setIsOpen(false)} className="block hover:text-racing-red py-2 border-b border-border">About Us</a>
              <a href="#club" onClick={() => setIsOpen(false)} className="block hover:text-racing-red py-2 border-b border-border">The Club</a>
              <Button variant="secondary" className="w-full text-center h-10 mt-2" onClick={() => { setIsOpen(false); setBookingOpen(true); }}>
                Book Now
              </Button>
            </div>
          </div>
        )}
      </nav>
      <BookingDialog open={bookingOpen} onOpenChange={setBookingOpen} />
    </header>
  );
};
