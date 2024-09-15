import { NominationForm } from "@/components/forms/NominationForm";
import React from "react";

// Convert the function to async to handle data fetching properly
const Page = async ({ params }) => {
  const { id } = params;

  // Fetch contestants data
  const contestantsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/contestants`,
    {
      method: "GET",
      cache: "no-store", // Optional: Adjust caching/revalidation if needed
    }
  );

  if (!contestantsResponse.ok) {
    // Handle contestants data fetch error
    throw new Error("Failed to fetch contestants data");
  }

  const contestantsData = await contestantsResponse.json();
  const filteredContestants = contestantsData.filter(
    (contestant) =>
      contestant.status === "In the house" || contestant.status === "Nominated"
  );
  // Fetch week updates data
  const weekUpdatesResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/week-updates/${id}`,
    {
      method: "GET", // Optional: Adjust caching/revalidation if needed
      cache: "no-store",
    }
  );

  if (!weekUpdatesResponse.ok) {
    // Handle week updates data fetch error
    console.error("Failed to fetch week updates data");
  }

  const weekUpdatesData = await weekUpdatesResponse.json();

  // Render the page with fetched data
  return (
    <div>
      <NominationForm
        contestants={filteredContestants}
        week={id}
        weekUpdates={weekUpdatesData}
      />
    </div>
  );
};

export default Page;
