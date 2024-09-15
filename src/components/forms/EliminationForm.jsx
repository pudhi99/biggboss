"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";

// Schema for form validation
const formSchema = z.object({
  week: z.string().optional(),
  eliminatedContestant: z
    .array(z.object({ id: z.string() })) // Store as an array of objects with { id }
    .optional(),
});

export function EliminationForm(props) {
  const router = useRouter();
  // Initial form setup with proper defaults
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eliminatedContestant: props.weekUpdates.eliminatedContestant || [], // Filter out null and empty strings
      week: props.weekUpdates?.week || "",
    },
  });

  const onSubmit = async (formData) => {
    let response;
    if (props.weekUpdates?._id) {
      response = await fetch(
        `/api/week-updates/${props.weekUpdates?.week.split(" ")[1]}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
    }

    if (response.ok) {
      const data = await response.json();
      router.push("/dashboard/eliminated-list");
    } else {
      // Handle error response
      const errorText = await response.text(); // Get the response as text
      console.error("Error:", errorText);
    }
  };

  // Helper function to check if a contestant is select
  const isSelected = (contestantId) => {
    const eliminatedContestant = form.watch("eliminatedContestant") || [];
    return eliminatedContestant.some(
      (contestant) => contestant?.id === contestantId
    );
  };

  return (
    <div>
      <h1 className="text-center mb-3 text-lg">
        {props.weekUpdates?.week} Elimination Form
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Card className="w-full sm:w-[400px] sm:mx-auto">
            <ScrollArea className="h-[500px] w-full rounded-md border">
              <div className="p-4">
                <CardContent>
                  {props.weekUpdates?.nominatedContestants?.map(
                    (contestant) => (
                      <FormField
                        key={contestant._id}
                        control={form.control}
                        name="eliminatedContestant"
                        render={() => (
                          <FormItem
                            className={`flex flex-col items-start py-4 border-b border-gray-300 ${
                              isSelected(contestant._id)
                                ? "bg-gray-700 text-white"
                                : ""
                            }`}
                          >
                            <FormControl>
                              <label className="flex items-center px-3 space-x-4 cursor-pointer">
                                <Checkbox
                                  checked={isSelected(contestant._id)}
                                  onCheckedChange={(checked) => {
                                    const currentValues =
                                      form.getValues("eliminatedContestant") ||
                                      [];
                                    if (checked) {
                                      form.setValue("eliminatedContestant", [
                                        { id: contestant._id }, // Add contestant ID
                                      ]);
                                    } else {
                                      form.setValue(
                                        "eliminatedContestant",
                                        currentValues.filter(
                                          (id) => id !== contestant._id // Remove contestant ID
                                        )
                                      );
                                    }
                                  }}
                                />
                                <Image
                                  src={contestant.image}
                                  alt={contestant.name}
                                  width={50}
                                  height={50}
                                  className="rounded-full"
                                />
                                <span className="font-medium">
                                  {contestant.name}
                                </span>
                              </label>
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )
                  )}
                </CardContent>
              </div>
            </ScrollArea>

            <CardFooter>
              <Button type="submit">Eliminate Contestant</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
