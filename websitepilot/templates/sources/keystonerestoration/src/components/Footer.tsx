import React from 'react';
import logo from '@/assets/keystone-logo.png';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-granite to-granite/95 text-white self-stretch flex w-full flex-col items-center mt-[80px] pt-16 pb-8 px-10 max-md:px-5 max-md:mt-10">
      <div className="w-full max-w-[1320px]">
        {/* Main Footer Content - First Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Company Info & Logo */}
          <div className="flex flex-col">
            <img
              src={logo}
              alt="Keystone Restoration Logo"
              className="h-[70px] w-auto object-contain mb-6"
            />
            <p className="text-white/80 text-base leading-relaxed">
              Your trusted 24/7 emergency restoration partner in Salt Lake City. We specialize in water damage restoration, mold remediation, and disaster recovery services.
            </p>
          </div>

          {/* Water Damage Services */}
          <div className="flex flex-col">
            <h3 className="text-white text-xl font-black mb-6 uppercase tracking-wide">
              Water Damage
            </h3>
            <nav className="flex flex-col space-y-4">
              <a href="#services" className="text-white/70 text-base hover:text-primary transition-colors hover:translate-x-1 duration-200 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                Water Extraction
              </a>
              <a href="#services" className="text-white/70 text-base hover:text-primary transition-colors hover:translate-x-1 duration-200 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                Flood Cleanup
              </a>
              <a href="#services" className="text-white/70 text-base hover:text-primary transition-colors hover:translate-x-1 duration-200 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                Storm Damage
              </a>
              <a href="#services" className="text-white/70 text-base hover:text-primary transition-colors hover:translate-x-1 duration-200 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                Emergency Response
              </a>
            </nav>
          </div>

          {/* Mold & Restoration Services */}
          <div className="flex flex-col">
            <h3 className="text-white text-xl font-black mb-6 uppercase tracking-wide">
              Mold & Restoration
            </h3>
            <nav className="flex flex-col space-y-4">
              <a href="#services" className="text-white/70 text-base hover:text-primary transition-colors hover:translate-x-1 duration-200 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                Mold Remediation
              </a>
              <a href="#services" className="text-white/70 text-base hover:text-primary transition-colors hover:translate-x-1 duration-200 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                Mold Inspection
              </a>
              <a href="#services" className="text-white/70 text-base hover:text-primary transition-colors hover:translate-x-1 duration-200 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                Property Restoration
              </a>
              <a href="#services" className="text-white/70 text-base hover:text-primary transition-colors hover:translate-x-1 duration-200 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                Insurance Claims
              </a>
            </nav>
          </div>

          {/* Helpful Content */}
          <div className="flex flex-col">
            <h3 className="text-white text-xl font-black mb-6 uppercase tracking-wide">
              Resources
            </h3>
            <nav className="flex flex-col space-y-4">
              <a href="#blog" className="text-white/70 text-base hover:text-primary transition-colors hover:translate-x-1 duration-200 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                Water Damage Guide
              </a>
              <a href="#blog" className="text-white/70 text-base hover:text-primary transition-colors hover:translate-x-1 duration-200 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                Mold Prevention Tips
              </a>
              <a href="#blog" className="text-white/70 text-base hover:text-primary transition-colors hover:translate-x-1 duration-200 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                Emergency Checklist
              </a>
              <a href="#blog" className="text-white/70 text-base hover:text-primary transition-colors hover:translate-x-1 duration-200 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                Restoration Blog
              </a>
            </nav>
          </div>

          {/* Company */}
          <div className="flex flex-col">
            <h3 className="text-white text-xl font-black mb-6 uppercase tracking-wide">
              Company
            </h3>
            <nav className="flex flex-col space-y-4">
              <a href="#process" className="text-white/70 text-base hover:text-primary transition-colors hover:translate-x-1 duration-200 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                Our Process
              </a>
              <a href="#testimonials" className="text-white/70 text-base hover:text-primary transition-colors hover:translate-x-1 duration-200 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                Reviews
              </a>
              <a href="#faq" className="text-white/70 text-base hover:text-primary transition-colors hover:translate-x-1 duration-200 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                FAQ
              </a>
              <a href="#locations" className="text-white/70 text-base hover:text-primary transition-colors hover:translate-x-1 duration-200 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                Service Areas
              </a>
              <a href="#contact" className="text-white/70 text-base hover:text-primary transition-colors hover:translate-x-1 duration-200 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                Contact Us
              </a>
            </nav>
          </div>
        </div>

        {/* Second Row - Contact & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Contact Us */}
          <div className="flex flex-col">
            <h3 className="text-white text-xl font-black mb-6 uppercase tracking-wide">
              Contact Us
            </h3>
            <div className="flex flex-col space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/20 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-white/90 font-semibold text-base mb-2">Location</p>
                  <address className="text-white/70 text-base leading-relaxed not-italic">
                    Salt Lake City, Utah<br />
                    Serving Sandy & Surrounding Areas
                  </address>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/20 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-white/90 font-semibold text-base mb-2">Email</p>
                  <a 
                    href="mailto:info@keystonerestoration.com" 
                    className="text-white/70 text-base hover:text-primary transition-colors"
                  >
                    info@keystonerestoration.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/20 p-3 rounded-lg">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-white/90 font-semibold text-base mb-2">Phone</p>
                  <a 
                    href="tel:801-555-0199" 
                    className="text-white/70 text-lg hover:text-primary transition-colors font-bold"
                  >
                    (801) 555-0199
                  </a>
                </div>
              </div>

              {/* Social Icons */}
              <div className="pt-2">
                <p className="text-white/90 font-semibold text-base mb-4">Follow Us</p>
                <div className="flex items-center gap-4">
                  <a 
                    href="#" 
                    className="bg-white/10 p-3.5 rounded-lg hover:bg-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                  </a>
                  <a 
                    href="#" 
                    className="bg-white/10 p-3.5 rounded-lg hover:bg-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                  </a>
                  <a 
                    href="#" 
                    className="bg-white/10 p-3.5 rounded-lg hover:bg-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Google Map */}
          <div className="flex flex-col">
            <h3 className="text-white text-xl font-black mb-6 uppercase tracking-wide">
              Find Us
            </h3>
            <div className="rounded-xl overflow-hidden shadow-xl h-[380px] border-2 border-white/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d774642.7296945822!2d-111.71005285000001!3d40.6751111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x18618c034dc3567%3A0x3d6dde3d719a654!2sKeystone%20Restoration!5e0!3m2!1sen!2sus!4v1763710720272!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Keystone Restoration Location"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/20 my-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
          <p className="text-center md:text-left">
            © Copyright 2025 Keystone Restoration. All Rights Reserved. | Licensed & Insured
          </p>
          <p className="text-center md:text-right">
            Design and Develop by <span className="text-primary font-semibold">ProofPilot</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
