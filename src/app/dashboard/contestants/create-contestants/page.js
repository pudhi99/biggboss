import { CreateContestants } from "@/components/forms/CreateContestants";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const page = () => {
  return (
    <div>
      <Card className="w-[80%] mx-auto">
        <CardHeader>
          <CardTitle>Create Contestants</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateContestants />
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
