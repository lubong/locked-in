"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmployeeHeader } from "./performance/employee-header";
import { PerformanceCategories } from "./performance/performance-categories";
import { FeedbackSection } from "./performance/feedback-section";
import { ReviewSummary } from "./performance/review-summary";
import { BiasDetection } from "./performance/bias-detection";
import { RecommendedEdits, Edit } from "./performance/recommended-edits";
import { useRouter } from "next/navigation";

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

type PerformanceData = {
  categories: { [key: string]: number };
  comments: string;
  overallRating: number;
  actionItems: string[];
  title: string;
};

type BiasType = "gender" | "racial" | "age" | "performance";

export default function PerformanceReview() {
  const [isLoading, setIsLoading] = useState(false);
  const [performanceData, setPerformanceData] = useState<PerformanceData>({
    categories: {
      "Job Knowledge": 0,
      "Quality of Work": 0,
      Productivity: 0,
      Communication: 0,
      Teamwork: 0,
    },
    comments: "",
    overallRating: 0,
    actionItems: [],
    title: "",
  });
  const [detectedBiases, setDetectedBiases] = useState<
    Record<BiasType, number>
  >({
    gender: 0,
    racial: 0,
    age: 0,
    performance: 0,
  });
  const [recommendedEdits, setRecommendedEdits] = useState<Edit[]>([]);
  const [displayComments, setDisplayComments] = useState("");
  const [, setCanSubmit] = useState(false); // State to track submission readiness
  const [biasChecked, setBiasChecked] = useState(false); // New state to track if bias check has been done
  const router = useRouter();

  useEffect(() => {
    setDisplayComments(performanceData.comments);
  }, [performanceData.comments]);

  useEffect(() => {
    // Check if there are no biases detected to enable submission
    const totalBiases = Object.values(detectedBiases).reduce(
      (acc, count) => acc + count,
      0
    );
    setCanSubmit(biasChecked && totalBiases === 0); // Submit if bias has been checked and there are no biases
  }, [detectedBiases, biasChecked]); // Add biasChecked to dependencies

  const handleCategoryChange = (category: string, rating: number) => {
    setPerformanceData((prev) => ({
      ...prev,
      categories: { ...prev.categories, [category]: rating },
    }));
  };
  const handleTitleChange = (newTitle: string) => {
    console.log(newTitle);
    setPerformanceData((prev) => ({
      ...prev,
      title: newTitle, // Update the title in performanceData
    }));
  };

  const handleCommentsChange = (comments: string) => {
    setPerformanceData((prev) => ({ ...prev, comments }));
  };

  const handleDisplayCommentsChange = (comments: string) => {
    setDisplayComments(comments);
  };

  const handleOverallRatingChange = (rating: number) => {
    setPerformanceData((prev) => ({ ...prev, overallRating: rating }));
  };

  const handleActionItemsChange = (actionItems: string[]) => {
    setPerformanceData((prev) => ({ ...prev, actionItems }));
  };

  const handleApplyEdit = (index: number) => {
    const edit = recommendedEdits[index];
    setPerformanceData((prev) => ({
      ...prev,
      comments: prev.comments.replace(edit.original, edit.suggested[index]),
    }));
    setRecommendedEdits((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCheckReview = async () => {
    setIsLoading(true);
    console.log("Checking review for biases...");
    console.log(performanceData);
    const data = await postReview(
      performanceData.title,
      performanceData.comments,
      performanceData.actionItems,
      performanceData.categories
    );
    if (data) {
      console.log("recieved reason:", data);

      // Parse the response reason to detect biases
      type BiasType = string; // Use a generic string type for dynamic keys

      // Function to dynamically set detected biases based on API response
      const handleBiasDetection = (biasTypes: Record<string, number>) => {
        const detectedBiases: Record<BiasType, number> = {};

        // Loop through the keys in the response and dynamically assign them
        Object.keys(biasTypes).forEach((key) => {
          detectedBiases[key] = biasTypes[key]; // Assign each key-value pair dynamically
        });

        setDetectedBiases(detectedBiases); // Update the state with the detected biases
      };

      handleBiasDetection(data.types);

      // Suggest edits based on the reason from the API
      const edits: Edit[] = [];

      if (data.reason) {
        edits.push({
          original: data.quote,
          suggested: data.suggestion,
          reason: data.reason,
        });
      }

      setRecommendedEdits(edits);
      setBiasChecked(true); // Mark that the bias check has been performed
      setIsLoading(false);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    console.log("Submitting performance review:", performanceData);
    router.push("/performance-review");
  };

  async function postReview(
    title: string,
    body: string,
    action_items: string[],
    aspects: object
  ) {
    const url = "https://psacodesprint.vercel.app/review";
    const bodyData = {
      title: title,
      body: body,
      action_items: action_items,
      aspects: aspects,
    };

    const response = await customFetch(url, "POST", bodyData);

    if (response) {
      if (response.is_biased) {
        console.log("Response:", response);
        return response;
      } else {
        return;
      }
    } else {
      console.error("No response received");
      return;
    }
  }

  return (
    <div className="container mx-auto p-6">
      <Card className="w-full max-w-4xl mx-auto bg-gradient-to-b from-blue-200 to-blue-500 shadow-lg border border-blue-600">
        <CardHeader>
          <CardTitle className="text-black">
            Employee Performance Review
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-blue-800">
          <EmployeeHeader
            name="John Doe"
            position="Software Engineer"
            department="Engineering"
            reviewPeriod="January 2023 - December 2023"
            title={performanceData.title}
            onChange={handleTitleChange}
          />
          <PerformanceCategories
            categories={performanceData.categories}
            onChange={handleCategoryChange}
          />
          <FeedbackSection
            comments={performanceData.comments}
            onChange={handleCommentsChange}
          />
          <ReviewSummary
            overallRating={performanceData.overallRating}
            actionItems={performanceData.actionItems}
            onOverallRatingChange={handleOverallRatingChange}
            onActionItemsChange={handleActionItemsChange}
          />
          <BiasDetection detectedBiases={detectedBiases} />
          <RecommendedEdits
            edits={recommendedEdits}
            onApplyEdit={handleApplyEdit}
            comments={displayComments}
            onCommentsChange={handleDisplayCommentsChange}
          />
          <Button
            onClick={handleCheckReview}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white border border-blue-500 shadow-md"
          >
            {isLoading ? "Submitting..." : "Submit Review"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
