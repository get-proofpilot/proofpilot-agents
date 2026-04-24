import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import QuickQuoteForm from './QuickQuoteForm';

import satisfactionIcon from '@/assets/icon-satisfaction.png';
import onTimeIcon from '@/assets/icon-on-time.png';
import freeEstimatesIcon from '@/assets/icon-free-estimates.png';
import jobsDoneIcon from '@/assets/icon-jobs-done.png';

const SatisfactionIcon = () => (
  <img src={satisfactionIcon} alt="" className="w-20 h-20 invert mix-blend-screen" aria-hidden="true" />
);

const OnTimeIcon = () => (
  <img src={onTimeIcon} alt="" className="w-20 h-20 invert mix-blend-screen" aria-hidden="true" />
);

const FreeEstimatesIcon = () => (
  <img src={freeEstimatesIcon} alt="" className="w-20 h-20 invert mix-blend-screen" aria-hidden="true" />
);

const JobsDoneIcon = () => (
  <img src={jobsDoneIcon} alt="" className="w-20 h-20 invert mix-blend-screen" aria-hidden="true" />
);

const Hero = () => {
  const trustBadges = [
    { icon: SatisfactionIcon, label: 'Satisfaction Guaranteed' },
    { icon: OnTimeIcon, label: 'On-Time Guarantee' },
    { icon: FreeEstimatesIcon, label: 'Free Estimates' },
    { icon: JobsDoneIcon, label: '500+ Jobs Done' },
  ];

  return (
    <section className="relative">
      {/* Main Hero Area */}
      <div className="relative min-h-[800px] lg:min-h-screen bg-foreground overflow-hidden flex items-center pt-28 pb-20">
        {/* Video Collage Background */}
        <div className="absolute inset-0 z-0">
          {/* Single video on mobile */}
          <div className="absolute inset-0 md:hidden">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/videos/hero-1.mp4" type="video/mp4" />
            </video>
          </div>
          {/* 3-column video collage on tablet+ */}
          <div className="absolute inset-0 hidden md:grid grid-cols-3 gap-0">
            {['/videos/hero-1.mp4', '/videos/hero-2.mp4', '/videos/hero-3.mp4'].map((src, i) => (
              <div key={i} className="relative overflow-hidden">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src={src} type="video/mp4" />
                </video>
              </div>
            ))}
          </div>
          {/* Dark overlay - lighter to show more video */}
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/80 to-foreground/60" />
        </div>
        
        <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div 
            className="lg:col-span-7 text-background space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase leading-[0.9] tracking-tight">
              Arizona's Most<br/>
              <span className="text-primary">Reliable Demo &</span><br/>
              Dirt Work Contractor
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl text-background font-semibold max-w-2xl leading-relaxed">
              500+ projects completed. 1M+ tons removed. 3 generations of grit. Serving Pinal & Maricopa Counties with integrity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a href="tel:4801234567" className="btn-primary text-xl md:text-2xl px-10 py-5 font-black">
                Call (480) 123-4567
              </a>
            </div>

            {/* Review Platform Badges */}
            <div className="flex flex-col gap-3 pt-4">
              <div className="flex flex-wrap items-center gap-3">
                {/* Google Reviews */}
                <a href="https://www.google.com/maps/place/Rocking+S+Hauling" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-background/10 backdrop-blur-sm border border-background/20 rounded-full px-5 py-2.5 hover:bg-background/20 transition-colors cursor-pointer">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-sm font-bold text-background">5.0</span>
                  <div className="flex text-yellow-400">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                  </div>
                  <span className="text-xs text-background/70">(40)</span>
                </a>

                {/* Facebook Reviews */}
                <a href="https://www.facebook.com/profile.php?id=61551865153249" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-background/10 backdrop-blur-sm border border-background/20 rounded-full px-5 py-2.5 hover:bg-background/20 transition-colors cursor-pointer">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                    <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="text-sm font-bold text-background">5.0</span>
                  <div className="flex text-yellow-400">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                  </div>
                  <span className="text-xs text-background/70">(29)</span>
                </a>

                {/* Instagram */}
                <a href="https://www.instagram.com/rocking_s_hauling" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-background/10 backdrop-blur-sm border border-background/20 rounded-full px-5 py-2.5 hover:bg-background/20 transition-colors cursor-pointer">
                  <svg viewBox="0 0 132 132" className="w-5 h-5" aria-hidden="true">
                    <defs>
                      <radialGradient id="ig-grad-1" cx="25%" cy="105%" r="150%">
                        <stop offset="0%" stopColor="#fdf497" />
                        <stop offset="5%" stopColor="#fdf497" />
                        <stop offset="45%" stopColor="#fd5949" />
                        <stop offset="60%" stopColor="#d6249f" />
                        <stop offset="90%" stopColor="#285AEB" />
                      </radialGradient>
                    </defs>
                    <rect fill="url(#ig-grad-1)" x="0" y="0" rx="30" width="132" height="132" />
                    <rect fill="none" stroke="white" strokeWidth="8" x="16" y="16" rx="18" width="100" height="100" />
                    <circle fill="none" stroke="white" strokeWidth="8" cx="66" cy="66" r="27" />
                    <circle fill="white" cx="100" cy="32" r="8" />
                  </svg>
                  <span className="text-sm font-bold text-background">5.0</span>
                  <div className="flex text-yellow-400">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                  </div>
                  <span className="text-xs text-background/70">(12)</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Form */}
          <motion.div 
            className="lg:col-span-5"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-background p-8 lg:p-10 shadow-2xl border-t-8 border-primary relative">
              <div className="absolute -top-14 right-4 bg-foreground text-background px-6 py-3 font-black uppercase text-sm transform -skew-x-6 shadow-lg hidden md:block">
                <span className="skew-x-6 block">On-Site Quotes</span>
              </div>
              <div className="mb-8">
                <h3 className="text-3xl lg:text-4xl font-black uppercase text-foreground">Get Your Free Quote</h3>
                <p className="text-muted-foreground text-base mt-2">3 generations of grit. Fast response.</p>
              </div>
              <QuickQuoteForm />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Trust Badges Bar */}
      <div className="bg-primary border-b border-primary py-6">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {trustBadges.map((badge, index) => (
              <motion.div 
                key={badge.label}
                className="flex flex-col items-center text-center gap-4 opacity-90 hover:opacity-100 transition-opacity"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <badge.icon />
                <span className="text-sm font-black uppercase tracking-wider text-primary-foreground">{badge.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
