# Website images

All 155 repository images, including current website images, favicons and 17 older extras. Photos are optimized WebP, capped at 1920px; smaller originals are preserved rather than increasing file size.

The website uses `/website-images/<relative-path>` in development and production. The build plugin resolves existing asset-pointer imports and direct image imports to these static files, preserving their original metadata. No preview-host proxy is needed.

Example: `/website-images/frontend/assets/hero-bg.webp` opens the older hero copy. Keep the relative paths when adding or replacing images; all theme choices remain unchanged. Latest validation: 155 files, zero corrupt images, 144 WebP files made smaller, total approximately 13 MiB.
