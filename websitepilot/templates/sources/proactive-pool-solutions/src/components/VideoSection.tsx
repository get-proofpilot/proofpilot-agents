import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export const VideoSection = () => {
  return (
    <section className="py-20 px-6 bg-pool-navy text-white">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Making Pool Care{" "}
              <span className="text-pool-cyan">Simple</span>
            </h2>
            <p className="text-lg mb-6 text-gray-300">
              We understand that pool maintenance can be overwhelming. That's why
              we've created a comprehensive care system that takes the hassle out
              of pool ownership. Our certified technicians handle everything from
              chemical balancing to equipment maintenance, ensuring your pool
              stays crystal clear and ready to enjoy year-round.
            </p>
            <Button variant="cyan" size="lg">
              Learn More About Our Process
            </Button>
          </div>

          <Card className="bg-pool-navy-light border-pool-cyan border-2 p-8 relative group cursor-pointer hover:shadow-2xl transition-all">
            <div className="aspect-video bg-pool-navy rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pool-cyan/20 to-transparent" />
              <Button
                variant="cyan"
                size="lg"
                className="rounded-full h-20 w-20 group-hover:scale-110 transition-transform"
              >
                <Play className="h-8 w-8 fill-current" />
              </Button>
            </div>
            <p className="text-center mt-4 text-pool-cyan font-semibold">
              Watch: How We Keep Your Pool Perfect
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};
