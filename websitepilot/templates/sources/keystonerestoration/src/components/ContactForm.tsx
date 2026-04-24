import React, { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface FormData {
  name: string;
  phone: string;
  email: string;
  zipCode: string;
  service: string;
  message: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    zipCode: '',
    service: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="w-full py-20 px-10 max-md:px-6 bg-background">
      <div className="flex gap-8 max-lg:flex-col w-full max-w-[1320px] mx-auto">
        {/* Left Side - Contact Info */}
        <div className="w-1/2 max-lg:w-full">
          <div className="flex flex-col">
            {/* Eyebrow Text */}
            <p className="text-primary text-sm font-bold leading-none tracking-widest uppercase mb-6">
              Contact Us
            </p>

            {/* Main Headline */}
            <h2 className="text-[48px] max-md:text-[36px] font-black leading-tight text-foreground mb-6">
              Let's Restore Your Property to Life
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed mb-12">
              Ready to start your restoration project? Reach out today to schedule your consultation with our expert team.
            </p>

            {/* Contact Section */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-black text-foreground mb-6">CONTACT</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary p-2 rounded-full">
                      <Mail className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <a 
                      href="mailto:info@keystonerestoration.com" 
                      className="text-base text-muted-foreground hover:text-primary transition-colors"
                    >
                      info@keystonerestoration.com
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-primary p-2 rounded-full">
                      <Phone className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <a 
                      href="tel:801-555-0199" 
                      className="text-base text-muted-foreground hover:text-primary transition-colors"
                    >
                      (801) 555-0199
                    </a>
                  </div>
                </div>
              </div>

              {/* Our Offices */}
              <div>
                <h3 className="text-2xl font-black text-foreground mb-6">OUR OFFICES</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                    <p className="text-base text-muted-foreground">
                      Salt Lake City, Utah
                    </p>
                  </div>
                </div>
              </div>

              {/* Area We Serve */}
              <div>
                <h3 className="text-2xl font-black text-foreground mb-6">AREA WE SERVE</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                    <p className="text-base text-muted-foreground">Salt Lake City</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                    <p className="text-base text-muted-foreground">Greater Salt Lake Area</p>
                  </div>
                </div>
              </div>

              {/* Find Us On */}
              <div>
                <h3 className="text-2xl font-black text-foreground mb-6">FIND US ON</h3>
                <div className="flex gap-3">
                  <a 
                    href="#" 
                    className="bg-primary p-3 rounded-full hover:bg-primary/90 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5 text-primary-foreground" />
                  </a>
                  <a 
                    href="#" 
                    className="bg-primary p-3 rounded-full hover:bg-primary/90 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-5 h-5 text-primary-foreground" />
                  </a>
                  <a 
                    href="#" 
                    className="bg-primary p-3 rounded-full hover:bg-primary/90 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5 text-primary-foreground" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-1/2 max-lg:w-full">
          <div className="bg-gradient-to-br from-card to-primary/5 border-2 border-primary/20 rounded-2xl p-10 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="mb-8">
                <h3 className="text-3xl font-black text-foreground mb-3">Fill Out Your Information Below</h3>
                <div className="h-1 w-20 bg-primary rounded-full"></div>
              </div>

              <div className="space-y-6">
                {/* Full Name */}
                <div className="relative group">
                  <Label 
                    htmlFor="name" 
                    className="text-sm font-bold text-foreground/80 mb-2 block uppercase tracking-wide"
                  >
                    Full Name*
                  </Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="border-0 border-b-2 border-border rounded-none bg-transparent px-0 py-3 text-base focus-visible:ring-0 focus-visible:border-primary transition-colors"
                    required
                  />
                </div>

                {/* Phone Number */}
                <div className="relative group">
                  <Label 
                    htmlFor="phone" 
                    className="text-sm font-bold text-foreground/80 mb-2 block uppercase tracking-wide"
                  >
                    Phone Number*
                  </Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(801) 555-0100"
                    className="border-0 border-b-2 border-border rounded-none bg-transparent px-0 py-3 text-base focus-visible:ring-0 focus-visible:border-primary transition-colors"
                    required
                  />
                </div>

                {/* Email */}
                <div className="relative group">
                  <Label 
                    htmlFor="email" 
                    className="text-sm font-bold text-foreground/80 mb-2 block uppercase tracking-wide"
                  >
                    Email*
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="border-0 border-b-2 border-border rounded-none bg-transparent px-0 py-3 text-base focus-visible:ring-0 focus-visible:border-primary transition-colors"
                    required
                  />
                </div>

                {/* Zip Code */}
                <div className="relative group">
                  <Label 
                    htmlFor="zipCode" 
                    className="text-sm font-bold text-foreground/80 mb-2 block uppercase tracking-wide"
                  >
                    ZIP Code*
                  </Label>
                  <Input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="84101"
                    className="border-0 border-b-2 border-border rounded-none bg-transparent px-0 py-3 text-base focus-visible:ring-0 focus-visible:border-primary transition-colors"
                    required
                  />
                </div>

                {/* Service Needed */}
                <div className="relative group">
                  <Label 
                    htmlFor="service" 
                    className="text-sm font-bold text-foreground/80 mb-2 block uppercase tracking-wide"
                  >
                    Service Needed*
                  </Label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="flex h-12 w-full border-0 border-b-2 border-border rounded-none bg-transparent px-0 py-3 text-base focus-visible:outline-none focus-visible:ring-0 focus-visible:border-primary transition-colors appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Select a service</option>
                    <option value="water-damage">Water Damage Restoration</option>
                    <option value="mold-remediation">Mold Remediation</option>
                    <option value="flood-cleanup">Flood Cleanup</option>
                    <option value="storm-damage">Storm Damage Repair</option>
                    <option value="emergency">Emergency Services</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Describe Need */}
                <div className="relative group">
                  <Label 
                    htmlFor="message" 
                    className="text-sm font-bold text-foreground/80 mb-2 block uppercase tracking-wide"
                  >
                    Describe Your Situation*
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Tell us about your water damage emergency or restoration needs..."
                    className="border-2 border-border rounded-lg bg-background/50 px-4 py-3 text-base focus-visible:ring-0 focus-visible:border-primary transition-colors resize-none"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full mt-8 h-14 text-lg font-bold uppercase tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5" 
                size="lg"
              >
                Send My Request
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
