import React, { useState } from 'react';
import { SectionHeading, PlaceholderImage } from './UI';
import { Star, ArrowLeft, ArrowRight, Quote, User, Home } from 'lucide-react';

const testimonials = [
  {
    text: "ProActive Pool Solutions has been doing a great job for me for a very long time! Thank you for always showing up with a smile and letting me know any issues we are having with our pool. I highly recommend them to anyone in Raleigh!",
    author: "Logan Alexander",
    location: "Raleigh, NC",
    icon: Home
  },
  {
    text: "We've tried three different pool companies in Wake Forest and ProActive is by far the best. They are consistent, thorough, and their customer service is unmatched. My pool is always party-ready.",
    author: "Sarah Jenkins",
    location: "Wake Forest, NC",
    icon: User
  },
  {
    text: "I love that they don't rush. The technician actually tests everything and makes sure my water isn't just clear, but healthy. Truly a proactive company.",
    author: "Michael Ross",
    location: "Cary, NC",
    icon: Home
  }
];

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const handleNext = () => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setAnimating(false);
    }, 300);
  };

  const handlePrev = () => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setAnimating(false);
    }, 300);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="mb-12 md:mb-16">
            <span className="bg-[#06b6d4] text-white px-4 py-1.5 text-sm font-heading font-bold rounded mb-6 inline-block tracking-wide shadow-sm">Testimonials</span>
            <h2 className="text-3xl md:text-6xl font-heading font-black text-slate-900 mb-6 md:mb-8 leading-tight tracking-tight">
              Hear What Your Neighbors Are Saying About Our <span className="text-[#06b6d4]">Pool Services in Wendell, NC</span>
            </h2>
        </div>

        <div className="relative max-w-6xl mx-auto mt-12 md:mt-20 px-0 md:px-16">
           {/* External Nav Buttons */}
           <button 
             onClick={handlePrev}
             className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#06b6d4] border-2 border-slate-900 text-white rounded-full flex items-center justify-center hover:bg-cyan-400 shadow-brutal-sm transition-all active:translate-y-1 active:shadow-none z-20 hidden md:flex"
           >
             <ArrowLeft size={24} strokeWidth={3}/>
           </button>
           <button 
             onClick={handleNext}
             className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#06b6d4] border-2 border-slate-900 text-white rounded-full flex items-center justify-center hover:bg-cyan-400 shadow-brutal-sm transition-all active:translate-y-1 active:shadow-none z-20 hidden md:flex"
           >
             <ArrowRight size={24} strokeWidth={3}/>
           </button>

           {/* Mobile Buttons */}
           <div className="flex md:hidden justify-center gap-6 mb-8">
             <button onClick={handlePrev} className="w-12 h-12 bg-[#06b6d4] border-2 border-slate-900 text-white rounded-full flex items-center justify-center shadow-brutal-sm active:translate-y-1 active:shadow-none">
               <ArrowLeft size={24} strokeWidth={3}/>
             </button>
             <button onClick={handleNext} className="w-12 h-12 bg-[#06b6d4] border-2 border-slate-900 text-white rounded-full flex items-center justify-center shadow-brutal-sm active:translate-y-1 active:shadow-none">
               <ArrowRight size={24} strokeWidth={3}/>
             </button>
           </div>

           {/* Card Container */}
           <div className="bg-white border-[3px] border-slate-900 rounded-2xl shadow-brutal md:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col md:flex-row min-h-[450px]">
             {/* Image Side */}
             <div className={`w-full md:w-5/12 h-64 md:h-auto relative transition-opacity duration-300 ${animating ? 'opacity-50' : 'opacity-100'}`}>
               <PlaceholderImage icon={currentTestimonial.icon} subLabel="Verified Project" />
             </div>
             
             {/* Content Side */}
             <div className={`w-full md:w-7/12 p-8 md:p-14 text-left flex flex-col justify-center relative transition-all duration-300 transform ${animating ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>
               <div className="absolute top-10 right-10 hidden md:block text-slate-100">
                   <Quote size={80} fill="currentColor" />
               </div>
               
               <div className="w-12 h-12 md:w-14 md:h-14 border border-slate-200 rounded-full flex items-center justify-center mb-6 md:mb-8 shadow-sm bg-white">
                 <span className="font-bold text-xl flex items-center justify-center">
                    <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)"><path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/><path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/><path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.734 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/><path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.799 L -6.734 42.379 C -8.804 40.449 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/></g></svg>
                 </span>
               </div>
               
               <p className="text-slate-900 font-medium text-lg md:text-2xl leading-relaxed mb-8 md:mb-10">
                 "{currentTestimonial.text}"
               </p>
               
               <div className="flex items-center gap-4">
                   <div className="flex text-yellow-400 gap-1">
                     {[...Array(5)].map((_, i) => <Star key={i} size={20} className="md:w-6 md:h-6" fill="currentColor" strokeWidth={0} />)}
                   </div>
               </div>
               
               <div className="mt-6">
                   <span className="font-heading font-black text-slate-900 text-lg md:text-xl block md:inline">{currentTestimonial.author}</span>
                   <span className="text-slate-400 mx-2 hidden md:inline">-</span>
                   <span className="text-slate-600 text-sm md:text-base font-bold block md:inline mt-1 md:mt-0">{currentTestimonial.location}</span>
               </div>
               <a href="#" className="text-[#06b6d4] text-xs md:text-sm font-bold mt-2 hover:underline">Verified Review, Click Here</a>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
};