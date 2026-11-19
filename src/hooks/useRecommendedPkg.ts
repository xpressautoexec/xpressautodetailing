import { useSearchParams } from "react-router-dom";

/** Package id from `?pkg=` (set by the home page package finder), for the "Recommended for you" highlight. */
export const useRecommendedPkg = (): string | null => {
  const [searchParams] = useSearchParams();
  return searchParams.get("pkg");
};
