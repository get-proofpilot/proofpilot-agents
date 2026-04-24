import { Phone, MapPin, Clock, Mail } from 'lucide-react';

const TopBar = () => {
  return (
    <div className="bg-primary text-primary-foreground py-2 text-[10px] md:text-xs font-bold uppercase tracking-wider hidden md:block">
      <div className="container-custom flex justify-between items-center">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <MapPin className="w-3 h-3" />
            <span>Serving the East and West Valley, AZ</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3" />
            <span>Mon - Sat: 6:00 AM - 6:00 PM</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
        </div>
      </div>
    </div>
  );
};

export default TopBar;
