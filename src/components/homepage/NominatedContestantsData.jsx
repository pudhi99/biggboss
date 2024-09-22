import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { generateSlug } from "@/utils/slug";

const NominatedContestantsData = async (props) => {
  const nominatedContestantsData = props.weekUpdates[0]?.nominatedContestants;
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {nominatedContestantsData?.map((item) => (
          <div key={item.id} className="w-full">
            <div className="relative w-full h-80 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl overflow-hidden">
              {/* Frame styling */}
              <Link href={`/contestants/${generateSlug(item.name)}`}>
                <div className="relative h-full w-full flex items-end group">
                  {/* Image */}
                  <Image
                    src={item.image}
                    alt={item.name}
                    height="400"
                    width="400"
                    objectFit="cover"
                    className="absolute mx-auto inset-0"
                  />
                  {/* Name */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-opacity-70 bg-black text-white text-center font-bold z-10 transition-all duration-300 group-hover:text-yellow-300 group-hover:underline">
                    {item.name}
                  </div>
                </div>
              </Link>
            </div>

            {/* Vote Button - Positioned below the card */}
            <div className="flex justify-center mt-4">
              <Link href="#vote">
                <Button className="">Vote</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NominatedContestantsData;
