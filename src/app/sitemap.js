export default function sitemap() {
  return [
    {
      url: "https://biggboss.vercel.app/", // Your actual URL
      lastModified: new Date(), // Use ISO format for last modified
      changeFrequency: "yearly", // Change frequency
      priority: 1, // Priority
    },
    {
      url: "https://biggboss.vercel.app/#vote", // Add the new URL
      lastModified: new Date(),
      changeFrequency: "monthly", // Adjust the change frequency as needed
      priority: 0.8, // Adjust the priority as needed
    },
  ];
}
