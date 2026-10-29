import { notFound } from "@tanstack/react-router";

/** Retired public offerings are unavailable in preview and production alike. */
export function blockRemovedOffering(): never {
  throw notFound();
}

/** Omit retired offering clauses while preserving unrelated legal provisions. */
export function withoutRemovedOfferings(markdown: string): string {
  const topic = /startup|start-up|summit|incubat|prototype|grants?|funding\s+program|investment\s+program|business\s+valuation|स्टार्टअप|इन्क्यूबेशन|प्रोटोटाइप|ग्रांट|वैल्यूएशन|सम्मिट|समिट/i;
  let excludedSection = false;
  return markdown.split(/\n\s*\n/).filter((block) => {
    if (/^#{1,6}\s/m.test(block)) excludedSection = topic.test(block);
    return !excludedSection && !topic.test(block);
  }).join("\n\n");
}