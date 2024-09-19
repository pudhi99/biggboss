import { auth } from "@/auth";
import HomeStaticData from "@/components/homepage/HomeStaticData";
import HomeVotingPercentages from "@/components/homepage/HomeVotingPercentages";
import MissedCallVoting from "@/components/homepage/MissedCallVoting";
import NominatedContestantsData from "@/components/homepage/NominatedContestantsData";
import ShowDetails from "@/components/homepage/ShowDetails";
import VotingPoll from "@/components/homepage/VotingPoll";
import Image from "next/image";

export default async function Home() {
  const session = await auth();
  console.log(session, "getting session data");
  const getData = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/week-updates`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch week-updates data");
    }

    const data = await response.json();

    // Sort the data array based on the `week` field in descending order
    const sortedData = data?.sort((a, b) => {
      const weekA = parseInt(a.week.replace("Week ", ""));
      const weekB = parseInt(b.week.replace("Week ", ""));
      return weekB - weekA;
    });

    return sortedData;
  };

  const data = await getData();

  return (
    <div className="w-full px-3">
      <div className="container xl:px-32 mx-auto">
        {/* Flex container for managing component order */}
        <div className="flex flex-col sm:flex-col sm:gap-4">
          {/* For screens below `sm`, HomeVotingPercentages comes first */}
          <div className="order-1 sm:order-4" id="vote">
            <VotingPoll weekUpdates={data} />
          </div>
          <div className="order-2 sm:order-1">
            <HomeStaticData />
          </div>
          <div className="order-3 sm:order-2">
            <NominatedContestantsData weekUpdates={data} />
          </div>
          <div className="order-4 sm:order-3">
            <MissedCallVoting weekUpdates={data} />
          </div>
          <div className="order-5 sm:order-5">
            <HomeVotingPercentages weekUpdates={data} />
          </div>
          <div className="order-6 sm:order-6">
            <ShowDetails />
          </div>
        </div>
      </div>
    </div>
  );
}
