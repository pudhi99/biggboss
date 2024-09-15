import mongo from "@/utils/db";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// GET: Fetching a specific week's updates by ID
export async function GET(request, { params }) {
  try {
    const { id } = params; // Assuming `id` corresponds to the week number
    const db = await mongo();

    // Fetch the document by week (concatenating "Week" with id)
    const weekUpdates = await db.collection("weekUpdates").findOne({
      week: "Week " + id, // Ensure id is used properly
    });

    // Check if the weekUpdates document exists
    if (!weekUpdates) {
      return new Response(JSON.stringify({ error: "Week updates not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Return the document if found
    return NextResponse.json(weekUpdates, { status: 200 });
  } catch (error) {
    console.error("Error fetching weekUpdates:", error);
    return new Response(
      JSON.stringify({ error: "Error fetching weekUpdates" }),
      {
        status: 500, // Internal server error
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

//  PATCH: Updating a specific week's updates by ID
export async function PATCH(request, { params }) {
  try {
    const { id } = params; // Assuming `id` corresponds to the week number
    const db = await mongo();

    // Parse the incoming request body (JSON format)
    const { nominatedContestants, week, eliminatedContestant, captain } =
      await request.json();

    // Construct the update fields, ensuring that only fields with values get updated
    const updateFields = {
      ...(nominatedContestants && { nominatedContestants }),
      ...(week && { week }),
      ...(eliminatedContestant && { eliminatedContestant }),
      ...(captain && { captain }),
      updatedAt: new Date(), // Always update the `updatedAt` timestamp
    };

    // Update the document that matches the given week
    const result = await db
      .collection("weekUpdates")
      .updateOne({ week: "Week " + id }, { $set: updateFields });

    // If no document was updated, return a 404 status
    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "Week not found" }, { status: 404 });
    }

    // Return the result if the update was successful
    return NextResponse.json(result, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error updating weekUpdates:", error);
    return NextResponse.json(
      { message: "Error updating weekUpdates" },
      { status: 500 }
    );
  }
}
