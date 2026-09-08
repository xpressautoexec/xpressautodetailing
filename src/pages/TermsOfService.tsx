import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PageTransition from "@/components/PageTransition";

const TermsOfService = () => (
  <PageTransition>
    <div className="min-h-screen">
      <SEO
        title="Terms & Conditions — Xpress Auto Detailing"
        description="Terms and conditions for Xpress Auto Detailing mobile services across Calgary, Airdrie, Chestermere, Cochrane, Okotoks and Rocky View County — booking, cancellation, coatings, PPF, tint, marine and RV policies."
        canonical="/terms-of-service"
      />
      <Navbar />
        <AutoBreadcrumbs />
      <section className="py-16 bg-background">
        <div className="container max-w-3xl">
          <h1 className="font-heading font-black text-3xl md:text-4xl uppercase text-foreground mb-4">Terms & Conditions</h1>
          <p className="text-sm text-muted-foreground mb-10">Last updated: July 2026</p>

          <div className="space-y-8 text-muted-foreground text-sm leading-relaxed">

            <div>
              <h2 className="font-heading font-bold text-lg text-foreground uppercase mb-3">1. General Agreement</h2>
              <p>By booking any service with Xpress Auto Detailing ("the Company"), the client ("the Client") agrees to the following Terms & Conditions. These policies apply to all mobile and shop-based services performed across our service area — including Calgary, Airdrie, Chestermere, Cochrane, Okotoks and Rocky View County — and cover auto detailing, ceramic coatings, paint protection film (PPF), window tinting, marine and pontoon detailing, RV and trailer services, fleet programs, and detailing training.</p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-lg text-foreground uppercase mb-3">2. 14-Day Service Guarantee</h2>
              <p className="mb-3">Xpress Auto Detailing provides a 14-Day Service Guarantee beginning on the date the service is completed. This guarantee applies to standard interior and exterior detailing services only and does not extend to coating, PPF, tint, or training products which carry their own manufacturer or program terms.</p>
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
              <p>If the vehicle, boat, or RV is found to contain excessive pet hair, mold, bodily fluids, hazardous waste, or extreme dirtiness, additional fees may apply. Estimates for RV, trailer, and marine services are based on standard condition; heavy oxidation, deep staining, or restoration-level work may require a revised quote before work continues.</p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-lg text-foreground uppercase mb-3">5. Weather, Location & Service Limitations</h2>
              <p className="mb-2">All mobile services are weather- and location-dependent. For safety and quality reasons, the Company may postpone or modify services due to:</p>
              <ul className="list-disc pl-5 space-y-1 mb-2">
                <li>Heavy rain, snow, hail, or storms;</li>
                <li>Extreme cold or heat outside product specifications;</li>
                <li>Unsafe working environments;</li>
                <li>Insufficient lighting, shelter, water, or space to perform the service.</li>
              </ul>
              <p className="mb-2">The Client is responsible for providing safe, legal access to the vehicle at the booked address. Coatings, PPF, and tint installations are performed in controlled shop conditions and must be scheduled accordingly.</p>
              <p>The Company reserves the right to reschedule at no penalty to the Client.</p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-lg text-foreground uppercase mb-3">6. Liability Limitations</h2>
              <p className="mb-2">The Company shall not be liable for:</p>
              <ul className="list-disc pl-5 space-y-1 mb-2">
                <li>Loss or damage arising from circumstances outside its control;</li>
                <li>Items left inside the vehicle, boat, or RV;</li>
                <li>Battery drainage resulting from door access, lights, or electronics during the service;</li>
                <li>Damage to aftermarket accessories, wraps, decals, or improperly installed components.</li>
              </ul>
              <p>The Client is responsible for ensuring the vehicle, boat, or RV is mechanically sound and safe to service.</p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-lg text-foreground uppercase mb-3">7. Ceramic Coating Terms (System X)</h2>
              <p className="mb-2">Ceramic coating services use System X Graphene and related System X products. Manufacturer warranty terms are provided directly by System X and are subject to registration and adherence to the maintenance schedule supplied at handover.</p>
              <p className="mb-2">The Company's installation coverage includes:</p>
              <ul className="list-disc pl-5 space-y-1 mb-3">
                <li>Coating failure attributable to installation error, reported within the 14-day service window.</li>
              </ul>
              <p className="mb-2">Coverage DOES NOT include:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Scratches, rock chips, swirls, or paint damage;</li>
                <li>Water spots, chemical etching, fire, vandalism, accidents, or environmental fallout;</li>
                <li>Improper washing techniques, automatic car washes, or neglect;</li>
                <li>Failure to follow the System X maintenance recommendations.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-heading font-bold text-lg text-foreground uppercase mb-3">8. Paint Protection Film (PPF)</h2>
              <p className="mb-2">PPF installations are performed using XPEL and 3M films. Film warranty terms (including yellowing, cracking, and delamination coverage) follow the manufacturer's published warranty and are subject to registration.</p>
              <p>Minor stretch marks, edge visibility, and relief cuts around complex panels are inherent to PPF installation and are not defects. The Company does not warrant against damage caused by impacts, improper washing, pressure washing at close range, harsh chemicals, or aftermarket modifications performed after installation.</p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-lg text-foreground uppercase mb-3">9. Window Tinting</h2>
              <p className="mb-2">Window tint installations are backed by the film manufacturer's warranty against bubbling, peeling, and colour change. Small dust particles, minor imperfections, and initial haze during the curing period (up to 30 days) are normal and are not considered defects.</p>
              <p>Clients must not roll windows down or clean the interior glass for the manufacturer-recommended curing period. Tint darkness levels are selected by the Client; the Company is not responsible for compliance with jurisdictional VLT regulations on public roads.</p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-lg text-foreground uppercase mb-3">10. Marine, Pontoon, RV & Trailer Services</h2>
              <p className="mb-2">Pricing for marine, pontoon, RV, and trailer services is typically quoted by length (per foot), per side, or per unit as specified in the estimator. Final invoices are calculated on measured length and confirmed scope at the time of service.</p>
              <p>Aluminum pontoon restoration, oxidation removal, and decal restoration are cosmetic services. Results depend on substrate condition and are not guaranteed to remove all oxidation, staining, or pre-existing damage.</p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-lg text-foreground uppercase mb-3">11. Fleet & Corporate Programs</h2>
              <p>Fleet, corporate, and RV rental fleet care agreements are governed by the specific pricing, scope, and scheduling terms outlined in the signed service agreement between the Company and the Client. Where a signed agreement exists, its terms supersede any conflicting provisions of this document.</p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-lg text-foreground uppercase mb-3">12. Detailing Training Program</h2>
              <p>Training course fees are payable in full at the time of enrolment and are non-refundable once course materials have been accessed or the course start date has passed. Rescheduling of a training seat is permitted with at least 7 days' notice, subject to availability.</p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-lg text-foreground uppercase mb-3">13. Deposit & Payment Requirements</h2>
              <p className="mb-3">To secure an appointment, the Client may be required to pay a non-refundable booking deposit at the time of booking. This deposit confirms the reservation and is applied toward the total cost of the service.</p>
              <p className="mb-2">The remaining balance is due upon completion of service unless alternative terms have been agreed in writing. Failure to submit payment may result in:</p>
              <ul className="list-disc pl-5 space-y-1 mb-2">
                <li>Suspension of future bookings;</li>
                <li>Application of outstanding balance fees;</li>
                <li>Initiation of collection procedures as permitted by law.</li>
              </ul>
              <p>All coatings, PPF, tint, and installed materials remain the property of Xpress Auto Detailing until payment is received in full.</p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-lg text-foreground uppercase mb-3">14. Privacy & Communications</h2>
              <p>Contact information provided at booking is used to schedule, confirm, and follow up on services. By booking, the Client consents to service-related communication via email, SMS, and phone. Further details are available in our Privacy Policy.</p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-lg text-foreground uppercase mb-3">15. Acceptance of Terms</h2>
              <p className="mb-3">By scheduling or receiving service, the Client acknowledges and agrees to all Terms & Conditions listed above.</p>
              <p>Questions regarding these Terms can be directed to Xpress Auto Detailing at <a href="tel:5875004523" className="text-primary underline">587-500-4523</a> or <a href="mailto:support@xpressautodetail.ca" className="text-primary underline">support@xpressautodetail.ca</a>.</p>
            </div>

          </div>
        </div>
      </section>
      <Footer />
    </div>
  </PageTransition>
);

export default TermsOfService;
