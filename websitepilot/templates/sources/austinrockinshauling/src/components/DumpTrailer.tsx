import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import dumpTrailerImg from '@/assets/dump-trailer-photo.jpg';
import DumpTrailerForm from './DumpTrailerForm';

const rentalFeatures = [
  "Daily & Weekly Rates",
  "Starting at $300",
  "Easy Drop-Off & Pick-Up",
  "Various Trailer Sizes",
  "Perfect for DIY Projects",
  "Contractor Friendly"
];

const DumpTrailer = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <section className="py-24 xl:py-32 bg-background">
        <div className="container-custom xl:max-w-[1400px] 2xl:max-w-[1600px]">
          <div className="flex flex-col lg:flex-row items-center gap-16 xl:gap-24">
            {/* Image Side */}
            <motion.div 
              className="lg:w-[55%] relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative z-10 overflow-hidden shadow-2xl border-b-8 border-r-8 border-foreground">
                <img 
                  src={dumpTrailerImg} 
                  alt="Dump trailer rental" 
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
              {/* Decorative Blurs */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-muted rounded-full mix-blend-multiply filter blur-xl opacity-70" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70" />
            </motion.div>

            {/* Content Side */}
            <motion.div 
              className="lg:w-[45%]"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h4 className="text-primary font-bold tracking-widest uppercase text-xs xl:text-sm mb-4">Trailer Rental Service</h4>
              <h2 className="text-4xl md:text-5xl xl:text-6xl font-black uppercase mb-6 leading-none">
                Dump <span className="text-primary">Trailer</span><br/> <span className="relative">
                  Rental
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                  </svg>
                </span>
              </h2>
              <p className="text-muted-foreground text-lg xl:text-xl mb-8 leading-relaxed font-medium">
                Need a dump trailer for your DIY project or big cleanup? Rocking S Hauling offers affordable dump trailer rentals with flexible daily and weekly rates. Perfect for contractors and homeowners alike.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {rentalFeatures.map((item, idx) => (
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

              <button onClick={() => setShowForm(true)} className="bg-primary text-primary-foreground px-8 py-4 text-sm font-black uppercase tracking-widest hover:bg-foreground hover:scale-95 transition-all duration-300 inline-block text-center">
                Reserve Your Trailer
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <DumpTrailerForm open={showForm} onOpenChange={setShowForm} />
    </>
  );
};

export default DumpTrailer;
