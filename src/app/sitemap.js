import { MetadataRoute } from "next";

export default function sitemap() {
  return [
    {
      url: "https://biggboss.vercel.app/", // Your actual URL
      lastModified: new Date().toISOString(), // Use ISO format for last modified
      changeFrequency: "yearly", // Change frequency
      priority: 1, // Priority
    },
  ];
}
