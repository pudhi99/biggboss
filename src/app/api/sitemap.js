import sitemap from "@/app/sitemap"; // Adjust the path based on your structure

export async function GET(req) {
  const sitemapUrls = await sitemap();
  return new Response(JSON.stringify(sitemapUrls), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
