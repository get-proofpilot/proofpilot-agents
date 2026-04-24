import React, { useState } from 'react';
import { ChevronDown, ArrowUpRight, Menu, X } from 'lucide-react';
import logo from '@/assets/keystone-logo.png';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Header = () => {
  const [showServicesMenu, setShowServicesMenu] = useState(false);
  const [showAreasMenu, setShowAreasMenu] = useState(false);
  const [showBlogMenu, setShowBlogMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileAreasOpen, setMobileAreasOpen] = useState(false);
  const [mobileBlogOpen, setMobileBlogOpen] = useState(false);

  const serviceCategories = [
    {
      title: 'Water Damage Restoration',
      services: [
        'Emergency Water Removal',
        'Flood Cleanup',
        'Burst Pipe Repair',
        'Basement Flooding',
        'Sewage Cleanup',
        'Water Extraction'
      ]
    },
    {
      title: 'Mold Remediation',
      services: [
        'Mold Inspection',
        'Mold Removal',
        'Mold Prevention',
        'Black Mold Removal',
        'Mold Testing'
      ]
    },
    {
      title: 'Storm Damage Restoration',
      services: [
        'Wind Damage Repair',
        'Hail Damage Repair',
        'Roof Tarping',
        'Tree Damage Cleanup',
        'Emergency Board-Up'
      ]
    },
    {
      title: 'Specialty Services',
      services: [
        '24/7 Emergency Response',
        'Insurance Claims Assistance',
        'Commercial Restoration',
        'Residential Restoration',
        'Structural Drying'
      ]
    }
  ];

  const serviceAreas = [
    'Salt Lake City',
    'Sandy',
    'West Valley City',
    'Provo',
    'West Jordan',
    'Orem',
    'Taylorsville',
    'South Jordan',
    'Lehi',
    'Murray',
    'Draper',
    'Bountiful',
    'Riverton',
    'Herriman',
    'Spanish Fork',
    'Pleasant Grove',
    'Springville',
    'American Fork',
    'Eagle Mountain',
    'Saratoga Springs',
    'Layton',
    'Kaysville',
    'Cottonwood Heights'
  ];

  const blogCategories = [
    {
      title: 'Emergency Guides',
      articles: [
        'What to Do During a Flood',
        'Emergency Water Damage Checklist',
        'First Steps After Water Damage',
        'How to Shut Off Water Quickly',
        'Storm Preparation Guide'
      ]
    },
    {
      title: 'Prevention Tips',
      articles: [
        'Preventing Basement Flooding',
        'Water Damage Prevention Checklist',
        'Seasonal Home Maintenance',
        'Early Warning Signs of Water Damage',
        'Protecting Your Home from Mold'
      ]
    },
    {
      title: 'Insurance & Claims',
      articles: [
        'Filing Water Damage Claims',
        'What Insurance Covers',
        'Documenting Damage for Claims',
        'Working with Insurance Adjusters',
        'Maximizing Your Claim'
      ]
    },
    {
      title: 'DIY & Maintenance',
      articles: [
        'Basic Water Cleanup Tips',
        'When to Call Professionals',
        'Maintaining Your Sump Pump',
        'Drying Out Your Home Safely',
        'Post-Restoration Care'
      ]
    }
  ];

  return (
    <header className="bg-white flex flex-col items-center w-full sticky top-0 z-50 shadow-sm">
      <div className="bg-white self-stretch flex w-full flex-col items-center text-base leading-none justify-center px-5 py-3 md:px-[70px] md:py-[15px]">
        <div className="flex w-full max-w-[1280px] items-center justify-between">
          {/* Logo */}
          <img
            src={logo}
            alt="Keystone Restoration Logo"
            className="h-[40px] md:h-[50px] w-auto object-contain"
          />
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-black font-semibold relative">
            <a href="#about" className="transition-colors hover:text-primary">
              About
            </a>
            
            {/* Services Mega Menu */}
            <div 
              className="self-stretch flex items-stretch gap-1.5 font-bold my-auto relative"
              onMouseEnter={() => setShowServicesMenu(true)}
              onMouseLeave={() => setShowServicesMenu(false)}
            >
              <button className="grow transition-colors hover:text-primary flex items-center gap-1">
                Services
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showServicesMenu ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Mega Menu Dropdown */}
              {showServicesMenu && (
                <div className="absolute top-full left-0 pt-2 z-50">
                  <div className="bg-white shadow-2xl rounded-xl border border-border/20 p-8 min-w-[900px] animate-fade-in">
                    <div className="grid grid-cols-4 gap-8">
                      {serviceCategories.map((category, idx) => (
                        <div key={idx} className="flex flex-col">
                          <h3 className="text-primary text-sm font-black uppercase tracking-wide mb-4 pb-2 border-b-2 border-primary/20">
                            {category.title}
                          </h3>
                          <ul className="flex flex-col gap-3">
                            {category.services.map((service, serviceIdx) => (
                              <li key={serviceIdx}>
                                <a 
                                  href={`#${service.toLowerCase().replace(/\s+/g, '-')}`}
                                  className="text-foreground text-sm font-normal hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200"
                                >
                                  {service}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    
                    {/* CTA at bottom */}
                    <div className="mt-8 pt-6 border-t border-border/20 flex items-center justify-between">
                      <p className="text-foreground/70 text-sm">
                        Need immediate assistance? We're available 24/7 for emergencies
                      </p>
                      <button className="bg-primary text-white font-bold text-sm px-6 py-3 rounded-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2">
                        Get Free Estimate
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Service Areas Mega Menu */}
            <div 
              className="self-stretch flex items-stretch gap-1.5 font-bold my-auto relative"
              onMouseEnter={() => setShowAreasMenu(true)}
              onMouseLeave={() => setShowAreasMenu(false)}
            >
              <button className="grow transition-colors hover:text-primary flex items-center gap-1">
                Service Areas
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showAreasMenu ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Mega Menu Dropdown */}
              {showAreasMenu && (
                <div className="absolute top-full left-1/2 pt-2 z-50" style={{ transform: 'translateX(-50%)' }}>
                  <div className="bg-white shadow-2xl rounded-xl border border-border/20 p-8 min-w-[700px] animate-fade-in">
                    <h3 className="text-primary text-lg font-black uppercase tracking-wide mb-6 pb-3 border-b-2 border-primary/20">
                      Serving Salt Lake City & Surrounding Areas
                    </h3>
                    <div className="grid grid-cols-3 gap-x-6 gap-y-3 mb-6">
                      {serviceAreas.map((area, idx) => (
                        <a 
                          key={idx}
                          href="#locations"
                          className="text-foreground text-sm font-normal hover:text-primary transition-colors hover:translate-x-1 inline-flex items-center gap-2 duration-200"
                        >
                          <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                          {area}
                        </a>
                      ))}
                    </div>
                    
                    {/* CTA at bottom */}
                    <div className="mt-6 pt-6 border-t border-border/20 flex items-center justify-between">
                      <p className="text-foreground/70 text-sm">
                        Fast response times across all service areas
                      </p>
                      <button className="bg-primary text-white font-bold text-sm px-6 py-3 rounded-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2">
                        View All Locations
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Blog Mega Menu */}
            <div 
              className="self-stretch flex items-stretch gap-1.5 font-bold my-auto relative"
              onMouseEnter={() => setShowBlogMenu(true)}
              onMouseLeave={() => setShowBlogMenu(false)}
            >
              <button className="grow transition-colors hover:text-primary flex items-center gap-1">
                Blog
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showBlogMenu ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Mega Menu Dropdown */}
              {showBlogMenu && (
                <div className="absolute top-full left-1/2 pt-2 z-50" style={{ transform: 'translateX(-50%)' }}>
                  <div className="bg-white shadow-2xl rounded-xl border border-border/20 p-8 min-w-[850px] animate-fade-in">
                    <div className="grid grid-cols-4 gap-8">
                      {blogCategories.map((category, idx) => (
                        <div key={idx} className="flex flex-col">
                          <h3 className="text-primary text-sm font-black uppercase tracking-wide mb-4 pb-2 border-b-2 border-primary/20">
                            {category.title}
                          </h3>
                          <ul className="flex flex-col gap-3">
                            {category.articles.map((article, articleIdx) => (
                              <li key={articleIdx}>
                                <a 
                                  href={`#${article.toLowerCase().replace(/\s+/g, '-')}`}
                                  className="text-foreground text-sm font-normal hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200"
                                >
                                  {article}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    
                    {/* CTA at bottom */}
                    <div className="mt-8 pt-6 border-t border-border/20 flex items-center justify-between">
                      <p className="text-foreground/70 text-sm">
                        Helpful guides and tips for dealing with water damage
                      </p>
                      <button className="bg-primary text-white font-bold text-sm px-6 py-3 rounded-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2">
                        View All Articles
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <a href="#testimonials" className="transition-colors hover:text-primary">Reviews</a>
            <a href="/contact" className="transition-colors hover:text-primary">Contact Us</a>
            
            <button className="hidden lg:flex bg-primary border items-center justify-center gap-2 text-white font-bold px-6 py-4 rounded-lg border-primary border-solid transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5">
              24/7 Emergency Help
              <ArrowUpRight className="w-5 h-5" />
            </button>
          </nav>

          {/* Mobile CTA and Menu */}
          <div className="flex items-center gap-3 lg:hidden">
            <a href="tel:8015551234" className="bg-primary text-white font-bold px-4 py-2 rounded-lg text-sm whitespace-nowrap">
              Call Now
            </a>
            
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <Menu className="w-6 h-6 text-foreground" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] overflow-y-auto">
                <div className="flex flex-col gap-6 mt-8">
                  {/* About */}
                  <a 
                    href="#about" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    About
                  </a>

                  {/* Services */}
                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className="flex items-center justify-between text-lg font-semibold text-foreground hover:text-primary transition-colors"
                    >
                      Services
                      <ChevronDown className={`w-5 h-5 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileServicesOpen && (
                      <div className="flex flex-col gap-4 pl-4">
                        {serviceCategories.map((category, idx) => (
                          <div key={idx} className="flex flex-col gap-2">
                            <h4 className="text-sm font-bold text-primary uppercase">{category.title}</h4>
                            {category.services.map((service, serviceIdx) => (
                              <a
                                key={serviceIdx}
                                href={`#${service.toLowerCase().replace(/\s+/g, '-')}`}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-sm text-foreground/80 hover:text-primary transition-colors"
                              >
                                {service}
                              </a>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Service Areas */}
                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={() => setMobileAreasOpen(!mobileAreasOpen)}
                      className="flex items-center justify-between text-lg font-semibold text-foreground hover:text-primary transition-colors"
                    >
                      Service Areas
                      <ChevronDown className={`w-5 h-5 transition-transform ${mobileAreasOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileAreasOpen && (
                      <div className="flex flex-col gap-2 pl-4">
                        {serviceAreas.map((area, idx) => (
                          <a
                            key={idx}
                            href="#locations"
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-sm text-foreground/80 hover:text-primary transition-colors"
                          >
                            {area}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Blog */}
                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={() => setMobileBlogOpen(!mobileBlogOpen)}
                      className="flex items-center justify-between text-lg font-semibold text-foreground hover:text-primary transition-colors"
                    >
                      Blog
                      <ChevronDown className={`w-5 h-5 transition-transform ${mobileBlogOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileBlogOpen && (
                      <div className="flex flex-col gap-4 pl-4">
                        {blogCategories.map((category, idx) => (
                          <div key={idx} className="flex flex-col gap-2">
                            <h4 className="text-sm font-bold text-primary uppercase">{category.title}</h4>
                            {category.articles.map((article, articleIdx) => (
                              <a
                                key={articleIdx}
                                href={`#${article.toLowerCase().replace(/\s+/g, '-')}`}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-sm text-foreground/80 hover:text-primary transition-colors"
                              >
                                {article}
                              </a>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Reviews */}
                  <a 
                    href="#testimonials" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    Reviews
                  </a>

                  {/* Contact */}
                  <a 
                    href="/contact" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    Contact Us
                  </a>

                  {/* Emergency Button */}
                  <button className="bg-primary text-white font-bold px-6 py-4 rounded-lg flex items-center justify-center gap-2 mt-4">
                    24/7 Emergency Help
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
