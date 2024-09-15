"use client";
import { logout } from "@/app/actions";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

function Logout() {
  const router = useRouter();
  const onSubmit = (event) => {
    event.preventDefault();
    try {
      const response = logout();
      router.push("/");
    } catch (error) {}
  };
  return (
    <div className="w-full">
      <form onSubmit={onSubmit}>
        <div className="grid gap-4 py-2">
          <Button type="submit">Logout</Button>
        </div>
      </form>
    </div>
  );
}

export default Logout;
