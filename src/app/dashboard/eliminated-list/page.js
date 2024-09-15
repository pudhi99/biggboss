import { EliminatedListTable } from "@/components/tables/EliminatedListTable";
import React from "react";

const EliminatedList = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/week-updates`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  let count = 0;
  if (!response.ok) {
    // If the request failed, handle the error appropriately
    console.error("Failed to fetch week-updates data");
  }
  const data = await response.json();
  // Sort the data array based on the `week` field in descending order
  const sortedData = data.sort((a, b) => {
    // Extract the week number from the "week" field and convert to an integer
    const weekA = parseInt(a.week.replace("Week ", ""));
    const weekB = parseInt(b.week.replace("Week ", ""));

    // Sort in descending order
    return weekB - weekA;
  });
  return (
    <div>
      <EliminatedListTable weekUpdates={sortedData} />
    </div>
  );
};

export default EliminatedList;
