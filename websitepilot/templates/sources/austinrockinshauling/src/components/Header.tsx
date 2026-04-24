import { useState } from 'react';
import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TopBar from './TopBar';
import logo from '@/assets/logo.webp';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const services = [
    { label: 'Demolition', href: '/services/demolition' },
    { label: 'Dirt Work', href: '/services/dirt-work' },
    { label: 'Skid Steer', href: '/services/skid-steer' },
    { label: 'Dump Trailer', href: '/services/dump-trailer' },
  ];

  const [isAreasOpen, setIsAreasOpen] = useState(false);

  const serviceAreas = [
    { label: 'West Valley', href: '/service-areas/west-valley-phoenix-az' },
    { label: 'East Valley', href: '/service-areas/east-valley-phoenix-az' },
  ];

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <TopBar />
      <header className="sticky top-0 z-50 bg-background shadow-md border-b border-border">
        <div className="container-custom h-28 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <img src={logo} alt="Rocking S Hauling" className="h-24 w-auto object-contain" />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10 text-base font-black uppercase tracking-widest">
            <a href="/" className="hover:text-primary transition-colors">Home</a>
            
            {/* Services Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-primary transition-colors py-4 text-base font-black uppercase tracking-widest">
                Services <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full left-0 w-56 bg-background border-t-4 border-primary shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                {services.map((service) => (
                  <a 
                    key={service.label}
                    href={service.href} 
                    className="block px-6 py-3 hover:bg-muted border-b border-border text-xs font-bold"
                  >
                    {service.label}
                  </a>
                ))}
              </div>
            </div>
            
            {/* Service Areas Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-primary transition-colors py-4 text-base font-black uppercase tracking-widest">
                Service Areas <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full left-0 w-56 bg-background border-t-4 border-primary shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                {serviceAreas.map((area) => (
                  <a
                    key={area.label}
                    href={area.href}
                    className="block px-6 py-3 hover:bg-muted border-b border-border text-xs font-bold"
                  >
                    {area.label}
                  </a>
                ))}
              </div>
            </div>

            {navLinks.slice(1).map((link) => (
              <a key={link.label} href={link.href} className="hover:text-primary transition-colors">
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 sm:gap-5">
            <a href="tel:4801234567" className="hidden xl:flex items-center gap-2 text-base font-black hover:text-primary transition-colors">
              <Phone className="w-5 h-5" />
              <span>(480) 123-4567</span>
            </a>
            <a href="#quote" className="btn-primary text-xs sm:text-sm px-4 sm:px-8 py-3 sm:py-3.5 whitespace-nowrap">
              Free Quote
            </a>
            <button 
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-[calc(2.5rem+5rem)] left-0 right-0 z-40 bg-background border-b border-border overflow-hidden lg:hidden"
          >
            <div className="container-custom py-6 space-y-4">
              <a href="/" className="block text-lg font-bold uppercase tracking-wide hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                Home
              </a>
              
              {/* Mobile Services Dropdown */}
              <div>
                <button
                  className="w-full flex items-center justify-between text-lg font-bold uppercase tracking-wide"
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                >
                  Services
                  <ChevronDown className={`w-5 h-5 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 pt-2 space-y-2">
                        {services.map((service) => (
                          <a 
                            key={service.label}
                            href={service.href} 
                            className="block py-2 text-muted-foreground hover:text-primary font-medium"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {service.label}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Service Areas Dropdown */}
              <div>
                <button
                  className="w-full flex items-center justify-between text-lg font-bold uppercase tracking-wide"
                  onClick={() => setIsAreasOpen(!isAreasOpen)}
                >
                  Service Areas
                  <ChevronDown className={`w-5 h-5 transition-transform ${isAreasOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isAreasOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 pt-2 space-y-2">
                        {serviceAreas.map((area) => (
                          <a
                            key={area.label}
                            href={area.href}
                            className="block py-2 text-muted-foreground hover:text-primary font-medium"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {area.label}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navLinks.slice(1).map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-lg font-bold uppercase tracking-wide hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              
              <a 
                href="#quote" 
                className="btn-primary w-full mt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Get a Free Quote
              </a>
              <a 
                href="tel:4801234567" 
                className="btn-secondary w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                Call (480) 123-4567
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
