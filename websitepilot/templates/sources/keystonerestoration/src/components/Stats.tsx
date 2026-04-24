import React from 'react';

const Stats = () => {
  const stats = [
    { number: '24', suffix: '/7', label: 'Emergency Response' },
    { number: '5', suffix: '-star', label: 'Rated' },
    { number: '60', suffix: 'min', label: 'Avg Response Time' },
    { number: '100', suffix: '%', label: 'Insurance Approved' }
  ];

  return (
    <section className="w-full max-w-[1058px] px-5 mt-20 max-md:mt-10 animate-fade-up">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center group hover-lift text-center">
            <div className="flex items-baseline justify-center gap-1 font-bold whitespace-nowrap">
              <span className="text-foreground text-[40px] leading-none max-md:text-[32px]">
                {stat.number}
              </span>
              <span className="text-primary text-[40px] leading-none max-md:text-[32px]">
                {stat.suffix}
              </span>
            </div>
            <p className="text-foreground text-base font-normal leading-relaxed mt-4 max-md:text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
