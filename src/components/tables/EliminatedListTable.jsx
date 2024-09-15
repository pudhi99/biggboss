"use client";

import * as React from "react";
import { useState } from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";
import { EliminationForm } from "../forms/EliminationForm";

// Updated columns definition
export const columns = [
  {
    accessorKey: "week",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Week
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("week")}</div>,
  },
  {
    accessorKey: "eliminatedContestant",
    header: "Eliminated Contestant",
    cell: ({ row }) => {
      const eliminatedContestants = row.getValue("eliminatedContestant");
      const validContestants = eliminatedContestants?.filter(
        (contestant) => contestant !== null && contestant !== undefined
      );

      if (validContestants && validContestants.length > 0) {
        return (
          <div className="flex flex-col">
            {eliminatedContestants.map((contestant) => (
              <div key={contestant?._id} className="flex items-center mb-2">
                <Image
                  src={contestant?.image}
                  alt="Contestant Image"
                  width="48"
                  height="48"
                  className="object-cover rounded-full"
                />
                <div className="ml-4">
                  <div className="font-bold capitalize">{contestant?.name}</div>
                  <div className="text-sm text-gray-500">
                    Age: {contestant?.age}
                  </div>
                  <div className="text-sm text-gray-500">
                    Gender: {contestant?.gender}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      } else {
        return (
          <div>
            <Dialog>
              <DialogTrigger>Select Contestant</DialogTrigger>
              <DialogContent>
                <EliminationForm weekUpdates={row.original} />
              </DialogContent>
            </Dialog>
          </div>
        );
      }
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const contestant = row.original; // Access the entire row data

      return (
        <div>
          <Dialog>
            <DialogTrigger>Edit</DialogTrigger>
            <DialogContent>
              <EliminationForm weekUpdates={row.original} />
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];

export function EliminatedListTable(props) {
  const [sorting, setSorting] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const data = props.weekUpdates || [];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnVisibility,
    },
  });

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
