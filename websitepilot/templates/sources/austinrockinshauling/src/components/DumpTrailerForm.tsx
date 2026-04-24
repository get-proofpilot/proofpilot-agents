import { useState } from 'react';
import { Send, Loader2, User, Phone, Mail, MapPin, FileText, Calendar, X } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

interface DumpTrailerFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DumpTrailerForm = ({ open, onOpenChange }: DumpTrailerFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    description: '',
    city: '',
    startDate: '',
    timeframe: '',
  });

  const timeframes = [
    'A few hours',
    '1 day',
    '2-3 days',
    '1 week',
    '2 weeks',
    'Other (describe above)',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success('Rental request submitted!', {
      description: "We'll contact you within 24 hours with a quote.",
    });
    setFormData({ name: '', phone: '', email: '', description: '', city: '', startDate: '', timeframe: '' });
    setIsSubmitting(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 border-none bg-transparent shadow-none">
        <DialogTitle className="sr-only">Rent Your Dump Trailer Today</DialogTitle>
        <div className="bg-background p-8 md:p-12 shadow-2xl border-t-8 border-primary relative">
          <div className="absolute -top-14 right-4 bg-foreground text-background px-6 py-3 font-black uppercase text-sm transform -skew-x-6 shadow-lg hidden md:block">
            <span className="skew-x-6 block">Starting at $300</span>
          </div>
          <div className="mb-8 text-center">
            <h3 className="text-2xl md:text-3xl font-black uppercase text-foreground">Rent Your Dump Trailer Today</h3>
            <p className="text-muted-foreground text-sm mt-2">Tell us what you need and we'll get you a quick estimate.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            {/* Name */}
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
                className="w-full pl-10 pr-4 py-3 bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm font-bold transition-colors"
              />
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  className="w-full pl-10 pr-4 py-3 bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm font-bold transition-colors"
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
                  className="w-full pl-10 pr-4 py-3 bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm font-bold transition-colors"
                />
              </div>
            </div>

            {/* Service (pre-filled, read-only) */}
            <div className="relative">
              <input
                type="text"
                value="Dump Trailer Rental"
                readOnly
                className="w-full px-4 py-3 bg-muted/50 border border-border text-sm font-bold text-foreground cursor-default"
              />
            </div>

            {/* Description */}
            <div className="relative">
              <div className="absolute top-3 left-0 pl-3 pointer-events-none text-muted-foreground">
                <FileText className="w-4 h-4" />
              </div>
              <textarea
                placeholder="Describe what you need * (e.g. Drop off trailer, I fill it, you pick up — OR — I need to tow it myself for a cleanout)"
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm font-bold transition-colors resize-none"
              />
            </div>

            {/* Date & Timeframe */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                </div>
                <input
                  type="date"
                  required
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm font-bold transition-colors"
                />
              </div>
              <div className="relative">
                <select
                  required
                  value={formData.timeframe}
                  onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                  className="w-full px-4 py-3 bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm font-bold transition-colors appearance-none"
                >
                  <option value="">How long do you need it? *</option>
                  {timeframes.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-muted-foreground">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* City / ZIP */}
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
                className="w-full pl-10 pr-4 py-3 bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm font-bold transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground font-black uppercase tracking-widest text-sm py-4 hover:bg-foreground transition-colors shadow-lg disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Request Rental Quote
                </>
              )}
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DumpTrailerForm;
