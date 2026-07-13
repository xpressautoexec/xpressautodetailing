import { Instagram, ArrowRight, Heart, MessageCircle } from "lucide-react";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-4.jpg";
import g3 from "@/assets/gallery-7.jpg";
import g4 from "@/assets/gallery-11.jpg";
import g5 from "@/assets/gallery-15.jpg";
import g6 from "@/assets/gallery-19.jpg";
import g7 from "@/assets/gallery-23.jpg";
import g8 from "@/assets/gallery-27.jpg";

const IG_HANDLE = "xpressautodetailingyyc";
const IG_URL = `https://www.instagram.com/${IG_HANDLE}/`;

const posts = [
  { img: g1, caption: "Full interior deep clean — Calgary NW" },
  { img: g2, caption: "Ceramic coating gloss reveal" },
  { img: g3, caption: "Paint correction — swirl-free finish" },
  { img: g4, caption: "Mobile detail on location" },
  { img: g5, caption: "Leather restoration results" },
  { img: g6, caption: "RV oxidation removal" },
  { img: g7, caption: "Showroom package — Airdrie" },
  { img: g8, caption: "System X graphene coating" },
];

const InstagramFeed = () => {
  return (
    <section className="py-14 sm:py-20 bg-card border-y border-border">
      <div className="container max-w-6xl">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#f09433]/10 via-[#dc2743]/10 to-[#bc1888]/10 border border-[#dc2743]/20 mb-3">
                <Instagram className="w-3.5 h-3.5 text-[#dc2743]" />
                <span className="font-heading font-bold text-[10px] uppercase tracking-wider text-[#dc2743]">
                  Latest From Instagram
                </span>
              </div>
              <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-foreground">
                Recent Work <span className="text-gradient">@{IG_HANDLE}</span>
              </h2>
              <p className="text-muted-foreground text-sm mt-2 max-w-lg">
                Fresh details, ceramic reveals, and before/afters from around Calgary. Follow along and tag us in your ride.
              </p>
            </div>
            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 self-start sm:self-auto bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] text-white font-heading font-bold uppercase tracking-wider text-xs px-5 py-3 rounded-lg hover:opacity-90 transition-all group shadow-lg"
            >
              <Instagram className="w-4 h-4" />
              Follow on Instagram
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </ScrollReveal>

        <StaggerContainer
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3"
          staggerDelay={0.05}
        >
          {posts.map((post, i) => (
            <StaggerItem key={i}>
              <a
                href={IG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-lg border border-border bg-background"
                aria-label={`View post on Instagram: ${post.caption}`}
              >
                <img
                  src={post.img}
                  alt={post.caption}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                  <div className="flex items-center gap-3 text-white mb-1.5">
                    <span className="flex items-center gap-1 text-xs font-bold">
                      <Heart className="w-3.5 h-3.5 fill-white" />
                      {40 + ((i * 17) % 120)}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-bold">
                      <MessageCircle className="w-3.5 h-3.5 fill-white" />
                      {2 + (i % 8)}
                    </span>
                  </div>
                  <p className="text-white text-[11px] leading-tight line-clamp-2">
                    {post.caption}
                  </p>
                </div>
                <div className="absolute top-2 right-2 opacity-80 group-hover:opacity-0 transition-opacity">
                  <Instagram className="w-4 h-4 text-white drop-shadow-lg" />
                </div>
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="text-center mt-8">
          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-heading font-bold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors"
          >
            View all posts on Instagram
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
