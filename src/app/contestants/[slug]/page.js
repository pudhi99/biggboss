import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { generateSlug } from "@/utils/slug"; // Slug generator utility
import { getContestantDataBySlug } from "@/utils/contestant"; // Function to fetch contestant data

// Generate metadata dynamically
export async function generateMetadata({ params }) {
  const { slug } = params;
  console.log(
    slug,
    "checking slug =========================================================="
  );
  const contestant = await getContestantDataBySlug(slug);

  // If contestant is not found, set generic metadata
  if (!contestant) {
    return {
      title: "Contestant Not Found",
      description: "The contestant you are looking for does not exist.",
    };
  }

  // Return dynamic metadata based on the contestant’s data
  return {
    title: `${contestant.name} - Bigg Boss Contestant`,
    description: contestant.description,
    openGraph: {
      title: `${contestant.name} - Bigg Boss Contestant`,
      description: contestant.description,
      images: [
        {
          url: contestant.image,
          alt: contestant.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${contestant.name} - Bigg Boss Contestant`,
      description: contestant.description,
      images: [contestant.image],
    },
  };
}

export default async function ContestantPage({ params }) {
  const { slug } = params;
  const contestant = await getContestantDataBySlug(slug);

  if (!contestant) {
    return <h1>Contestant not found</h1>;
  }

  return (
    <section className="p-4">
      <h1 className="text-center text-3xl font-bold mb-6">{contestant.name}</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <div className=" md:w-1/3">
          <Image
            src={contestant.image}
            alt={contestant.name}
            width={400}
            height={400}
            className="rounded-md object-cover"
          />
        </div>
        <CardContent className="-ml-6 md:w-2/3">
          <p className="text-base md:text-md text-gray-600 dark:text-gray-400 mb-4">
            {contestant.description}
          </p>
          <div className="mt-2">
            <Badge>{contestant.gender}</Badge>
            <Badge className="ml-2">{contestant.season}</Badge>
          </div>
        </CardContent>
      </div>
    </section>
  );
}
