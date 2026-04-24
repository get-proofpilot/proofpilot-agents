import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import waterExtractionImg from '@/assets/water-extraction-service.jpg';
import floodCleanupImg from '@/assets/flood-cleanup-service.jpg';
import moldRemediationImg from '@/assets/mold-remediation-service.jpg';
import stormDamageImg from '@/assets/storm-damage-service.jpg';

const Services = () => {
  const services = [
    {
      title: 'Water Damage Restoration',
      description: 'Fast water extraction, structural drying, and complete restoration to prevent further damage and mold growth.',
      image: waterExtractionImg,
    },
    {
      title: 'Flood Cleanup Services',
      description: 'Complete flood remediation including water removal, sanitization, and property restoration for homes and businesses.',
      image: floodCleanupImg,
    },
    {
      title: 'Mold Remediation',
      description: 'Professional mold inspection, removal, and prevention to protect your property and ensure healthy indoor air quality.',
      image: moldRemediationImg,
    },
    {
      title: 'Storm Damage Restoration',
      description: 'Emergency storm damage repair, roof tarping, and complete property restoration after severe weather events.',
      image: stormDamageImg,
    },
    {
      title: 'Emergency Response',
      description: '24/7 emergency services for immediate water damage, flood, and disaster response throughout Salt Lake City.',
      image: waterExtractionImg,
    },
    {
      title: 'Insurance Coordination',
      description: 'Direct billing and claims assistance to make the restoration process smooth and stress-free for you.',
      image: floodCleanupImg,
    }
  ];

  return (
    <section className="flex flex-col items-center w-full px-6 py-20 max-md:px-4 max-md:py-12 bg-white">
      <p className="text-primary text-sm font-bold leading-none tracking-widest uppercase">
        Our Services
      </p>
      <h2 className="text-foreground text-[48px] font-black leading-tight text-center mt-8 max-w-[900px] max-md:text-[36px]">
        Water Damage Restoration and Emergency Water Removal Services in Salt Lake City, Utah
      </h2>
      <p className="text-foreground/70 text-lg leading-relaxed text-center mt-6 max-w-[800px]">
        When disaster strikes, you need a trusted restoration company that responds fast. We provide expert water extraction, mold remediation, and complete disaster recovery backed by our commitment to excellence.
      </p>

      {/* Service Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 w-full max-w-[1320px]">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} />
        ))}
      </div>

      {/* CTA Buttons */}
      <div className="flex items-center gap-4 mt-12">
        <button className="bg-primary text-white font-bold text-base px-8 py-4 rounded-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2">
          Get a Free Estimate
          <ArrowUpRight className="w-5 h-5" />
        </button>
        <button className="border-2 border-primary text-primary font-bold text-base px-8 py-4 rounded-lg transition-all duration-300 hover:bg-primary/5 hover:shadow-lg flex items-center gap-2">
          Learn More
          <ArrowUpRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

const ServiceCard = ({ service }: { service: { title: string; description: string; image: string } }) => {
  return (
    <div className="bg-card border border-primary rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
      {/* Card Content */}
      <div className="p-6">
        <h3 className="text-foreground text-[30px] font-bold leading-[44px] mb-2.5">
          {service.title}
        </h3>
        <p className="text-foreground/70 text-sm leading-relaxed mb-10">
          {service.description}
        </p>
        
        {/* Image Container with Arrow Button */}
        <div className="relative">
          <div className="rounded-lg overflow-hidden">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-[272px] object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          {/* Double Circle Arrow Button */}
          <div className="absolute -top-[13%] right-[5%] bg-card w-[70px] h-[70px] rounded-full flex items-center justify-center z-10">
            <button 
              className="bg-primary w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label={`Learn more about ${service.title}`}
            >
              <ArrowUpRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
