import React, { useState } from 'react';
import { Button } from './UI';
import { User, Phone, Mail, ArrowRight, ArrowLeft, CheckCircle, Car, Shield, AlertTriangle } from 'lucide-react';

interface QuoteData {
  damageType: 'chip' | 'crack' | 'replacement' | null;
  hasInsurance: boolean | null;
  vehicleInfo: string;
  name: string;
  phone: string;
  email: string;
}

export const InspectionForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<QuoteData>({
    damageType: null,
    hasInsurance: null,
    vehicleInfo: '',
    name: '',
    phone: '',
    email: ''
  });

  const updateData = (key: keyof QuoteData, value: any) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  return (
    <section className="py-16 md:py-32 bg-gradient-to-br from-white via-slate-50/50 to-state48-blue-light/30 relative overflow-hidden grain-overlay-light">
      <div className="max-w-5xl mx-auto px-4">
         <div className="text-center mb-10 md:mb-14">
            <span className="bg-primary text-white px-4 py-1.5 text-sm font-heading font-bold rounded mb-6 inline-block tracking-wide shadow-sm">Quick & Easy</span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
                Get Your Free Quote in <span className="text-primary">60 Seconds</span>
            </h2>
            <p className="text-slate-600 font-bold text-lg md:text-xl max-w-2xl mx-auto">Answer a few quick questions about your windshield damage.</p>
         </div>

         <div className="bg-white rounded-3xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.2)] md:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] border-2 md:border-4 border-white overflow-hidden min-h-[400px] md:min-h-[500px] relative flex flex-col">
            
            {step < 5 && (
                <div className="w-full h-2 md:h-3 bg-slate-100">
                    <div 
                        className="h-full bg-primary transition-all duration-500 ease-out"
                        style={{ width: `${(step / 4) * 100}%` }}
                    ></div>
                </div>
            )}

            <div className="flex-1 p-6 md:p-12 flex flex-col justify-center">

                {step === 1 && (
                    <div className="text-center animate-fade-in">
                        <h3 className="text-2xl md:text-3xl font-black text-center mb-3 text-slate-900">What type of damage do you have?</h3>
                        <p className="text-slate-600 font-medium text-base md:text-lg mb-8 md:mb-10">This helps us determine the best solution for you.</p>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
                            <button 
                                onClick={() => { updateData('damageType', 'chip'); handleNext(); }}
                                className="group border-[3px] border-slate-100 p-6 md:p-8 rounded-2xl hover:border-primary hover:shadow-2xl transition-all flex items-center md:block gap-4 md:gap-0"
                            >
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-state48-blue-light rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors shrink-0">
                                    <AlertTriangle className="text-primary group-hover:text-white transition-colors" size={32} />
                                </div>
                                <div className="flex-1 md:flex-none text-left md:text-center">
                                    <h4 className="text-xl md:text-2xl font-black text-slate-900 mb-1 md:mb-2">Small Chip</h4>
                                    <p className="text-slate-500 font-semibold text-sm md:text-base">Quarter-sized or smaller</p>
                                </div>
                            </button>

                            <button 
                                onClick={() => { updateData('damageType', 'crack'); handleNext(); }}
                                className="group border-[3px] border-slate-100 p-6 md:p-8 rounded-2xl hover:border-primary hover:shadow-2xl transition-all flex items-center md:block gap-4 md:gap-0"
                            >
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-state48-blue-light rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors shrink-0">
                                    <svg className="text-primary group-hover:text-white transition-colors w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M2 12 L8 8 L12 14 L18 6 L22 12" />
                                    </svg>
                                </div>
                                <div className="flex-1 md:flex-none text-left md:text-center">
                                    <h4 className="text-xl md:text-2xl font-black text-slate-900 mb-1 md:mb-2">Crack</h4>
                                    <p className="text-slate-500 font-semibold text-sm md:text-base">Line extending from damage</p>
                                </div>
                            </button>

                            <button 
                                onClick={() => { updateData('damageType', 'replacement'); handleNext(); }}
                                className="group border-[3px] border-slate-100 p-6 md:p-8 rounded-2xl hover:border-primary hover:shadow-2xl transition-all flex items-center md:block gap-4 md:gap-0"
                            >
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-state48-blue-light rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors shrink-0">
                                    <Car className="text-primary group-hover:text-white transition-colors" size={32} />
                                </div>
                                <div className="flex-1 md:flex-none text-left md:text-center">
                                    <h4 className="text-xl md:text-2xl font-black text-slate-900 mb-1 md:mb-2">Full Replacement</h4>
                                    <p className="text-slate-500 font-semibold text-sm md:text-base">Major damage or shattered</p>
                                </div>
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="text-center animate-fade-in">
                        <h3 className="text-2xl md:text-3xl font-black text-center mb-3 text-slate-900">Do you have auto insurance?</h3>
                        <p className="text-slate-600 font-medium text-base md:text-lg mb-8 md:mb-10">In Arizona, most windshield repairs are fully covered!</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12 max-w-2xl mx-auto">
                            <button 
                                onClick={() => { updateData('hasInsurance', true); handleNext(); }}
                                className="group border-[3px] border-slate-100 p-6 md:p-10 rounded-2xl hover:border-primary hover:shadow-2xl transition-all flex items-center md:block gap-4 md:gap-0"
                            >
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-state48-blue-light rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors shrink-0">
                                    <Shield className="text-primary group-hover:text-white transition-colors" size={32} />
                                </div>
                                <div className="flex-1 md:flex-none text-left md:text-center">
                                    <h4 className="text-xl md:text-2xl font-black text-slate-900 mb-1 md:mb-2">Yes, I Have Insurance</h4>
                                    <p className="text-slate-500 font-semibold text-sm md:text-base">We handle the claim for you</p>
                                </div>
                            </button>

                            <button 
                                onClick={() => { updateData('hasInsurance', false); handleNext(); }}
                                className="group border-[3px] border-slate-100 p-6 md:p-10 rounded-2xl hover:border-primary hover:shadow-2xl transition-all flex items-center md:block gap-4 md:gap-0"
                            >
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-state48-blue-light rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors shrink-0">
                                    <svg className="text-primary group-hover:text-white transition-colors w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M12 8v4M12 16h.01" />
                                    </svg>
                                </div>
                                <div className="flex-1 md:flex-none text-left md:text-center">
                                    <h4 className="text-xl md:text-2xl font-black text-slate-900 mb-1 md:mb-2">No / Out of Pocket</h4>
                                    <p className="text-slate-500 font-semibold text-sm md:text-base">Competitive cash pricing</p>
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
                        <h3 className="text-2xl md:text-3xl font-black text-center mb-3 text-slate-900">What vehicle do you have?</h3>
                        <p className="text-slate-600 font-medium text-base md:text-lg mb-8 md:mb-10">Enter your Year, Make, and Model (e.g., 2012 Toyota RAV4)</p>

                        <div className="max-w-xl mx-auto mb-8 md:mb-12">
                            <div className="relative">
                                <Car className="absolute left-4 md:left-5 top-1/2 transform -translate-y-1/2 text-slate-400" size={24} />
                                <input 
                                    type="text"
                                    placeholder="2012 Toyota RAV4"
                                    value={data.vehicleInfo}
                                    onChange={(e) => updateData('vehicleInfo', e.target.value)}
                                    className="w-full pl-14 pr-4 md:pr-5 py-5 md:py-6 bg-white border-2 border-slate-200 rounded-xl text-slate-700 text-lg font-semibold outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                            <Button variant="outline" onClick={handlePrev}>
                                <ArrowLeft size={20} /> Back
                            </Button>
                            <Button size="lg" onClick={handleNext} disabled={!data.vehicleInfo}>
                                Continue <ArrowRight size={20} />
                            </Button>
                        </div>
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
                                    className="w-full pl-12 md:pl-14 pr-4 md:pr-5 py-4 md:py-5 bg-white border border-slate-200 rounded-lg text-slate-700 text-base font-semibold outline-none focus:border-primary focus:ring-1 focus:ring-primary"
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
                                    className="w-full pl-12 md:pl-14 pr-4 md:pr-5 py-4 md:py-5 bg-white border border-slate-200 rounded-lg text-slate-700 text-base font-semibold outline-none focus:border-primary focus:ring-1 focus:ring-primary"
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
                                    className="w-full pl-12 md:pl-14 pr-4 md:pr-5 py-4 md:py-5 bg-white border border-slate-200 rounded-lg text-slate-700 text-base font-semibold outline-none focus:border-primary focus:ring-1 focus:ring-primary"
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
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8">
                            <CheckCircle className="text-white" size={48} />
                        </div>
                        <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Quote Request Sent!</h3>
                        <p className="text-slate-600 font-bold text-lg md:text-xl mb-8 max-w-lg mx-auto">
                            Thank you! We'll review your windshield needs and contact you within 24 hours with a quote.
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