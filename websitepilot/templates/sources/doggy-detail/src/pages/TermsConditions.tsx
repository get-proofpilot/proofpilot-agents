import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const TermsConditions: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="font-oswald text-4xl md:text-5xl font-bold text-foreground mb-8">Terms & Conditions</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 28, 2025</p>
          
          <div className="prose prose-lg max-w-none space-y-8 text-foreground">
            <section>
              <h2 className="font-oswald text-2xl font-bold mb-4">1. Agreement to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing or using The Doggy Detail's website and services, you agree to be bound by these Terms & Conditions. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="font-oswald text-2xl font-bold mb-4">2. Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                The Doggy Detail provides self-service dog wash and spa services. We reserve the right to refuse service to any pet that displays aggressive behavior or poses a risk to our staff, other pets, or property.
              </p>
            </section>

            <section>
              <h2 className="font-oswald text-2xl font-bold mb-4">3. Pet Acceptance Policy</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Pets are accepted for grooming services only under the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>The pet is fit and healthy. Grooming which takes place on an elderly or infirm pet will be at the owner's risk.</li>
                <li>The pet's rabies vaccine is up to date (as required by law).</li>
                <li>In the event of an emergency, in your absence, you authorize us to contact the nearest Veterinarian and authorize the Vet to treat the pet as necessary at your expense.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-oswald text-2xl font-bold mb-4">4. Payment Terms</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Payment is to be made at the time of service, with a 50% deposit at time of booking.</li>
                <li>Payment is by credit card.</li>
                <li>Our rates are based on the breed of the pet and duration of the groom.</li>
                <li>Nail cutting, anal gland expression, and ear cleaning are part of the service unless the process is too stressful for the pet or too dangerous for the groomer.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-oswald text-2xl font-bold mb-4">5. De-Matting Notice</h2>
              <p className="text-muted-foreground leading-relaxed">
                "De-matting" or complete coat removal will dramatically alter your pet's appearance.
              </p>
            </section>

            <section>
              <h2 className="font-oswald text-2xl font-bold mb-4">6. Cancellations</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>We try to work as long as conditions are not dangerous. If you are unsure, please call us to confirm.</li>
                <li>Cancellation and rescheduling of an appointment, by the client, requires 24 hours notice to waive the 50% deposit fee.</li>
                <li>In the event of inclement weather, a family emergency, or any other uncontrollable circumstance, the groomer has the discretion to waive the fee within the 24-hour period.</li>
                <li>We reserve the right to cancel or reschedule a groom if we feel the need to do so. Every effort will be made to reschedule at a time convenient for both the client and the groomer.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-oswald text-2xl font-bold mb-4">7. No-Shows</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>It is considered a "no-show" when the client is not available at the scheduled appointment time and does not contact the groomer to cancel or reschedule.</li>
                <li>We reserve the right to charge 50% of the appointment fee due to the loss of revenue caused by a "no-show". Please make every effort to call and cancel or reschedule when possible to avoid such situations.</li>
                <li>We reserve the right to refuse service to any pet or client for any reason.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-oswald text-2xl font-bold mb-4">8. Late Arrivals / Pick-Ups</h2>
              <p className="text-muted-foreground leading-relaxed">
                Out of respect to our patrons and due to limited facility space, we ask that you do everything possible to be on time. Should you be more than 5–10 minutes late, please reach out to us by phone or text at 949-298-6170. We will work with you to accommodate the appointment based on time available or look to rescheduling. For clients that pick up later than 20 minutes of the notified pick up time we will assess an additional $5 per each 5 minute increment.
              </p>
            </section>

            <section>
              <h2 className="font-oswald text-2xl font-bold mb-4">9. Self-Service Dog Wash Rules</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Dogs must remain on leash when not in wash stations.</li>
                <li>Owners must supervise their pets at all times.</li>
                <li>Please clean up after your pet and leave the station tidy for the next customer.</li>
                <li>Time limits may apply during busy periods.</li>
                <li>Aggressive dogs are not permitted in the self-service area.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-oswald text-2xl font-bold mb-4">10. Membership Terms</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                For members of The Doggy Detail Club:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Memberships are for the individual pet and are non-transferable.</li>
                <li>Monthly memberships will automatically renew unless cancelled.</li>
                <li>Cancellation requests must be made at least 7 days before the next billing date.</li>
                <li>Unused visits do not roll over to the next month.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-oswald text-2xl font-bold mb-4">11. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content on this website, including text, graphics, logos, and images, is the property of The Doggy Detail and is protected by copyright laws. You may not reproduce, distribute, or use any content without our written permission.
              </p>
            </section>

            <section>
              <h2 className="font-oswald text-2xl font-bold mb-4">12. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                To the fullest extent permitted by law, The Doggy Detail shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services or website.
              </p>
            </section>

            <section>
              <h2 className="font-oswald text-2xl font-bold mb-4">13. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these Terms & Conditions at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services constitutes acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="font-oswald text-2xl font-bold mb-4">14. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms & Conditions, please contact us at:
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

export default TermsConditions;
