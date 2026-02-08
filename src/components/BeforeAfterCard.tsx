interface BeforeAfterCardProps {
  beforeIcon: string;
  beforeTitle: string;
  beforeText: string;
  afterTitle: string;
  afterText: string;
}

const BeforeAfterCard = ({ beforeIcon, beforeTitle, beforeText, afterTitle, afterText }: BeforeAfterCardProps) => (
  <div className="space-y-4">
    <div className="p-6 sm:p-7 rounded-xl border border-border bg-muted/20 hover:border-border/80 transition-all duration-300 hover:shadow-md group">
      <h4 className="font-heading font-bold text-foreground uppercase text-sm mb-3 flex items-center gap-2">
        <span className="text-lg">{beforeIcon}</span>
        {beforeTitle}
      </h4>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {beforeText}
      </p>
    </div>
    <div className="p-6 sm:p-7 rounded-xl border border-primary/20 bg-primary/5 hover:border-primary/40 hover:bg-primary/[0.08] transition-all duration-300 hover:shadow-md hover:shadow-primary/5 group">
      <h4 className="font-heading font-bold text-primary uppercase text-sm mb-3 flex items-center gap-2">
        <span className="text-lg">✨</span>
        {afterTitle}
      </h4>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {afterText}
      </p>
    </div>
  </div>
);

export default BeforeAfterCard;
