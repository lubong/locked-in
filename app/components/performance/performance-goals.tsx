"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Anchor } from "lucide-react";

interface Goal {
  id: string;
  title: string;
}

const fetchGoals = async (): Promise<Goal[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    { id: "1", title: "Navigate International Waters" },
    { id: "2", title: "Master Advanced Navigation Systems" },
    { id: "3", title: "Improve Ship-to-Shore Communication" },
    { id: "4", title: "Optimize Fuel Efficiency" },
    { id: "5", title: "Enhance Maritime Safety Protocols" },
  ];
};

export default function MaritimeGoals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGoals = async () => {
      try {
        const fetchedGoals = await fetchGoals();
        setGoals(fetchedGoals);
        setLoading(false);
      } catch (err) {
        setError("Failed to load goals. Please try again later.");
        setLoading(false);
        console.error(err);
      }
    };

    loadGoals();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Charting course...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <Card className="bg-blue-50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold text-blue-900">
          Goal Setting for Employee
        </CardTitle>
        <Anchor className="h-4 w-4 text-blue-500" />
      </CardHeader>
      <div className="m-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal, index) => (
            <Card key={goal.id} className="bg-blue-600 border-blue-600">
              <CardContent className="p-4 flex items-center">
                <div className=" font-bold text-blue-200 mr-4">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h2 className="font-semibold text-white">{goal.title}</h2>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );
}
