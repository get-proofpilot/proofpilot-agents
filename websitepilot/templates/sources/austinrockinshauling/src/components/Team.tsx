import { motion } from 'framer-motion';

const Team = () => {
  return (
    <section className="bg-foreground text-background section-padding border-t border-background/10">
      <div className="container-custom">
        
        {/* Owner Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="aspect-[4/5] bg-secondary overflow-hidden border-8 border-secondary/50 shadow-2xl relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600" 
                alt="Austin Seals" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-full h-full border-4 border-primary z-0"></div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-badge mb-4">The Rocking S Story</span>
            <h2 className="section-heading mb-6">
              3 Generations of <span className="text-primary">Grit</span>
            </h2>
            <h3 className="text-xl md:text-2xl font-bold mb-6 text-background/90">Austin Seals, Owner</h3>
            <p className="text-background/70 text-base md:text-lg leading-relaxed mb-8 font-medium">
              "Started with simple hauling and taught myself the equipment over the years. Built Rocking S on grit and hard work. Our core promise is simple: every job will be completed 100%, no matter what happens. There's character in our work."
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Team;
