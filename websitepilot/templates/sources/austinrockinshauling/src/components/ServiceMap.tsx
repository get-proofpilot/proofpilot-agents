import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const cities = [
  'Queen Creek, AZ',
  'San Tan Valley, AZ', 
  'Gilbert, AZ',
  'Mesa, AZ',
  'Florence, AZ',
  'Chandler, AZ',
  'Phoenix, AZ',
  'Goodyear, AZ',
  'Tempe, AZ',
  'Scottsdale, AZ',
  'Apache Junction, AZ',
  'Casa Grande, AZ'
];

const ServiceMap = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-background text-foreground py-24 pb-24 relative overflow-visible">
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `url("/images/ground-crack-texture.png")`,
          backgroundSize: '800px 800px',
          backgroundRepeat: 'repeat',
        }}
      />

      <div className="container-custom relative z-10">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-8 bg-primary" />
            <span className="text-primary font-bold uppercase tracking-widest text-xs">Territories Covered</span>
            <div className="h-px w-8 bg-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-tight">
            Our Service <span className="text-primary">Areas</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-background shadow-2xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d853216.9581417657!2d-111.81270054999999!3d33.34811755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa8c49eee2aca0c9b%3A0xea77048c947696c4!2sRocking%20S%20Hauling!5e0!3m2!1sen!2sus!4v1775882733732!5m2!1sen!2sus"
                className="w-full h-[450px] lg:h-[550px]"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Service Area Map"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
              {cities.map((city, index) => (
                <motion.div
                  key={city}
                  className="flex items-center gap-3 group"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <MapPin className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="text-base font-bold text-foreground">{city}</span>
                </motion.div>
              ))}
            </div>

            <div className="border-t border-foreground/20 pt-8 mb-8">
              <p className="text-foreground text-lg leading-relaxed font-medium">
                If you don't see your community listed, reach out—we proudly serve the entire Phoenix metro area and surrounding communities throughout Maricopa & Pinal Counties.
              </p>
            </div>

            <button
              onClick={scrollToContact}
              className="w-full bg-primary hover:bg-foreground text-primary-foreground font-black uppercase text-lg md:text-xl tracking-wider py-5 px-8 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              Contact Us
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServiceMap;
