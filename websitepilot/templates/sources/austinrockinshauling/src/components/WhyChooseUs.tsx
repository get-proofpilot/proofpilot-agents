import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import aboutVideo from '@/assets/rocking-s-about.mp4';
import expertiseIcon from '@/assets/icon-expertise.svg';
import reliabilityIcon from '@/assets/icon-reliability.svg';
import communicationIcon from '@/assets/icon-communication.svg';
import fiveStarIcon from '@/assets/icon-five-star.svg';
import familyIcon from '@/assets/icon-family.svg';

const features = [
  {
    icon: expertiseIcon,
    title: "All-In-One Expertise",
    desc: "From structural demolition to precision grading—we handle it all in-house."
  },
  {
    icon: reliabilityIcon,
    title: "Grit & Reliability",
    desc: "We finish what we start. Our 100% completion guarantee is non-negotiable."
  },
  {
    icon: communicationIcon,
    title: "Transparent Communication",
    desc: "No radio silence. You get fast responses and honest site updates daily."
  },
  {
    icon: fiveStarIcon,
    title: "Five-Star Reputation",
    desc: "Arizona's top-rated team with 500+ projects and a perfect 5.0 score."
  },
  {
    icon: familyIcon,
    title: "Family Owned & Operated",
    desc: "Direct access to the owners. No corporate red tape, just personal service."
  }
];

const WhyChooseUs = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section id="about" className="bg-secondary section-padding relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, hsl(var(--foreground)) 1px, transparent 0)', backgroundSize: '40px 40px' }}
      />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Side: Video with Experience Badge */}
          <motion.div 
            className="relative group order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative overflow-hidden shadow-2xl border-4 border-foreground aspect-[4/5]">
              <video 
                ref={videoRef}
                src={aboutVideo} 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent pointer-events-none"></div>
              
              {/* Mute/Unmute Button */}
              <button
                onClick={toggleMute}
                className="absolute bottom-4 left-4 z-10 bg-foreground/70 hover:bg-foreground/90 text-background p-2.5 rounded-full backdrop-blur-sm transition-colors"
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
            </div>

          </motion.div>

          {/* Right Side: Content & Feature Cards */}
          <motion.div 
            className="space-y-8 order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="max-w-xl">
              <h2 className="section-heading mb-6">
                Why Arizona Trusts<br/>
                <span className="text-primary">Rocking S?</span>
              </h2>
              <p className="text-muted-foreground font-medium text-base md:text-lg leading-relaxed">
                Rocking S Hauling delivers high-quality demolition and dirt solutions across the East Valley—combining 3 generations of experience with extreme attention to detail.
              </p>
            </div>

            {/* Vertical Cards Stack */}
            <div className="space-y-4">
              {features.map((feature, idx) => (
                <motion.div 
                  key={idx} 
                  className="bg-primary p-5 shadow-sm flex items-start gap-5"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                    <img src={feature.icon} alt="" className="w-10 h-10 invert" />
                  </div>
                  <div>
                    <h3 className="text-base font-black uppercase tracking-tight text-primary-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-base text-primary-foreground/90 font-medium leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
