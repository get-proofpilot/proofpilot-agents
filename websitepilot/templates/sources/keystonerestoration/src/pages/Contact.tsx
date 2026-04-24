import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import { Phone, Mail, MapPin, Clock, CheckCircle2, Shield, Award, Users, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import contactHeroImage from '@/assets/contact-background.jpg';

const Contact = () => {
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
    console.log('Contact form submitted:', formData);
    // Handle form submission
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const processSteps = [
    {
      step: 1,
      title: 'You Submit Your Request',
      description: 'Fill out our form with your emergency details. We receive your information immediately.'
    },
    {
      step: 2,
      title: 'We Contact You Within Minutes',
      description: 'Our emergency response team will call you back within 15 minutes to discuss your situation.'
    },
    {
      step: 3,
      title: 'We Schedule Your Service',
      description: 'We arrange an immediate visit or schedule a convenient time based on your emergency level.'
    },
    {
      step: 4,
      title: 'Our Team Arrives & Assesses',
      description: 'Our certified technicians arrive with professional equipment and conduct a thorough assessment.'
    },
    {
      step: 5,
      title: 'We Provide a Detailed Estimate',
      description: 'You receive a transparent, itemized estimate before any work begins. No hidden fees.'
    },
    {
      step: 6,
      title: 'Restoration Begins',
      description: 'Once approved, we immediately start the restoration process with continuous updates.'
    }
  ];

  return (
    <div className="bg-white flex flex-col items-center min-h-screen">
      <Header />
      
      <main className="w-full flex flex-col items-center">
        {/* Hero Section with Form */}
        <section className="flex flex-col relative min-h-[700px] w-full overflow-hidden animate-fade-in">
          <img
            src={contactHeroImage}
            alt="Emergency water damage restoration service"
            className="absolute h-full w-full object-cover inset-0"
          />
          <div className="absolute inset-0 bg-[rgba(0,0,0,0.75)]" />
          
          <div className="relative flex items-center justify-between gap-12 px-20 py-24 max-w-[1440px] w-full mx-auto max-lg:flex-col max-lg:px-8 max-md:px-5 max-md:py-16 z-10">
            {/* Left Side - Contact Info */}
            <div className="flex-1 flex flex-col items-start max-lg:items-center max-lg:text-center animate-fade-up">
              <h1 className="text-white text-[56px] font-black leading-[1.2] max-md:text-[40px] mb-8">
                Contact Us
              </h1>
              
              <div className="space-y-6 mb-10 max-lg:flex max-lg:flex-col max-lg:items-center">
                <div className="flex items-center gap-4 text-white max-lg:flex-col max-lg:text-center">
                  <div className="bg-primary/20 backdrop-blur-sm p-4 rounded-full">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Hours & Location</p>
                    <p className="text-white/80">123 Main Street, Salt Lake City, UT 84101</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-white max-lg:flex-col max-lg:text-center">
                  <div className="bg-primary/20 backdrop-blur-sm p-4 rounded-full">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Email Us</p>
                    <a href="mailto:help@keystonerestoration.com" className="text-primary hover:text-primary/80 transition-colors">
                      help@keystonerestoration.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-white max-lg:flex-col max-lg:text-center">
                  <div className="bg-primary/20 backdrop-blur-sm p-4 rounded-full">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Call 24/7</p>
                    <a href="tel:+18015551234" className="text-primary hover:text-primary/80 transition-colors text-xl font-bold">
                      (801) 555-1234
                    </a>
                  </div>
                </div>
              </div>

              <p className="text-white/90 text-lg leading-relaxed max-w-[500px]">
                Whether you need immediate emergency service or just want to learn more about what we can do to help, contact us and we'll respond right away. We're open 24 hours a day, 7 days a week – even on holidays.
              </p>
            </div>

            {/* Right Side - Contact Form */}
            <div className="flex-1 max-w-[520px] w-full animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <div className="bg-card rounded-3xl p-8 shadow-2xl">
                <h2 className="text-2xl font-bold text-card-foreground mb-2">Book Now</h2>
                <p className="text-muted-foreground mb-6">Fill out the form and we'll contact you immediately.</p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-card-foreground">Full Name*</Label>
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
                    <Label htmlFor="phone" className="text-card-foreground">Phone Number*</Label>
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

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email" className="text-card-foreground">Email*</Label>
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
                      <Label htmlFor="zipCode" className="text-card-foreground">Zip Code*</Label>
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
                  </div>

                  <div>
                    <Label htmlFor="service" className="text-card-foreground">Service*</Label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      required
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-1.5"
                    >
                      <option value="">Select...</option>
                      <option value="water-extraction">Water Extraction</option>
                      <option value="flood-cleanup">Flood Cleanup</option>
                      <option value="mold-remediation">Mold Remediation</option>
                      <option value="storm-damage">Storm Damage</option>
                      <option value="other">Other Emergency</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-card-foreground">Message</Label>
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
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 text-base"
                  >
                    Submit Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-16 bg-secondary">
          <div className="max-w-[1200px] mx-auto px-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="flex items-baseline justify-center gap-1 font-bold">
                  <span className="text-foreground text-[48px] leading-none">5000</span>
                  <span className="text-primary text-[48px] leading-none">+</span>
                </div>
                <p className="text-muted-foreground text-base mt-4">Projects Completed</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-baseline justify-center gap-1 font-bold">
                  <span className="text-foreground text-[48px] leading-none">100</span>
                  <span className="text-primary text-[48px] leading-none">+</span>
                </div>
                <p className="text-muted-foreground text-base mt-4">Cities Served</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-baseline justify-center gap-1 font-bold">
                  <span className="text-foreground text-[48px] leading-none">200</span>
                  <span className="text-primary text-[48px] leading-none">+</span>
                </div>
                <p className="text-muted-foreground text-base mt-4">5-Star Reviews</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-baseline justify-center gap-1 font-bold">
                  <span className="text-foreground text-[48px] leading-none">75</span>
                  <span className="text-primary text-[48px] leading-none">+</span>
                </div>
                <p className="text-muted-foreground text-base mt-4">Team Members</p>
              </div>
            </div>
          </div>
        </section>

        {/* Service Areas Section */}
        <section className="w-full py-20 px-5 max-md:py-12 bg-background">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-12">
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-4">
                Locations
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
                Our Service Areas
              </h2>
              <p className="text-muted-foreground text-lg max-w-[700px] mx-auto">
                Proudly serving Salt Lake City & Oklahoma and all surrounding areas
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
              {[
                'Salt Lake City', 'Sandy', 'West Valley City', 'Provo',
                'West Jordan', 'Orem', 'Taylorsville', 'South Jordan',
                'Lehi', 'Murray', 'Draper', 'Bountiful',
                'Riverton', 'Herriman', 'Spanish Fork', 'Pleasant Grove'
              ].map((area, idx) => (
                <div 
                  key={idx}
                  className="bg-card rounded-2xl p-5 text-center font-semibold text-card-foreground hover:bg-primary/10 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                >
                  {area}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us - Comparison Style */}
        <section className="w-full bg-secondary py-20 px-5 max-md:py-12">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-12">
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-4">
                Why Choose Us
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
                Keystone Restoration vs. Others
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Keystone Advantages */}
              <div className="space-y-6">
                <div className="bg-card rounded-3xl p-8 shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/20 p-3 rounded-xl shrink-0">
                      <Zap className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-card-foreground mb-2">Timely and Efficient Service</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        We pride ourselves on providing speedy service as quickly as we can with minimal disruption, ensuring a smooth restoration process.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-3xl p-8 shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/20 p-3 rounded-xl shrink-0">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-card-foreground mb-2">Insurance for Your Protection</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Fully insured, we ensure your property is protected with comprehensive coverage and direct insurance billing.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-3xl p-8 shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/20 p-3 rounded-xl shrink-0">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-card-foreground mb-2">Unmatched Expertise</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        With years of experience, our specially-trained, licensed and certified contractors have done it all, and all for our customers.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-3xl p-8 shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/20 p-3 rounded-xl shrink-0">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-card-foreground mb-2">Customer Satisfaction</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Our expert team provides cutting-edge services with industry-leading tools, technology and training.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Image/CTA */}
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-8 flex flex-col justify-center items-center text-center">
                <div className="bg-primary/20 w-24 h-24 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-3xl font-black text-foreground mb-4">
                  Experience the Keystone Difference
                </h3>
                <p className="text-muted-foreground text-lg mb-8 max-w-md">
                  When you choose Keystone Restoration, you're choosing quality, reliability, and peace of mind.
                </p>
                <a 
                  href="tel:+18015551234"
                  className="bg-primary text-primary-foreground font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 hover:bg-primary/90 hover:shadow-xl hover:-translate-y-0.5 inline-flex items-center justify-center gap-3"
                >
                  <Phone className="w-5 h-5" />
                  Call Now: (801) 555-1234
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* What Happens Next Section */}
        <section className="w-full py-20 px-5 max-md:py-12 bg-background">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-12">
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-4">
                Our Process
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
                What Happens After You Contact Us?
              </h2>
              <p className="text-muted-foreground text-lg max-w-[700px] mx-auto">
                Our proven 6-step process ensures fast, professional restoration from start to finish
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {processSteps.map((step, index) => (
                <div 
                  key={index}
                  className="bg-card rounded-3xl shadow-md p-8 relative hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="bg-primary text-primary-foreground w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl mb-5">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section - Reusing home page component */}
        <Testimonials />

        {/* FAQ Section - Reusing home page component */}
        <FAQ />
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
