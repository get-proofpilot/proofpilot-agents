import React from 'react';
import { MapPin, ArrowUpRight } from 'lucide-react';

const Locations = () => {
  const locations = [
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
    'Cottonwood Heights',
    'and other surrounding areas'
  ];

  return (
    <section className="w-full px-6 py-20 max-md:px-4 max-md:py-12 bg-muted/50">
      <div className="w-full max-w-[1320px] mx-auto">
        <div className="gap-12 flex max-lg:flex-col">
          {/* Left Side - Content */}
          <div className="lg:w-[50%] flex flex-col">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-6">
              Locations
            </p>
            <h2 className="text-[48px] font-black leading-tight mb-6 max-md:text-[36px]">
              Serving Salt Lake City and Surrounding Areas
            </h2>
            <p className="text-foreground text-lg leading-relaxed mb-6">
              <span className="font-bold">Keystone Restoration</span> is proud to provide the best water damage restoration services across Utah, including:
            </p>

            {/* Locations Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3 mb-8">
              {locations.map((location, index) => (
                <div key={index} className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground text-base">{location}</span>
                </div>
              ))}
            </div>

            <h3 className="text-[28px] font-black leading-tight mb-4 max-md:text-[24px]">
              Keystone Restoration is Your Local Water Damage Restoration Contractor
            </h3>
            <p className="text-foreground/80 text-base leading-relaxed mb-8">
              As your local Salt Lake City restoration contractors, we're committed to delivering reliable, high-quality restoration solutions that stand the test of time. With extensive experience and a passion for excellence, Keystone Restoration is here to serve you and your community.
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4 flex-wrap">
              <button className="bg-primary text-white font-bold text-base px-8 py-4 rounded-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2">
                Get a Free Estimate
                <ArrowUpRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-primary text-primary font-bold text-base px-8 py-4 rounded-lg transition-all duration-300 hover:bg-primary/5 hover:shadow-lg flex items-center gap-2">
                Learn More
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Side - Google Map */}
          <div className="lg:w-[50%] flex items-center justify-center">
            <div className="w-full h-[600px] rounded-2xl overflow-hidden shadow-xl border-4 border-white max-lg:h-[450px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d774642.7296945822!2d-111.71005285000001!3d40.6751111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x18618c034dc3567%3A0x3d6dde3d719a654!2sKeystone%20Restoration!5e0!3m2!1sen!2sus!4v1763709067312!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Keystone Restoration Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Locations;
