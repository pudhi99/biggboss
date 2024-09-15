import { CreateContestants } from "@/components/forms/CreateContestants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const ContestantEditPage = async ({ params }) => {
  const { id } = params; // Accessing the dynamic id from the URL

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/contestants/${id}`,
    {
      method: "GET",
      cache: "no-store", // Optional: Adjust caching/revalidation if needed
    }
  );

  if (!response.ok) {
    // If the request failed, handle the error appropriately
    console.error(response);
  }

  const data = await response.json();

  return (
    <div>
      <Card className="w-[80%] mx-auto">
        <CardHeader>
          <CardTitle>Create Contestants</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateContestants data={data} id={id} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ContestantEditPage;
