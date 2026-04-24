import React, { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    slidesToScroll: 1
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const testimonials = [
    {
      name: "Jessica Morton",
      timeAgo: "1 week ago",
      platform: "Google",
      rating: 5,
      text: "Keystone was a lifesaver after our home flooded. Professional, thorough, and incredibly kind...",
      avatar: "https://api.builder.io/api/v1/image/assets/522bc5fdb710438c8b4d7f988c1b02e8/1c03abb45818ec17230261e1626a6ebae6164640?placeholderIfAbsent=true"
    },
    {
      name: "David Harper",
      timeAgo: "2 weeks ago",
      platform: "Google",
      rating: 5,
      text: "After storm damage, Keystone restored our home efficiently. Impressed by their professionalism...",
      avatar: "https://api.builder.io/api/v1/image/assets/522bc5fdb710438c8b4d7f988c1b02e8/94bbc531579044f8297098b41ef5f79aaef3d875?placeholderIfAbsent=true"
    },
    {
      name: "Laura Thompson",
      timeAgo: "3 weeks ago",
      platform: "Google",
      rating: 5,
      text: "Exceeded expectations during a stressful time. Punctual, caring, and skilled team...",
      avatar: "https://api.builder.io/api/v1/image/assets/522bc5fdb710438c8b4d7f988c1b02e8/b73e1842c00ff429cc1e98d6a384aa2bbd49b6be?placeholderIfAbsent=true"
    },
    {
      name: "Michael Anderson",
      timeAgo: "1 month ago",
      platform: "Google",
      rating: 5,
      text: "Keystone Restoration was very professional and easy to work with. Quality service from start to finish...",
      avatar: "https://api.builder.io/api/v1/image/assets/522bc5fdb710438c8b4d7f988c1b02e8/2f2d5a84d856bc49dfb073636e07d590000932b2?placeholderIfAbsent=true"
    }
  ];

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="flex w-full flex-col px-6 py-20 max-md:px-4 bg-white">
      <p className="text-primary text-sm font-bold leading-none tracking-widest uppercase self-center mt-20 max-md:mt-10">
        What They Say
      </p>
      <h2 className="text-foreground text-[48px] font-black leading-tight text-center self-center mt-8 max-md:max-w-full max-md:text-[36px]">
        Hear From Our Restored Clients
      </h2>
      <div className="self-center flex w-[680px] max-w-full items-center justify-center text-base text-foreground font-normal text-center leading-7 mt-8">
        <p>Read reviews from <span className="text-primary font-semibold">satisfied customers</span> throughout Salt Lake City.</p>
      </div>
      <p className="text-foreground text-base font-normal leading-7 text-center self-center mt-3 max-md:max-w-full">
        When your restoration is complete, we hope you'll describe your experience with Keystone Restoration in one word: EXCELLENT! Serving Salt Lake City, Sandy, and surrounding Utah communities, we invite you to contact our restoration team today for immediate assistance—available 24/7 for emergencies.
      </p>

      {/* Carousel Container */}
      <div className="relative mt-[40px] max-md:mt-10">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-5">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-2.5">
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={scrollPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white border-2 border-primary text-primary w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-primary hover:text-white transition-all duration-300 z-10 max-md:hidden"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white border-2 border-primary text-primary w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-primary hover:text-white transition-all duration-300 z-10 max-md:hidden"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="self-center flex items-stretch gap-3 mt-[60px] mb-0 max-md:mt-10">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`flex w-3 h-3 shrink-0 rounded-full transition-all duration-300 ${
              selectedIndex === index ? 'bg-primary w-8' : 'bg-muted'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: any }) => {
  return (
    <div className="bg-primary/95 backdrop-blur-sm flex flex-col items-stretch px-6 py-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:bg-primary border border-primary/20 h-full">
      <div className="flex gap-3">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="aspect-square object-cover w-12 h-12 rounded-full shrink-0"
        />
        <div className="flex flex-col flex-1">
          <div className="flex items-center gap-2 text-base text-white font-semibold">
            <span className="flex-1">{testimonial.name}</span>
            <img
              src="https://api.builder.io/api/v1/image/assets/522bc5fdb710438c8b4d7f988c1b02e8/02b20d1896cb08055a931f9d7989a02a88b006e0?placeholderIfAbsent=true"
              alt="Verified"
              className="w-4 h-4"
            />
          </div>
          <div className="flex items-center gap-1 text-xs text-white/70 mt-1">
            <span>{testimonial.timeAgo} on </span>
            <img
              src="https://api.builder.io/api/v1/image/assets/522bc5fdb710438c8b4d7f988c1b02e8/017b60879295f5615101a922a02299d76db2cc10?placeholderIfAbsent=true"
              alt={testimonial.platform}
              className="h-3"
            />
          </div>
        </div>
      </div>
      <img
        src="https://api.builder.io/api/v1/image/assets/522bc5fdb710438c8b4d7f988c1b02e8/d989545f7b1a53733c5f75598da9a1e60e93b0bf?placeholderIfAbsent=true"
        alt="5 star rating"
        className="w-24 mt-4"
      />
      <p className="text-white text-base font-normal leading-relaxed mt-3">
        {testimonial.text}
      </p>
      <button className="text-white/70 text-sm font-normal mt-2 text-left hover:text-white transition-colors">
        Read more
      </button>
    </div>
  );
};

export default Testimonials;
