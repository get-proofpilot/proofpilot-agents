import { Card } from "@/components/ui/card";
import { Droplets, Wrench, Shield, Sparkles, Calendar, Settings } from "lucide-react";

const services = [
  { icon: Droplets, title: "Pool Cleaning", color: "bg-pool-cyan" },
  { icon: Wrench, title: "Pool Repair", color: "bg-pool-cyan" },
  { icon: Shield, title: "Pool Maintenance", color: "bg-pool-cyan" },
  { icon: Sparkles, title: "Chemical Balance", color: "bg-pool-cyan" },
  { icon: Calendar, title: "Weekly Service", color: "bg-pool-cyan" },
  { icon: Settings, title: "Equipment Check", color: "bg-pool-cyan" },
];

export const ServiceCards = () => {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {services.map((service, index) => (
            <Card
              key={index}
              className="p-6 text-center hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-pool-cyan group"
            >
              <div className={`${service.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                <service.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-sm text-foreground">{service.title}</h3>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
