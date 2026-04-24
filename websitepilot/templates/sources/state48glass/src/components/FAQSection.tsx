import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How often should I have my pool serviced?",
    answer:
      "We recommend weekly service for most residential pools. This ensures proper chemical balance, prevents algae growth, and keeps your pool swim-ready at all times. For pools with heavy usage or special circumstances, twice-weekly service may be beneficial.",
  },
  {
    question: "What chemicals do you use for pool maintenance?",
    answer:
      "We use only high-quality, EPA-approved chemicals including chlorine tablets, shock treatment, pH adjusters, alkalinity increasers/decreasers, and algaecides. All chemicals are carefully measured and applied according to your pool's specific needs and current test results.",
  },
  {
    question: "Do I need to be home during service visits?",
    answer:
      "No, you don't need to be home. Most of our clients provide gate access, and our technicians complete the service while you're away. We'll leave a detailed service report and contact you if any issues arise or repairs are needed.",
  },
  {
    question: "What if my pool turns green between visits?",
    answer:
      "If your pool develops an algae problem between scheduled visits, contact us immediately. We offer emergency service calls and can typically restore your pool to crystal-clear condition within 24-48 hours. Standard plan customers receive priority emergency scheduling.",
  },
  {
    question: "Are equipment repairs included in monthly service?",
    answer:
      "Basic equipment inspection is included in all plans. Minor adjustments and repairs are included in our Premium plan. For significant repairs or equipment replacement, we provide a detailed estimate before proceeding with any work.",
  },
  {
    question: "Can I cancel my service at any time?",
    answer:
      "Yes, we offer flexible contracts with no long-term commitment. You can cancel your service with 30 days' notice. We believe in earning your business through excellent service, not binding contracts.",
  },
];

export const FAQSection = () => {
  return (
    <section id="faq" className="py-20 px-6 bg-muted">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-pool-navy mb-4">
            How Often Should Your{" "}
            <span className="text-pool-cyan">Pool Be Serviced?</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Common questions about pool maintenance and our services
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white border-2 border-border rounded-lg px-6 hover:border-pool-cyan transition-colors"
            >
              <AccordionTrigger className="text-left font-semibold text-pool-navy hover:text-pool-cyan">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
