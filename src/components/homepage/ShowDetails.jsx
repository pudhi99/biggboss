import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Import ShadCN components

const ShowDetails = () => {
  return (
    <div className=" mx-auto rounded-lg shadow-md">
      <h1 className="text-2xl sm:text-3xl text-orange-500 mb-4">
        Bigg Boss 8 Telugu Show Details
      </h1>
      <Table className="w-full table-auto rounded-lg shadow-md">
        <TableHeader>
          <TableRow>
            <TableHead className="text-left px-4 py-2">Field</TableHead>
            <TableHead className="text-left px-4 py-2">Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="px-4 py-2 font-semibold">Season</TableCell>
            <TableCell className="px-4 py-2">Bigg Boss 8 Telugu</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-4 py-2 font-semibold">Host</TableCell>
            <TableCell className="px-4 py-2">Akkineni Nagarjuna</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-4 py-2 font-semibold">
              Number of Housemates
            </TableCell>
            <TableCell className="px-4 py-2">14</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-4 py-2 font-semibold">
              Contestants List
            </TableCell>
            <TableCell className="px-4 py-2">
              <a href="#" className="text-blue-600 hover:underline">
                Click here
              </a>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-4 py-2 font-semibold">Timing</TableCell>
            <TableCell className="px-4 py-2">9:00 PM to 10:00 PM</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-4 py-2 font-semibold">
              No of Days
            </TableCell>
            <TableCell className="px-4 py-2">100 Days</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-4 py-2 font-semibold">
              Streaming Partners
            </TableCell>
            <TableCell className="px-4 py-2">
              <a
                className="text-blue-600 hover:underline"
                href="https://www.hotstar.com/in/home"
                target="_blank"
              >
                Disney Plus Hotstar
              </a>{" "}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-4 py-2 font-semibold">Watch on</TableCell>
            <TableCell className="px-4 py-2">
              <a
                className="text-blue-600 hover:underline"
                href="https://www.youtube.com/channel/UCJF4y2nyCCrDKTgA7dxz1Qw"
                target="_blank"
              >
                Star Maa
              </a>{" "}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-4 py-2 font-semibold">Genre</TableCell>
            <TableCell className="px-4 py-2">Reality Show</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-4 py-2 font-semibold">
              Bigg Boss Telugu Vote Results
            </TableCell>
            <TableCell className="px-4 py-2">
              <a href="#" className="text-blue-600 hover:underline">
                Check Now
              </a>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-4 py-2 font-semibold">
              Release Date
            </TableCell>
            <TableCell className="px-4 py-2">September 01, 2024</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ShowDetails;
