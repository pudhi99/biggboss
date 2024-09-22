// Utility to convert the name to a slug
export function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

// Fetch contestant data by slug
export async function getContestantDataBySlug(slug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contestants`);
  const contestants = await res.json();

  // Find contestant by dynamically generated slug
  return contestants.find((c) => generateSlug(c.name) === slug);
}

export async function getAllContestants() {
  // Replace this with your actual API fetching logic
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contestants`);
  if (!res.ok) {
    throw new Error("Failed to fetch contestants");
  }
  const contestants = await res.json();

  return contestants; // Return the JSON data
}
