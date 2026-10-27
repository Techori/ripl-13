// @vitest-environment node
import { describe, expect, it } from "vitest";
import { resolve } from "node:path";
import { imageMap } from "../../tooling/local-images";
import header from "../assets/header-logo.webp.asset.json";
import hero from "../frontend/assets/hero-bg.img.webp.asset.json";

describe("repository image access on localhost", () => {
  const root = resolve(import.meta.dirname, "../..");
  const images = imageMap(root);
  it("exposes all 155 backups, including the 17 older extras", () => {
    expect([...images.keys()].filter((key) => key.startsWith("/media-library/"))).toHaveLength(155);
    expect(images.get("/media-library/frontend/assets/hero-bg.webp")).toBe(resolve(root, "media-library/frontend/assets/hero-bg.webp"));
    expect(images.get("/media-library/frontend/assets/advertising/kirana-storefronts.webp")).toBe(resolve(root, "media-library/frontend/assets/advertising/kirana-storefronts.webp"));
  });
  it("resolves current CDN image URLs to repository copies", () => {
    expect(images.get(header.url)).toBe(resolve(root, "media-library/assets/header-logo.webp"));
    expect(images.get(hero.url)).toBe(resolve(root, "media-library/frontend/assets/hero-bg.img.webp"));
    expect([...images.keys()].filter((key) => key.startsWith("/__l5e/assets-v1/"))).toHaveLength(128);
  });
  it("never exposes source files or paths outside the library", () => {
    expect(images.has("/media-library/README.md")).toBe(false);
    expect(images.has("/media-library/../../.env")).toBe(false);
    expect(images.has("/media-library/../vite.config.ts")).toBe(false);
  });
});