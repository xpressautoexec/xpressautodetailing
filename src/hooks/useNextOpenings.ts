import { useQuery } from "@tanstack/react-query";
import type { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

const db = supabase as unknown as SupabaseClient;

export type OpeningScope = "all" | "auto" | "rv" | "fleet" | "marine" | "ceramic_ppf";
export type Opening = { id: string; starts_at: string; location: string; scope: OpeningScope };

/** Which openings a page shows, from its URL. Rows with scope "all" show everywhere. */
export const scopeForPath = (path: string): OpeningScope => {
  if (/^\/(rv|trailer)/.test(path)) return "rv";
  if (/^\/fleet/.test(path)) return "fleet";
  if (/^\/marine/.test(path)) return "marine";
  if (/(ceramic|paint|ppf|windshield)/.test(path)) return "ceramic_ppf";
  return "auto";
};

/** Upcoming, active openings (past ones are filtered out by the database policy). */
export const useNextOpenings = (scope: OpeningScope, limit = 2) =>
  useQuery({
    queryKey: ["next_openings", scope, limit],
    queryFn: async (): Promise<Opening[]> => {
      const { data, error } = await db
        .from("next_openings")
        .select("id,starts_at,location,scope")
        .in("scope", ["all", scope])
        .order("starts_at", { ascending: true })
        .limit(limit);
      if (error) return [];
      return (data ?? []) as Opening[];
    },
    staleTime: 60 * 1000,
  });

/** "Thu 10am" in Calgary time. */
export const formatOpening = (iso: string) => {
  const d = new Date(iso);
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Edmonton",
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const minute = get("minute");
  const period = get("dayPeriod").replace(/\./g, "").toLowerCase();
  return `${get("weekday")} ${get("hour")}${minute && minute !== "00" ? `:${minute}` : ""}${period}`;
};
