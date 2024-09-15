"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import Link from "next/link";

const Navbar = () => {
  const { setTheme, theme } = useTheme();
  const isDarkMode = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };
  return (
    <div className="bg-navbar w-full backdrop-blur-sm px-3 md:px-0 sticky z-50 top-0">
      <div className="container mx-auto xl:px-36 h-14  flex justify-between items-center">
        <Link href="/">
          <h1>Bigg Boss</h1>
        </Link>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <MenuIcon className=" h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem></DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="theme-toggle"
                    checked={isDarkMode}
                    onCheckedChange={toggleTheme}
                  />
                  <Label htmlFor="theme-toggle">
                    {isDarkMode ? (
                      <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
                    ) : (
                      <SunIcon className="h-[1.2rem] w-[1.2rem]" />
                    )}
                  </Label>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
