import { useState } from "react";
import { RetailNetworkIndicator, type NetworkSelection } from "@/frontend/components/retail-network-indicator";
import { useRetailNetwork } from "@/frontend/data/retail-network";
import { HeroSection } from "./sections";

export function HomeNetwork() {
  const [selection, setSelection] = useState<NetworkSelection>({ state: "", area: "", district: "" });
  const retailNetwork = useRetailNetwork();
  const matches = retailNetwork.filter((row) =>
    (!selection.state || row.state === selection.state) &&
    (!selection.area || row.area === selection.area) &&
    (!selection.district || row.district === selection.district),
  );
  const count = matches.reduce((sum, row) => sum + row.stores, 0);

  return (
    <>
      <HeroSection network={retailNetwork} />
      <RetailNetworkIndicator selection={selection} onChange={setSelection} count={count} />
    </>
  );
}