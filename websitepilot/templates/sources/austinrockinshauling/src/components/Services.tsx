import { Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import materialHaulingImg from '@/assets/service-material-hauling.jpg';
import demolitionImg from '@/assets/service-demolition.jpg';
import dirtWorkImg from '@/assets/service-dirt-work.jpg';
import dumpTrailerImg from '@/assets/service-dump-trailer.jpg';
import skidSteerImg from '@/assets/service-skid-steer.jpg';
import materialHaulingIcon from '@/assets/icon-material-hauling.svg';
import demolitionIcon from '@/assets/icon-demolition.svg';
import dirtWorkIcon from '@/assets/icon-dirt-work.svg';
import skidSteerIcon from '@/assets/icon-skid-steer.svg';

const MaterialHaulingIcon = ({ className }: { className?: string }) => (
  <img src={materialHaulingIcon} alt="" className={className} style={{ filter: 'invert(1)' }} />
);

const DemolitionIcon = ({ className }: { className?: string }) => (
  <img src={demolitionIcon} alt="" className={className} style={{ filter: 'invert(1)' }} />
);

const DirtWorkIcon = ({ className }: { className?: string }) => (
  <img src={dirtWorkIcon} alt="" className={className} style={{ filter: 'invert(1)' }} />
);

const SkidSteerIcon = ({ className }: { className?: string }) => (
  <img src={skidSteerIcon} alt="" className={className} style={{ filter: 'invert(1)' }} />
);

const services = [
  { 
    title: "Demolition", 
    desc: "Interior, exterior, and pool demolition. We handle the dirty work and clearing.",
    icon: DemolitionIcon,
    image: demolitionImg,
    href: "/services/demolition",
  },
  { 
    title: "Dirt Work", 
    desc: "Grading, site prep, and earthwork. Precise leveling for any construction project.",
    icon: DirtWorkIcon,
    image: dirtWorkImg,
    href: "/services/dirt-work",
  },
  { 
    title: "Skid Steer", 
    desc: "Trenching, clearing, and moving heavy materials with professional efficiency.",
    icon: SkidSteerIcon,
    image: skidSteerImg,
    href: "/services/skid-steer",
  },
  { 
    title: "Material Hauling", 
    desc: "Fill dirt, ABC, landscape rock, river rock, and more delivered to your site.",
    icon: MaterialHaulingIcon,
    image: materialHaulingImg,
    href: "/#services",
  },
  { 
    title: "Dump Trailer", 
    desc: "Rental by day or week. We drop it, you load it, we haul it away.",
    icon: Trash2,
    image: dumpTrailerImg,
    href: "/services/dump-trailer",
  }
];

const Services = () => {
  return (
    <section id="services" className="bg-background section-padding">
      <div className="container-custom xl:max-w-[1400px] 2xl:max-w-[1600px]">
        <motion.div 
          className="text-center max-w-3xl xl:max-w-4xl mx-auto mb-16 xl:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-badge mb-4">Our Services</span>
          <h2 className="section-heading xl:text-7xl mb-6">Expertise In Every <span className="text-primary">Inch</span></h2>
          <p className="section-subheading xl:text-2xl mx-auto">
            From tearing down structures to preparing your land for construction, Rocking S handles the heavy work that others avoid.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-10">
          {services.slice(0, 3).map((service, idx) => (
            <Link to={service.href}>
            <motion.div 
              key={idx} 
              className="group relative h-[340px] md:h-[400px] xl:h-[480px] overflow-hidden cursor-pointer shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-primary" />
              <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                <div className="bg-primary w-12 h-12 md:w-14 md:h-14 flex items-center justify-center mb-3 md:mb-4 transform -skew-x-6 shadow-lg">
                  <service.icon className="w-7 h-7 md:w-8 md:h-8 text-primary-foreground skew-x-6" />
                </div>
                <h3 className="text-xl md:text-2xl font-black uppercase text-background mb-2 tracking-tight">{service.title}</h3>
                <p className="text-background/80 text-sm md:text-base mb-3 md:mb-4 leading-relaxed font-medium">{service.desc}</p>
                <span className="text-background text-xs font-black uppercase tracking-[0.15em] border-b-2 border-primary pb-1 group-hover:text-primary transition-colors inline-block">
                  Learn More
                </span>
              </div>
            </motion.div>
            </Link>
          ))}
        </div>

        {/* Bottom row - centered */}
        <div className="flex justify-center gap-6 lg:gap-8 xl:gap-10 mt-6 lg:mt-8 xl:mt-10">
          {services.slice(3).map((service, idx) => (
            <Link to={service.href} className="w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1.25rem)]">
            <motion.div 
              key={idx + 3} 
              className="group relative h-[340px] md:h-[400px] xl:h-[480px] overflow-hidden cursor-pointer shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx + 3) * 0.1 }}
            >
              <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-primary" />
              <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                <div className="bg-primary w-12 h-12 md:w-14 md:h-14 flex items-center justify-center mb-3 md:mb-4 transform -skew-x-6 shadow-lg">
                  <service.icon className="w-7 h-7 md:w-8 md:h-8 text-primary-foreground skew-x-6" />
                </div>
                <h3 className="text-xl md:text-2xl font-black uppercase text-background mb-2 tracking-tight">{service.title}</h3>
                <p className="text-background/80 text-sm md:text-base mb-3 md:mb-4 leading-relaxed font-medium">{service.desc}</p>
                <span className="text-background text-xs font-black uppercase tracking-[0.15em] border-b-2 border-primary pb-1 group-hover:text-primary transition-colors inline-block">
                  Learn More
                </span>
              </div>
            </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
