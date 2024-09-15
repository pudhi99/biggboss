import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import Image from "next/image";

export function NominationList(props) {
  const dataLength = 1;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {props.weekUpdates?.map((item) => (
        <Card key={item.id} className="w-full">
          <CardHeader>
            <CardTitle>{item.week}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {item.nominatedContestants.map((contestant) => (
                <div
                  key={contestant._id}
                  className="flex items-center gap-4 border-b pb-2"
                >
                  {/* Contestant Image */}
                  <Image
                    width="48"
                    height="48"
                    src={contestant.image}
                    alt={contestant.name}
                    className=" object-cover rounded-full"
                  />

                  {/* Contestant Name and Votes */}
                  <div>
                    <h4 className="font-semibold">{contestant.name}</h4>
                    <p className="text-sm text-gray-500">
                      Votes: {contestant.votes}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link
              href={`/dashboard/nominated-list/create-nominated-list/${
                item.week.split(" ")[1]
              }`}
            >
              <Button variant="outline">Update</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
