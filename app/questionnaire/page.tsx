"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Questionnaire from "../components/Questionnaire";
import NavBar from "../components/NavBar";
import myBg from "../public/images/maritime-grid.png";
import Image from "next/image";

async function customFetch(
  url: string,
  method: "GET" | "POST",
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

  if (method === "POST" && bodyData) {
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

      if (progressData?.is_question_done) {
        router.push("/questionnaire-completed"); // Redirect if the question is done
      } else {
        setLoading(false); // Stop loading if the question isn't done
      }
    };

    checkProgress();
  }, [router]);

  if (loading) {
    return <p>Loading...</p>; // Show loading while fetching data
  }

  return (
    <div className="flex h-screen">
      <NavBar></NavBar>
      <Image
        src={myBg}
        alt="bg"
        className="w-full h-full object-cover object-center -z-10 absolute opacity-30"
      />
      <main className="flex-grow flex items-center justify-center mx-4">
        <Questionnaire />
      </main>
    </div>
  );
};

export default QuestionnairePage;
