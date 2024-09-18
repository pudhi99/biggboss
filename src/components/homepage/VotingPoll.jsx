"use state";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import mongo from "@/utils/db";
import { revalidatePath } from "next/cache";

const VotingPoll = (props) => {
  // Fetch the latest week data
  const latestWeekData = props?.weekUpdates[0];

  // Sort based on votes (descending)
  const nominatedContestants = latestWeekData?.nominatedContestants?.sort(
    (a, b) => b.votes - a.votes
  );

  // Calculate total votes for progress bar
  const totalVotes = nominatedContestants?.reduce(
    (acc, contestant) => acc + contestant.votes,
    0
  );

  // Server Action to handle voting logic
  const handleVote = async (formData) => {
    "use server";
    const db = await mongo();
    let contestantId = null;

    // Log and extract form data
    for (const [key, value] of formData.entries()) {
      console.log(`Field: ${key}, Value: ${value}`);

      // Check for contestantId
      if (key === "contestantId") {
        contestantId = value;
      }
    }
    console.log(contestantId, "latestWeekData._id");
    // Update the vote count for the contestant
    const result = await db.collection("weekUpdates").updateOne(
      {
        week: latestWeekData.week,
        "nominatedContestants.id": contestantId,
      },
      {
        $inc: { "nominatedContestants.$.votes": 1 },
      }
    );
    console.log(result, "checking result");
    // Check if the update was successful
    if (result.modifiedCount > 0) {
      // Revalidate the path to refresh the page and show updated data
      revalidatePath("/");
      return { success: true, message: "Vote recorded successfully!" };
    } else {
      return { success: false, message: "Failed to record vote." };
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6">Voting Poll</h1>
      <Table className="w-full table-auto rounded-lg shadow-md">
        <TableHeader>
          <TableRow>
            <TableHead className="px-4 py-2">Contestant</TableHead>
            <TableHead className="px-4 py-2">Image</TableHead>
            <TableHead className="px-4 py-2">Votes</TableHead>
            <TableHead className="px-4 py-2">Progress</TableHead>
            <TableHead className="px-4 py-2">Vote</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {nominatedContestants?.map((contestant) => (
            <TableRow key={contestant.id}>
              <TableCell className="px-4 py-2">{contestant.name}</TableCell>
              <TableCell className="px-4 py-2">
                <Image
                  src={contestant.image}
                  alt={contestant.name}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </TableCell>
              <TableCell className="px-4 py-2">{contestant.votes}</TableCell>
              <TableCell className="px-4 py-2">
                <Progress
                  value={
                    totalVotes > 0 ? (contestant.votes / totalVotes) * 100 : 0
                  }
                />
              </TableCell>
              <TableCell className="px-4 py-2">
                {/* {console.log("Contestant ID:", contestant)} */}
                {/* <pre>{JSON.stringify(contestant, null, 2)}</pre> */}
                {/* Form submission to handle voting */}
                <form action={handleVote}>
                  <input
                    type="hidden"
                    name="contestantId"
                    value={contestant._id}
                  />
                  <Button type="submit">Vote</Button>
                </form>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default VotingPoll;
