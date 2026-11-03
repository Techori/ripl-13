import { describe, expect, it } from "vitest";
import { homeStatistics } from "@/frontend/features/home/statistics";

describe("shared home network statistics", () => {
  it("uses the same full network figures for every theme", () => {
    const network = [
      { state: "Madhya Pradesh", area: "Central", district: "Gwalior", stores: 100 },
      { state: "Madhya Pradesh", area: "Central", district: "Bhopal", stores: 50 },
    ];
    for (const theme of ["diwali", "dark", "light"]) {
      expect({ theme, statistics: homeStatistics(network).slice(0, 2) }).toEqual({
        theme, statistics: [
          { value: "150+", label: "Retail Stores" },
          { value: "2", label: "Districts Covered" },
        ],
      });
    }
  });
  it("keeps the two business commitments identical regardless of network size", () => {
    expect(homeStatistics([]).slice(2)).toEqual([
      { value: "End-to-End", label: "Business Support" },
      { value: "One Vision", label: "Your Growth" },
    ]);
  });
});