import { motion } from 'framer-motion';
import { Button } from './ui/button';
import consultationIcon from '@/assets/icon-consultation.svg';
import solutionIcon from '@/assets/icon-solution.svg';
import solvedIcon from '@/assets/icon-solved.svg';

const steps = [
  {
    icon: consultationIcon,
    title: "Easy Consultation",
    desc: "Get a fast quote with our simple and stress-free process. We'll assess your project needs and provide clear information with no hassle or confusion."
  },
  {
    icon: solutionIcon,
    title: "Choose Your Solution",
    desc: "A dedicated expert will walk you through all your options and costs. We'll help you make informed decisions that best suit your project and budget."
  },
  {
    icon: solvedIcon,
    title: "Problem Solved",
    desc: "Enjoy a stress-free experience that puts your needs first! We've crafted a customer experience so exceptional you'll want to refer us to friends and family."
  }
];

const Process = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-background section-padding relative overflow-hidden">
      <div className="container-custom relative z-10">
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase text-foreground tracking-tight">
            How We Get It Done
            <br />
            <span className="text-primary">In Just Three Easy Steps</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx} 
              className="relative"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.5, ease: 'easeOut' }}
            >
              {/* Card */}
              <div className="bg-foreground text-background p-10 lg:p-12 pb-16 lg:pb-20 h-full min-h-[380px] flex flex-col items-center text-center relative overflow-visible border-t-4 border-primary shadow-2xl">
                {/* Subtle texture overlay */}
                <div 
                  className="absolute inset-0 opacity-5" 
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}
                />
                
                {/* Icon */}
                <div className="mb-8 relative z-10">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-lg">
                    <img src={step.icon} alt="" className="w-12 h-12 invert" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl lg:text-2xl font-black uppercase mb-4 text-background relative z-10 italic">
                  {step.title}
                </h3>
                <p className="text-background/80 leading-relaxed relative z-10 text-base lg:text-lg">
                  {step.desc}
                </p>

                {/* Step Badge */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                  <div className="bg-primary px-8 py-3 text-primary-foreground font-black text-sm uppercase tracking-wider shadow-xl transform -skew-x-6">
                    <span className="skew-x-6 block">Step {idx + 1}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Button 
            onClick={scrollToContact}
            size="lg"
            className="bg-primary hover:bg-foreground text-primary-foreground font-black uppercase text-lg px-10 py-6 shadow-xl hover:shadow-2xl hover:scale-95 transition-all duration-300"
          >
            Get A Free Quote
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;