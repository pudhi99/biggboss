import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card"; // ShadCN Card component
import { Badge } from "@/components/ui/badge";
import { generateSlug } from "@/utils/slug"; // Import slug generator

export async function ContestantsPage(props) {
  const contestants = props.contestants;

  return (
    <section className="p-4">
      <h1 className="text-center text-3xl font-bold mb-6">
        Bigg Boss Contestants List
      </h1>

      {/* Updated grid to show only one contestant on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
        {contestants.map((contestant) => (
          <ContestantCard key={contestant._id.$oid} contestant={contestant} />
        ))}
      </div>
    </section>
  );
}

// Contestant Card Component
function ContestantCard({ contestant }) {
  return (
    <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-200 md:p-4">
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <CardHeader className="md:w-1/3">
          <Image
            src={contestant.image}
            alt={contestant.name}
            width={400}
            height={400}
            className="rounded-t-md object-cover"
          />
        </CardHeader>

        {/* Content Section */}
        <CardContent className="md:w-2/3 md:ml-6 flex flex-col">
          <h2 className="font-bold text-lg mb-2">
            <Link href={`/contestants/${generateSlug(contestant.name)}`}>
              {contestant.name}
            </Link>
          </h2>

          {/* Display the full description */}
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-4">
            {contestant.description}
          </p>

          <div className="mt-2">
            <Badge>{contestant.gender}</Badge>
            <Badge className="ml-2">{contestant.season}</Badge>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
