import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { Button } from './UI';

const cityData = [
  {
    city: "Phoenix",
    description: "Phoenix is Arizona's largest city. The I-10 and I-17 are among the most heavily trafficked freeways, significantly increasing the chance of windshield damage from road debris. Let us handle your windshield replacement while you enjoy what the capital has to offer."
  },
  {
    city: "Mesa",
    description: "Mesa is the third largest city in Arizona. With the US-60 being one of the most accessed freeways in the East Valley, the high traffic volume means more chips and cracks. Our mobile service comes directly to your Mesa location."
  },
  {
    city: "Scottsdale",
    description: "Known for luxury shopping, fine dining, and vibrant nightlife, Scottsdale has many places to explore. Get your windshield replaced at your home or favorite spot while you enjoy what this upscale city has to offer."
  },
  {
    city: "Tempe",
    description: "Home to Arizona State University (ASU), Tempe has a large student population. College students can get cash back on their windshield replacement for extra spending money. We service the entire Tempe area including Mill Avenue and beyond."
  },
  {
    city: "Chandler",
    description: "Chandler offers great shopping at Chandler Fashion Center and excellent dining options. With how congested the 101 and 202 freeways get, windshield damage is common. Let us come to you while you enjoy what Chandler has to offer."
  },
  {
    city: "Gilbert",
    description: "Gilbert is known as Arizona's family-friendly city with excellent schools and parks. Keep your family safe with a clear, crack-free windshield. Our certified technicians serve all of Gilbert with same-day mobile service."
  },
  {
    city: "Glendale",
    description: "Home to State Farm Stadium and the Westgate Entertainment District, Glendale is a hub for sports and entertainment. Whether you're heading to a Cardinals game or shopping at the outlets, we'll get your windshield replaced fast."
  },
  {
    city: "Queen Creek",
    description: "Queen Creek is one of Arizona's fastest-growing communities, with new developments and attractions popping up regularly. As the area expands, so does traffic and road construction. Our mobile service covers all of Queen Creek."
  }
];

export const CityServiceAreas: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="bg-primary text-white px-4 py-1.5 text-sm font-black rounded mb-6 inline-block tracking-wide shadow-sm">Service Areas</span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Windshield Replacement Across <span className="text-primary">Arizona</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto">
            State 48 Glass provides mobile windshield replacement throughout the Phoenix metro area. We come to your home, office, or any location that's convenient for you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cityData.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-all group hover:border-primary"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <MapPin size={20} />
                </div>
                <h3 className="text-xl font-black text-slate-900">{item.city}</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-slate-900 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
            Don't See Your City? We Still Come to You!
          </h3>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Our mobile service covers all of Maricopa County and surrounding areas including Peoria, Surprise, Goodyear, Avondale, Sun City, Cave Creek, Fountain Hills, Apache Junction, and more.
          </p>
          <Button 
            variant="primary" 
            size="lg"
            onClick={() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get a Free Quote <ArrowRight size={18} className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};
