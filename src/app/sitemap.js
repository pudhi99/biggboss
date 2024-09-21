// src/app/sitemap.js (or wherever your sitemap function is defined)
import { getAllContestants } from "@/utils/contestant"; // Ensure this function fetches all contestant data

export default async function sitemap() {
  // const contestants = await getAllContestants(); // Fetch all contestants
  // console.log(contestants, "contestants ==============================");

  const baseUrl = "https://biggboss.vercel.app/";

  // Create the basic structure of the sitemap
  const urls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${baseUrl}#vote`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}contestants`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // // Add contestant URLs
  // contestants.forEach((contestant) => {
  //   const slug = generateSlug(contestant.name); // Ensure you have a function to generate slugs
  //   urls.push({
  //     url: `${baseUrl}contestants/${slug}`,
  //     lastModified: new Date(),
  //     changeFrequency: "monthly",
  //     priority: 0.7, // Adjust priority as needed
  //   });
  // });

  return urls;
}
