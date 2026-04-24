import React, { useEffect, useState, useRef } from 'react';

const stats = [
  { value: 50000, suffix: "+", label: "Windshields Replaced" },
  { value: 10, suffix: "+", label: "Years in Arizona" },
  { value: 15, suffix: "+", label: "Cities Served" },
  { value: 100, suffix: "%", label: "Satisfaction Rate" }
];

const useCountUp = (end: number, duration: number = 2000, startOnView: boolean = true) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView) {
      setHasStarted(true);
    }
  }, [startOnView]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, hasStarted]);

  return { count, ref };
};

export const Statistics: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-primary relative overflow-hidden grunge-overlay-dark">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
            Arizona's Trusted Auto Glass Experts
          </h2>
          <p className="text-white/80 text-lg font-medium">The numbers speak for themselves</p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, idx) => {
            const { count, ref } = useCountUp(stat.value);
            return (
              <div key={idx} ref={ref} className="text-center">
                <div className="text-5xl md:text-7xl font-black text-white tracking-tight mb-2">
                  {count.toLocaleString()}{stat.suffix}
                </div>
                <div className="text-white/70 font-bold text-sm md:text-base uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};