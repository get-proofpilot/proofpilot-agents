import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const paymentFeatures = [
  "Competitive Flat Rates",
  "No Hidden Fees",
  "Senior & Vet Discounts",
  "Cash, Card & Digital Pay",
  "Commercial Invoicing",
  "Custom Project Quotes"
];

const Financing = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image Side */}
          <motion.div 
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative z-10 overflow-hidden shadow-2xl border-b-8 border-r-8 border-foreground">
              <img 
                src="https://images.unsplash.com/photo-1584622050111-993a426fbf0a?auto=format&fit=crop&q=80&w=800" 
                alt="Happy family in clean yard" 
                className="w-full h-full object-cover"
              />
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 bg-background p-6 shadow-lg max-w-xs border-l-4 border-primary">
                <p className="text-sm font-black italic text-foreground">"They made the payment process so easy. No stress at all!"</p>
                <div className="flex text-yellow-400 mt-2 gap-1">
                  {[1,2,3,4,5].map(i => <div key={i} className="w-2 h-2 rounded-full bg-yellow-400" />)}
                </div>
              </div>
            </div>
            {/* Decorative Blurs */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-muted rounded-full mix-blend-multiply filter blur-xl opacity-70" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70" />
          </motion.div>

          {/* Content Side */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h4 className="text-primary font-bold tracking-widest uppercase text-xs mb-4">Flexible Payment Options</h4>
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-6 leading-none">
              Pricing That <span className="text-primary">Works</span><br/> With <span className="relative">
                Your Goals
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed font-medium">
              Taking care of your property shouldn't break the bank. At Rocking S Hauling, we offer competitive, transparent pricing and flexible payment options to ensure you get the service you need without the stress.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {paymentFeatures.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="font-bold text-sm uppercase tracking-wide">{item}</span>
                </motion.div>
              ))}
            </div>

            <button className="btn-secondary">
              Get Financing Info
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Financing;
