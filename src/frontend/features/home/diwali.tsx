import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Building2, ChevronLeft, ChevronRight, Handshake, Pause, Play, Sparkles, Store } from "lucide-react";
import hero from "@/assets/diwali-hero.webp";
import retailStreet from "@/assets/diwali-retail-street.webp.asset.json";
import southThankYou from "@/assets/diwali-south-thank-you.webp.asset.json";
import retail from "@/assets/diwali-retail.webp";
import { Button } from "@/frontend/components/ui/button";
import { RetailNetworkIndicator, type NetworkSelection } from "@/frontend/components/retail-network-indicator";
import { useRetailNetwork, networkFigures } from "@/frontend/data/retail-network";
import { services, steps } from "./content";
import { ServiceGuide } from "./service-guide";
import { homeStatistics } from "./statistics";

const heroSlides = [
  { src: hero, alt: "Illuminated Gwalior Fort with Diwali diyas and fireworks", poster: false },
  { src: retailStreet.url, alt: "Diwali retail street with stocked FMCG stores, lanterns and diyas", poster: false },
  { src: southThankYou.url, alt: "Rishishwar Industry thanks Tamil Nadu, Kerala, Andhra Pradesh, Telangana and Karnataka for their support", poster: true },
];

export function DiwaliHome() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const changeSlide = (offset: number) => setActiveSlide(current => (current + offset + heroSlides.length) % heroSlides.length);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (paused || interacting || reducedMotion) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActiveSlide(current => (current + 1) % heroSlides.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [activeSlide, paused, interacting, reducedMotion]);
  const [selection, setSelection] = useState<NetworkSelection>({ state: "", area: "", district: "" });
  const [showGuide, setShowGuide] = useState(false);
  const network = useRetailNetwork();
  const { storeFigure, districtFigure } = networkFigures(network);
  const count = network.filter((row) => (!selection.state || row.state === selection.state) && (!selection.area || row.area === selection.area) && (!selection.district || row.district === selection.district)).reduce((sum, row) => sum + row.stores, 0);
  return <div className="navratri-home diwali-home">
    <section className={`festival-hero diwali-hero${activeSlide === 2 ? " diwali-poster-active" : ""}`} aria-label="Diwali highlights" aria-roledescription="carousel"
      onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false); }}
      onTouchStart={event => { const touch = event.touches[0]; if (touch) touchStart.current = { x: touch.clientX, y: touch.clientY }; }}
      onTouchEnd={event => { const start = touchStart.current; const end = event.changedTouches[0]; touchStart.current = null; if (!start || !end) return; const dx = end.clientX - start.x; if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(end.clientY - start.y)) changeSlide(dx < 0 ? 1 : -1); }}>
      <div className="diwali-slides">{heroSlides.map((slide, index) => <img key={slide.src} src={slide.src} alt={slide.alt} aria-hidden={activeSlide !== index} className={`festival-backdrop diwali-slide${slide.poster ? " diwali-slide-poster" : ""}${activeSlide === index ? " is-active" : ""}`} fetchPriority={index === 0 ? "high" : "low"} decoding="async" />)}</div>
      <div className="page-shell diwali-hero-inner"><div className="diwali-hero-copy" hidden={activeSlide === 2}>
        <p className="diwali-eyebrow"><Sparkles aria-hidden="true" /> this Diwali</p>
        <h1 className="diwali-market-headline">We Build Your Markets.<br /><em>You Grow Your Sales.</em></h1>
        <p className="diwali-intro">Rishishwar Industry connects FMCG manufacturers with retail networks, distributors and international opportunities.</p>
        <div className="festival-actions"><Button asChild variant="festival" size="lg"><Link to="/manufacturers">For Manufacturers <ArrowRight /></Link></Button><Button asChild variant="festivalOutline" size="lg"><Link to="/our-services">Our Services <ArrowRight /></Link></Button></div>
        <p className="diwali-wish" lang="hi">आप सभी को RIPL की ओर से दीपावली की हार्दिक शुभकामनाएँ</p>
      </div></div>
      <div className="diwali-slide-controls" aria-label="Slideshow controls">
        <Button variant="ghost" size="icon" aria-label="Previous image" title="Previous image" onClick={() => changeSlide(-1)}><ChevronLeft /></Button>
        <span className="diwali-slide-count" aria-live={paused || interacting || reducedMotion ? "polite" : "off"}>{activeSlide + 1} / {heroSlides.length}</span>
        <Button variant="ghost" size="icon" aria-label="Next image" title="Next image" onClick={() => changeSlide(1)}><ChevronRight /></Button>
        <Button variant="ghost" size="icon" aria-label={paused || reducedMotion ? "Play slideshow" : "Pause slideshow"} title={paused || reducedMotion ? "Play slideshow" : "Pause slideshow"} onClick={() => { setPaused(value => !value); if (reducedMotion) setReducedMotion(false); }}>{paused || reducedMotion ? <Play /> : <Pause />}</Button>
      </div>
    </section>
    <section className="festival-stats"><dl className="page-shell">
      {homeStatistics(network).map(({ value, label }, index) => {
        const Icon = [Store, Building2, Handshake, Sparkles][index] ?? Store;
        return <div key={label}><Icon /><div><dt>{value}</dt><dd>{label}</dd></div></div>;
      })}
    </dl></section>
    <div className="festival-network"><RetailNetworkIndicator selection={selection} onChange={setSelection} count={count} /></div>
    <section className="festival-capabilities diwali-capabilities"><div className="page-shell">
      <p className="diwali-eyebrow">THE CONNECTIONS THAT COUNT</p><h2>More reach. More possibilities.</h2>
      <div className="festival-services">{services.map(({ icon: Icon, title, text, to }, index) => <Link key={title} to={to} className="festival-service"><span className="festival-icon"><Icon /></span><h3>{title}</h3><p>{index === 0 ? `${storeFigure} stores across ${districtFigure} districts.` : text}</p><ArrowRight className="diwali-service-arrow" aria-hidden="true" /></Link>)}</div>
    </div></section>
    <section className="diwali-retail-band"><img src={retail} alt="Festive Indian retail store with stocked shelves, marigolds and Diwali diyas" className="festival-backdrop" loading="lazy" decoding="async" width={1536} height={1024} /><div className="page-shell"><div className="diwali-retail-copy"><p className="diwali-eyebrow">LOCAL STORES. BIG POSSIBILITIES.</p><h2>Every shelf holds<br />a new beginning.</h2><p>The right products. The right partners.<br />A brighter future, together.</p><Button asChild variant="festival" size="lg"><Link to="/retailer-partner">Become a Retail Partner <ArrowRight /></Link></Button></div></div></section>
    <section className="festival-process"><div className="page-shell"><p className="diwali-eyebrow">A CLEAR PATH FORWARD</p><h2>The Rishishwar Industry Standard</h2><ol>{steps.map(({ icon: Icon, title, text }, index) => <li key={title}><span className="festival-icon"><Icon /></span><h3>{title}</h3><p>{text}</p>{index < steps.length - 1 && <ArrowRight className="festival-step-arrow" />}</li>)}</ol></div></section>
    <section className="diwali-guide"><div className="page-shell"><div><Sparkles aria-hidden="true" /><h2>Your next move, made clearer.</h2><p>Find the right service for your business with our AI Business Guide.</p></div><Button variant="festival" size="lg" onClick={() => setShowGuide(value => !value)} aria-expanded={showGuide} aria-controls="diwali-guide-form">{showGuide ? "Close Business Guide" : "AI Business Guide"}<ArrowRight /></Button></div></section>
    {showGuide && <div id="diwali-guide-form"><ServiceGuide /></div>}
    <section className="diwali-finale"><div className="page-shell"><p className="diwali-eyebrow">HAPPY DIWALI · शुभ दीपावली</p><h2>Let's grow brighter, together.</h2><p lang="hi">RIPL परिवार की ओर से आपके व्यापार में सुख, समृद्धि और नई सफलताओं की शुभकामनाएँ।</p><Button asChild variant="festival" size="lg"><Link to="/partner-with-us">Partner With Us <ArrowRight /></Link></Button></div></section>
  </div>;
}