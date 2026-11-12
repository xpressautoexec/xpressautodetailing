import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SEARCH_LINKS } from "@/data/navigation";

export default function SiteSearch({ onSelect, label = "Search services and resources" }: { onSelect?: () => void; label?: string }) {
  const [query, setQuery] = useState("");
  const results = query.trim() ? SEARCH_LINKS.filter(l => l.label.toLowerCase().includes(query.trim().toLowerCase())) : [];
  return <div className="relative w-full max-w-xl">
    <label className="sr-only" htmlFor={onSelect ? "header-search" : "footer-search"}>{label}</label>
    <div className="relative"><Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-electric" aria-hidden="true" /><Input id={onSelect ? "header-search" : "footer-search"} value={query} onChange={e => setQuery(e.target.value)} placeholder="Search services, protection and advice" className="h-14 rounded-full border-line bg-canvas pl-14 pr-5 text-base" /></div>
    {query.trim() && <div className="mt-3 rounded-card border border-line bg-canvas p-3" aria-live="polite">
      {results.length ? results.map(l => <Link key={l.label} to={l.href} onClick={() => { setQuery(""); onSelect?.(); }} className="flex min-h-11 items-center justify-between gap-4 px-3 text-base text-ink hover:text-electric">{l.label}<ArrowRight className="h-4 w-4 shrink-0" /></Link>) : <p className="p-3 text-base text-muted-ink">No services found.</p>}
    </div>}
  </div>;
}