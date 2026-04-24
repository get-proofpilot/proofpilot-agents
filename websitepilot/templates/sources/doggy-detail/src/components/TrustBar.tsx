import React from 'react';

const trustLogos = [
  { name: "Yelp", text: "YELP" },
  { name: "Google", text: "Google" },
  { name: "Nextdoor", text: "nextdoor" },
  { name: "Instagram", text: "Instagram" },
];

export const TrustBar: React.FC = () => {
  return (
    <div className="bg-foreground py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          <span className="text-white/40 text-xs uppercase tracking-widest font-oswald hidden md:block">Trusted By Pet Parents On</span>
          {trustLogos.map((logo, index) => (
            <span 
              key={index}
              className="text-white/60 hover:text-white transition-colors text-lg md:text-xl font-oswald tracking-wide"
            >
              {logo.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
