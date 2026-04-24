import React, { useState } from 'react';
import heroImage from '@/assets/hero-water-damage.jpg';
import { ArrowUpRight, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    zipCode: '',
    service: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="flex flex-col relative min-h-[700px] max-lg:min-h-[900px] w-full max-w-[1440px] overflow-hidden mt-5 px-5 animate-fade-in">
      <img
        src={heroImage}
        alt="Water damage restoration professionals"
        className="absolute h-full w-full object-cover inset-0 rounded-[50px] max-md:rounded-[30px]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.7)] to-[rgba(0,0,0,0.6)] rounded-[50px] max-md:rounded-[30px]" />
      
      <div className="relative flex items-center justify-between gap-12 px-20 py-[100px] max-lg:flex-col max-lg:px-8 max-md:px-5 max-md:py-16 z-10">
        {/* Left Side - Content */}
        <div className="flex-1 flex flex-col items-start max-lg:items-center max-lg:text-center animate-fade-up">
          <div className="bg-white/10 backdrop-blur-md border flex w-fit items-stretch gap-2.5 px-[18px] py-[9px] rounded-[52px] border-white/20 border-solid animate-scale-in mb-8">
            <div className="flex items-stretch gap-1 my-auto">
              <img
                src="https://api.builder.io/api/v1/image/assets/522bc5fdb710438c8b4d7f988c1b02e8/235587db855ea4870f87a3338a7732616284fce0?placeholderIfAbsent=true"
                alt="Star rating"
                className="aspect-[1.08] object-contain w-[13px] shrink-0"
              />
              <img
                src="https://api.builder.io/api/v1/image/assets/522bc5fdb710438c8b4d7f988c1b02e8/6ea4d89aee32cb90f2394cd1e88ffae62afddb73?placeholderIfAbsent=true"
                alt="Star rating"
                className="aspect-[1.08] object-contain w-[13px] shrink-0"
              />
              <img
                src="https://api.builder.io/api/v1/image/assets/522bc5fdb710438c8b4d7f988c1b02e8/9b908aac197978c7d646c1617b9c5e6f57dede07?placeholderIfAbsent=true"
                alt="Star rating"
                className="aspect-[1.08] object-contain w-[13px] shrink-0"
              />
              <img
                src="https://api.builder.io/api/v1/image/assets/522bc5fdb710438c8b4d7f988c1b02e8/f37d3a173862b4fcb2d861539b17996b8d0d3bdc?placeholderIfAbsent=true"
                alt="Star rating"
                className="aspect-[1.08] object-contain w-[13px] shrink-0"
              />
              <img
                src="https://api.builder.io/api/v1/image/assets/522bc5fdb710438c8b4d7f988c1b02e8/b5e14696e77c08cfbfcd5606e82e56d170215d6b?placeholderIfAbsent=true"
                alt="Star rating"
                className="aspect-[1.08] object-contain w-[13px] shrink-0"
              />
            </div>
            <div className="flex items-center gap-2.5 text-base text-white font-medium leading-none whitespace-nowrap">
              <img
                src="https://api.builder.io/api/v1/image/assets/522bc5fdb710438c8b4d7f988c1b02e8/343f7e9f3cf32e7cd08a8e75014939a658c89d47?placeholderIfAbsent=true"
                alt="Google icon"
                className="aspect-[1] object-contain w-5 shrink-0"
              />
              <span>5/5 Rating From 15+ Reviews</span>
            </div>
          </div>

          <h1 className="text-white text-[56px] font-extrabold leading-[68px] max-lg:text-center max-md:text-[36px] max-md:leading-[44px] mb-6">
            Top-Rated & Quality Water Damage Restoration Services in Salt Lake City, UT
          </h1>
          
          <p className="text-white text-lg font-medium leading-8 max-lg:text-center mb-8 max-w-[560px]">
            If you're searching for water damage restoration, we know you're dealing with more than you should have to handle right now. We're here to help. Our expert team is available 24/7 for fast water extraction, flood cleanup, and mold remediation throughout Salt Lake City and Sandy. Let us restore your property and your peace of mind.
          </p>

          <a 
            href="tel:+18015551234" 
            className="flex items-center justify-center gap-3 bg-primary border-2 border-primary px-8 py-4 rounded-lg text-white font-bold text-xl transition-all duration-300 hover:bg-primary/90 hover:shadow-xl hover:-translate-y-0.5"
          >
            <Phone className="w-6 h-6" />
            <span>(801) 555-1234</span>
          </a>
        </div>

        {/* Right Side - Contact Form */}
        <div className="flex-1 max-w-[520px] w-full animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-foreground mb-2">Get Help Now</h2>
            <p className="text-muted-foreground mb-6">Fill out the form and we'll contact you immediately.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-foreground">Full Name*</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Smith"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-foreground">Phone Number*</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="(801) 555-0123"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-foreground">Email Address*</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="zipCode" className="text-foreground">Zip Code*</Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  type="text"
                  placeholder="84101"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                  className="mt-1.5"
                  maxLength={5}
                />
              </div>

              <div>
                <Label htmlFor="service" className="text-foreground">Service Needed*</Label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-1.5"
                >
                  <option value="">Select a service...</option>
                  <option value="water-extraction">Water Extraction</option>
                  <option value="flood-cleanup">Flood Cleanup</option>
                  <option value="mold-remediation">Mold Remediation</option>
                  <option value="storm-damage">Storm Damage Restoration</option>
                  <option value="other">Other Emergency</option>
                </select>
              </div>

              <div>
                <Label htmlFor="message" className="text-foreground">Describe Your Emergency</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us what happened..."
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  className="mt-1.5"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 text-base"
              >
                Request Emergency Service
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
