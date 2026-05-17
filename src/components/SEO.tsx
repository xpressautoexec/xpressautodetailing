import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const SITE_NAME = "Xpress Auto Detailing";
const BASE_URL = "https://xpressautodetail.ca";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-default.jpg`;

const SEO = ({
  title,
  description,
  canonical,
  ogImage,
  ogType = "website",
  jsonLd,
}: SEOProps) => {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : undefined;
  const image = ogImage || DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="author" content={SITE_NAME} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE_NAME} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;

/* ── Reusable JSON-LD builders ── */

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoDetailing",
  name: "Xpress Auto Detailing",
  url: "https://xpressautodetail.ca",
  telephone: "+1-587-500-4523",
  email: "support@xpressautodetail.ca",
  description: "Calgary's mobile car detailing service. Mobile detailing for cars, trucks, RVs, trailers, fleets — interior, exterior, paint correction, ceramic coating and oxidation removal. We come to you across Calgary, Airdrie, Cochrane and Chestermere.",
  areaServed: [
    { "@type": "City", name: "Calgary" },
    { "@type": "City", name: "Airdrie" },
    { "@type": "City", name: "Cochrane" },
    { "@type": "City", name: "Chestermere" },
    { "@type": "City", name: "Okotoks" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Calgary",
    addressRegion: "AB",
    addressCountry: "CA",
  },
  priceRange: "$$",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "200",
  },
};

export const buildServiceJsonLd = (name: string, description: string, url: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  url: `https://xpressautodetail.ca${url}`,
  provider: {
    "@type": "AutoDetailing",
    name: "Xpress Auto Detailing",
    telephone: "+1-587-500-4523",
    areaServed: { "@type": "City", name: "Calgary" },
  },
});

export const buildFAQJsonLd = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
});
