const ServicePageHero = ({ title, image }: { title: string; image: string }) => (
  <section className="relative h-[300px] flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
    <div className="absolute inset-0 bg-brand-dark/70" />
    <h1 className="relative z-10 font-heading font-black text-3xl md:text-4xl lg:text-5xl uppercase text-primary-foreground text-center px-4 leading-tight">
      {title}
    </h1>
  </section>
);

export default ServicePageHero;
