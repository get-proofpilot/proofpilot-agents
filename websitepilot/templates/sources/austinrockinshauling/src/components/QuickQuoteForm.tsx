import { useState } from 'react';
import { Send, Loader2, User, Phone, Mail, MapPin } from 'lucide-react';
import { toast } from 'sonner';

const QuickQuoteForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    city: '',
  });

  const services = [
    'Demolition (Structural/Interior)',
    'Dirt Work & Grading',
    'Skid Steer Services',
    'Dump Trailer Rental',
  ];


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Quote request submitted!', {
      description: 'We\'ll contact you within 24 hours.',
    });
    
    setFormData({ name: '', phone: '', email: '', service: '', city: '' });
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
          <User className="w-4 h-4" />
        </div>
        <input 
          type="text" 
          placeholder="Full Name *" 
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full pl-12 pr-4 py-5 bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-base font-bold transition-colors"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
            <Phone className="w-4 h-4" />
          </div>
          <input 
            type="tel" 
            placeholder="Phone *" 
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full pl-12 pr-4 py-5 bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-base font-bold transition-colors"
          />
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
            <Mail className="w-4 h-4" />
          </div>
          <input 
            type="email" 
            placeholder="Email" 
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full pl-12 pr-4 py-5 bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-base font-bold transition-colors"
          />
        </div>
      </div>

      <div className="relative">
        <select 
          required
          value={formData.service}
          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
          className="w-full px-4 py-5 bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-base font-bold transition-colors appearance-none"
        >
          <option value="">Service Needed *</option>
          {services.map(service => (
            <option key={service} value={service}>{service}</option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-muted-foreground">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
          <MapPin className="w-4 h-4" />
        </div>
        <input 
          type="text" 
          placeholder="City or ZIP Code *" 
          required
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          className="w-full pl-12 pr-4 py-5 bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-base font-bold transition-colors"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-primary-foreground font-black uppercase tracking-widest text-base py-5 hover:bg-foreground transition-colors shadow-lg disabled:opacity-70 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Get My Free Quote
          </>
        )}
      </button>
    </form>
  );
};

export default QuickQuoteForm;
