/**
 * Ad-click and campaign attribution, captured on landing and attached to every lead.
 *
 * gclid/gbraid/wbraid are kept for 90 days (Google Ads' click window); UTMs are first-touch
 * for the session. Stored in localStorage/sessionStorage; every read is guarded because
 * storage can be blocked (private mode, in-app browsers).
 */

const CLICK_KEYS = ["gclid", "gbraid", "wbraid"] as const;
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
const CLICK_STORE = "xp_click";
const SESSION_STORE = "xp_attr";
const CLICK_TTL_MS = 90 * 24 * 60 * 60 * 1000;

type ClickKey = (typeof CLICK_KEYS)[number];
type UtmKey = (typeof UTM_KEYS)[number];
export type Attribution = Partial<Record<ClickKey | UtmKey, string>> & {
  landing_page?: string;
  referrer?: string;
};

const read = (store: Storage | undefined, key: string) => {
  try {
    const raw = store?.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};
const write = (store: Storage | undefined, key: string, value: unknown) => {
  try {
    store?.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable */
  }
};
const clip = (v: string | null, n = 300) => (v ? v.slice(0, n) : undefined);

/** Call once on app start (browser only). */
export const captureAttribution = () => {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const local = (() => {
    try {
      return window.localStorage;
    } catch {
      return undefined;
    }
  })();
  const session = (() => {
    try {
      return window.sessionStorage;
    } catch {
      return undefined;
    }
  })();

  const clicks = Object.fromEntries(CLICK_KEYS.map((k) => [k, clip(params.get(k))]).filter(([, v]) => v));
  if (Object.keys(clicks).length) write(local, CLICK_STORE, { ...clicks, at: Date.now() });

  if (!read(session, SESSION_STORE)) {
    const utms = Object.fromEntries(UTM_KEYS.map((k) => [k, clip(params.get(k), 200)]).filter(([, v]) => v));
    write(session, SESSION_STORE, {
      ...utms,
      landing_page: clip(window.location.pathname + window.location.search, 500),
      referrer: clip(document.referrer || null, 500),
    });
  } else {
    // A later ad click in the same session still updates the UTMs it carries.
    const utms = Object.fromEntries(UTM_KEYS.map((k) => [k, clip(params.get(k), 200)]).filter(([, v]) => v));
    if (Object.keys(utms).length) write(session, SESSION_STORE, { ...read(session, SESSION_STORE), ...utms });
  }
};

/** Everything we know about where this visitor came from. */
export const getAttribution = (): Attribution => {
  if (typeof window === "undefined") return {};
  let local: Storage | undefined;
  let session: Storage | undefined;
  try {
    local = window.localStorage;
    session = window.sessionStorage;
  } catch {
    /* blocked */
  }
  const click = read(local, CLICK_STORE);
  const clickFresh = click && typeof click.at === "number" && Date.now() - click.at < CLICK_TTL_MS;
  const attr = read(session, SESSION_STORE) ?? {};
  const out: Attribution = { ...attr };
  if (clickFresh) CLICK_KEYS.forEach((k) => click[k] && (out[k] = click[k]));
  return out;
};
