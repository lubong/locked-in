"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Anchor, Ship, ChevronRight } from "lucide-react";

const setTotalQuestions = 5;

// Custom fetch function with authorization handling
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

const getNextQuestion = async (
  question: string,
  answer: string
): Promise<string | null> => {
  // Post answer using the custom fetch
  const postResponse = await customFetch(
    "https://psacodesprint.vercel.app/answer",
    "POST",
    { question, answer }
  );

  if (!postResponse) {
    return null; // Stop if posting the answer failed
  }

  // Fetch the next question using the custom fetch
  const progressResponse = await customFetch(
    "https://psacodesprint.vercel.app/progress",
    "GET"
  );

  if (!progressResponse) {
    return null; // Stop if fetching the next question failed
  }

  return progressResponse.next_question || null;
};

export default function Component() {
  const [currentQuestion, setCurrentQuestion] = useState(
    "What's your current job role at PSA?"
  );
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [progress, setProgress] = useState(0);

  const totalQuestions = setTotalQuestions;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAnswers((prev) => ({ ...prev, [currentQuestion]: answer }));

    const nextQuestion = await getNextQuestion(currentQuestion, answer);

    if (nextQuestion) {
      setCurrentQuestion(nextQuestion);
      setAnswer("");
      setProgress(((Object.keys(answers).length + 1) / totalQuestions) * 100);
    } else {
      setIsComplete(true);
      setProgress(100);
    }
    setIsLoading(false);
  };

  if (isComplete) {
    return (
      <Card className="w-full max-w-7xl mx-auto shadow-lg bg-gradient-to-r from-slate-50 to-blue-50">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <Ship className="text-blue-700 w-12 h-12" />
            <h2 className="text-2xl font-bold text-slate-800">
              Assessment Complete
            </h2>
            <div className="w-12 h-12" /> {/* Spacer for alignment */}
          </div>
          <p className="mb-6 text-center text-slate-600">
            Thank you for sharing your maritime expertise.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(answers).map(([question, answer]) => (
              <div
                key={question}
                className="bg-white p-4 rounded-lg shadow flex flex-col justify-between"
              >
                <p className="font-medium text-sm text-blue-700 mb-2">
                  {question}
                </p>
                <p className="text-slate-700">{answer}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-3/4 py-6 max-w-7xl mx-auto shadow-lg bg-gradient-to-r from-slate-50 to-blue-50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Anchor className="text-blue-700 w-6 h-6" />
          <div className="flex-grow mx-4">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-slate-600 mt-1 text-center">{`Question ${
              Object.keys(answers).length + 1
            } of ${totalQuestions}`}</p>
          </div>
          <Ship className="text-blue-700 w-6 h-6" />
        </div>
        <form onSubmit={handleSubmit} className="flex items-start space-x-4">
          <div className="flex-grow">
            <h2 className="text-xl font-semibold mb-2 text-slate-800">
              {currentQuestion}
            </h2>
            <div className="flex space-x-4">
              <Input
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter your response"
                required
                className="flex-grow bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500"
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-blue-700 hover:bg-blue-800 text-white flex items-center whitespace-nowrap"
              >
                {isLoading ? "Processing..." : "Next"}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
