import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import logo from '@/assets/logo.webp';
import proofpilotLogo from '@/assets/proofpilot-logo.png';

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.52 12.27C23.52 11.43 23.45 10.68 23.31 9.96H12V14.51H18.52C18.25 15.99 17.37 17.29 16.1 18.15V21.13H19.92C22.18 19.06 23.52 16.02 23.52 12.27Z" fill="#4285F4"/>
    <path d="M12 24C15.24 24 17.96 22.92 19.93 21.13L16.1 18.15C15.03 18.88 13.64 19.32 12 19.32C8.84 19.32 6.16 17.18 5.21 14.28H1.27V17.34C3.25 21.27 7.31 24 12 24Z" fill="#34A853"/>
    <path d="M5.21 14.28C4.96 13.54 4.83 12.78 4.83 12C4.83 11.22 4.96 10.46 5.21 9.72V6.66H1.27C0.46 8.28 0 10.09 0 12C0 13.91 0.46 15.72 1.27 17.34L5.21 14.28Z" fill="#FBBC05"/>
    <path d="M12 4.68C13.78 4.68 15.36 5.29 16.61 6.49L19.99 3.11C17.96 1.22 15.24 0 12 0C7.31 0 3.25 2.73 1.27 6.66L5.21 9.72C6.16 6.82 8.84 4.68 12 4.68Z" fill="#EA4335"/>
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="Rocking S Hauling" className="h-24 w-auto object-contain" />
            </div>
            <div className="space-y-4 mb-8 text-base text-background/60">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>(480) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>info@rockingshauling.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>Queen Creek, AZ</span>
              </div>
            </div>
            <div className="flex gap-4">
              <a href="https://www.google.com/maps/place/Rocking+S+Hauling" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-primary flex items-center justify-center hover:bg-background transition-colors rounded group">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.52 12.27C23.52 11.43 23.45 10.68 23.31 9.96H12V14.51H18.52C18.25 15.99 17.37 17.29 16.1 18.15V21.13H19.92C22.18 19.06 23.52 16.02 23.52 12.27Z" className="fill-white group-hover:fill-[#4285F4]"/>
                  <path d="M12 24C15.24 24 17.96 22.92 19.93 21.13L16.1 18.15C15.03 18.88 13.64 19.32 12 19.32C8.84 19.32 6.16 17.18 5.21 14.28H1.27V17.34C3.25 21.27 7.31 24 12 24Z" className="fill-white group-hover:fill-[#34A853]"/>
                  <path d="M5.21 14.28C4.96 13.54 4.83 12.78 4.83 12C4.83 11.22 4.96 10.46 5.21 9.72V6.66H1.27C0.46 8.28 0 10.09 0 12C0 13.91 0.46 15.72 1.27 17.34L5.21 14.28Z" className="fill-white group-hover:fill-[#FBBC05]"/>
                  <path d="M12 4.68C13.78 4.68 15.36 5.29 16.61 6.49L19.99 3.11C17.96 1.22 15.24 0 12 0C7.31 0 3.25 2.73 1.27 6.66L5.21 9.72C6.16 6.82 8.84 4.68 12 4.68Z" className="fill-white group-hover:fill-[#EA4335]"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61551865153249" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-primary flex items-center justify-center hover:bg-background transition-colors rounded group">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" className="fill-white group-hover:fill-[#1877F2]"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/rocking_s_hauling" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-primary flex items-center justify-center hover:bg-background transition-colors rounded group">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" className="fill-white group-hover:fill-[url(#ig-gradient)]"/>
                  <defs>
                    <linearGradient id="ig-gradient" x1="0" y1="24" x2="24" y2="0">
                      <stop offset="0%" stopColor="#FD5"/>
                      <stop offset="25%" stopColor="#FF543E"/>
                      <stop offset="50%" stopColor="#C837AB"/>
                      <stop offset="100%" stopColor="#5B51D8"/>
                    </linearGradient>
                  </defs>
                </svg>
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="font-black uppercase text-sm tracking-widest mb-5 text-background/50">Services</h3>
            <ul className="space-y-3 text-base text-background/60">
              <li><a href="#services" className="hover:text-primary transition-colors">Demolition Services</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Dirt Work & Grading</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Skid Steer Services</a></li>
              
              <li><a href="#services" className="hover:text-primary transition-colors">Dump Trailer Rental</a></li>
            </ul>
          </div>

          {/* Service Areas Column */}
          <div>
            <h3 className="font-black uppercase text-sm tracking-widest mb-5 text-background/50">Service Areas</h3>
            <ul className="space-y-3 text-base text-background/60">
              <li><a href="#" className="hover:text-primary transition-colors">Pinal County</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Maricopa County</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Queen Creek</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Gilbert</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Mesa</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Florence</a></li>
            </ul>
          </div>

          {/* Hours Column */}
          <div>
            <h3 className="font-black uppercase text-sm tracking-widest mb-5 text-background/50">Hours</h3>
            <div className="space-y-3 text-base text-background/60">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-background/80">Monday – Saturday</p>
                  <p>6:00 AM – 6:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-primary">Sunday</p>
                  <p className="text-primary">Closed</p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <a href="#quote" className="btn-primary w-full text-xs py-3 block">
                Get a Free Quote
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 pt-6 flex flex-col md:flex-row justify-between items-center text-[10px] text-background/30 uppercase tracking-wider gap-4">
          <div className="text-center md:text-left">
            <span>© {currentYear} Rocking S Hauling</span>
            <span className="mx-2">|</span>
            <span>Family Owned & Operated</span>
          </div>
          <div>
            <a href="#" className="hover:text-background transition-colors">Privacy Policy</a>
            <span className="mx-2">|</span>
            <a href="#" className="hover:text-background transition-colors">Sitemap</a>
        </div>

        {/* ProofPilot Logo */}
        <div className="flex justify-center mt-6">
          <img src={proofpilotLogo} alt="ProofPilot" className="h-6 w-auto opacity-50 hover:opacity-80 transition-opacity" loading="lazy" />
        </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
