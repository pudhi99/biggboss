import mongo from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const db = await mongo();
    const { week, contestantId } = await request.json();
    console.log(week, contestantId, "week =====================");
    const result = await db.collection("weekUpdates").updateOne(
      {
        week: week,
        "nominatedContestants.id": contestantId,
      },
      {
        $inc: { "nominatedContestants.$.votes": 1 },
      }
    );

    if (result.modifiedCount === 1) {
      return NextResponse.json(
        { message: "Vote updated successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Contestant not found or no updates made" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
