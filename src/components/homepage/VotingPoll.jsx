"use client";

import { useState, useEffect } from "react";
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
import { Skeleton } from "@/components/ui/skeleton"; // Import ShadCN Skeleton component
import Link from "next/link";
import { generateSlug } from "@/utils/slug";

// Helper function to shuffle the array (Fisher-Yates Algorithm)
const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const VotingPoll = (props) => {
  const [nominatedContestants, setNominatedContestants] = useState([]);
  const [showVotes, setShowVotes] = useState(false);
  const [canVote, setCanVote] = useState(true); // Track if the user can vote
  const [loading, setLoading] = useState(true); // Add loading state
  const [animation, setAnimation] = useState(false); // Track animation state

  const latestWeekData = props?.weekUpdates[0];
  const totalVotes = nominatedContestants?.reduce(
    (acc, contestant) => acc + contestant.votes,
    0
  );

  // Shuffle contestants before voting
  useEffect(() => {
    if (latestWeekData?.nominatedContestants) {
      const shuffledContestants = shuffleArray(
        latestWeekData.nominatedContestants
      );
      setNominatedContestants(shuffledContestants);
      setLoading(false); // Stop loading once data is available
    }

    // Check if the user can vote based on date
    const lastVoteDate = localStorage.getItem("lastVoteDate");
    const todayDate = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

    if (lastVoteDate === todayDate) {
      setCanVote(false); // Disable voting if already voted today
      setShowVotes(true); // Show votes since the user has already voted today
      // Sort the contestants by votes if the user has already voted
      const sortedContestants = [...latestWeekData.nominatedContestants].sort(
        (a, b) => b.votes - a.votes
      );
      setNominatedContestants(sortedContestants);
    }
  }, [latestWeekData]);

  const onVoteSubmit = async (event) => {
    event.preventDefault();

    if (!canVote) return;

    const formData = new FormData(event.target);
    const contestantId = formData.get("contestantId");
    const week = latestWeekData?.week;

    try {
      const response = await fetch("/api/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ week, contestantId }),
      });

      if (!response.ok) {
        throw new Error("Failed to update vote");
      }

      const updatedData = await response.json();

      // Update the nominatedContestants state with the new vote count
      const updatedContestants = nominatedContestants.map((contestant) => {
        if (contestant._id === contestantId) {
          return {
            ...contestant,
            votes: contestant.votes + 1,
          };
        }
        return contestant;
      });

      // Sort contestants by votes after voting (highest to lowest)
      const sortedContestants = [...updatedContestants].sort(
        (a, b) => b.votes - a.votes
      );
      setNominatedContestants(sortedContestants);

      setShowVotes(true); // Show the votes for all contestants

      // Save the current date to localStorage as the last vote date
      const todayDate = new Date().toISOString().split("T")[0];
      localStorage.setItem("lastVoteDate", todayDate);
      setCanVote(false); // Disable voting for the day

      // Trigger animation
      setAnimation(true);
      setTimeout(() => setAnimation(false), 1000); // Reset animation state after 1 second
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="">
      <h1 className="text-3xl font-semibold mb-6">Voting Poll</h1>

      {loading ? (
        // Show Skeleton if loading
        <Table className="w-full table-auto rounded-lg shadow-md">
          <TableHeader>
            <TableRow>
              <TableHead className="px-4 py-2">Contestant</TableHead>
              <TableHead className="px-4 py-2">Image</TableHead>
              <TableHead className="px-4 py-2">Vote</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 6 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell className="px-4 py-2">
                  <Skeleton className="h-6 w-32" />
                </TableCell>
                <TableCell className="px-4 py-2">
                  <Skeleton className="h-12 w-12 rounded-full" />
                </TableCell>
                <TableCell className="px-4 py-2">
                  <Skeleton className="h-6 w-24" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        // Show the real data once loaded
        <Table className="w-full table-auto rounded-lg shadow-md">
          <TableHeader>
            <TableRow>
              <TableHead className="px-4 py-2">Contestant</TableHead>
              <TableHead className="px-4 py-2">Image</TableHead>
              {showVotes ? (
                <>
                  <TableHead className="px-4 py-2">Votes</TableHead>
                  <TableHead className="px-4 py-2">Progress</TableHead>
                </>
              ) : null}
              {canVote ? (
                <TableHead className="px-4 py-2">Action</TableHead>
              ) : null}
            </TableRow>
          </TableHeader>
          <TableBody>
            {nominatedContestants?.map((contestant) => (
              <TableRow
                key={contestant._id}
                className={`transition-transform duration-500 ${
                  animation ? "transform scale-105" : ""
                }`}
              >
                <TableCell className="px-4 py-2 hover:text-yellow-300 hover:underline">
                  <Link href={`/contestants/${generateSlug(contestant.name)}`}>
                    {contestant.name}
                  </Link>
                </TableCell>
                <TableCell className="px-4 py-2">
                  <div className="relative w-16 h-16 overflow-hidden rounded-full">
                    <Link
                      href={`/contestants/${generateSlug(contestant.name)}`}
                    >
                      <Image
                        src={contestant.image}
                        alt={contestant.name}
                        layout="fill"
                        className="object-cover scale-150 translate-y-4"
                      />
                    </Link>
                  </div>
                </TableCell>
                {!showVotes && canVote ? (
                  <TableCell className="px-4 py-2">
                    <form onSubmit={onVoteSubmit}>
                      <input
                        type="hidden"
                        name="contestantId"
                        value={contestant._id}
                      />
                      <Button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300"
                      >
                        Vote
                      </Button>
                    </form>
                  </TableCell>
                ) : null}

                {showVotes && (
                  <>
                    <TableCell className="px-4 py-2">
                      <span className="font-semibold">
                        {contestant.votes} votes
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-2">
                      <Progress
                        value={
                          totalVotes > 0
                            ? (contestant.votes / totalVotes) * 100
                            : 0
                        }
                        className={`w-full ${
                          totalVotes > 0
                            ? "bg-gradient-to-r from-zinc-700 to-green-200"
                            : "bg-gray-300"
                        } transition-all duration-500 h-3 ease-in-out`}
                      />
                      <span className="font-semibold ml-2">
                        {((contestant.votes / totalVotes) * 100).toFixed(2)}%
                      </span>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default VotingPoll;
