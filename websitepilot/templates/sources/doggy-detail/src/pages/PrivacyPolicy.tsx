import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="font-oswald text-4xl md:text-5xl font-bold text-foreground mb-8">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 28, 2025</p>
          
          <div className="prose prose-lg max-w-none space-y-8 text-foreground">
            <section>
              <h2 className="font-oswald text-2xl font-bold mb-4">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Welcome to The Doggy Detail ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our dog grooming services.
              </p>
            </section>

            <section>
              <h2 className="font-oswald text-2xl font-bold mb-4">2. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">We may collect information about you in various ways, including:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Personal Data:</strong> Name, email address, phone number, and mailing address when you book appointments or contact us.</li>
                <li><strong>Pet Information:</strong> Your pet's name, breed, age, health conditions, and grooming preferences.</li>
                <li><strong>Payment Information:</strong> Credit card details and billing information processed through secure payment processors.</li>
                <li><strong>Usage Data:</strong> Information about how you interact with our website, including IP address, browser type, and pages visited.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-oswald text-2xl font-bold mb-4">3. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Process and manage your grooming appointments</li>
                <li>Communicate with you about services, promotions, and updates</li>
                <li>Improve our website and customer experience</li>
                <li>Process payments and prevent fraud</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="font-oswald text-2xl font-bold mb-4">4. Sharing Your Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our business, such as payment processors and email service providers. These parties are obligated to keep your information confidential.
              </p>
            </section>

            <section>
              <h2 className="font-oswald text-2xl font-bold mb-4">5. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="font-oswald text-2xl font-bold mb-4">6. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Lodge a complaint with a supervisory authority</li>
              </ul>
            </section>

            <section>
              <h2 className="font-oswald text-2xl font-bold mb-4">7. Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website may use cookies and similar tracking technologies to enhance your browsing experience. You can set your browser to refuse cookies, but some features of our website may not function properly.
              </p>
            </section>

            <section>
              <h2 className="font-oswald text-2xl font-bold mb-4">8. SMS/Text Messaging Consent</h2>
              <p className="text-muted-foreground leading-relaxed">
                By opting into SMS from a web form or other medium, you are agreeing to receive SMS messages from The Doggy Detail. This includes SMS messages for conversations (external). Message frequency varies. Message and data rates may apply. See privacy policy at{' '}
                <a href="https://thedoggydetail.com/privacy-policy" className="text-racing-red hover:underline">https://thedoggydetail.com/privacy-policy</a>. Message HELP for help. Reply STOP to any message to opt out.
              </p>
            </section>

            <section>
              <h2 className="font-oswald text-2xl font-bold mb-4">9. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="mt-4 text-muted-foreground">
                <p><strong>The Doggy Detail</strong></p>
                <p>22421 El Toro Rd F, Lake Forest, CA 92630</p>
                <p>Phone: 949-298-6170</p>
                <p>Email: hello@thedoggydetail.com</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
