import React, { useState } from 'react';
import { CheckCircle2, Shield, Sun, Award, MapPin, Wrench } from 'lucide-react';

const tabs = [
  { id: 'overview', label: 'Overview', icon: CheckCircle2 },
  { id: 'adas', label: 'ADAS Calibration', icon: Wrench },
  { id: 'insurance', label: 'Insurance Info', icon: Shield },
  { id: 'arizona', label: 'Arizona Conditions', icon: Sun },
  { id: 'oem', label: 'OEM Glass', icon: Award },
  { id: 'warranty', label: 'Lifetime Warranty', icon: MapPin },
];

const tabContent: Record<string, { title: string; content: React.ReactNode }> = {
  overview: {
    title: "Windshield Replacement in Phoenix, Arizona",
    content: (
      <div className="space-y-4">
        <p>
          Phoenix drivers face unique challenges — extreme heat, construction debris, and heavy freeway traffic. These conditions dramatically increase windshield damage. A cracked or chipped windshield not only reduces visibility but also weakens your vehicle's structural integrity, making professional replacement essential for your safety.
        </p>
        <p>
          State 48 Glass offers more than just installation. We provide convenience, premium OEM-quality materials, and certified technicians. Our mobile service brings the shop to you — whether you're at home, work, or anywhere else in the Valley — so you can continue your day without interruption.
        </p>
        <p>
          With our commitment to excellence and Arizona's zero-deductible insurance laws, getting a new windshield has never been easier. Most customers pay $0 out of pocket and can even receive cash back on their replacement.
        </p>
      </div>
    )
  },
  adas: {
    title: "ADAS Camera Calibration Services",
    content: (
      <div className="space-y-4">
        <p>
          Modern vehicles equipped with Advanced Driver Assistance Systems (ADAS) require precise camera calibration after windshield replacement. These systems — including lane departure warnings, automatic emergency braking, and adaptive cruise control — rely on cameras mounted to your windshield.
        </p>
        <p>
          When your windshield is replaced, even the slightest misalignment can cause these safety features to malfunction. That's why State 48 Glass offers professional ADAS calibration to ensure your safety systems work exactly as intended after your new windshield is installed.
        </p>
        <ul className="space-y-2 mt-4">
          <li className="flex items-start gap-3">
            <CheckCircle2 className="text-primary shrink-0 mt-1" size={18} />
            <span><strong>Static Calibration:</strong> Performed in a controlled environment using specialized targets</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="text-primary shrink-0 mt-1" size={18} />
            <span><strong>Dynamic Calibration:</strong> Requires driving the vehicle to recalibrate sensors</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="text-primary shrink-0 mt-1" size={18} />
            <span><strong>Hybrid Calibration:</strong> Combination of both methods for certain vehicles</span>
          </li>
        </ul>
      </div>
    )
  },
  insurance: {
    title: "Arizona Insurance Coverage Explained",
    content: (
      <div className="space-y-4">
        <p>
          <strong>Great news for Arizona drivers:</strong> Arizona state law requires insurance companies to offer zero-deductible glass coverage. This means if you have comprehensive auto insurance, your windshield replacement is typically covered at no out-of-pocket cost to you.
        </p>
        <p>
          While windshield replacement isn't technically "free," the law ensures that insurers must provide this $0 deductible option. Most policies include it by default, though some may require a small premium increase. If your comprehensive policy includes this provision, you pay nothing — and may even qualify for cash back!
        </p>
        <div className="bg-orange-50 border border-primary/20 rounded-lg p-4 mt-4">
          <h4 className="font-bold text-slate-900 mb-2">We Work With ALL Insurance Providers:</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
            {["State Farm", "Geico", "Progressive", "Allstate", "USAA", "Farmers", "Liberty Mutual", "Nationwide", "American Family"].map((company, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="text-primary shrink-0" size={14} />
                <span>{company}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
  arizona: {
    title: "Why Arizona is Tough on Windshields",
    content: (
      <div className="space-y-4">
        <p>
          Arizona's unique climate and road conditions create a perfect storm for windshield damage. Understanding these factors helps explain why glass damage is so common here — and why quick repair or replacement is essential.
        </p>
        <ul className="space-y-3 mt-4">
          <li className="flex items-start gap-3">
            <Sun className="text-primary shrink-0 mt-1" size={18} />
            <div>
              <strong>Extreme Heat:</strong> Summer temperatures regularly exceed 110°F. This causes rapid expansion and contraction of glass, turning small chips into major cracks almost overnight.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <Sun className="text-primary shrink-0 mt-1" size={18} />
            <div>
              <strong>Construction Debris:</strong> With Arizona's rapid growth, construction zones are everywhere. Loose gravel and rocks from construction vehicles are a leading cause of windshield damage.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <Sun className="text-primary shrink-0 mt-1" size={18} />
            <div>
              <strong>Freeway Traffic:</strong> High-speed highways like the I-10, I-17, Loop 101, and Loop 202 see heavy traffic. More vehicles mean more kicked-up debris hitting your windshield.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <Sun className="text-primary shrink-0 mt-1" size={18} />
            <div>
              <strong>Haboobs & Dust Storms:</strong> Arizona's famous dust storms can sandblast your windshield, causing pitting and reduced visibility over time.
            </div>
          </li>
        </ul>
      </div>
    )
  },
  oem: {
    title: "OEM-Quality Glass Standards",
    content: (
      <div className="space-y-4">
        <p>
          At State 48 Glass, we exclusively use OEM (Original Equipment Manufacturer) or OEE (Original Equipment Equivalent) glass for all replacements. This ensures your new windshield meets or exceeds the same safety standards as the glass installed when your vehicle was manufactured.
        </p>
        <p>
          Cheap aftermarket glass may save a few dollars upfront, but it often comes with optical distortion, poor fit, and reduced safety performance. Our commitment to quality means you get:
        </p>
        <ul className="space-y-2 mt-4">
          <li className="flex items-start gap-3">
            <CheckCircle2 className="text-primary shrink-0 mt-1" size={18} />
            <span><strong>Perfect Fit:</strong> Precise dimensions for your specific make, model, and year</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="text-primary shrink-0 mt-1" size={18} />
            <span><strong>Crystal Clear Optics:</strong> Zero distortion for optimal visibility and driver safety</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="text-primary shrink-0 mt-1" size={18} />
            <span><strong>Proper Safety Rating:</strong> Meets DOT safety standards and crash test requirements</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="text-primary shrink-0 mt-1" size={18} />
            <span><strong>ADAS Compatible:</strong> Designed to work properly with modern camera systems</span>
          </li>
        </ul>
      </div>
    )
  },
  warranty: {
    title: "Our Lifetime Warranty Promise",
    content: (
      <div className="space-y-4">
        <p>
          We stand behind every installation with one of the most comprehensive warranties in the Arizona auto glass industry. Our lifetime warranty covers defects in materials and workmanship for as long as you own your vehicle.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <div className="bg-slate-50 rounded-lg p-4">
            <h4 className="font-bold text-slate-900 mb-2">What's Covered:</h4>
            <ul className="space-y-1 text-sm">
              <li>✓ Defects in glass materials</li>
              <li>✓ Installation workmanship issues</li>
              <li>✓ Water leaks around the seal</li>
              <li>✓ Wind noise from improper fit</li>
              <li>✓ Adhesive failure</li>
            </ul>
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <h4 className="font-bold text-slate-900 mb-2">Warranty Benefits:</h4>
            <ul className="space-y-1 text-sm">
              <li>✓ No time limit while you own the car</li>
              <li>✓ Transferable to new owners</li>
              <li>✓ No deductibles or hidden fees</li>
              <li>✓ Free chip repairs for life</li>
              <li>✓ Nationwide coverage</li>
            </ul>
          </div>
        </div>
        <p className="text-sm text-slate-600 mt-4">
          <em>Note: Warranty does not cover damage from new rock chips, accidents, vandalism, or other external causes. See full warranty terms for details.</em>
        </p>
      </div>
    )
  }
};

export const WindshieldInfoTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="bg-primary text-white px-4 py-1.5 text-sm font-black rounded mb-6 inline-block tracking-wide shadow-sm">Learn More</span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Everything You Need to Know About <span className="text-primary">Windshield Replacement</span>
          </h2>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 border-b border-slate-200 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-bold text-sm transition-all
                ${activeTab === tab.id 
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
            >
              <tab.icon size={16} />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-slate-50 rounded-2xl p-6 md:p-10 border border-slate-100">
          <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-6">
            {tabContent[activeTab].title}
          </h3>
          <div className="text-slate-700 text-base md:text-lg leading-relaxed">
            {tabContent[activeTab].content}
          </div>
        </div>
      </div>
    </section>
  );
};
