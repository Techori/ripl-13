import { readdirSync, readFileSync, existsSync, createReadStream, statSync } from "node:fs";
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
  const library = resolve(root, "media-library");
  const images = new Map<string, string>();
  for (const file of filesIn(library)) {
    const extension = file.split(".").pop() ?? "";
    if (!contentTypes[extension]) continue;
    images.set(`/media-library/${relative(library, file).split(sep).join("/")}`, file);
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

/** Build-tool only: no filesystem code is imported by app or Worker modules. */
export function localImages(): Plugin {
  return {
    name: "repository-local-images",
    enforce: "pre",
    configureServer(server) {
      const images = imageMap(server.config.root);
      server.middlewares.use((request, response, next) => {
        if (request.method !== "GET" && request.method !== "HEAD") return next();
        const pathname = new URL(request.url ?? "/", "http://localhost").pathname;
        const file = images.get(pathname);
        if (!file) return next();
        response.setHeader("Content-Type", contentTypes[file.split(".").pop() ?? ""] ?? "application/octet-stream");
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Content-Length", String(statSync(file).size));
        if (request.method === "HEAD") return response.end();
        const stream = createReadStream(file);
        stream.on("error", () => { response.statusCode = 500; response.end(); });
        stream.pipe(response);
      });
    },
  };
}