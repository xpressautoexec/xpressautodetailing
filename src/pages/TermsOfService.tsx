import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PageTransition from "@/components/PageTransition";

const TermsOfService = () => (
  <PageTransition>
    <div className="min-h-screen">
      <SEO title="Terms of Service | Xpress Auto Detailing" description="Terms of service for Xpress Auto Detailing mobile car detailing services in Calgary." canonical="/terms-of-service" />
      <Navbar />
      <section className="py-16 bg-background">
        <div className="container max-w-3xl">
          <h1 className="font-heading font-black text-3xl md:text-4xl uppercase text-foreground mb-8">Terms of Service</h1>
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
            <p className="text-sm">Last updated: February 2026</p>

            <h2 className="font-heading font-bold text-lg text-foreground uppercase">1. Services</h2>
            <p>Xpress Auto Detailing ("we", "us", "our") provides mobile auto detailing services in Calgary and surrounding areas. By booking a service, you agree to these Terms of Service.</p>

            <h2 className="font-heading font-bold text-lg text-foreground uppercase">2. Booking & Scheduling</h2>
            <p>All bookings are made through our online scheduling platform. By placing a booking, you confirm that the information provided is accurate and that you have authority to authorize service on the vehicle. We reserve the right to reschedule or cancel bookings due to inclement weather, unsafe working conditions, or unforeseen circumstances. We will provide at least 2 hours' notice when possible.</p>

            <h2 className="font-heading font-bold text-lg text-foreground uppercase">3. Pricing & Payment</h2>
            <p>Prices are as quoted at the time of booking. Additional charges may apply for excessive dirt, pet hair, biohazards, or conditions not disclosed at booking — these will be communicated and approved before work begins. Payment is due upon completion of service. We accept major credit cards, debit, e-transfer, and cash.</p>

            <h2 className="font-heading font-bold text-lg text-foreground uppercase">4. Cancellation & No-Show Policy</h2>
            <p>Cancellations made more than 24 hours before the scheduled appointment are free of charge. Cancellations within 24 hours of the appointment may be subject to a cancellation fee of up to 50% of the service total. No-shows will be charged the full service amount.</p>

            <h2 className="font-heading font-bold text-lg text-foreground uppercase">5. Satisfaction Guarantee</h2>
            <p>We stand behind our work with a 14-day satisfaction guarantee. If you are not satisfied with the results, contact us within 14 days and we will re-do the service or issue a refund at our discretion. Claims must include photos and a description of the concern.</p>

            <h2 className="font-heading font-bold text-lg text-foreground uppercase">6. Vehicle Condition & Liability</h2>
            <p>We take every precaution to protect your vehicle. However, we are not liable for pre-existing damage, paint defects, loose trim, cracked windshields, or mechanical issues. Any existing damage will be noted prior to service. We carry full commercial liability insurance. In the unlikely event of damage caused by our team, we will address it promptly and professionally.</p>

            <h2 className="font-heading font-bold text-lg text-foreground uppercase">7. Access & Location Requirements</h2>
            <p>You must provide a suitable location for mobile detailing — including access to the vehicle, adequate space, and (where required) access to a water source and electrical outlet. We reserve the right to decline service if the location is unsafe or unsuitable.</p>

            <h2 className="font-heading font-bold text-lg text-foreground uppercase">8. Personal Belongings</h2>
            <p>Please remove all personal belongings and valuables from your vehicle before the appointment. Xpress Auto Detailing is not responsible for lost, damaged, or stolen items left in the vehicle.</p>

            <h2 className="font-heading font-bold text-lg text-foreground uppercase">9. Photos & Media</h2>
            <p>We may take before and after photos of your vehicle for quality assurance and marketing purposes. If you do not wish for your vehicle to be photographed, please let us know before the appointment.</p>

            <h2 className="font-heading font-bold text-lg text-foreground uppercase">10. Privacy</h2>
            <p>We collect personal information solely for the purpose of providing our services. We do not sell or share your information with third parties. Contact information may be used for appointment reminders, follow-ups, and promotional offers. You may opt out of marketing communications at any time.</p>

            <h2 className="font-heading font-bold text-lg text-foreground uppercase">11. Changes to Terms</h2>
            <p>We reserve the right to update these Terms of Service at any time. Changes will be posted on this page with an updated date. Continued use of our services constitutes acceptance of the revised terms.</p>

            <h2 className="font-heading font-bold text-lg text-foreground uppercase">12. Contact</h2>
            <p>If you have questions about these terms, please contact us:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Email: support@xpressautodetailing.ca</li>
              <li>Phone: 587-500-4523</li>
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  </PageTransition>
);

export default TermsOfService;
