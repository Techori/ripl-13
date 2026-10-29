import { describe, expect, it } from "vitest";
import { blockRemovedOffering, withoutRemovedOfferings } from "@/frontend/lib/removed-offerings";
import { answerQuestion } from "@/lib/ripl-assistant";

describe("retired public offerings", () => {
  it("denies public access in development as well as production", () => {
    expect(blockRemovedOffering).toThrow();
  });
  it("keeps unrelated legal clauses and removes retired programme sections", () => {
    const body = "# Contact\n\nContact us.\n\n# Startup Funding Programmes\n\n₹20 lakh grants.\n\n# Privacy\n\nKeep records private.";
    expect(withoutRemovedOfferings(body)).toBe("# Contact\n\nContact us.\n\n# Privacy\n\nKeep records private.");
  });
  it("does not offer retired grants when asked", () => {
    expect(answerQuestion("Startup Summit 2026 grant" )).toBe("इस विषय की जानकारी वेबसाइट पर उपलब्ध नहीं है। अन्य व्यावसायिक जानकारी के लिए sales@rishishwarindustry.in से संपर्क करें।");
  });
});