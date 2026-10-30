# Media library

Optimized WebP backup copies (max 1920px, quality 76–80) of every image the website uses. The live site loads images from CDN pointers in src/; these files are a full offline copy kept in the repo. On localhost, Vite serves the matching repository copies for those same URLs, without requiring the preview CDN.

Latest refresh: all 136 website images re-downloaded, normalized to PNG (max 1920px wide), then re-optimized to WebP (quality 80). Older extra backups are kept.

All 155 images (138 current copies, including favicons, and 17 older extras) are available in local development at `/media-library/<relative-path>`. For example, `/media-library/frontend/assets/hero-bg.webp` opens the older hero copy. The 17 extras were checked and optimized again; smaller originals were preserved to avoid increasing file sizes. They remain together with the current images in this folder; no theme image selections were changed.
