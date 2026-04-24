import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { DeserveMore } from "@/components/DeserveMore";
import { ClubMembership } from "@/components/ClubMembership";
import { Steps } from "@/components/Steps";
import { Locations } from "@/components/Locations";
import { Pricing } from "@/components/Pricing";
import { Promos } from "@/components/Promos";
import { Testimonials } from "@/components/Testimonials";
import { Unlimited } from "@/components/Unlimited";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <TrustBar />
        <DeserveMore />
        <Steps />
        <Pricing />
        <ClubMembership />
        <Promos />
        <Locations />
        <Testimonials />
        <Unlimited />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
