import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";

export const QuoteForm = () => {
  return (
    <section className="py-20 px-6 bg-muted">
      <div className="container mx-auto max-w-2xl">
        <Card className="p-8 shadow-2xl border-t-4 border-pool-cyan">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-pool-cyan text-white px-4 py-2 rounded-full mb-4">
              <Clock className="h-5 w-5" />
              <span className="font-semibold">Quick Response</span>
            </div>
            <h2 className="text-4xl font-bold text-pool-navy mb-2">
              Get Your Pool Quote In{" "}
              <span className="text-pool-cyan">60 Seconds</span>
            </h2>
            <p className="text-muted-foreground">
              Fill out the form below and we'll get back to you within 24 hours
            </p>
          </div>

          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" type="tel" placeholder="(555) 123-4567" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input id="email" type="email" placeholder="john@example.com" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Pool Address</Label>
              <Input id="address" placeholder="123 Main St, Victorville, CA" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="poolSize">Pool Size</Label>
              <select
                id="poolSize"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option>Select pool size</option>
                <option>Small (up to 15,000 gallons)</option>
                <option>Medium (15,000 - 25,000 gallons)</option>
                <option>Large (25,000+ gallons)</option>
              </select>
            </div>

            <Button variant="cyan" size="lg" className="w-full text-lg py-6">
              Get My Free Quote
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
};
