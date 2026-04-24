import React, { useState } from 'react';
import { PlaceholderImage } from './UI';
import { Star, ArrowLeft, ArrowRight, Quote, User, CheckCircle } from 'lucide-react';

const testimonials = [
  {
    text: "I needed a new windshield on my SUV. Due to the model I have it was a hard windshield to find. I talked with Rick and not only was he able to get the windshield but it was much more affordable than the dealership. Installation was fast and clean and my car is looking like new. Thanks State 48 Auto Glass!!",
    author: "Damon Lines",
    location: "Phoenix, AZ",
    platform: "google",
    icon: User
  },
  {
    text: "The replacement took about an hour and he did an amazing job. He explained the proper after-care for the windshield. Also, he gave me the check for the cash-back rebate before he left. I would definitely call them again. They also give you a lifetime chip warranty!",
    author: "Merilee Anderson",
    location: "Scottsdale, AZ",
    platform: "yelp",
    icon: User
  },
  {
    text: "Great service from start to finish! They handled my insurance claim and made the whole process so easy. The technician was professional and the windshield looks perfect. I love the warranty and the wiper blades for the life of the glass. Highly recommend!",
    author: "Michael O.",
    location: "Mesa, AZ",
    platform: "google",
    icon: User
  },
  {
    text: "Professional service, good communication, prompt response. No robots, real people. Showed up early and the cost was half of Safelite. They sealed a decent sized chip on my car perfectly. A+ service!",
    author: "Victor Ramirez",
    location: "Tempe, AZ",
    platform: "google",
    icon: User
  },
  {
    text: "Fast, affordable, and quality work. They came to my office and replaced my windshield while I was at work. Can't beat that convenience! The technician was courteous, respectful, timely, and very friendly. I'd give a higher rating than 5 if I could!",
    author: "Sarah Martinez",
    location: "Chandler, AZ",
    platform: "google",
    icon: User
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
    <section id="reviews" className="py-16 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="mb-12 md:mb-16">
            <span className="bg-primary text-white px-4 py-1.5 text-sm font-heading font-bold rounded mb-6 inline-block tracking-wide shadow-sm">Reviews</span>
            <h2 className="text-3xl md:text-6xl font-heading font-black text-slate-900 mb-6 md:mb-8 leading-tight tracking-tight">
              What Arizona Drivers Are Saying About <span className="text-primary">State 48 Glass</span>
            </h2>
            
            {/* Review Stats */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center">
                  <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1">
                    <span className="font-black text-slate-900">5.0</span>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" strokeWidth={0} />)}
                    </div>
                  </div>
                  <span className="text-slate-500 text-sm font-medium">Google Reviews</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FF1A1A] rounded-lg shadow-md flex items-center justify-center text-white font-black">
                  Y
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1">
                    <span className="font-black text-slate-900">5.0</span>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" strokeWidth={0} />)}
                    </div>
                  </div>
                  <span className="text-slate-500 text-sm font-medium">Yelp Reviews</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
                <CheckCircle className="text-green-500" size={18} />
                <span className="font-bold text-green-700 text-sm">BBB A+ Rated</span>
              </div>
            </div>
        </div>

        <div className="relative max-w-6xl mx-auto mt-12 md:mt-20 px-0 md:px-16">
           {/* External Nav Buttons */}
           <button 
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-primary border-2 border-slate-900 text-white rounded-full flex items-center justify-center hover:bg-state48-blue-dark shadow-brutal-sm transition-all active:translate-y-1 active:shadow-none z-20 hidden md:flex"
            >
              <ArrowLeft size={24} strokeWidth={3}/>
            </button>
            <button 
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-primary border-2 border-slate-900 text-white rounded-full flex items-center justify-center hover:bg-state48-blue-dark shadow-brutal-sm transition-all active:translate-y-1 active:shadow-none z-20 hidden md:flex"
           >
             <ArrowRight size={24} strokeWidth={3}/>
           </button>

           {/* Mobile Buttons */}
           <div className="flex md:hidden justify-center gap-6 mb-8">
             <button onClick={handlePrev} className="w-12 h-12 bg-primary border-2 border-slate-900 text-white rounded-full flex items-center justify-center shadow-brutal-sm active:translate-y-1 active:shadow-none">
               <ArrowLeft size={24} strokeWidth={3}/>
             </button>
             <button onClick={handleNext} className="w-12 h-12 bg-primary border-2 border-slate-900 text-white rounded-full flex items-center justify-center shadow-brutal-sm active:translate-y-1 active:shadow-none">
               <ArrowRight size={24} strokeWidth={3}/>
             </button>
           </div>

           {/* Card Container */}
           <div className="bg-white border-[3px] border-slate-900 rounded-2xl shadow-brutal md:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col md:flex-row min-h-[450px]">
             {/* Image Side */}
             <div className={`w-full md:w-5/12 h-64 md:h-auto relative transition-opacity duration-300 ${animating ? 'opacity-50' : 'opacity-100'}`}>
               <PlaceholderImage icon={currentTestimonial.icon} subLabel="Verified Customer" />
             </div>
             
             {/* Content Side */}
             <div className={`w-full md:w-7/12 p-8 md:p-14 text-left flex flex-col justify-center relative transition-all duration-300 transform ${animating ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>
               <div className="absolute top-10 right-10 hidden md:block text-slate-100">
                   <Quote size={80} fill="currentColor" />
               </div>
               
               {/* Platform Badge */}
               <div className="w-12 h-12 md:w-14 md:h-14 border border-slate-200 rounded-full flex items-center justify-center mb-6 md:mb-8 shadow-sm bg-white">
                 {currentTestimonial.platform === 'google' ? (
                   <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                     <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                     <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                     <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                     <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                   </svg>
                 ) : (
                   <span className="text-[#FF1A1A] font-black text-xl">Y</span>
                 )}
               </div>
               
               <p className="text-slate-900 font-medium text-lg md:text-xl leading-relaxed mb-8 md:mb-10">
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
               <span className="text-primary text-xs md:text-sm font-bold mt-2 flex items-center gap-1">
                 <CheckCircle size={14} /> Verified {currentTestimonial.platform === 'google' ? 'Google' : 'Yelp'} Review
               </span>
             </div>
           </div>
           
           {/* Pagination Dots */}
           <div className="flex justify-center gap-2 mt-8">
             {testimonials.map((_, idx) => (
               <button
                 key={idx}
                 onClick={() => setCurrentIndex(idx)}
                 className={`w-3 h-3 rounded-full transition-all ${idx === currentIndex ? 'bg-primary w-8' : 'bg-slate-300 hover:bg-slate-400'}`}
               />
             ))}
           </div>
        </div>
      </div>
    </section>
  );
};