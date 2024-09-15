"use client";
import React from "react";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Logout from "./Logout";
import { PanelLeftOpen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const RenderButton = (props) => {
    return (
      <Link href={props.link.link}>
        <Button
          className={`${
            pathname == props.link.link ? "bg-chart-3" : ""
          } w-full`}
          variant="outline"
        >
          {props.link.label}
        </Button>
      </Link>
    );
  };
  const RenderElements = () => {
    const links = [
      { link: "/dashboard/contestants", label: "Contestants" },
      { link: "/dashboard/nominated-list", label: "Nominated List" },
      { link: "/dashboard/eliminated-list", label: "Eliminated List" },
      { link: "/dashboard/captain-list", label: "Captain List" },
    ];
    return (
      <div className="mt-4">
        {links.map((eachLink) => (
          <div key={eachLink.link} className="grid gap-4 py-2">
            <RenderButton link={eachLink} />
          </div>
        ))}
      </div>
    );
  };
  return (
    <div>
      <div className="hidden sm:block">
        <div className="bg-background border-r p-6 shadow-lg h-[calc(100vh-56px)] ">
          <div className="flex flex-col justify-between h-full">
            <div className="">
              <h1 className="text-center">Form Fields</h1>
              <RenderElements />
            </div>
            <div className="mt-auto w-full">
              <Logout />
            </div>
          </div>
        </div>
      </div>
      <div className="block sm:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <PanelLeftOpen />
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"} className="flex flex-col justify-between">
            <SheetHeader>
              <SheetTitle>Form Fields</SheetTitle>
            </SheetHeader>
            <RenderElements />
            <SheetFooter className="mt-auto">
              <Logout />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Sidebar;
