import { useState } from 'react';
import { motion } from 'framer-motion';
import galleryHouseDemo from '@/assets/gallery-house-demo.jpg';
import galleryLandGrading from '@/assets/gallery-land-grading.jpg';
import gallerySitePrep from '@/assets/gallery-site-prep.jpg';
import galleryConcreteRemoval from '@/assets/gallery-concrete-removal.jpg';
import galleryLotClearing from '@/assets/gallery-lot-clearing.jpg';
import galleryPoolDemo from '@/assets/gallery-pool-demo.jpg';
import galleryBackyardGrading from '@/assets/gallery-backyard-grading.jpg';
import galleryWestValleyDirt from '@/assets/gallery-west-valley-dirt-work.jpg';
import galleryEastValleyDirt from '@/assets/gallery-east-valley-dirt-work.jpg';

const stats = [
  { value: '500+', label: 'Projects Completed' },
  { value: '1M+', label: 'Tons Removed' },
  { value: '60K+', label: 'Aggregate Spread' },
  { value: '3+', label: 'Years in Business' },
];

const allProjects = [
  { id: 1, type: 'demo', img: galleryHouseDemo, title: 'House Demolition', location: 'Gilbert, AZ' },
  { id: 2, type: 'dirt', img: galleryLandGrading, title: 'Land Grading', location: 'Queen Creek, AZ' },
  { id: 3, type: 'dirt', img: gallerySitePrep, title: 'Site Prep', location: 'Mesa, AZ' },
  { id: 4, type: 'demo', img: galleryConcreteRemoval, title: 'Concrete Removal', location: 'Chandler, AZ' },
  { id: 5, type: 'dirt', img: galleryLotClearing, title: 'Lot Clearing', location: 'Florence, AZ' },
  { id: 6, type: 'demo', img: galleryPoolDemo, title: 'Pool Demolition', location: 'Scottsdale, AZ' },
  { id: 7, type: 'dirt', img: galleryBackyardGrading, title: 'Backyard Grading', location: 'Tempe, AZ' },
  { id: 8, type: 'dirt', img: galleryWestValleyDirt, title: 'Lot Grading & Trenching', location: 'West Valley, AZ' },
  { id: 9, type: 'dirt', img: galleryEastValleyDirt, title: 'Site Prep & Excavation', location: 'East Valley, AZ' },
];

const filters = ['all', 'demo', 'dirt'];

const StatsGallery = () => {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? allProjects : allProjects.filter(p => p.type === filter);

  return (
    <>
      {/* Stats Banner */}
      <section className="bg-foreground py-16">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="block text-4xl lg:text-5xl font-black text-primary mb-2">{stat.value}</span>
                <span className="text-xs lg:text-sm font-black uppercase text-background tracking-[0.2em]">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="bg-background py-24 border-t border-border">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-3">Portfolio</h4>
              <h2 className="text-4xl font-black uppercase">Recent <span className="text-primary">Work</span></h2>
            </motion.div>
            
            <div className="flex gap-2 mt-6 md:mt-0 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
              {filters.map((f) => (
                <button 
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-6 py-2 text-xs font-bold uppercase tracking-wider border border-foreground transition-colors whitespace-nowrap ${
                    filter === f 
                      ? 'bg-foreground text-background' 
                      : 'bg-transparent hover:bg-foreground/10'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Full rows */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.slice(0, Math.floor(filtered.length / 3) * 3).map((item, index) => (
              <motion.div 
                key={item.id} 
                className="relative aspect-[4/3] bg-secondary overflow-hidden shadow-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-foreground/40 flex flex-col justify-end p-8">
                  <h3 className="text-background text-xl font-black uppercase">{item.title}</h3>
                  <p className="text-primary text-xs font-bold uppercase tracking-wider">{item.location}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Remainder row - centered with decorative side elements */}
          {filtered.length % 3 !== 0 && (
            <div className="flex justify-center items-stretch gap-6 mt-6">
              {/* Left decorative panel */}
              {filtered.length % 3 === 1 && (
                <div className="hidden lg:flex w-[calc(33.333%-1rem)] items-center justify-center border-2 border-dashed border-border bg-muted/30">
                  <div className="text-center p-8">
                    <div className="w-16 h-16 bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                      <span className="text-primary text-2xl font-black">RS</span>
                    </div>
                    <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest">More projects coming soon</p>
                  </div>
                </div>
              )}

              {filtered.slice(Math.floor(filtered.length / 3) * 3).map((item, index) => (
                <motion.div 
                  key={item.id} 
                  className="relative aspect-[4/3] bg-secondary overflow-hidden shadow-lg w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-foreground/40 flex flex-col justify-end p-8">
                    <h3 className="text-background text-xl font-black uppercase">{item.title}</h3>
                    <p className="text-primary text-xs font-bold uppercase tracking-wider">{item.location}</p>
                  </div>
                </motion.div>
              ))}

              {/* Right decorative panel */}
              {filtered.length % 3 === 1 && (
                <div className="hidden lg:flex w-[calc(33.333%-1rem)] items-center justify-center border-2 border-dashed border-border bg-muted/30">
                  <div className="text-center p-8">
                    <div className="w-16 h-16 bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                      <span className="text-primary text-2xl font-black">★</span>
                    </div>
                    <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest">Quality guaranteed</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default StatsGallery;
