import { useEffect, useState } from "react";

/**
 * Returns false during server-side prerendering AND during the first client
 * render, then true after mount. This lets components render static,
 * fully-visible markup for crawlers while still animating for real users —
 * without causing hydration mismatches.
 */
export const useHydrated = () => {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
};
