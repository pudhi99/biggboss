import { NominationList } from "@/components/tables/NominationList";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = async () => {
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
  const sortedData = data?.sort((a, b) => {
    // Extract the week number from the "week" field and convert to an integer
    const weekA = parseInt(a.week.replace("Week ", ""));
    const weekB = parseInt(b.week.replace("Week ", ""));

    // Sort in descending order
    return weekB - weekA;
  });

  if (data.message == "No weekUpdates found") {
    count = 0;
  } else {
    count = (data && data.length) || 0;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-lg">Nominated Lists</h1>
        <Link
          href={`/dashboard/nominated-list/create-nominated-list/${count + 1}`}
        >
          <Button>Create Nominated List</Button>
        </Link>
      </div>
      <NominationList weekUpdates={data} />
    </div>
  );
};

export default page;
