import { generateSlug } from "@/utils/slug";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HomeEliminatedList = (props) => {
  const eliminatedContestantsByWeek = props.weekUpdates.map((weekUpdate) => {
    // Ensure we map over eliminatedContestant array correctly and include week data
    return weekUpdate.eliminatedContestant.map((contestant) => {
      // Return the contestant object along with the week from weekUpdate
      return {
        ...contestant, // Spread the contestant object to keep its properties (like id)
        week: weekUpdate.week, // Add the week to each contestant object
      };
    });
  });

  // Flatten the array
  const flattenedEliminatedContestants = eliminatedContestantsByWeek.flat();

  return (
    <div id="elimination" className="py-5">
      <h1 className="text-2xl md:text-3xl py-3 text-orange-500">
        Eliminated Contestants
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full">
        {flattenedEliminatedContestants?.map((item) => (
          <Link
            key={item.name}
            href={`/contestants/${generateSlug(item.name)}`}
          >
            <div className="w-full group">
              <div className="relative w-full h-40 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl overflow-hidden">
                {/* Frame styling */}
                <div className="relative h-full w-full flex items-end">
                  {/* Image */}
                  <Image
                    src={item.image}
                    alt={item.name}
                    height="200"
                    width="200"
                    objectFit="cover"
                    className="absolute mx-auto inset-0"
                  />
                </div>
              </div>

              {/* Vote Button - Positioned below the card */}
              <div className="flex flex-col text-center justify-center mt-4">
                <div className=" text-red-500">
                  <h1>{item.week}</h1>
                </div>
                <div>
                  <p className="group-hover:text-yellow-300 group-hover:underline">
                    {item.name}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeEliminatedList;
