import { ContestantsPage } from "@/components/contestants/ContestantsPage";
import React from "react";

export const metadata = {
  title: "Bigg Boss Contestants - Full List",
  description:
    "Explore the contestants of Bigg Boss Telugu Season 8 with detailed information and images.",
  keywords: ["Bigg Boss", "Contestants", "Telugu", "Reality Show", "Season 8"],
  openGraph: {
    title: "Bigg Boss Contestants - Full List",
    description:
      "Explore the contestants of Bigg Boss Telugu Season 8 with detailed information and images.",
    images: [
      {
        url: "/images/bigg-boss-og.jpg", // A representative image for Open Graph (make sure it's hosted)
        width: 800,
        height: 600,
        alt: "Bigg Boss Contestants",
      },
    ],
  },
};

const page = async () => {
  async function getContestants() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/contestants`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) throw new Error("Failed to fetch contestants");
    return res.json();
  }
  const contestants = await getContestants();
  return (
    <div className="">
      <ContestantsPage contestants={contestants} />
    </div>
  );
};

export default page;
