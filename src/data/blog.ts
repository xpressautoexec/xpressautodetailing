/**
 * Blog posts. Each post is one JSON file in src/content/blog/<slug>.json —
 * adding a file publishes the post: it gets a /blog/<slug> page, a card on /blog,
 * a prerendered HTML file and a sitemap entry. No other file needs editing.
 *
 * Rules for post content (same as the rest of the site): no prices (link to the
 * service page instead), no invented stats, testimonials or case studies, no emojis.
 */

export type BlogSection = { heading: string; paragraphs: string[] };

export type BlogPostData = {
  slug: string;
  title: string;
  /** Meta description, ~150 characters. */
  description: string;
  /** Card text on /blog. */
  excerpt: string;
  /** ISO date, YYYY-MM-DD. Posts with a future date stay hidden until that day. */
  date: string;
  /** Path of an image under src/assets, e.g. "jobs/hero-home.webp". */
  image: string;
  imageAlt: string;
  sections: BlogSection[];
  faqs?: { q: string; a: string }[];
  related?: { label: string; to: string }[];
};

export type BlogCard = { title: string; excerpt: string; date: string; href: string; image: string };

const files = import.meta.glob<BlogPostData>("../content/blog/*.json", { eager: true, import: "default" });
const images = import.meta.glob<string>("../assets/**/*.{jpg,jpeg,png,webp}", { eager: true, import: "default" });

export const imageFor = (name: string) => images[`../assets/${name}`] ?? images["../assets/gallery-1.jpg"];

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

/** Today in Calgary, YYYY-MM-DD. */
const today = () => new Date().toLocaleDateString("en-CA", { timeZone: "America/Edmonton" });

export const BLOG_POSTS: BlogPostData[] = Object.values(files)
  .filter((p) => p.date <= today())
  .sort((a, b) => b.date.localeCompare(a.date));

export const getPost = (slug: string) => BLOG_POSTS.find((p) => p.slug === slug);

/** Articles that live on their own hand-built pages. */
const STANDALONE: BlogCard[] = [
  {
    title: "Calgary car detailing prices: mobile vs shop compared",
    excerpt:
      "Every package price we charge, what a comparable Calgary shop typically quotes, and where the real cost difference is. Add-on pricing published up front.",
    date: "2026-07-30",
    href: "/calgary-detailing-price-comparison",
    image: "jobs/card-car-mercedes-c-class.webp",
  },
  {
    title: "PPF vs ceramic coating for Calgary winters",
    excerpt:
      "Salt brine and mag chloride attack paint chemically; Deerfoot gravel attacks it mechanically. What film stops, what a coating stops, and when each makes sense.",
    date: "2026-07-30",
    href: "/blog/ppf-vs-ceramic-coating-calgary",
    image: "jobs/headlight-mercedes-white.webp",
  },
];

/** Every card on /blog, newest first. */
export const BLOG_CARDS: BlogCard[] = [
  ...STANDALONE,
  ...BLOG_POSTS.map((p) => ({ title: p.title, excerpt: p.excerpt, date: p.date, href: `/blog/${p.slug}`, image: p.image })),
].sort((a, b) => b.date.localeCompare(a.date));
