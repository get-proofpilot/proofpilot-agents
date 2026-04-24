import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const WhyChooseUs = () => {
  const values = [
    {
      title: 'Integrity',
      description: "We believe in doing what's right—every single time. Your trust means everything to us, so we approach every restoration with complete honesty and transparency. When we give you our word, you can count on it.",
      featured: true
    },
    {
      title: 'Compassion',
      description: "We know how overwhelming water damage can be. That's why our team treats every home like it's our own, every family like they're part of ours. Your peace of mind is our mission.",
      featured: false
    },
    {
      title: 'Excellence',
      description: "Good enough isn't good enough for us. We're dedicated to delivering the highest quality restoration services, constantly improving to exceed your expectations every time.",
      featured: false
    },
    {
      title: 'Responsiveness',
      description: "When disaster strikes, we move fast. Our team is ready 24/7 to answer your call, minimize damage, and start getting your life back to normal—because we know every minute matters.",
      featured: false
    }
  ];

  const icons = [
    <svg key="shield" className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>,
    <svg key="heart" className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>,
    <svg key="award" className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>,
    <svg key="clock" className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ];

  return (
    <section className="self-stretch flex w-full flex-col items-center justify-center px-6 py-20 max-md:px-4 max-md:py-12 bg-foreground text-white">
      <div className="w-full max-w-[1320px]">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <p className="text-primary text-sm font-bold uppercase tracking-widest mb-4">
            Why Choose Us
          </p>
          <h2 className="text-[48px] font-black leading-tight max-w-[900px] max-md:text-[36px] text-white">
            Restoration Rooted in Trust, Built{' '}
            <span className="text-primary">with Heart</span>
          </h2>
          <p className="text-white/80 text-lg leading-relaxed mt-6 max-w-[800px]">
            We're more than a restoration company—we're your neighbors, committed to protecting what matters most to you. Every project reflects our dedication to serving you with integrity, compassion, and unwavering excellence.
          </p>
        </div>

        {/* Uniform Single Row - 4 Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {values.map((value, index) => {
            const isFeatured = index === 0;
            return (
              <div
                key={index}
                className={`rounded-2xl p-7 flex flex-col justify-between min-h-[320px] group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${
                  isFeatured 
                    ? 'bg-primary text-white' 
                    : 'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15'
                }`}
              >
                <div>
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-5 ${
                    isFeatured 
                      ? 'bg-white/20 backdrop-blur-sm' 
                      : 'bg-primary/10 group-hover:bg-primary/20'
                  } transition-colors`}>
                    <div className={isFeatured ? 'text-white' : 'text-primary'}>
                      {icons[index]}
                    </div>
                  </div>
                  <h3 className={`text-[22px] font-black mb-4 leading-tight tracking-tight ${
                    isFeatured ? 'text-white' : 'text-white'
                  }`}>
                    {value.title}
                  </h3>
                  <p className={`text-base leading-relaxed ${
                    isFeatured ? 'text-white/95' : 'text-white/80'
                  }`}>
                    {value.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-12">
          <button className="bg-primary text-white font-bold text-base px-8 py-4 rounded-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-xl hover:-translate-y-0.5 hover:scale-105 flex items-center gap-2">
            Book a Free Consultation
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
