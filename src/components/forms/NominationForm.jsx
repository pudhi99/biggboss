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
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

// Schema for form validation
const formSchema = z.object({
  nominatedContestants: z.array(
    z.object({
      id: z.string(), // Contestant ID
      votes: z.number().min(1, "At least 1 vote must be given"), // Number of votes
    })
  ),
  week: z.string().min(2, {
    message: "Week must be at least 2 characters.",
  }),
  eliminatedContestant: z
    .array(z.object({ id: z.string() })) // Store as an array of objects with { id }
    .optional(),
  captain: z.string().optional(),
});

export function NominationForm(props) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nominatedContestants: props.weekUpdates?.nominatedContestants || [],
      week: props.weekUpdates?.week || "Week " + props.week,
      eliminatedContestant: props.weekUpdates.eliminatedContestant || [],
      captain: props.weekUpdates?.captain || "",
    },
  });

  // Error handler for submission
  const onError = (errors) => {
    console.error("Form submission error:", errors);
  };

  const onSubmit = async (formData) => {
    console.log(formData, "checking formData"); // Debugging check

    let response;
    try {
      if (props.weekUpdates?._id) {
        response = await fetch(`/api/week-updates/${props.week}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      } else {
        response = await fetch("/api/week-updates", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      }

      if (response.ok) {
        const data = await response.json();
        console.log("Form submitted successfully:", data);
      } else {
        const errorText = await response.text();
        console.error("Submission failed:", errorText);
      }
    } catch (error) {
      console.error("Error in submission:", error);
    }
  };

  const isSelected = (contestantId) => {
    const nominatedContestants = form.watch("nominatedContestants") || [];
    return nominatedContestants.some(
      (contestant) => contestant?.id === contestantId
    );
  };

  return (
    <div>
      <h1 className="text-center mb-3 text-lg">
        Week {props.week} Nomination Form
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)} // Add the onError handler here
          className="space-y-4"
        >
          <Card className="w-full sm:w-[400px] sm:mx-auto">
            <CardHeader>
              <h2 className="text-lg font-semibold">Nominate Contestants</h2>
            </CardHeader>
            <CardContent>
              {props.contestants.map((contestant) => (
                <FormField
                  key={contestant._id}
                  control={form.control}
                  name="nominatedContestants"
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
                                form.getValues("nominatedContestants") || [];
                              if (checked) {
                                form.setValue("nominatedContestants", [
                                  ...currentValues,
                                  { id: contestant._id, votes: 1 },
                                ]);
                              } else {
                                form.setValue(
                                  "nominatedContestants",
                                  currentValues.filter(
                                    (item) => item.id !== contestant._id
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
                          <span className="font-medium">{contestant.name}</span>
                        </label>
                      </FormControl>

                      {isSelected(contestant._id) && (
                        <FormField
                          control={form.control}
                          name={`nominatedContestants`}
                          render={() => (
                            <FormItem>
                              <label className="block px-3 mt-2">
                                <span>Votes:</span>
                                <input
                                  type="number"
                                  min="1"
                                  className="ml-2 px-2 py-1 border rounded-md"
                                  value={
                                    form
                                      .getValues("nominatedContestants")
                                      .find(
                                        (item) => item.id === contestant._id
                                      )?.votes || 1
                                  }
                                  onChange={(e) => {
                                    const voteValue = e.target.value
                                      ? Number(e.target.value)
                                      : 1;
                                    const updatedValues = form
                                      .getValues("nominatedContestants")
                                      .map((item) =>
                                        item.id === contestant._id
                                          ? { ...item, votes: voteValue }
                                          : item
                                      );
                                    form.setValue(
                                      "nominatedContestants",
                                      updatedValues
                                    );
                                  }}
                                />
                              </label>
                            </FormItem>
                          )}
                        />
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </CardContent>
            <CardFooter>
              {props.weekUpdates?._id ? (
                <Button type="submit">Update Nominations</Button>
              ) : (
                <Button type="submit">Submit Nominations</Button>
              )}
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
