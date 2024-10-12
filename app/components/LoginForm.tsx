"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Here you would typically call your authentication API
    try {
      const response = await fetch("https://psacodesprint.vercel.app/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Sending email and password as JSON
      });

      if (!response.ok) {
        // If the response is not okay, throw an error
        setIsLoading(false);
        throw new Error("Invalid email or password");
      }

      const data = await response.json();
      document.cookie = `authToken=${data.token}; path=/; secure; samesite=strict;`;

      // Handle successful login, e.g., store tokens, redirect user, etc.
      console.log("Login successful:", data);
      router.push("/questionnaire");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message); // Safely access the message property
      } else {
        setError("An unexpected error occurred"); // Fallback error message
      }
      redirect("/");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-8 shadow-lg bg-gradient-to-r from-slate-50 to-blue-50">
      <CardHeader className="p-6">
        <CardTitle className="text-2xl font-bold text-slate-800">
          Login
        </CardTitle>
        <CardDescription className="text-slate-600">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 p-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-800">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-800">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertDescription className="text-red-600">
                {error}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="p-6">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white"
          >
            {isLoading ? "Logging in..." : "Log in"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
