import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export const ServiceArea = () => {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-pool-navy mb-6">
              Servicing{" "}
              <span className="text-pool-cyan">Victorville, CA</span> and
              Surrounding Areas
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              We proudly serve Victorville and the entire High Desert region.
              Our service area includes:
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Victorville",
                "Apple Valley",
                "Hesperia",
                "Adelanto",
                "Oak Hills",
                "Spring Valley Lake",
              ].map((city, index) => (
                <li key={index} className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-pool-cyan" />
                  <span className="font-medium">{city}</span>
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground">
              <strong>Service Radius:</strong> We provide pool maintenance
              services within a 25-mile radius of Victorville. Not sure if
              we service your area? Give us a call at{" "}
              <span className="text-pool-cyan font-semibold">
                (555) 123-4567
              </span>
            </p>
          </div>

          <Card className="p-8 bg-muted">
            <div className="aspect-square bg-pool-cyan-light rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pool-cyan/30 to-pool-navy/10" />
              <MapPin className="h-24 w-24 text-pool-cyan" />
            </div>
            <p className="text-center mt-4 text-sm text-muted-foreground">
              Interactive service area map
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};
