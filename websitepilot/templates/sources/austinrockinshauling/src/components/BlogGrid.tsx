import { ArrowRight, FileText, DollarSign, ListChecks } from 'lucide-react';
import { motion } from 'framer-motion';

const posts = [
  {
    title: "House Demolition Cost in Arizona (2025 Guide)",
    category: "Demolition",
    date: "October 12, 2023",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=600",
    excerpt: "Planning to tear down a structure? We break down the costs per square foot, permit fees, and disposal charges for Pinal & Maricopa counties.",
    icon: DollarSign
  },
  {
    title: "How Much Does Land Grading Cost?",
    category: "Dirt Work",
    date: "September 28, 2023",
    img: "https://images.unsplash.com/photo-1594498653385-d5172c532c00?auto=format&fit=crop&q=80&w=600",
    excerpt: "From rough grading to final pad prep. Learn what factors influence the price of dirt work and how to budget for your site preparation.",
    icon: DollarSign
  },
  {
    title: "Site Prep Checklist: Before You Build",
    category: "Educational",
    date: "September 15, 2023",
    img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=600",
    excerpt: "Don't start construction until you've checked these boxes. Essential steps for clearing, grading, and compacting your land correctly.",
    icon: ListChecks
  }
];

const BlogGrid = () => {
  return (
    <section className="py-24 bg-background border-t border-border">
      <div className="container-custom">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h4 className="text-primary font-bold tracking-widest uppercase text-xs mb-3">Knowledge Base</h4>
          <h2 className="text-4xl font-black uppercase mb-4">Expert Advice &<br/>Industry Insights</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Tips, cost guides, and updates from the Rocking S team to help you make informed decisions.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {posts.map((post, idx) => (
            <motion.div 
              key={idx} 
              className="group cursor-pointer flex flex-col h-full bg-card hover:shadow-2xl transition-all duration-300 border border-border hover:border-primary/20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="aspect-[3/2] overflow-hidden bg-muted relative">
                <img 
                  src={post.img} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter grayscale-[20%] group-hover:grayscale-0"
                />
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 text-[10px] font-bold uppercase shadow-sm flex items-center gap-2">
                  {post.category}
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <div className="mb-4 flex items-center gap-2 text-muted-foreground text-xs font-bold uppercase tracking-wider">
                  <FileText className="w-3 h-3" />
                  {post.date}
                </div>
                <h3 className="text-xl font-black uppercase mb-4 group-hover:text-primary transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow border-b border-border pb-6">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest group-hover:text-primary transition-colors mt-auto">
                  Read Article <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <button className="border-b-2 border-foreground hover:text-primary hover:border-primary text-xs font-black uppercase tracking-widest pb-1 transition-colors">
            View All Posts
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogGrid;
