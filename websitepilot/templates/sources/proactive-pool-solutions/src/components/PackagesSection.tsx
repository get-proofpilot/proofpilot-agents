import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const packages = [
  {
    name: "Basic Plan",
    price: "$99",
    period: "/month",
    description: "Perfect for small pools and budget-conscious homeowners",
    features: [
      "Bi-weekly cleaning visits",
      "Chemical testing & adjustment",
      "Surface skimming",
      "Basket emptying",
      "Basic equipment check",
    ],
    popular: false,
  },
  {
    name: "Standard Plan",
    price: "$149",
    period: "/month",
    description: "Our most popular package for regular pool maintenance",
    features: [
      "Weekly cleaning visits",
      "Complete chemical balance",
      "Vacuum & brush service",
      "Filter cleaning (monthly)",
      "Equipment inspection",
      "Priority scheduling",
    ],
    popular: true,
  },
  {
    name: "Premium Plan",
    price: "$249",
    period: "/month",
    description: "Comprehensive care for pristine pools year-round",
    features: [
      "Twice weekly visits",
      "Advanced chemical treatment",
      "Complete cleaning service",
      "Filter & pump maintenance",
      "Equipment repairs included",
      "24/7 emergency support",
      "Free acid wash (annual)",
    ],
    popular: false,
  },
];

export const PackagesSection = () => {
  return (
    <section id="packages" className="py-20 px-6 bg-pool-navy text-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Maintenance <span className="text-pool-cyan">Packages</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose the perfect plan for your pool care needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <Card
              key={index}
              className={`p-8 relative ${
                pkg.popular
                  ? "bg-white text-foreground border-4 border-pool-cyan scale-105 shadow-2xl"
                  : "bg-pool-navy-light text-white border-2 border-pool-cyan/30"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-pool-cyan text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <div className="flex items-end justify-center gap-1 mb-2">
                  <span className="text-5xl font-bold text-pool-cyan">{pkg.price}</span>
                  <span className="text-lg mb-2">{pkg.period}</span>
                </div>
                <p className={pkg.popular ? "text-muted-foreground" : "text-gray-400"}>
                  {pkg.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-pool-cyan flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={pkg.popular ? "cyan" : "outline"}
                size="lg"
                className="w-full"
              >
                Choose Plan
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
