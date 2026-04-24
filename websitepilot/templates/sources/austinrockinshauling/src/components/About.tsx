import { motion } from 'framer-motion';
import haulingFlatbed from '@/assets/hauling-flatbed.jpg';
import haulingBackhoe from '@/assets/hauling-backhoe.jpg';

const About = () => {
  return (
    <section className="bg-transparent text-background section-padding overflow-hidden relative">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div 
            className="space-y-8 z-10"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-badge">About Us</span>
            <h2 className="section-heading">Your Trusted<br/><span className="text-primary">Hauling Partner</span></h2>
            <p className="text-background/80 leading-relaxed text-base md:text-lg font-medium max-w-lg">
              We are Rocking S Hauling, your trusted transportation and hauling company serving East Valley, Arizona. With a dedicated team of professionals, we provide reliable and efficient hauling services for all your needs.
            </p>
            <p className="text-background/70 leading-relaxed text-base md:text-lg font-medium max-w-lg">
              From construction materials to household items, count on us for safe and timely delivery every time.
            </p>
          </motion.div>

          {/* Right Images */}
          <motion.div 
            className="relative w-full flex flex-col gap-4"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Top Image - Landscape */}
            <div className="w-full h-64 md:h-80 bg-foreground overflow-hidden relative shadow-2xl border-4 border-primary">
              <img 
                src={haulingBackhoe} 
                alt="Truck hauling backhoe on flatbed trailer" 
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
            </div>
            
            {/* Bottom Image - Landscape */}
            <div className="w-full h-64 md:h-80 bg-foreground overflow-hidden shadow-2xl border-4 border-primary">
              <img 
                src={haulingFlatbed} 
                alt="Truck loaded on gooseneck flatbed trailer" 
                className="w-full h-full object-cover object-center"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
