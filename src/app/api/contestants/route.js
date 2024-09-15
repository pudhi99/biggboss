import mongo from "@/utils/db";
import { NextResponse } from "next/server";

// GET: Fetching all contestants
export async function GET() {
  try {
    const db = await mongo();
    const contestants = await db.collection("contestants").find({}).toArray();

    if (contestants.length === 0) {
      return NextResponse.json(
        { message: "No contestants found" },
        { status: 200 }
      );
    }

    return NextResponse.json(contestants, { status: 200 });
  } catch (error) {
    console.error("Error fetching contestants:", error);
    return NextResponse.json(
      { message: "Error fetching contestants" },
      { status: 500 }
    );
  }
}

// POST: Adding a new contestant
export async function POST(request) {
  try {
    const db = await mongo();

    const collections = await db.listCollections().toArray();
    const contestantCollectionExists = collections.find(
      (c) => c.name === "contestants"
    );

    if (!contestantCollectionExists) {
      await db.createCollection("contestants");
    }

    const contestantCollection = db.collection("contestants");

    // Extracting data from request body
    const { name, description, image, gender, age, status, voteDial } =
      await request.json();

    // Validate required fields
    if (!name || !image || !gender) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Getting the current year dynamically
    const currentYear = new Date().getFullYear();
    const difference = currentYear - 2024;
    const season = "BigBoss " + (difference + 8);

    // Inserting into the contestants collection
    const result = await contestantCollection.insertOne({
      name: name || "",
      age: age || "NA",
      description: description || "",
      image: image || "",
      gender: gender || "",
      season: season,
      year: currentYear, // Using the creation year dynamically
      status: status,
      voteDial: voteDial || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return new NextResponse(
      JSON.stringify({ message: "Contestant has been added", result: result }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error adding contestant:", error);
    return NextResponse.json(
      { message: "Error adding contestant" },
      { status: 500 }
    );
  }
}
