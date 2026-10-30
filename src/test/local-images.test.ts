import { describe, expect, it } from "vitest";
import { resolve } from "node:path";
import { imageMap } from "../../tooling/local-images";
import header from "../assets/header-logo.webp.asset.json";
import hero from "../frontend/assets/hero-bg.img.webp.asset.json";

describe("repository image access on localhost", () => {
  const root = resolve(import.meta.dirname, "../..");
  const images = imageMap(root);
  it("exposes all 155 backups, including the 17 older extras", () => {
    expect([...images.keys()].filter((key) => key.startsWith("/website-images/"))).toHaveLength(155);
    expect(images.get("/website-images/frontend/assets/hero-bg.webp")).toBe(resolve(root, "public/website-images/frontend/assets/hero-bg.webp"));
    expect(images.get("/website-images/frontend/assets/advertising/kirana-storefronts.webp")).toBe(resolve(root, "public/website-images/frontend/assets/advertising/kirana-storefronts.webp"));
  });
  it("resolves current CDN image URLs to repository copies", () => {
    expect(images.get(header.url)).toBe(resolve(root, "public/website-images/assets/header-logo.webp"));
    expect(images.get(hero.url)).toBe(resolve(root, "public/website-images/frontend/assets/hero-bg.img.webp"));
    expect([...images.keys()].filter((key) => key.startsWith("/__l5e/assets-v1/"))).toHaveLength(128);
  });
  it("never exposes source files or paths outside the library", () => {
    expect(images.has("/website-images/README.md")).toBe(false);
    expect(images.has("/website-images/../../.env")).toBe(false);
    expect(images.has("/website-images/../vite.config.ts")).toBe(false);
  });
});