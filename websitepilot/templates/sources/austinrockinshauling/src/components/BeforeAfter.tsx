import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

const showcaseItems = [
  {
    id: 1,
    title: "Foundation Prep",
    type: "video",
    thumbnail: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800",
    label: "Dirt Work"
  },
  {
    id: 2,
    title: "Pool Excavation",
    type: "video",
    thumbnail: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=800",
    label: "Demolition"
  },
  {
    id: 3,
    title: "Putting Green Pad",
    type: "video",
    thumbnail: "https://images.unsplash.com/photo-1584622050111-993a426fbf0a?auto=format&fit=crop&q=80&w=800",
    label: "Grading"
  },
  {
    id: 4,
    title: "Lot Clearing",
    type: "video",
    thumbnail: "https://images.unsplash.com/photo-1533241088497-87f54c935490?auto=format&fit=crop&q=80&w=800",
    label: "Grit in Action"
  }
];

const BeforeAfter = () => {
  return (
    <section className="py-24 bg-transparent text-background overflow-hidden relative border-y border-background/5">
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(45deg, currentColor 1px, transparent 1px), linear-gradient(-45deg, currentColor 1px, transparent 1px)', 
          backgroundSize: '60px 60px' 
        }}
      />

      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div 
            className="max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-black uppercase tracking-[0.3em] text-xs mb-4 block">Action Gallery</span>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
              See What We've <br/>
              <span className="relative inline-block mt-2">
                <span className="relative z-10 text-background font-black uppercase pr-4">Built</span>
                <div className="absolute inset-0 bg-primary -skew-x-12 -z-0 translate-y-2 h-[80%]" />
              </span>
            </h2>
          </motion.div>
          <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs border-l-2 border-primary pl-6 max-w-xs">
            Capturing 3 generations of grit on the job site. No cuts, just hard work.
          </p>
        </div>

        {/* Scrollable Container */}
        <div className="flex gap-4 md:gap-8 overflow-x-auto pb-12 hide-scrollbar snap-x">
          {showcaseItems.map((item, index) => (
            <motion.div 
              key={item.id} 
              className="flex-shrink-0 w-[280px] md:w-[350px] aspect-[3/4] relative group cursor-pointer snap-start"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Main Card Body */}
              <div className="w-full h-full bg-secondary border-b-8 border-primary relative overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_50px_rgba(125,21,21,0.3)]">
                <img 
                  src={item.thumbnail} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                />
                
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-primary flex items-center justify-center transform group-hover:rotate-90 transition-transform duration-500 shadow-xl border-4 border-background/20">
                    <Play className="w-8 h-8 text-primary-foreground fill-current translate-x-1 -rotate-0 group-hover:-rotate-90 transition-transform duration-500" />
                  </div>
                </div>

                {/* Top Left Label */}
                <div className="absolute top-6 left-0 bg-background text-foreground px-4 py-1 font-black uppercase text-[10px] tracking-widest skew-x-[-12deg] -translate-x-2">
                  <span className="skew-x-[12deg] block">{item.label}</span>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="h-1 w-full bg-background/10 relative overflow-hidden mt-4">
          <div className="absolute top-0 left-0 h-full w-1/4 bg-primary" />
        </div>
        
        <div className="mt-8 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">
          <span>Scroll To Explore</span>
          <span className="text-primary">01 // 04</span>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
