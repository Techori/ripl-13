import { networkFigures, type NetworkRow } from "@/frontend/data/retail-network";

/** All home themes share the full public network, independent of selector filters. */
export function homeStatistics(network: NetworkRow[]) {
  const figures = networkFigures(network);
  return [
    { value: figures.storeFigure, label: "Retail Stores" },
    { value: figures.districtFigure, label: "Districts Covered" },
    { value: "End-to-End", label: "Business Support" },
    { value: "One Vision", label: "Your Growth" },
  ];
}