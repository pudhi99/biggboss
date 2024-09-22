import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  getContestantDataBySlug,
  getWeekUpdatesForContestant,
} from "@/utils/contestant";

// Generate metadata dynamically
export async function generateMetadata({ params }) {
  const { slug } = params;
  const contestant = await getContestantDataBySlug(slug);

  if (!contestant) {
    return {
      title: "Contestant Not Found",
      description: "The contestant you are looking for does not exist.",
    };
  }

  return {
    title: `${contestant.name} - Bigg Boss Contestant`,
    description: contestant.description,
    openGraph: {
      title: `${contestant.name} - Bigg Boss Contestant`,
      description: contestant.description,
      images: [{ url: contestant.image, alt: contestant.name }],
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
  const weekUpdates = await getWeekUpdatesForContestant(contestant._id);

  if (!contestant) {
    return <h1>Contestant not found</h1>;
  }

  // Filter the nominated and eliminated data
  const nominatedWeeks = weekUpdates.filter((week) =>
    week.nominatedContestants.some((nc) => nc._id === contestant._id)
  );

  const eliminatedWeek = weekUpdates.find((week) =>
    week.eliminatedContestant.some((ec) => ec._id === contestant._id)
  );

  return (
    <section className=" md:p-4">
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

      {/* Nominated Weeks Section */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Nominated Weeks</h2>
        {nominatedWeeks.length > 0 ? (
          <Card className="p-4 shadow-md rounded-lg">
            <CardContent>
              <table className="min-w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left border-b py-2">Week</th>
                    <th className="text-left border-b py-2">Votes</th>
                  </tr>
                </thead>
                <tbody>
                  {nominatedWeeks.map((week, index) => (
                    <tr key={index}>
                      <td className="border-b py-2">{week.week}</td>
                      <td className="border-b py-2">
                        {
                          week.nominatedContestants.find(
                            (nc) => nc._id === contestant._id
                          ).votes
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        ) : (
          <p>This contestant was never nominated.</p>
        )}
      </div>

      {/* Eliminated Week Section */}
      {eliminatedWeek && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Eliminated Week</h2>
          <Card className="p-4 shadow-md rounded-lg bg-red-400/50">
            <CardContent>
              <h3 className="font-semibold text-lg">
                Eliminated in {eliminatedWeek.week}
              </h3>
            </CardContent>
          </Card>
        </div>
      )}
    </section>
  );
}
