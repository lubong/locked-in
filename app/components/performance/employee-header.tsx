"use client";
import { Card, CardContent } from "@/components/ui/card";

type EmployeeHeaderProps = {
  name: string;
  position: string;
  department: string;
  reviewPeriod: string;
};

export function EmployeeHeader({
  name,
  position,
  department,
  reviewPeriod,
}: EmployeeHeaderProps) {
  return (
    <Card>
      <CardContent className="p-4 grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold">Employee Name</h3>
          <p>{name}</p>
        </div>
        <div>
          <h3 className="font-semibold">Position</h3>
          <p>{position}</p>
        </div>
        <div>
          <h3 className="font-semibold">Department</h3>
          <p>{department}</p>
        </div>
        <div>
          <h3 className="font-semibold">Review Period</h3>
          <p>{reviewPeriod}</p>
        </div>
      </CardContent>
    </Card>
  );
}
