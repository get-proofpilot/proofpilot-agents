import { motion } from 'framer-motion';
import QuickQuoteForm from './QuickQuoteForm';
import ctaBg from '@/assets/cta-background.png';

const CTABanner = () => {
  return (
    <section id="contact" className="relative bg-foreground overflow-hidden section-padding">
      <div className="absolute inset-0 z-0">
        <img 
          src={ctaBg} 
          className="w-full h-full object-cover opacity-15 grayscale" 
          alt="Job site background" 
        />
      </div>
      
      <div className="relative z-10 container-custom flex flex-col items-center text-center max-w-4xl mx-auto">
        <motion.div 
          className="text-background mb-10"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-badge mb-6">Ready To Get Started?</span>
          <h2 className="section-heading">
            Get Your <span className="text-primary">Project</span><br/>Started Today
          </h2>
        </motion.div>
        
        <motion.div 
          id="quote"
          className="bg-background p-12 md:p-20 shadow-2xl border-t-8 border-primary relative w-full"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute -top-14 right-4 bg-foreground text-background px-6 py-3 font-black uppercase text-sm transform -skew-x-6 shadow-lg hidden md:block">
            <span className="skew-x-6 block">On-Site Quotes</span>
          </div>
          <div className="mb-8">
            <h3 className="text-3xl md:text-4xl font-black uppercase text-foreground">Get Your Free Quote</h3>
            <p className="text-muted-foreground text-base mt-2">3 generations of grit. Fast response.</p>
          </div>
          <QuickQuoteForm />
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner;
