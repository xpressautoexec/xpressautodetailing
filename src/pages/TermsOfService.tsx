import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PageTransition from "@/components/PageTransition";

const TermsOfService = () => (
  <PageTransition>
    <div className="min-h-screen">
      <SEO title="Terms & Conditions — Xpress Auto Detailing Calgary" description="Read the full terms and conditions for Xpress Auto Detailing mobile car detailing services in Calgary, including cancellation, liability and payment policies." canonical="/terms-conditions" />
      <Navbar />
      <section className="py-16 bg-background">
        <div className="container max-w-3xl">
          <h1 className="font-heading font-black text-3xl md:text-4xl uppercase text-foreground mb-10">Terms & Conditions</h1>
          <div className="space-y-8 text-muted-foreground text-sm leading-relaxed">

            <div>
              <h2 className="font-heading font-bold text-lg text-foreground uppercase mb-3">1. General Agreement</h2>
              <p>By booking any service with Xpress Auto Detailing ("the Company"), the client ("the Client") agrees to the following Terms & Conditions. These policies exist to ensure clarity, fairness, and operational efficiency.</p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-lg text-foreground uppercase mb-3">2. 14-Day Service Guarantee</h2>
              <p className="mb-3">Xpress Auto Detailing provides a 14-Day Service Guarantee beginning on the date the service is completed.</p>
              <p className="mb-3">During this period, the Company will review any service-related concerns submitted by the Client. After an internal assessment, the Company, at its sole discretion, may offer one of the following remedies:</p>
              <ul className="list-disc pl-5 space-y-1 mb-4">
                <li>Dispatch of a technician to re-perform the service or applicable portion;</li>
                <li>A partial refund;</li>
                <li>A full refund.</li>
              </ul>
              <p className="mb-4">All determinations regarding eligibility and remedy are final and remain solely at the discretion of the Company.</p>

              <h3 className="font-heading font-bold text-foreground text-sm uppercase mb-2">2.1 Exclusions</h3>
              <p className="mb-2">Complaints will not be considered if:</p>
              <ul className="list-disc pl-5 space-y-1 mb-2">
                <li>The vehicle has been dirtied, used, or materially altered in a way that prevents accurate evaluation of the original service;</li>
                <li>The issue arises from normal driving conditions, weather, road debris, environmental exposure, or misuse;</li>
                <li>The Client fails to report the concern within the 14-day period.</li>
              </ul>
              <p>The Client must present the vehicle in substantially the same condition as immediately following service for any claim under this guarantee.</p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-lg text-foreground uppercase mb-3">3. Scheduling, Rescheduling & Cancellation</h2>

              <h3 className="font-heading font-bold text-foreground text-sm uppercase mb-2">3.1 Rescheduling Policy</h3>
              <p className="mb-2">Rescheduling fees apply to compensate for reserved technician time and scheduling impacts.</p>
              <ul className="list-disc pl-5 space-y-1 mb-4">
                <li><strong>Within 24 hours:</strong> $20 or 10% of the service cost — whichever is greater.</li>
                <li><strong>Within 12 hours:</strong> $50 or 25% of the service cost — whichever is greater.</li>
              </ul>
              <p className="mb-4">Rescheduling more than 24 hours before the appointment incurs no fee.</p>

              <h3 className="font-heading font-bold text-foreground text-sm uppercase mb-2">3.2 Cancellation Policy</h3>
              <p className="mb-2">Due to the nature of mobile services and time allocation, cancellations trigger the following charges:</p>
              <ul className="list-disc pl-5 space-y-1 mb-2">
                <li><strong>Within 24 hours:</strong> 50% of the service total will be billed.</li>
                <li><strong>Within 12 hours:</strong> 75% of the service total will be billed.</li>
              </ul>
              <p>No-shows are considered cancellations within 12 hours and will be charged at 100%.</p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-lg text-foreground uppercase mb-3">4. Vehicle Condition & Additional Charges</h2>

              <h3 className="font-heading font-bold text-foreground text-sm uppercase mb-2">4.1 Pre-Existing Conditions</h3>
              <p className="mb-2">The Company is not responsible for:</p>
              <ul className="list-disc pl-5 space-y-1 mb-4">
                <li>Pre-existing damage, defects, scratches, tears, stains, flaws, or weakened clear coat;</li>
                <li>Electrical or mechanical issues unrelated to the detailing service;</li>
                <li>Damage resulting from items left in the vehicle.</li>
              </ul>
              <p className="mb-4">Technicians may document pre-existing conditions with photos before beginning work.</p>

              <h3 className="font-heading font-bold text-foreground text-sm uppercase mb-2">4.2 Excessive Soiling Charges</h3>
              <p>If the vehicle is found to contain excessive pet hair, mold, bodily fluids, hazardous waste, or extreme dirtiness, additional fees may apply. These will be disclosed before work begins whenever possible.</p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-lg text-foreground uppercase mb-3">5. Weather & Service Limitations</h2>
              <p className="mb-2">All services are weather-dependent. For safety and quality reasons, the Company may postpone or modify services due to:</p>
              <ul className="list-disc pl-5 space-y-1 mb-2">
                <li>Heavy rain or storms</li>
                <li>Extreme cold or heat</li>
                <li>Unsafe working environments</li>
                <li>Insufficient lighting or space to perform the service</li>
              </ul>
              <p>The Company reserves the right to reschedule at no penalty to the Client.</p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-lg text-foreground uppercase mb-3">6. Liability Limitations</h2>
              <p className="mb-2">The Company shall not be liable for:</p>
              <ul className="list-disc pl-5 space-y-1 mb-2">
                <li>Loss or damage arising from circumstances outside its control;</li>
                <li>Items left inside the vehicle;</li>
                <li>Battery drainage resulting from door access, lights, or electronics during the service;</li>
                <li>Damage to aftermarket accessories or improperly installed components.</li>
              </ul>
              <p>The Client is responsible for ensuring the vehicle is mechanically sound and safe to service.</p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-lg text-foreground uppercase mb-3">7. Ceramic Coating Terms</h2>
              <p className="mb-2">Ceramic coating longevity depends on proper maintenance. The Guarantee covers:</p>
              <ul className="list-disc pl-5 space-y-1 mb-3">
                <li>Coating failure due to installation error within the 14-day window.</li>
              </ul>
              <p className="mb-2">The Guarantee DOES NOT cover:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Scratches, rock chips, swirls, or paint damage;</li>
                <li>Water spots, chemical etching, fire, vandalism, accidents, or environmental fallout;</li>
                <li>Improper washing techniques or neglect;</li>
                <li>Failure to follow maintenance recommendations.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-heading font-bold text-lg text-foreground uppercase mb-3">8. Deposit & Payment Requirements</h2>
              <p className="mb-3">To secure an appointment, the Client is required to pay a $1.00 non-refundable deposit at the time of booking. This deposit confirms the reservation and is applied toward the total cost of the service.</p>
              <p className="mb-2">The remaining balance must be paid in full within 14 days of the service date, regardless of whether the Client is present at the time of completion. Failure to submit payment within this period may result in:</p>
              <ul className="list-disc pl-5 space-y-1 mb-2">
                <li>Suspension of future bookings,</li>
                <li>Application of outstanding balance fees, and/or</li>
                <li>Initiation of collection procedures as permitted by law.</li>
              </ul>
              <p>All services remain the property of Xpress Auto Detailing until payment is received in full.</p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-lg text-foreground uppercase mb-3">9. Acceptance of Terms</h2>
              <p>By scheduling or receiving service, the Client acknowledges and agrees to all Terms & Conditions listed above.</p>
            </div>

          </div>
        </div>
      </section>
      <Footer />
    </div>
  </PageTransition>
);

export default TermsOfService;
