import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const About = () => {
  return (
    <section className="w-full max-w-[1320px] mt-[100px] mb-[100px] px-5 max-md:max-w-full max-md:mt-10 max-md:mb-10">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
        <div className="w-6/12 max-md:w-full max-md:ml-0">
          <div className="flex w-full flex-col text-base leading-none mt-1.5 max-md:max-w-full max-md:mt-10">
            <p className="text-primary text-xl font-semibold tracking-[1px] uppercase">
              Serving Salt Lake City
            </p>
            <h2 className="text-foreground text-[48px] font-black leading-tight mt-6 max-md:max-w-full max-md:text-[36px]">
              Leading Emergency Restoration Services in Salt Lake City
            </h2>
            <p className="text-foreground text-base font-normal leading-7 self-stretch mt-[35px] max-md:max-w-full max-md:mt-10">
              Are you dealing with unexpected water damage, flooding, or mold growth? Feeling overwhelmed by the stress of restoration and insurance claims? Meet Keystone Restoration – where we understand your concerns because we've been delivering trusted emergency restoration solutions throughout Salt Lake City and Sandy.
            </p>
            <div className="flex items-stretch gap-4 font-bold mt-10">
              <button className="bg-primary border flex items-center justify-center gap-2 text-white px-6 py-4 rounded-lg border-primary border-solid transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5">
                24/7 Emergency Help
                <ArrowUpRight className="w-5 h-5" />
              </button>
              <button className="border flex items-center justify-center gap-2 text-primary px-6 py-4 rounded-lg border-primary border-solid transition-all duration-300 hover:bg-primary/5 hover:shadow-lg">
                Learn More
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
          <div className="flex flex-col relative min-h-[364px] w-full overflow-hidden items-stretch pt-5 max-md:max-w-full max-md:mt-10">
            <img
              src="https://api.builder.io/api/v1/image/assets/522bc5fdb710438c8b4d7f988c1b02e8/0a99eec0e9b06c6d05ea3172f1359781174d9f6e?placeholderIfAbsent=true"
              alt="Video background"
              className="absolute h-full w-full object-cover inset-0"
            />
            <div className="relative flex w-[366px] max-w-full flex-col mr-5 max-md:mr-2.5">
              <img
                src="https://api.builder.io/api/v1/image/assets/522bc5fdb710438c8b4d7f988c1b02e8/b08171eeac0c1117dc731baec6e58cb938dd8422?placeholderIfAbsent=true"
                alt="Play button"
                className="aspect-[1] object-contain w-[57px] rounded-[60px]"
              />
              <img
                src="https://api.builder.io/api/v1/image/assets/522bc5fdb710438c8b4d7f988c1b02e8/545145b16c6c5d9f29513a1791cb42f285d78729?placeholderIfAbsent=true"
                alt="Video thumbnail"
                className="aspect-[1.56] object-contain w-[125px] max-w-full mt-12 max-md:mt-10"
              />
            </div>
            <div className="relative bg-[rgba(6,84,165,0.85)] flex items-stretch gap-1 text-[13px] text-white font-bold whitespace-nowrap text-center tracking-[0.5px] leading-[3] flex-wrap mt-[125px] px-px max-md:mt-10">
              <img
                src="https://api.builder.io/api/v1/image/assets/522bc5fdb710438c8b4d7f988c1b02e8/4d45acea88a386e271950e9742a32d2899250b46?placeholderIfAbsent=true"
                alt="Video controls"
                className="aspect-[1.21] object-contain w-[41px] shrink-0"
              />
              <div className="flex items-stretch flex-wrap grow shrink basis-auto">
                <span className="grow my-auto">1:35</span>
                <img
                  src="https://api.builder.io/api/v1/image/assets/522bc5fdb710438c8b4d7f988c1b02e8/45ceae6382edce9591c0a5e18ffe16174f708975?placeholderIfAbsent=true"
                  alt="Progress bar"
                  className="aspect-[12.2] object-contain w-[415px]"
                />
                <img
                  src="https://api.builder.io/api/v1/image/assets/522bc5fdb710438c8b4d7f988c1b02e8/b5a4d54d8c15c61de9a1bfc17015e98aa8951fc5?placeholderIfAbsent=true"
                  alt="Volume"
                  className="aspect-[1.18] object-contain w-10 shrink-0"
                />
                <img
                  src="https://api.builder.io/api/v1/image/assets/522bc5fdb710438c8b4d7f988c1b02e8/7174af91a454c93ba1d8ff318b6f450a9b7f5c60?placeholderIfAbsent=true"
                  alt="Settings"
                  className="aspect-[1.18] object-contain w-10 shrink-0"
                />
                <img
                  src="https://api.builder.io/api/v1/image/assets/522bc5fdb710438c8b4d7f988c1b02e8/9cbaa0912406fa5fe151062ec003b4e551cab9c2?placeholderIfAbsent=true"
                  alt="Picture in picture"
                  className="aspect-[1.18] object-contain w-10 shrink-0"
                />
                <img
                  src="https://api.builder.io/api/v1/image/assets/522bc5fdb710438c8b4d7f988c1b02e8/4fa60b45e08f6d5dd53420c94eac3e9883d8b088?placeholderIfAbsent=true"
                  alt="Fullscreen"
                  className="aspect-[1.18] object-contain w-10 shrink-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
