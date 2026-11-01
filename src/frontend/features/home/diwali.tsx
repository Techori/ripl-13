import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Building2, Handshake, Sparkles, Store } from "lucide-react";
import hero from "@/assets/diwali-hero.webp";
import retail from "@/assets/diwali-retail.webp";
import { Button } from "@/frontend/components/ui/button";
import { RetailNetworkIndicator, type NetworkSelection } from "@/frontend/components/retail-network-indicator";
import { useRetailNetwork, networkFigures } from "@/frontend/data/retail-network";
import { services, steps } from "./content";
import { ServiceGuide } from "./service-guide";

export function DiwaliHome() {
  const [selection, setSelection] = useState<NetworkSelection>({ state: "", area: "", district: "" });
  const [showGuide, setShowGuide] = useState(false);
  const network = useRetailNetwork();
  const { storeFigure, districtFigure } = networkFigures(network);
  const count = network.filter((row) => (!selection.state || row.state === selection.state) && (!selection.area || row.area === selection.area) && (!selection.district || row.district === selection.district)).reduce((sum, row) => sum + row.stores, 0);
  return <div className="navratri-home diwali-home">
    <section className="festival-hero diwali-hero">
      <img src={hero} alt="Gwalior Fort illuminated for Diwali, with glowing diyas and fireworks" className="festival-backdrop" width={1920} height={1024} fetchPriority="high" decoding="async" />
      <div className="page-shell diwali-hero-inner"><div className="diwali-hero-copy">
        <p className="diwali-eyebrow"><Sparkles aria-hidden="true" /> ॥ शुभ दीपावली ॥</p>
        <h1>Rishishwar Industry</h1>
        <p className="diwali-headline">Brighter beginnings.<br /><em>Stronger businesses.</em></p>
        <p className="diwali-intro">Connecting FMCG brands with the retail networks and partnerships that turn ambition into growth.</p>
        <div className="festival-actions"><Button asChild variant="festival" size="lg"><Link to="/manufacturers">For Manufacturers <ArrowRight /></Link></Button><Button asChild variant="festivalOutline" size="lg"><Link to="/our-services">Our Services <ArrowRight /></Link></Button></div>
        <p className="diwali-wish">May every diya light a new opportunity.</p>
      </div></div>
    </section>
    <section className="festival-stats"><dl className="page-shell">
      <div><Store /><div><dt>{storeFigure}</dt><dd>Retail Stores</dd></div></div>
      <div><Building2 /><div><dt>{districtFigure}</dt><dd>Districts Covered</dd></div></div>
      <div><Handshake /><div><dt>End-to-End</dt><dd>Business Support</dd></div></div>
      <div><Sparkles /><div><dt>One Vision</dt><dd>Your Growth</dd></div></div>
    </dl></section>
    <div className="festival-network"><RetailNetworkIndicator selection={selection} onChange={setSelection} count={count} /></div>
    <section className="festival-capabilities diwali-capabilities"><div className="page-shell">
      <p className="diwali-eyebrow">THE CONNECTIONS THAT COUNT</p><h2>More reach. More possibilities.</h2>
      <div className="festival-services">{services.map(({ icon: Icon, title, text, to }) => <Link key={title} to={to} className="festival-service"><span className="festival-icon"><Icon /></span><h3>{title}</h3><p>{to === "/store-list" ? `${storeFigure} stores across ${districtFigure} districts.` : text}</p><ArrowRight className="diwali-service-arrow" aria-hidden="true" /></Link>)}</div>
    </div></section>
    <section className="diwali-retail-band"><img src={retail} alt="Festive Indian retail store with stocked shelves, marigolds and Diwali diyas" className="festival-backdrop" loading="lazy" decoding="async" width={1536} height={1024} /><div className="page-shell"><div className="diwali-retail-copy"><p className="diwali-eyebrow">LOCAL STORES. BIG POSSIBILITIES.</p><h2>Every shelf holds<br />a new beginning.</h2><p>The right products. The right partners.<br />A brighter future, together.</p><Button asChild variant="festival" size="lg"><Link to="/retailer-partner">Become a Retail Partner <ArrowRight /></Link></Button></div></div></section>
    <section className="festival-process"><div className="page-shell"><p className="diwali-eyebrow">A CLEAR PATH FORWARD</p><h2>The Rishishwar Industry Standard</h2><ol>{steps.map(({ icon: Icon, title, text }, index) => <li key={title}><span className="festival-icon"><Icon /></span><h3>{title}</h3><p>{text}</p>{index < steps.length - 1 && <ArrowRight className="festival-step-arrow" />}</li>)}</ol></div></section>
    <section className="diwali-guide"><div className="page-shell"><div><Sparkles aria-hidden="true" /><h2>Your next move, made clearer.</h2><p>Find the right service for your business with our AI Business Guide.</p></div><Button variant="festival" size="lg" onClick={() => setShowGuide(value => !value)} aria-expanded={showGuide} aria-controls="diwali-guide-form">{showGuide ? "Close Business Guide" : "AI Business Guide"}<ArrowRight /></Button></div></section>
    {showGuide && <div id="diwali-guide-form"><ServiceGuide /></div>}
    <section className="diwali-finale"><div className="page-shell"><p className="diwali-eyebrow">HAPPY DIWALI · शुभ दीपावली</p><h2>Let's grow brighter, together.</h2><p>Your growth. Our commitment.</p><Button asChild variant="festival" size="lg"><Link to="/partner-with-us">Partner With Us <ArrowRight /></Link></Button></div></section>
  </div>;
}