import { readdirSync, readFileSync, existsSync } from "node:fs";
import { resolve, relative, sep } from "node:path";
import type { Plugin } from "vite";

const contentTypes: Record<string, string> = {
  webp: "image/webp", png: "image/png", jpg: "image/jpeg",
  jpeg: "image/jpeg", ico: "image/x-icon", svg: "image/svg+xml",
};

function filesIn(directory: string): string[] {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(directory, entry.name);
    return entry.isDirectory() ? filesIn(path) : [path];
  });
}

export function imageMap(root: string): Map<string, string> {
  const library = resolve(root, "public/website-images");
  const images = new Map<string, string>();
  for (const file of filesIn(library)) {
    const extension = file.split(".").pop() ?? "";
    if (!contentTypes[extension]) continue;
    images.set(`/website-images/${relative(library, file).split(sep).join("/")}`, file);
  }
  for (const source of ["src", "public"]) {
    for (const pointer of filesIn(resolve(root, source))) {
      if (!pointer.endsWith(".asset.json")) continue;
      const asset = JSON.parse(readFileSync(pointer, "utf8")) as { url?: string };
      // Normalize to forward slashes so the mirror lookup works on Windows too.
      const sourcePath = relative(resolve(root, source), pointer).split(sep).join("/").replace(/\.asset\.json$/, "");
      const mirror = resolve(library, source === "src" ? "" : "public", sourcePath.replace(/\.[^.]+$/, ".webp"));
      if (asset.url && existsSync(mirror)) images.set(asset.url, mirror);
    }
  }
  return images;
}

/** Build-tool only: rendered URLs are identical in development and production. */
export function localImages(): Plugin {
  let root = "";
  const publicUrl = (file: string) => `/website-images/${relative(resolve(root, "public/website-images"), file).split(sep).join("/")}`;
  return {
    name: "repository-local-images",
    enforce: "pre",
    configResolved(config) { root = config.root; },
    transform(code, id) {
      if (!id.split("?")[0]?.endsWith(".asset.json")) return;
      const pointer = id.split("?")[0];
      if (!pointer || !existsSync(pointer)) return;
      const asset = JSON.parse(readFileSync(pointer, "utf8")) as { url?: string };
      const file = asset.url ? imageMap(root).get(asset.url) : undefined;
      if (!file) throw new Error(`Missing repository image copy for ${pointer}`);
      // Leave immutable CDN metadata in the source; only change the built URL.
      const json = JSON.stringify({ ...asset, url: publicUrl(file) });
      return { code: json, map: null };
    },
    load(id) {
      const file = id.split("?")[0];
      if (!file || !file.startsWith(resolve(root, "src") + sep) || !/\.(webp|png|jpe?g)$/i.test(file)) return;
      const mirror = resolve(root, "public/website-images", relative(resolve(root, "src"), file).replace(/\.[^.]+$/, ".webp"));
      if (!existsSync(mirror)) throw new Error(`Missing repository image copy for ${file}`);
      return `export default ${JSON.stringify(publicUrl(mirror))};`;
    },
  };
}