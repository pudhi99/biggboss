import mongo from "@/utils/db";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// GET: Fetching a specific contestant by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const db = await mongo();
    const contestant = await db.collection("contestants").findOne({
      _id: new ObjectId(id),
    });

    if (!contestant) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404, // Not Found
        headers: { "Content-Type": "application/json" },
      });
    }

    return NextResponse.json(contestant, { status: 200 });
  } catch (error) {
    console.error("Error fetching contestant:", error);
    return new Response(
      JSON.stringify({ error: "Error Fetching contestant" }),
      {
        status: 404, // Not Found
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// PATCH: Updating a specific contestant by ID
export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const db = await mongo();

    const { name, description, image, gender, age, status, voteDial } =
      await request.json();

    const updateFields = {
      ...(name && { name }),
      ...(description && { description }),
      ...(image && { image }),
      ...(gender && { gender }),
      ...(age && { age }),
      ...(status && { status }),
      ...(voteDial && { voteDial }),
      updatedAt: new Date(),
    };

    const result = await db
      .collection("contestants")
      .updateOne({ _id: new ObjectId(id) }, { $set: updateFields });

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "Contestant not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(result, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error updating contestant:", error);
    return NextResponse.json(
      { message: "Error updating contestant" },
      { status: 500 }
    );
  }
}
