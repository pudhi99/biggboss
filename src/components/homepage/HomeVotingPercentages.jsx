import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Import ShadCN components
import { Progress } from "@/components/ui/progress"; // Import ShadCN Progress component

const HomeVotingPercentages = (props) => {
  const nominatedContestantsData = props.weekUpdates[0]?.nominatedContestants;

  // Calculate total votes for all contestants
  const totalVotes = nominatedContestantsData?.reduce(
    (acc, contestant) => acc + contestant.votes,
    0
  );

  // Function to calculate the vote percentage
  const calculateVotePercentage = (votes) => {
    if (!totalVotes) return "0%";
    const percentage = (votes / totalVotes) * 100;
    return `${percentage.toFixed(2)}%`; // Return percentage with 2 decimal points
  };

  return (
    <div className="py-4">
      <div className="py-4">
        <h1 className="text-2xl sm:text-3xl text-orange-500">
          Voting Percentages
        </h1>
      </div>
      <div className="">
        <Table className="w-full table-auto rounded-lg shadow-md">
          <TableHeader>
            <TableRow>
              <TableHead className="text-left px-4 py-2">Contestant</TableHead>
              <TableHead className="text-left px-4 py-2">Votes</TableHead>
              <TableHead className="text-left px-4 py-2">Percentage</TableHead>
              <TableHead className="text-left px-4 py-2">Progress</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {nominatedContestantsData
              ?.sort((a, b) => b.votes - a.votes) // Sort by votes in descending order
              .map((contestant) => (
                <TableRow key={contestant.id}>
                  <TableCell className="px-4 py-2 text-lg font-medium">
                    {contestant.name}
                  </TableCell>
                  <TableCell className="px-4 py-2 text-lg font-semibold">
                    {contestant.votes}
                  </TableCell>
                  <TableCell className="px-4 py-2 text-green-600 text-lg font-semibold">
                    {calculateVotePercentage(contestant.votes)}
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    <Progress
                      value={(contestant.votes / totalVotes) * 100}
                      className="w-full h-4"
                      color="green" // Customize the color as needed
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default HomeVotingPercentages;
