export default function FooterBright() {
  return (
    <footer className="section-darker">
      <div className="mx-auto max-w-[1320px] px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-12 w-12 rounded-full bg-brand-primary flex items-center justify-center text-brand-primaryInk font-sans font-black">
              {/* {{MASCOT-MARK}} */}JR
            </div>
            <div className="font-sans font-black uppercase leading-none text-white">
              <div className="text-lg tracking-tight">{/* {{BRAND-NAME-L1}} */}Placeholder</div>
              <div className="text-xs text-brand-onDarkMuted tracking-[0.12em]">{/* {{BRAND-NAME-L2}} */}Junk Removal</div>
            </div>
          </div>
          <p className="mt-5 text-brand-onDarkMuted text-sm leading-relaxed">
            {/* {{FOOTER-ADDRESS}} */}
            {/* {{CITY}}, {{STATE}} {{ZIP}} */}
          </p>
          <p className="mt-2 text-brand-onDarkMuted text-sm">
            <a href="tel:{{PHONE-RAW}}" className="hover:text-brand-primary">
              {/* {{PHONE-DISPLAY}} */}555-000-0000
            </a>
          </p>
        </div>

        <div>
          <div className="kicker text-brand-primary">Quicklinks</div>
          <ul className="mt-4 space-y-2 text-brand-onDarkMuted text-[15px]">
            <li><a href="#home" className="hover:text-white">Home</a></li>
            <li><a href="#about" className="hover:text-white">About</a></li>
            <li><a href="#services" className="hover:text-white">Services</a></li>
            <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
            <li><a href="#reviews" className="hover:text-white">Reviews</a></li>
            <li><a href="#contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        <div>
          <div className="kicker text-brand-primary">Services</div>
          <ul className="mt-4 space-y-2 text-brand-onDarkMuted text-[15px]">
            <li><a href="#services" className="hover:text-white">Residential Junk Removal</a></li>
            <li><a href="#services" className="hover:text-white">Construction Debris</a></li>
            <li><a href="#services" className="hover:text-white">Estate Cleanouts</a></li>
            <li><a href="#services" className="hover:text-white">Commercial Cleanouts</a></li>
            <li><a href="#services" className="hover:text-white">Hot Tub & Appliance Removal</a></li>
            <li><a href="#services" className="hover:text-white">Labor-Only Hauling</a></li>
          </ul>
        </div>

        <div>
          <div className="kicker text-brand-primary">Service Area</div>
          <div className="mt-4 aspect-[5/3] w-full rounded-card bg-brand-dark/70 border border-white/10 flex items-center justify-center">
            <span className="text-brand-onDarkMuted text-xs uppercase tracking-widest">Map</span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1320px] px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-brand-onDarkMuted text-[13px]">
          <div>© {/* {{BRAND-NAME-L1}} */}Placeholder Junk Removal. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:text-white">Privacy Policy</a>
            <a href="#terms" className="hover:text-white">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
