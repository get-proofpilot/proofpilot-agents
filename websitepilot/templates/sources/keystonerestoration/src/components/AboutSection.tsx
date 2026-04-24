import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="bg-muted/50 self-stretch flex w-full flex-col items-center justify-center px-20 py-[76px] max-md:max-w-full max-md:px-5">
      <div className="w-full max-w-[1358px] max-md:max-w-full">
        <div className="flex w-full flex-col items-stretch px-[18px] max-md:max-w-full max-md:pr-5">
          <p className="text-foreground text-sm font-bold leading-none tracking-widest uppercase">
            About Us
          </p>
          <div className="max-md:max-w-full mt-6">
            <div className="gap-8 flex max-md:flex-col max-md:items-stretch">
              <div className="w-[36%] max-md:w-full max-md:ml-0">
                <div className="flex grow flex-col items-stretch mt-[37px] max-md:max-w-full max-md:mt-10">
                  <h2 className="text-foreground text-[48px] font-black leading-tight max-md:max-w-full max-md:text-[36px]">
                    Certified Water Damage & Mold Removal Experts
                  </h2>
                  <button className="bg-primary border flex items-center justify-center gap-2 text-base text-white font-bold mt-8 px-6 py-4 rounded-lg border-primary border-solid transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 w-fit">
                    Request Emergency Service
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="w-[64%] ml-5 max-md:w-full max-md:ml-0">
                <div className="text-base text-foreground font-normal leading-7 max-md:max-w-full max-md:mt-10">
                  <p className="max-md:max-w-full mb-6">
                    Keystone Restoration has proudly served homeowners and businesses throughout Salt Lake City, Sandy, and surrounding Utah communities with fast, professional emergency restoration services. Our team brings expertise in water damage restoration, flood cleanup, mold remediation, and disaster recovery, with a client-first approach that has earned the trust of countless property owners.
                  </p>
                  <p className="max-md:max-w-full">
                    As a local restoration company, Keystone Restoration is fully licensed and insured, ensuring your protection and peace of mind. We're available 24/7 for emergencies, reflecting our commitment to excellence in service and rapid response when you need us most. We work directly with all major insurance companies to make the restoration process as smooth as possible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
