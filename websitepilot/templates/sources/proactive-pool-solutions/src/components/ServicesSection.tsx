import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const services = [
  {
    title: "Weekly Cleaning",
    description:
      "Regular maintenance visits to keep your pool sparkling clean. We handle skimming, vacuuming, and brushing to ensure pristine water quality.",
    features: ["Surface skimming", "Vacuum bottom", "Brush walls & tiles", "Empty baskets"],
  },
  {
    title: "Chemical Balance",
    description:
      "Proper chemical levels are crucial for safe swimming. Our experts test and adjust pH, chlorine, alkalinity, and more.",
    features: ["pH testing", "Chlorine adjustment", "Alkalinity balance", "Shock treatment"],
  },
  {
    title: "Equipment Service",
    description:
      "Keep your pool equipment running efficiently with our comprehensive inspection and maintenance service.",
    features: ["Filter cleaning", "Pump inspection", "Heater check", "Equipment repair"],
  },
];

export const ServicesSection = () => {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-pool-navy mb-4">
            Pool Services in{" "}
            <span className="text-pool-cyan">Victorville, CA</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive pool care solutions tailored to your needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="p-8 hover:shadow-2xl transition-all border-2 border-transparent hover:border-pool-cyan"
            >
              <h3 className="text-2xl font-bold text-pool-navy mb-4">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-6">{service.description}</p>
              <ul className="space-y-3">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-pool-cyan flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
