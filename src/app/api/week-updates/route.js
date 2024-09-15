// Ensure you import mongo correctly
import mongo from "@/utils/db";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const db = await mongo();

    // Fetch all weekUpdates, sorted by the most recently created (assuming a `createdAt` field)
    const weekUpdates = await db.collection("weekUpdates").find({}).toArray();

    // Ensure we return a valid JSON response even when no data is found
    if (!weekUpdates || weekUpdates.length === 0) {
      return NextResponse.json(
        { message: "No weekUpdates found", data: [] },
        { status: 200 }
      );
    }

    // Fetch details for each nominated and eliminated contestant
    const weekUpdatesWithContestants = await Promise.all(
      weekUpdates.map(async (weekUpdate) => {
        // Fetch full details for nominated contestants
        const fullNominatedContestants = await Promise.all(
          weekUpdate.nominatedContestants.map(async (nominee) => {
            const contestant = await db
              .collection("contestants")
              .findOne({ _id: new ObjectId(nominee.id) });

            return {
              ...contestant,
              votes: nominee.votes, // Include the votes from weekUpdates
            };
          })
        );

        // Fetch full details for eliminated contestants
        const fullEliminatedContestants = await Promise.all(
          weekUpdate.eliminatedContestant?.map(async (eliminated) => {
            const contestant = await db
              .collection("contestants")
              .findOne({ _id: new ObjectId(eliminated.id) });

            return contestant; // Return null if not found
          })
        );

        // Filter out any null values from eliminatedContestant array
        const filteredEliminatedContestants = fullEliminatedContestants.filter(
          (contestant) => contestant !== null
        );

        // Return the weekUpdate object with full contestant details
        return {
          ...weekUpdate,
          nominatedContestants: fullNominatedContestants,
          eliminatedContestant: filteredEliminatedContestants, // Filter out nulls or return empty array
        };
      })
    );

    // Return the weekUpdates with full nominated and eliminated contestant details
    return NextResponse.json(weekUpdatesWithContestants, { status: 200 });
  } catch (error) {
    console.error("Error fetching weekUpdates with contestant details:", error);
    return NextResponse.json(
      { message: "Error fetching weekUpdates", error: error.toString() },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const db = await mongo();

    // Check if 'weekUpdates' collection exists
    const collections = await db
      .listCollections({ name: "weekUpdates" })
      .toArray();

    // Parse the request body
    const { nominatedContestants, week, eliminatedContestant, captain } =
      await request.json();

    // Validate that required fields are provided
    if (!week || !nominatedContestants) {
      return NextResponse.json(
        { message: "Week and nominatedContestants are required" },
        { status: 400 } // Bad Request
      );
    }

    // Create the new weekUpdate document
    const newWeekUpdate = {
      nominatedContestants,
      week,
      eliminatedContestant: eliminatedContestant || "",
      captain: captain || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Insert the new weekUpdate into the collection
    const result = await db.collection("weekUpdates").insertOne(newWeekUpdate);

    // Return the newly created resource
    return NextResponse.json(result, { status: 201 }); // 201 Created
  } catch (error) {
    console.error("Error creating weekUpdate:", error);
    return NextResponse.json(
      { message: "Error creating weekUpdate" },
      { status: 500 } // Internal Server Error
    );
  }
}
