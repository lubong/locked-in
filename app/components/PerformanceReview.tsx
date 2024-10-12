"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmployeeHeader } from "./performance/employee-header";
import { PerformanceCategories } from "./performance/performance-categories";
import { FeedbackSection } from "./performance/feedback-section";
import { ReviewSummary } from "./performance/review-summary";

type PerformanceData = {
  categories: { [key: string]: number };
  comments: string;
  overallRating: number;
  actionItems: string[];
};

export default function PerformanceReview() {
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
  });

  const handleCategoryChange = (category: string, rating: number) => {
    setPerformanceData((prev) => ({
      ...prev,
      categories: { ...prev.categories, [category]: rating },
    }));
  };

  const handleCommentsChange = (comments: string) => {
    setPerformanceData((prev) => ({ ...prev, comments }));
  };

  const handleOverallRatingChange = (rating: number) => {
    setPerformanceData((prev) => ({ ...prev, overallRating: rating }));
  };

  const handleActionItemsChange = (actionItems: string[]) => {
    setPerformanceData((prev) => ({ ...prev, actionItems }));
  };

  const handleSubmit = () => {
    console.log("Submitting performance review:", performanceData);
    // Here you would typically send this data to your backend
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto bg-gradient-to-b from-blue-200 to-blue-500 shadow-lg border border-blue-600">
        <CardHeader>
          <CardTitle className="text-white">
            Employee Performance Review
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-blue-800">
          <EmployeeHeader
            name="John Doe"
            position="Software Engineer"
            department="Engineering"
            reviewPeriod="January 2023 - December 2023"
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
          <Button
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white border border-blue-500 shadow-md"
          >
            Submit Review
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
