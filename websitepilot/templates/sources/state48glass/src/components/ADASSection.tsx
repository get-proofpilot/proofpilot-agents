import React from 'react';
import { Button } from './UI';
import { Camera, AlertTriangle, CheckCircle, Car } from 'lucide-react';

export const ADASSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'linear-gradient(90deg, white 1px, transparent 1px), linear-gradient(white 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary px-4 py-2 rounded-full mb-6 text-sm font-bold">
              <Camera size={18} />
              Advanced Safety Feature
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight leading-tight">
              ADAS Camera <span className="text-primary">Calibration</span> After Replacement
            </h2>
            
            <p className="text-slate-300 text-lg font-medium mb-8 leading-relaxed">
              If your vehicle has Advanced Driver Assistance Systems (ADAS) like lane departure warning, automatic braking, or adaptive cruise control, the camera sensors must be recalibrated after a windshield replacement.
            </p>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <AlertTriangle className="text-yellow-400 shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="font-black text-white mb-2">Why Calibration Matters</h4>
                  <p className="text-slate-300 text-sm font-medium">
                    Even a fraction of a degree misalignment can cause your safety systems to malfunction. Improper calibration can result in false alerts or, worse, failure to detect hazards.
                  </p>
                </div>
              </div>
            </div>
            
            <Button 
              size="lg" 
              onClick={() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Schedule ADAS Calibration
            </Button>
          </div>
          
          {/* Right Content - Features */}
          <div className="space-y-6">
            <h3 className="text-xl font-black text-white mb-6">Vehicles That May Require ADAS Calibration:</h3>
            
            <div className="grid grid-cols-1 gap-4">
              {[
                "Lane Departure Warning Systems",
                "Forward Collision Warning",
                "Automatic Emergency Braking",
                "Adaptive Cruise Control",
                "Blind Spot Monitoring",
                "Rain-Sensing Wipers",
                "Heads-Up Display (HUD)",
                "Night Vision Systems"
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white/5 rounded-lg p-4 border border-white/10">
                  <CheckCircle className="text-primary shrink-0" size={20} />
                  <span className="font-bold text-white">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-primary/20 border border-primary/30 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <Car className="text-primary" size={24} />
                <h4 className="font-black text-white">Not Sure If Your Car Has ADAS?</h4>
              </div>
              <p className="text-slate-300 text-sm font-medium">
                Most vehicles made after 2015 have some form of ADAS. When you call for a quote, we'll check your vehicle's requirements and include calibration if needed.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};