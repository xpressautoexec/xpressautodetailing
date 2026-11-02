import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PageTransition from "@/components/PageTransition";

const h2 = "font-heading text-xl font-semibold text-ink mb-3";
const ul = "list-disc pl-5 space-y-1";
const a = "font-semibold text-electric hover:underline";
const Email = () => <a href="mailto:support@xpressautodetail.ca" className={a}>support@xpressautodetail.ca</a>;
const Phone = () => <a href="tel:+15875004523" className={a}>587-500-4523</a>;

const PrivacyPolicy = () => (
  <PageTransition>
    <div className="min-h-screen bg-canvas">
      <SEO
        title="Privacy Policy | Xpress Auto & RV Detailing"
        description="How Xpress Auto & RV Detailing collects, uses and protects your personal information under Alberta's PIPA."
        canonical="/privacy-policy"
      />
      <Navbar />
      <AutoBreadcrumbs />
      <section className="py-14 sm:py-20">
        <div className="shell max-w-3xl">
          <h1 className="font-heading text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl mb-4">Privacy Policy</h1>
          <p className="text-sm text-muted-ink mb-12">Effective November 2, 2026</p>

          <div className="space-y-10 text-[15px] leading-relaxed text-ink-2">
            <p>Xpress Auto & RV Detailing ("we", "us") is a mobile detailing business serving Calgary and surrounding communities, operated by Alberta Keystone Solutions Ltd. This policy explains what personal information we collect, why we collect it, and how you can reach us about it. We follow Alberta's Personal Information Protection Act (PIPA).</p>

            <div>
              <h2 className={h2}>What we collect</h2>
              <ul className={ul}>
                <li>Contact details: your name, phone number and email address.</li>
                <li>Service details: your vehicle, RV or boat, the service you want, and the address where we do the work.</li>
                <li>Booking and payment records: your appointments, invoices and payments. Card payments are processed by Square. We never see or store your full card number.</li>
                <li>Ad responses: if you fill in one of our forms on Google (YouTube, Gmail or Discover), Google sends us the details you entered, along with a click ID that tells us which ad you came from.</li>
                <li>Course enquiries: if you apply for detailing training, we also keep your answer about your detailing experience.</li>
              </ul>
            </div>

            <div>
              <h2 className={h2}>How we use it</h2>
              <ul className={`${ul} mb-4`}>
                <li>To call you back, quote, book and do the work.</li>
                <li>To send confirmations, reminders and follow-ups about your service, by phone, text or email.</li>
                <li>To keep the records the law requires, such as tax records.</li>
                <li>To measure our advertising. When an ad enquiry becomes a booked job, we send Google that ad's click ID and the job amount, so we can see which ads bring in real customers. We don't send Google your name, phone or email for this.</li>
              </ul>
              <p>We don't sell or rent your personal information. We don't send marketing messages unless you've asked for them, and you can opt out at any time.</p>
            </div>

            <div>
              <h2 className={h2}>Who we share it with</h2>
              <p className="mb-2">We only share what's needed for these service providers to do their job:</p>
              <ul className={`${ul} mb-4`}>
                <li>Fieldd: our online booking system.</li>
                <li>Google: our advertising, lead forms, email and spreadsheets.</li>
                <li>Square: card payments.</li>
                <li>Lovable and Supabase: host our website and store the enquiries you send through our website forms.</li>
              </ul>
              <p>Some of these providers store data outside Canada, including in the United States. While it's there, it may be subject to that country's laws.</p>
            </div>

            <div>
              <h2 className={h2}>Website tracking</h2>
              <p>Our website uses the Google tag to measure our Google Ads. It records visits and clicks on our Book and phone links. When you send a form on our website, the Google tag also sends Google your email address and phone number in a scrambled (hashed) form, so Google can tell us which ad led to the enquiry. We don't use Google Analytics or the Meta Pixel. You can block the Google tag with your browser settings or an ad blocker.</p>
            </div>

            <div>
              <h2 className={h2}>How long we keep it</h2>
              <p>We keep booking and invoice records for at least six years, as the Canada Revenue Agency requires. Enquiries that never become a booking are deleted within 12 months.</p>
            </div>

            <div>
              <h2 className={h2}>Your choices</h2>
              <p>You can ask to see the personal information we hold about you, ask us to correct it, or withdraw your consent to us using it. Withdrawing consent may mean we can't provide a service. To do any of these, email <Email /> or call <Phone />. We'll reply within 30 days. If you're not satisfied with our answer, you can contact the Office of the Information and Privacy Commissioner of Alberta.</p>
            </div>

            <div>
              <h2 className={h2}>Changes</h2>
              <p>If we change this policy, we'll post the new version here with a new effective date.</p>
            </div>

            <div>
              <h2 className={h2}>Contact</h2>
              <p>Xpress Auto & RV Detailing · <Email /> · <Phone /></p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  </PageTransition>
);

export default PrivacyPolicy;
