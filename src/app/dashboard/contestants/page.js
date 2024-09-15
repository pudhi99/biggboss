import { ContestantsTable } from "@/components/tables/ContestantsTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

// Use async function for server-side data fetching
const page = async () => {
  // Fetch the data on the server side
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/contestants`,
    {
      method: "GET",
      cache: "no-store", // Optional: Adjust caching/revalidation if needed
    }
  );

  if (!response.ok) {
    // If the request failed, handle the error appropriately
    throw new Error("Failed to fetch contestants data");
  }

  const data = await response.json();

  // Pass the data to the ContestantsTable component as a prop
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-lg">Contestants</h1>
        <Link href="/dashboard/contestants/create-contestants">
          <Button>Create Contestants</Button>
        </Link>
      </div>
      <ContestantsTable data={data} />
    </div>
  );
};

export default page;
