import React, { useState } from 'react';
import { Button } from './UI';
import { User, Phone, Mail, ArrowRight, ArrowLeft, CheckCircle, Droplets, Shield, AlertTriangle, Trees } from 'lucide-react';

interface QuizData {
  poolSize: number;
  isScreened: boolean | null;
  condition: 'clear' | 'cloudy' | 'green' | null;
  name: string;
  phone: string;
  email: string;
}

export const InspectionForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<QuizData>({
    poolSize: 20000,
    isScreened: null,
    condition: null,
    name: '',
    phone: '',
    email: ''
  });

  const updateData = (key: keyof QuizData, value: any) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  return (
    <section className="py-16 md:py-32 bg-gradient-to-br from-white to-slate-50 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4">
         <div className="text-center mb-10 md:mb-14">
            <span className="bg-[#06b6d4] text-white px-4 py-1.5 text-sm font-heading font-bold rounded mb-6 inline-block tracking-wide shadow-sm">Quick Response</span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
                Get Your Free Quote in <span className="text-[#06b6d4]">60 Seconds</span>
            </h2>
            <p className="text-slate-600 font-bold text-lg md:text-xl max-w-2xl mx-auto">Answer a few quick questions to find your perfect pool plan.</p>
         </div>

         <div className="bg-white rounded-3xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.2)] md:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] border-2 md:border-4 border-white overflow-hidden min-h-[400px] md:min-h-[500px] relative flex flex-col">
            
            {step < 5 && (
                <div className="w-full h-2 md:h-3 bg-slate-100">
                    <div 
                        className="h-full bg-[#06b6d4] transition-all duration-500 ease-out"
                        style={{ width: `${(step / 4) * 100}%` }}
                    ></div>
                </div>
            )}

            <div className="flex-1 p-6 md:p-12 flex flex-col justify-center">

                {step === 1 && (
                    <div className="text-center animate-fade-in">
                        <h3 className="text-2xl md:text-3xl font-black text-center mb-3 text-slate-900">What's your pool size?</h3>
                        <p className="text-slate-600 font-medium text-base md:text-lg mb-8 md:mb-10">Estimated gallons help us calculate chemical needs.</p>
                        
                        <div className="max-w-md mx-auto mb-8 md:mb-12">
                            <input 
                                type="range" 
                                min="10000" 
                                max="40000" 
                                step="1000"
                                value={data.poolSize}
                                onChange={(e) => updateData('poolSize', parseInt(e.target.value))}
                                className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer slider"
                                style={{
                                    background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${((data.poolSize - 10000) / 30000) * 100}%, #f1f5f9 ${((data.poolSize - 10000) / 30000) * 100}%, #f1f5f9 100%)`
                                }}
                            />
                            <div className="text-5xl md:text-6xl font-black text-[#06b6d4] mt-6 tracking-tight">
                                {data.poolSize.toLocaleString()} <span className="text-2xl md:text-3xl font-bold text-slate-400">gal</span>
                            </div>
                        </div>

                        <Button size="lg" onClick={handleNext}>
                            Continue <ArrowRight size={20} />
                        </Button>
                    </div>
                )}

                {step === 2 && (
                    <div className="text-center animate-fade-in">
                        <h3 className="text-2xl md:text-3xl font-black text-center mb-3 text-slate-900">Is your pool screened?</h3>
                        <p className="text-slate-600 font-medium text-base md:text-lg mb-8 md:mb-10">Screened pools require less maintenance.</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12 max-w-2xl mx-auto">
                            <button 
                                onClick={() => { updateData('isScreened', true); handleNext(); }}
                                className="group border-[3px] border-slate-100 p-6 md:p-10 rounded-2xl hover:border-[#06b6d4] hover:shadow-2xl transition-all flex items-center md:block gap-4 md:gap-0"
                            >
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-[#06b6d4]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#06b6d4] transition-colors shrink-0">
                                    <Shield className="text-[#06b6d4] group-hover:text-white transition-colors" size={32} />
                                </div>
                                <div className="flex-1 md:flex-none text-left md:text-center">
                                    <h4 className="text-xl md:text-2xl font-black text-slate-900 mb-1 md:mb-2">Yes, It's Screened</h4>
                                    <p className="text-slate-500 font-semibold text-sm md:text-base">Protected from debris</p>
                                </div>
                            </button>

                            <button 
                                onClick={() => { updateData('isScreened', false); handleNext(); }}
                                className="group border-[3px] border-slate-100 p-6 md:p-10 rounded-2xl hover:border-[#06b6d4] hover:shadow-2xl transition-all flex items-center md:block gap-4 md:gap-0"
                            >
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-[#06b6d4]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#06b6d4] transition-colors shrink-0">
                                    <Trees className="text-[#06b6d4] group-hover:text-white transition-colors" size={32} />
                                </div>
                                <div className="flex-1 md:flex-none text-left md:text-center">
                                    <h4 className="text-xl md:text-2xl font-black text-slate-900 mb-1 md:mb-2">No, Open Pool</h4>
                                    <p className="text-slate-500 font-semibold text-sm md:text-base">Exposed to elements</p>
                                </div>
                            </button>
                        </div>

                        <Button variant="outline" onClick={handlePrev}>
                            <ArrowLeft size={20} /> Back
                        </Button>
                    </div>
                )}

                {step === 3 && (
                    <div className="text-center animate-fade-in">
                        <h3 className="text-2xl md:text-3xl font-black text-center mb-3 text-slate-900">How's the water look?</h3>
                        <p className="text-slate-600 font-medium text-base md:text-lg mb-8 md:mb-10">Be honest, we don't judge!</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
                            <button 
                                onClick={() => { updateData('condition', 'clear'); handleNext(); }}
                                className="group border-[3px] border-slate-100 p-6 md:p-8 rounded-2xl hover:border-[#06b6d4] hover:shadow-2xl transition-all flex items-center md:block gap-4 md:gap-0"
                            >
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-[#06b6d4]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#06b6d4] transition-colors shrink-0">
                                    <Droplets className="text-[#06b6d4] group-hover:text-white transition-colors" size={32} />
                                </div>
                                <div className="flex-1 md:flex-none text-left md:text-center">
                                    <h4 className="text-xl md:text-2xl font-black text-slate-900 mb-1 md:mb-2">Crystal Clear</h4>
                                    <p className="text-slate-500 font-semibold text-sm md:text-base">Just needs routine care</p>
                                </div>
                            </button>

                            <button 
                                onClick={() => { updateData('condition', 'cloudy'); handleNext(); }}
                                className="group border-[3px] border-slate-100 p-6 md:p-8 rounded-2xl hover:border-[#06b6d4] hover:shadow-2xl transition-all flex items-center md:block gap-4 md:gap-0"
                            >
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-[#06b6d4]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#06b6d4] transition-colors shrink-0">
                                    <AlertTriangle className="text-[#06b6d4] group-hover:text-white transition-colors" size={32} />
                                </div>
                                <div className="flex-1 md:flex-none text-left md:text-center">
                                    <h4 className="text-xl md:text-2xl font-black text-slate-900 mb-1 md:mb-2">Cloudy / Off</h4>
                                    <p className="text-slate-500 font-semibold text-sm md:text-base">Needs chemical balance</p>
                                </div>
                            </button>

                            <button 
                                onClick={() => { updateData('condition', 'green'); handleNext(); }}
                                className="group border-[3px] border-slate-100 p-6 md:p-8 rounded-2xl hover:border-[#06b6d4] hover:shadow-2xl transition-all flex items-center md:block gap-4 md:gap-0"
                            >
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-[#06b6d4]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#06b6d4] transition-colors shrink-0">
                                    <Trees className="text-[#06b6d4] group-hover:text-white transition-colors" size={32} />
                                </div>
                                <div className="flex-1 md:flex-none text-left md:text-center">
                                    <h4 className="text-xl md:text-2xl font-black text-slate-900 mb-1 md:mb-2">Green Swamp</h4>
                                    <p className="text-slate-500 font-semibold text-sm md:text-base">Needs Green-to-Clean</p>
                                </div>
                            </button>
                        </div>

                        <Button variant="outline" onClick={handlePrev}>
                            <ArrowLeft size={20} /> Back
                        </Button>
                    </div>
                )}

                {step === 4 && (
                    <div className="animate-fade-in">
                        <h3 className="text-2xl md:text-3xl font-black text-center mb-3 text-slate-900">Almost there! Where do we send your quote?</h3>
                        <p className="text-slate-600 font-medium text-base md:text-lg mb-8 md:mb-10 text-center">We'll respond within 24 hours.</p>

                        <form className="space-y-4 md:space-y-5 max-w-xl mx-auto" onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
                            <div className="relative">
                                <User className="absolute left-4 md:left-5 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                                <input 
                                    type="text"
                                    placeholder="Full Name"
                                    value={data.name}
                                    onChange={(e) => updateData('name', e.target.value)}
                                    className="w-full pl-12 md:pl-14 pr-4 md:pr-5 py-4 md:py-5 bg-white border border-slate-200 rounded-lg text-slate-700 text-base font-semibold outline-none focus:border-[#06b6d4] focus:ring-1 focus:ring-[#06b6d4]"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <Phone className="absolute left-4 md:left-5 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                                <input 
                                    type="tel"
                                    placeholder="Phone Number"
                                    value={data.phone}
                                    onChange={(e) => updateData('phone', e.target.value)}
                                    className="w-full pl-12 md:pl-14 pr-4 md:pr-5 py-4 md:py-5 bg-white border border-slate-200 rounded-lg text-slate-700 text-base font-semibold outline-none focus:border-[#06b6d4] focus:ring-1 focus:ring-[#06b6d4]"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <Mail className="absolute left-4 md:left-5 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                                <input 
                                    type="email"
                                    placeholder="Email Address"
                                    value={data.email}
                                    onChange={(e) => updateData('email', e.target.value)}
                                    className="w-full pl-12 md:pl-14 pr-4 md:pr-5 py-4 md:py-5 bg-white border border-slate-200 rounded-lg text-slate-700 text-base font-semibold outline-none focus:border-[#06b6d4] focus:ring-1 focus:ring-[#06b6d4]"
                                    required
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4">
                                <Button type="button" variant="outline" onClick={handlePrev} className="flex-1">
                                    <ArrowLeft size={20} /> Back
                                </Button>
                                <Button type="submit" size="lg" className="flex-[2]">
                                    Get My Free Quote <ArrowRight size={20} />
                                </Button>
                            </div>
                        </form>
                    </div>
                )}

                {step === 5 && (
                    <div className="text-center animate-fade-in">
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-[#06b6d4] rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8">
                            <CheckCircle className="text-white" size={48} />
                        </div>
                        <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Quote Request Sent!</h3>
                        <p className="text-slate-600 font-bold text-lg md:text-xl mb-8 max-w-lg mx-auto">
                            Thank you! We'll review your pool details and send you a custom quote within 24 hours.
                        </p>
                        <Button onClick={() => setStep(1)}>
                            Start New Quote
                        </Button>
                    </div>
                )}

            </div>
         </div>
       </div>
    </section>
  );
};