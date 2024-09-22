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

// utils/contestant.js

export async function getWeekUpdatesForContestant(contestantId) {
  try {
    // Fetch week updates from the API
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/week-updates`
    );

    // If there's an error in fetching
    if (!res.ok) {
      throw new Error("Failed to fetch week updates");
    }

    const weekUpdates = await res.json();
    console.log(weekUpdates, "checking week updatess ===================");

    // Filter the week updates for this contestant (where they were nominated or eliminated)
    return weekUpdates;
  } catch (error) {
    console.error("Error fetching week updates:", error);
    return [];
  }
}
