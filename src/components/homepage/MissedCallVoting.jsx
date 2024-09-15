import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Import ShadCN components

const MissedCallVoting = (props) => {
  const nominatedContestantsData = props.weekUpdates[0]?.nominatedContestants;

  // Function to format the mobile number
  const formatMobileNumber = (number) => {
    if (!number) return "Not Available";
    return `${number.slice(0, 3)} ${number.slice(3, 5)} ${number.slice(
      5,
      7
    )} ${number.slice(7)}`;
  };

  return (
    <div className="py-4">
      <div className="py-4">
        <h1 className="text-2xl sm:text-3xl text-orange-500">
          Missed Call Voting Numbers
        </h1>
      </div>
      <div className="">
        <Table className="w-full table-auto rounded-lg shadow-md">
          <TableHeader>
            <TableRow>
              <TableHead className="text-left px-4 py-2">Contestant</TableHead>
              <TableHead className="text-left px-4 py-2">Vote Number</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {nominatedContestantsData?.map((contestant) => (
              <TableRow key={contestant.id}>
                <TableCell className="px-4 py-2 text-lg font-medium">
                  {contestant.name}
                </TableCell>
                <TableCell className="px-4 py-2 text-blue-600 text-lg font-semibold">
                  {formatMobileNumber(contestant.voteDial)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MissedCallVoting;
