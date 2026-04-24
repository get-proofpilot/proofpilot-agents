import { motion } from 'framer-motion';
import QuickQuoteForm from './QuickQuoteForm';
import quoteBg from '@/assets/quote-cta-bg.jpg';

interface ServiceQuoteCTAProps {
  backgroundImage?: string;
  overlayClassName?: string;
  backgroundPosition?: string;
}

const ServiceQuoteCTA = ({ backgroundImage, overlayClassName, backgroundPosition }: ServiceQuoteCTAProps = {}) => {
  const bg = backgroundImage ?? quoteBg;
  const overlay = overlayClassName ?? 'bg-gradient-to-r from-foreground/95 via-foreground/80 to-foreground/60';
  return (
    <section id="contact" className="relative bg-muted overflow-hidden section-padding">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover"
        style={{ backgroundImage: `url(${bg})`, backgroundPosition: backgroundPosition ?? 'center' }}
      />
      {/* Dark overlay matches the hero's left-to-right gradient for visual consistency */}
      <div className={`absolute inset-0 ${overlay}`} />
      {/* Top blend: tall, soft taper from FAQ gray into the CTA so the seam is invisible */}
      <div
        className="absolute inset-x-0 top-0 h-48 md:h-64 pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(to bottom, hsl(var(--muted)) 0%, hsl(var(--muted) / 0.85) 25%, hsl(var(--muted) / 0.5) 55%, hsl(var(--muted) / 0) 100%)' }}
      />

      <div className="relative z-10 container-custom flex flex-col items-center text-center max-w-4xl lg:max-w-6xl mx-auto">
        <motion.div
          className="text-background mb-10"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-badge mb-6">Ready To Get Started?</span>
          <h2 className="section-heading">
            Get Your <span className="text-primary">Project</span><br />Started Today
          </h2>
        </motion.div>

        <motion.div
          id="quote"
          className="bg-background p-10 md:p-14 lg:p-16 shadow-2xl border-t-8 border-primary relative w-full lg:max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute -top-10 right-4 bg-foreground text-background px-5 py-2 font-black uppercase text-xs tracking-widest shadow-lg hidden md:block">
            On-Site Quotes
          </div>
          <div className="mb-8 text-center">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase text-foreground">Get Your Free Quote</h3>
            <p className="text-muted-foreground text-sm lg:text-base mt-2">3 generations of grit. Fast response.</p>
          </div>
          <QuickQuoteForm />
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceQuoteCTA;
