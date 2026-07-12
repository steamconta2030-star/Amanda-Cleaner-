import { createFileRoute } from "@tanstack/react-router";

const SITE_URL = "https://amanda-cleaning.lovable.app";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = [
          { loc: `${SITE_URL}/`, changefreq: "weekly", priority: "1.0" },
          { loc: `${SITE_URL}/services`, changefreq: "weekly", priority: "0.9" },
          { loc: `${SITE_URL}/chat`, changefreq: "weekly", priority: "0.8" },
          { loc: `${SITE_URL}/auth`, changefreq: "monthly", priority: "0.4" },
        ];


        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url><loc>${u.loc}</loc><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`,
  )
  .join("\n")}
</urlset>`;

        return new Response(body, {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        });
      },
    },
  },
});
