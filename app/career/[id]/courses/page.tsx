"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import CareerCoursePage from "../../../components/Course";
import Navbar from "../../../components/NavBar";

export interface Course {
  id: string;
  name: string;
  url: string;
  is_done: boolean;
}

export interface CareerData {
  courses: Course[];
  title: string;
}

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

const CareerRoute = () => {
  const params = useParams();
  const { id } = params;
  const [courselist, setCourseList] = useState<CareerData>();

  useEffect(() => {
    // Define the async function inside useEffect
    const fetchSkills = async () => {
      try {
        const data = await customFetch(
          `https://psacodesprint.vercel.app/career/${id}/courses`,
          "GET"
        );
        setCourseList(data);
      } catch {}
    };

    console.log(courselist);
    fetchSkills(); // Call the async function
  }, []);

  if (courselist === undefined || courselist?.courses === undefined) {
    return <div></div>;
  }
  return (
    <div>
      <Navbar />
      <CareerCoursePage
        courses={courselist?.courses}
        title={courselist?.title}
      />
    </div>
  );
};

export default CareerRoute;
