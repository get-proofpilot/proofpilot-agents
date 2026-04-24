import { Card } from "@/components/ui/card";
import { CheckSquare, TestTube, Droplets, ClipboardCheck } from "lucide-react";

const steps = [
  {
    icon: CheckSquare,
    title: "Pool Arrival",
    description:
      "Our certified technician arrives at your scheduled time and performs a visual inspection of your pool area.",
  },
  {
    icon: TestTube,
    title: "Chemical Testing",
    description:
      "We test all chemical levels including pH, chlorine, alkalinity, and calcium hardness for perfect balance.",
  },
  {
    icon: Droplets,
    title: "Complete Cleaning",
    description:
      "Skim surface, vacuum bottom, brush walls and tiles, empty all baskets, and backwash filter as needed.",
  },
  {
    icon: ClipboardCheck,
    title: "Final Report",
    description:
      "Review findings with you, make recommendations, and provide a detailed service report via email.",
  },
];

export const WorkflowSection = () => {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-pool-navy mb-4">
            Your Weekly Poolside Visit:{" "}
            <span className="text-pool-cyan">4 Simple Steps</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Here's exactly what happens during each service visit
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="p-6 h-full hover:shadow-xl transition-all border-2 border-transparent hover:border-pool-cyan">
                <div className="bg-pool-cyan text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-4">
                  {index + 1}
                </div>
                <div className="bg-pool-cyan-light w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-8 w-8 text-pool-cyan" />
                </div>
                <h3 className="text-xl font-bold text-pool-navy mb-3 text-center">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-center text-sm">
                  {step.description}
                </p>
              </Card>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                  <div className="w-6 h-0.5 bg-pool-cyan" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
