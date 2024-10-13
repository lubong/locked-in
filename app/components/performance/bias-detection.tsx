import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Anchor } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type BiasType = "gender" | "racial" | "age" | "performance";

type BiasDetectionProps = {
  detectedBiases: Record<BiasType, number>;
};

export function BiasDetection({ detectedBiases }: BiasDetectionProps) {
  const biasDescriptions: Record<BiasType, string> = {
    gender: "Potential gender bias detected in the language used.",
    racial: "Possible racial bias identified in the assessment.",
    age: "Age-related bias may be present in the evaluation.",
    performance: "Performance bias potentially affecting the overall rating.",
  };

  const chartData = Object.entries(detectedBiases).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value,
  }));

  const COLORS = ["#003f5c", "#58508d", "#bc5090", "#ff6361"];

  return (
    <Card className="bg-blue-50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold text-blue-900">
          Bias Detection
        </CardTitle>
        <Anchor className="h-4 w-4 text-blue-500" />
      </CardHeader>
      <CardContent className="pt-0 p-8">
        {Object.values(detectedBiases).every((v) => v === 0) ? (
          <p className="text-blue-800">
            No biases detected in the current review. Smooth sailing!
          </p>
        ) : (
          <>
            <div className="h-80 w-full">
              <ChartContainer
                config={{
                  gender: {
                    label: "Gender",
                    color: COLORS[0],
                  },
                  racial: {
                    label: "Racial",
                    color: COLORS[1],
                  },
                  age: {
                    label: "Age",
                    color: COLORS[2],
                  },
                  performance: {
                    label: "Performance",
                    color: COLORS[3],
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            <div className="space-y-4 mt-4">
              {Object.entries(detectedBiases).map(
                ([bias, count]) =>
                  count > 0 && (
                    <Alert
                      key={bias}
                      variant="default"
                      className="bg-blue-100 border-blue-300"
                    >
                      <AlertTriangle className="h-4 w-4 text-blue-500" />
                      <AlertTitle className="text-blue-800">
                        {count} {bias} bias instance(s) detected
                      </AlertTitle>
                      <AlertDescription className="text-blue-600">
                        {biasDescriptions[bias as BiasType]}
                      </AlertDescription>
                    </Alert>
                  )
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
