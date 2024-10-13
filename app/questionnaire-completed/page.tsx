"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../components/NavBar";
import myBg from "../public/images/maritime-grid.png";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Ship } from "lucide-react";
import { Button } from "@/components/ui/button";

async function customFetch(
  url: string,
  method: "GET" | "POST" | "DELETE",
  bodyData?: Record<string, unknown>
) {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="))
    ?.split("=")[1]; // Retrieve the token from cookies

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, // Add the Bearer token here
  };

  const options: RequestInit = {
    method,
    headers,
  };

  if ((method === "POST" || method === "DELETE") && bodyData) {
    options.body = JSON.stringify(bodyData);
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Failed to fetch from ${url}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

const QuestionnairePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    // Fetch the progress data
    const checkProgress = async () => {
      const progressData = await customFetch(
        "https://psacodesprint.vercel.app/progress",
        "GET"
      );
      console.log(progressData?.is_question_done);
      if (!progressData?.is_question_done) {
        return router.push("questionnaire");
      } else {
        setLoading(false); // Stop loading if the question isn't done
      }
    };

    checkProgress();
  }, [router]);

  const handleRetake = async () => {
    try {
      // Send DELETE request to delete the assessment data using customFetch
      const result = await customFetch(
        "https://psacodesprint.vercel.app/answers",
        "DELETE"
      );

      if (result) {
        // If deletion is successful, redirect to /questionnaire
        router.push("/questionnaire");
      }
    } catch (error) {
      console.error("Error deleting assessment:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Show loading while fetching data
  }

  return (
    <div className="flex h-screen">
      <NavBar />
      <Image
        src={myBg}
        alt="bg"
        className="w-full h-full object-cover object-center -z-10 absolute opacity-30"
      />
      <main className="flex-grow flex items-center justify-center mx-4">
        <Card className="w-full max-w-7xl mx-auto shadow-lg bg-gradient-to-r from-slate-50 to-blue-50">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <Ship className="text-blue-700 w-12 h-12" />
              <h2 className="text-2xl font-bold text-slate-800">
                Assessment Completed
              </h2>
              <div className="w-12 h-12" /> {/* Spacer for alignment */}
            </div>
            <p className="mb-6 text-center text-slate-600">
              Do you wish to retake the career assessment?
            </p>
            <div className="flex justify-center space-x-4 w-full">
              <Button
                onClick={() => router.push("/progress")}
                className="bg-blue-700 hover:bg-blue-800 text-white flex items-center whitespace-nowrap mt-5"
              >
                Return to progress
              </Button>
              <Button
                onClick={handleRetake} // Call handleRetake function on click
                type="submit"
                className="bg-blue-700 hover:bg-blue-800 text-white flex items-center whitespace-nowrap mt-5"
              >
                Retake Assessment
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default QuestionnairePage;
