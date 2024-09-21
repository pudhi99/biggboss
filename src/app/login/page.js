"use client";
import React, { useState } from "react";
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
import { doCredentialLogin } from "../actions";
import { useRouter } from "next/navigation";

const Login = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  async function onSubmit(event) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);

      const response = await doCredentialLogin(formData);
      if (!!response.error) {
        console.error(response.error);
        setError(response.error.message);
      } else {
        router.push("/dashboard");
      }
    } catch (e) {
      console.error(e);
      setError("Check your Credentials");
    }
  }
  return (
    <div className="container flex justify-center items-center h-screen">
      <Card>
        <form className="" onSubmit={onSubmit}>
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input type="email" name="email" id="email" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input type="password" name="password" id="password" />
            </div>
            <div className="space-y-1">
              <Button
                variant="link"
                type="button"
                onClick={() => setShowForgetPassword(true)}
              >
                Forgot password
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Submit</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
