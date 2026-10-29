import { createFileRoute } from "@tanstack/react-router";
import { blockRemovedOffering } from "@/frontend/lib/removed-offerings";

export const Route = createFileRoute("/fund-your-startup")({
  beforeLoad: blockRemovedOffering,
  head: () => ({ meta: [
    { title: "Page Unavailable — Rishishwar Industry" },
    { name: "description", content: "This page is no longer available. Visit Rishishwar Industry for retail partnerships and distribution support." },
    { property: "og:title", content: "Page Unavailable — Rishishwar Industry" },
    { property: "og:description", content: "Explore retail partnerships and distribution support with Rishishwar Industry." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "robots", content: "noindex, nofollow" },
  ] }),
});
