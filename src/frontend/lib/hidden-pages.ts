import { notFound } from "@tanstack/react-router";
/** Pages under construction: visible only in the editor preview (dev), 404 on the live site. Set to true to go live. */
export const HIDDEN_PAGES_LIVE = true;
export function lockHiddenPage() {
  if (!HIDDEN_PAGES_LIVE && !import.meta.env.DEV) throw notFound();
}

/** Global Presence (page + 8 country pages): hidden on the live site until the pages are final. Set to true to go live. */
export const GLOBAL_PRESENCE_LIVE = false;
export function lockGlobalPresence() {
  if (!GLOBAL_PRESENCE_LIVE && !import.meta.env.DEV) throw notFound();
}
