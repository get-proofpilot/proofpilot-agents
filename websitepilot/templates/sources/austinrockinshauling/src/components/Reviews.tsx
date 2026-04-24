import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

import avatarEvan from '@/assets/avatar-evan.jpg';
import avatarJacqueline from '@/assets/avatar-jacqueline.jpg';
import avatarLexie from '@/assets/avatar-lexie.jpg';
import avatarMarcus from '@/assets/avatar-marcus.jpg';
import avatarSarah from '@/assets/avatar-sarah.jpg';
import avatarDavid from '@/assets/avatar-david.jpg';

const reviewCards = [
  { name: "Evan F.", text: "Helped us take care of an odd disposal that other people weren't willing to take on. Quick, professional, and fair pricing.", service: "Junk Removal", platform: "Google", rating: 5, avatar: avatarEvan },
  { name: "Jacqueline W.", text: "Phenomenal job finishing up our landscape project. Last minute cancellation saved us. Highly recommend!", service: "Dirt Work", platform: "Google", rating: 5, avatar: avatarJacqueline },
  { name: "Lexie M.", text: "Not only do they have great customer service, they are flexible with you as well. Will use again for sure.", service: "Demolition", platform: "Google", rating: 5, avatar: avatarLexie },
  { name: "Marcus T.", text: "Called them for a last-minute haul and they showed up within the hour. Can't beat that kind of service.", service: "Material Hauling", platform: "Facebook", rating: 5, avatar: avatarMarcus },
  { name: "Sarah K.", text: "They handled our entire backyard demo and cleanup in one day. Left the property spotless. 10/10.", service: "Demolition", platform: "Google", rating: 5, avatar: avatarSarah },
  { name: "David R.", text: "Great crew, great equipment, great attitude. They made our dirt delivery seamless and stress-free.", service: "Dirt Work", platform: "Facebook", rating: 5, avatar: avatarDavid },
];

const platforms = ["All Reviews", "Google", "Facebook"] as const;

const platformIcons: Record<string, JSX.Element> = {
  Google: (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  ),
  Facebook: (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
    </svg>
  ),
};

const Reviews = () => {
  const [activeTab, setActiveTab] = useState<string>("All Reviews");

  const filtered = activeTab === "All Reviews"
    ? reviewCards
    : reviewCards.filter(r => r.platform === activeTab);

  return (
    <section id="reviews" className="bg-background section-padding">
      <div className="container-custom">

        {/* Title */}
        <motion.h2
          className="text-center text-3xl md:text-5xl font-black uppercase mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          What Our Customers <span className="text-primary">Say</span>
        </motion.h2>

        {/* Platform Tabs */}
        <motion.div
          className="flex flex-wrap justify-center items-center gap-4 md:gap-8 mb-8 border-b border-border pb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {platforms.map(platform => (
            <button
              key={platform}
              onClick={() => setActiveTab(platform)}
              className={`flex items-center gap-2 text-sm font-semibold pb-1 transition-colors ${
                activeTab === platform
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {platform !== "All Reviews" && platformIcons[platform]}
              <span>{platform}</span>
              <span className="text-xs text-muted-foreground">
                {platform === "All Reviews" ? "5.0" : platform === "Google" ? "5.0" : "5.0"}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Overall Rating Row */}
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div>
            <p className="text-sm text-muted-foreground mb-1">Overall rating</p>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-black">5.0</span>
              <div className="flex text-yellow-500">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <span className="text-xs text-muted-foreground">Based on {reviewCards.length} reviews</span>
            </div>
          </div>
          <a
            href="#contact"
            className="bg-primary text-primary-foreground px-6 py-2 text-sm font-bold uppercase rounded-full hover:bg-primary/90 transition-colors"
          >
            Write a Review
          </a>
        </motion.div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filtered.map((review, i) => (
            <motion.div
              key={i}
              className={`bg-muted border-l-4 border-primary p-6 md:p-8 hover:-translate-y-2 transition-all duration-300 shadow-md hover:shadow-[0_20px_50px_-12px_hsl(var(--primary)/0.3)] ${
                i >= 3 ? 'hidden md:block' : ''
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              {/* Header: Avatar + Name + Stars */}
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover"
                  loading="lazy"
                  width={44}
                  height={44}
                />
                <div>
                  <h4 className="font-bold text-sm">{review.name}</h4>
                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-500">
                      {[1,2,3,4,5].map((_, r) => (
                        <Star key={r} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-3 md:mb-4">
                {review.text}
              </p>

              {/* Footer: Posted on platform */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Posted on</span>
                {platformIcons[review.platform]}
                <span className="font-semibold text-primary">{review.platform}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
