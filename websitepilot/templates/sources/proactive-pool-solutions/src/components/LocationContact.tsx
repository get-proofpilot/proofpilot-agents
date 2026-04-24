import React, { useState } from 'react';
import { Button } from './UI';
import { Phone, Mail, MapPin, Facebook, Instagram, CheckCircle, ArrowRight } from 'lucide-react';

export const LocationContact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  const InputBase = ({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input 
      className={`w-full p-4 md:p-5 bg-white border border-slate-200 rounded-lg text-slate-900 text-base font-semibold outline-none focus:border-[#06b6d4] focus:ring-1 focus:ring-[#06b6d4] transition-all placeholder:text-slate-400 ${className}`}
      {...props}
    />
  );

  return (
    <section id="contact" className="py-16 md:py-32 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 lg:gap-28 items-start">
        
        {/* Left Column: Brand & Info */}
        <div className="space-y-10 md:space-y-14 pt-0 md:pt-6">
            {/* Header Group */}
            <div>
                <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                    <div className="bg-[#06b6d4] p-2 rounded text-white">
                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="md:w-6 md:h-6"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </div>
                    <span className="font-black text-lg md:text-xl tracking-tight text-slate-900">Contact Us</span>
                </div>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-slate-900 leading-[0.95] tracking-tight mb-6 md:mb-10">
                   Let's Bring Your<br/>Pool Vision To Life
                </h2>
                <p className="text-slate-700 text-lg md:text-xl font-medium max-w-xl leading-relaxed">
                   Ready to start enjoying your dream pool without the hassle? Reach out today to schedule your consultation with our expert team.
                </p>
            </div>

            {/* Contact Details */}
            <div>
                <h3 className="font-black text-2xl md:text-3xl text-slate-900 mb-6 md:mb-10 tracking-tight">Contact</h3>
                <div className="space-y-6 md:space-y-8">
                   <a href="mailto:customerservice@proactivepoolsolutions.io" className="flex items-center gap-4 md:gap-5 group w-fit">
                      <Mail className="text-[#06b6d4] md:w-7 md:h-7" size={24} strokeWidth={2.5} />
                      <span className="text-slate-800 font-bold text-lg md:text-xl group-hover:text-[#06b6d4] transition-colors truncate max-w-[300px] sm:max-w-full">customerservice@proactivepoolsolutions.io</span>
                   </a>
                   <a href="tel:919-555-0199" className="flex items-center gap-4 md:gap-5 group w-fit">
                      <Phone className="text-[#06b6d4] md:w-7 md:h-7" size={24} strokeWidth={2.5} />
                      <span className="text-slate-800 font-bold text-lg md:text-xl group-hover:text-[#06b6d4] transition-colors">(919) 555-0199</span>
                   </a>
                </div>
            </div>

            {/* Offices */}
            <div>
                <h3 className="font-black text-2xl md:text-3xl text-slate-900 mb-6 md:mb-10 tracking-tight">Our Base</h3>
                <div className="flex items-start gap-4 md:gap-5">
                   <MapPin className="text-[#06b6d4] mt-1 shrink-0 md:w-7 md:h-7" size={24} strokeWidth={2.5} />
                   <span className="text-slate-800 font-bold text-lg md:text-xl">
                      Wendell, NC 27591<br/>
                      <span className="text-sm md:text-base text-slate-500 font-medium">Serving the Greater Raleigh Area</span>
                   </span>
                </div>
            </div>

            {/* Area We Serve */}
            <div>
                <h3 className="font-black text-2xl md:text-3xl text-slate-900 mb-6 md:mb-10 tracking-tight">Area We Serve</h3>
                 <div className="flex items-start gap-4 md:gap-5 mb-4">
                   <MapPin className="text-[#06b6d4] mt-1 shrink-0 md:w-7 md:h-7" size={24} strokeWidth={2.5} />
                   <span className="text-slate-800 font-bold text-lg md:text-xl">Raleigh, Wake Forest, Cary</span>
                </div>
                 <div className="flex items-start gap-4 md:gap-5">
                   <MapPin className="text-[#06b6d4] mt-1 shrink-0 md:w-7 md:h-7" size={24} strokeWidth={2.5} />
                   <span className="text-slate-800 font-bold text-lg md:text-xl">Wendell, Knightdale, Zebulon</span>
                </div>
            </div>

             {/* Socials */}
             <div>
                <h3 className="font-black text-2xl md:text-3xl text-slate-900 mb-6 md:mb-10 tracking-tight">Find Us On</h3>
                <div className="flex gap-4 md:gap-5">
                   <a href="#" className="w-12 h-12 md:w-14 md:h-14 bg-[#06b6d4] text-white rounded-full flex items-center justify-center hover:bg-[#0891b2] hover:-translate-y-1 transition-all shadow-lg shadow-cyan-200">
                       <Instagram size={24} className="md:w-7 md:h-7" />
                   </a>
                    <a href="#" className="w-12 h-12 md:w-14 md:h-14 bg-[#06b6d4] text-white rounded-full flex items-center justify-center hover:bg-[#0891b2] hover:-translate-y-1 transition-all shadow-lg shadow-cyan-200">
                       <Facebook size={24} className="md:w-7 md:h-7" />
                   </a>
                </div>
             </div>
        </div>

        {/* Right Column: Form Card */}
        <div className="bg-white p-6 md:p-12 rounded-2xl md:rounded-[2rem] shadow-[0_25px_80px_-20px_rgba(0,0,0,0.1)] border border-[#06b6d4] relative z-10">
           
           <div className="mb-6 md:mb-10 pb-6 md:pb-10 border-b border-slate-100">
              <h3 className="font-black text-2xl md:text-3xl text-slate-900">Contact Details</h3>
              <p className="text-slate-500 text-sm md:text-base mt-2 md:mt-3 font-medium">Fill out the form below and we'll get back to you within 24 hours.</p>
           </div>

           {status === 'success' ? (
              <div className="flex flex-col items-center justify-center text-center py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="w-28 h-28 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-8 shadow-sm">
                      <CheckCircle size={56} strokeWidth={3} />
                  </div>
                  <h4 className="text-4xl font-black text-slate-900 mb-6">Message Sent!</h4>
                  <p className="text-slate-700 font-medium text-lg max-w-xs mx-auto mb-10">
                      Thank you for reaching out. We have received your message and will contact you shortly.
                  </p>
                  <Button variant="outline" onClick={() => setStatus('idle')} className="px-8 py-4 text-lg">Send Another Message</Button>
              </div>
           ) : (
               <form onSubmit={handleSubmit} className={`space-y-4 md:space-y-6 transition-opacity duration-300 ${status === 'submitting' ? 'opacity-50 pointer-events-none' : ''}`}>
                  
                  {/* Name Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="space-y-2">
                          <InputBase required placeholder="First Name" />
                      </div>
                      <div className="space-y-2">
                          <InputBase required placeholder="Last Name" />
                      </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <InputBase required type="email" placeholder="Email Address" />
                      <InputBase required type="tel" placeholder="Phone Number" />
                  </div>

                  {/* Details Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <InputBase required placeholder="ZIP Code" />
                      <div className="relative">
                         <select className="w-full p-4 md:p-5 bg-white border border-slate-200 rounded-lg text-slate-700 text-base font-semibold outline-none focus:border-[#06b6d4] focus:ring-1 focus:ring-[#06b6d4] appearance-none cursor-pointer" defaultValue="">
                            <option value="" disabled>Interested Service</option>
                            <option value="weekly">Weekly Maintenance</option>
                            <option value="biweekly">Bi-Weekly Maintenance</option>
                            <option value="green">Green-to-Clean</option>
                            <option value="repair">Equipment Repair</option>
                            <option value="inspection">Pool Inspection</option>
                            <option value="other">Other</option>
                         </select>
                         <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                             <ArrowRight size={16} className="rotate-90"/>
                         </div>
                      </div>
                  </div>

                  {/* Message Box */}
                   <div className="pt-2">
                      <textarea 
                        required 
                        rows={4} 
                        placeholder="Tell us about your pool, current issues, or what specific package you're interested in..." 
                        className="w-full p-4 md:p-5 bg-white border border-slate-200 rounded-lg text-slate-900 text-base font-medium outline-none focus:border-[#06b6d4] focus:ring-1 focus:ring-[#06b6d4] resize-none placeholder:text-slate-400"
                      ></textarea>
                   </div>

                  {/* Marketing Consent Checkbox */}
                  <div className="flex items-start gap-4 pt-2 md:pt-4">
                      <div className="relative flex items-center mt-0.5">
                          <input type="checkbox" id="email-consent" className="peer h-5 w-5 md:h-6 md:w-6 cursor-pointer appearance-none rounded border border-slate-300 shadow-sm transition-all checked:border-[#06b6d4] checked:bg-[#06b6d4] hover:border-[#06b6d4]" defaultChecked />
                          <CheckCircle className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100" size={12} strokeWidth={4} />
                      </div>
                      <label htmlFor="email-consent" className="text-xs md:text-sm text-slate-500 leading-relaxed cursor-pointer select-none font-medium">
                          I agree to receive marketing emails and promotions. You can unsubscribe at any time.
                      </label>
                  </div>

                  <Button type="submit" className="w-full py-5 md:py-6 text-lg md:text-xl font-black shadow-xl hover:shadow-2xl mt-4" disabled={status === 'submitting'}>
                      {status === 'submitting' ? 'Sending...' : 'Submit Request'}
                  </Button>

               </form>
           )}
        </div>
      </div>
    </section>
  );
};