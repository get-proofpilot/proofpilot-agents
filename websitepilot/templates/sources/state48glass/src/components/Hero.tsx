import React from 'react';
import { Button } from './UI';
import { Star, ArrowRight } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

export const Hero: React.FC = () => {
  return (
    <section className="bg-white pt-6 pb-12 md:pb-16 px-4 md:px-8">
      {/* Contained hero box with rounded corners */}
      <div className="relative max-w-[1400px] mx-auto rounded-3xl md:rounded-[2rem] overflow-hidden min-h-[500px] md:min-h-[600px] lg:min-h-[650px] flex items-center justify-center grunge-overlay-subtle">
        
        {/* Background Image with overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 md:px-12 py-16 md:py-20">
          
          {/* Google Reviews Badge */}
          <div className="flex justify-center mb-8">
            <div className="bg-slate-900/70 backdrop-blur-sm text-white rounded-full px-4 py-2 flex items-center gap-2.5 border border-white/10">
              <div className="flex text-yellow-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              {/* Google G Logo */}
              <svg viewBox="0 0 24 24" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-sm font-semibold">5/5 Rating From 100+ Reviews</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15] mb-6 tracking-tight">
            Arizona's Trusted Windshield Repair & Replacement Company
          </h1>
          
          {/* Subheadline */}
          <p className="text-base md:text-lg lg:text-xl text-white/80 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
            Our commitment to quality and customer satisfaction makes us the top choice for drivers across Phoenix and all of Arizona!
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-primary hover:bg-state48-blue-dark text-white text-base md:text-lg px-6 md:px-8 py-4 font-semibold"
            >
              Get a Free Estimate <ArrowRight size={20} strokeWidth={2.5} />
            </Button>
            <Button 
              size="lg" 
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-slate-900/80 backdrop-blur-sm border border-white/20 text-white hover:bg-slate-800 text-base md:text-lg px-6 md:px-8 py-4 font-semibold"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
