import { motion } from 'framer-motion';
import completionIcon from '@/assets/icon-completion.svg';
import gritIcon from '@/assets/icon-grit.svg';
import characterIcon from '@/assets/icon-character.svg';
import familyOwnedIcon from '@/assets/icon-family-owned.svg';

const Values = () => {
  const values = [
    {
      icon: completionIcon,
      title: "100% Completion",
      description: "The job always gets done, no matter what. We don't walk away until it's finished."
    },
    {
      icon: gritIcon,
      title: "Grit & Hard Work",
      description: "3 generations of this mindset. We aren't afraid to get our hands dirty."
    },
    {
      icon: characterIcon,
      title: "Character",
      description: "We take immense pride in our work. Every project carries the Rocking S legacy."
    },
    {
      icon: familyOwnedIcon,
      title: "Family Owned",
      description: "Personal service, not a corporate runaround. You deal directly with the owners."
    }
  ];

  return (
    <section className="bg-background section-padding relative overflow-hidden">
      <div className="absolute top-0 right-0 w-2/3 h-full bg-muted/50 transform -skew-x-12 translate-x-1/4 pointer-events-none"></div>

      <div className="container-custom relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-badge mb-4">Our Character</span>
          <h2 className="section-heading">
            Differentiating Through<br/>
            <span className="text-primary">Grit & Integrity</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, idx) => (
            <motion.div 
              key={value.title}
              className="p-10 bg-background shadow-hard-sm border-t-4 border-primary"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12, duration: 0.5, ease: 'easeOut' }}
            >
              <img src={value.icon} alt="" className="w-14 h-14 mb-6" style={{ filter: 'invert(16%) sepia(95%) saturate(5000%) hue-rotate(355deg) brightness(85%) contrast(95%)' }} />
              <h3 className="text-lg font-black uppercase mb-3 text-foreground">{value.title}</h3>
              <p className="text-foreground/60 text-base font-medium leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;