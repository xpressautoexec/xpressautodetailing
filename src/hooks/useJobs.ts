import { useQuery } from "@tanstack/react-query";
import type { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { JOB_SEED, jobPhotoUrl, type JobRecord } from "@/data/jobs";

const db = supabase as unknown as SupabaseClient;

const usable = (jobs: JobRecord[]) => jobs.filter((j) => jobPhotoUrl(j.photo_before) || j.photos.some((p) => jobPhotoUrl(p)));

/**
 * Published job receipts from the `jobs` table, in sort order. Renders the seed list first
 * (prerendered HTML, no layout jump) and swaps in the live rows when they arrive.
 */
export const useJobs = () =>
  useQuery({
    queryKey: ["jobs"],
    queryFn: async (): Promise<JobRecord[]> => {
      const { data, error } = await db
        .from("jobs")
        .select("slug,category,vehicle,package_name,price_paid,time_on_site,city,crew,photo_before,photos,photo_alts,featured_rank,sort_order")
        .order("sort_order", { ascending: true });
      if (error || !data?.length) return usable(JOB_SEED);
      return usable(data as JobRecord[]);
    },
    placeholderData: usable(JOB_SEED),
    staleTime: 5 * 60 * 1000,
  });

/** Homepage picks: featured_rank 1, 2, 3, topped up from the rest if fewer are set. */
export const featuredJobs = (jobs: JobRecord[], n = 3) => {
  const ranked = jobs.filter((j) => j.featured_rank).sort((a, b) => a.featured_rank! - b.featured_rank!);
  const rest = jobs.filter((j) => !j.featured_rank);
  return [...ranked, ...rest].slice(0, n);
};
