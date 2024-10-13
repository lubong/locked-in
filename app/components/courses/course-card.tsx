import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, BarChart } from "lucide-react";
import { ProgressBar } from "./progress-bar";
import Link from "next/link";

interface CourseCardProps {
  name: string;
  url: string;
}

export function CourseCard({ name, url }: CourseCardProps) {
  return (
    <Card className="bg-blue-800 border-blue-600 text-white">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription className="text-blue-200">
          Learn {name}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            <span className="text-sm">3 days</span>
          </div>
          <div className="flex items-center">
            <BarChart className="w-4 h-4 mr-2" />
            <span className="text-sm">5</span>
          </div>
        </div>
        <ProgressBar progress={50} />
        <p className="text-right text-sm mt-2">{50}% Complete</p>
      </CardContent>
      <CardFooter>
        <Link className="w-full" href={url}>
          <Button className="w-full bg-blue-500 hover:bg-blue-600">
            {50 > 0 ? "Continue Course" : "Start Course"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
