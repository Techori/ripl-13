# Website images

All 159 repository images, including current website images, favicons, 17 older extras and four Diwali photos. Photos are optimized WebP, capped at 1920px; smaller originals are preserved rather than increasing file size.

The website uses `/website-images/<relative-path>` in development and production. The build plugin resolves existing asset-pointer imports and direct image imports to these static files, preserving their original metadata. No preview-host proxy is needed.

Example: `/website-images/frontend/assets/hero-bg.webp` opens the older hero copy. Keep the relative paths when adding or replacing images; all theme choices remain unchanged.

Latest optimization: all 155 images inspected, 112 reduced further, total 12,875,007 bytes (12.28 MiB). Existing dimensions and transparency were preserved. Logos, wordmarks, brand marks and posters were excluded from further lossy compression; photographic changes were accepted only with a structural similarity score of at least 0.98 against the previous repository image. Already smaller files and the multi-size favicon were retained.

2026-10-30 follow-up: all 155 files decode correctly and their static URLs return the exact repository bytes. Lossless recompression produced no smaller files, so existing optimized images were retained without another quality-reducing pass. Header, footer and chat logos load correctly in the preview. The published site's new header-wordmark and chat-logo static URLs still return 404; deployment of the updated site is required before those URLs are available there.

2026-11-01: added `assets/diwali-hero.webp` and `assets/diwali-retail.webp` (approximately 388 KiB combined), served from this same static library in development and production.

2026-11-02: refreshed both Diwali photos with FMCG retail imagery; the hero retains illuminated Gwalior Fort. Optimized WebP copies remain at the same static URLs.
2026-11-03: added the supplied festive retail street and southern-state thank-you poster as optimized WebP slideshow images, with immutable asset pointers and matching static copies.
2026-11-03 follow-up: restored the original Gwalior Fort-only hero and replaced the third-slide poster with the latest upload, preserving readable embedded lettering and the same static image paths.
