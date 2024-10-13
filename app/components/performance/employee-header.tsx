"use client";
import { Card, CardContent } from "@/components/ui/card";

type EmployeeHeaderProps = {
  name: string;
  position: string;
  department: string;
  reviewPeriod: string;
  title: string;
  onChange: (newTitle: string) => void;
};

export function EmployeeHeader({
  name,
  position,
  department,
  reviewPeriod,
  title,
  onChange,
}: EmployeeHeaderProps) {
  return (
    <Card>
      <CardContent className="p-4">
        {/* Editable title at the top */}
        <div className="mb-4">
          <h3 className="font-semibold">Title</h3>
          <input
            type="text"
            value={title}
            onChange={(e) => onChange(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        {/* Employee details below */}
        <div className="grid grid-cols-2 gap-4">
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
        </div>
      </CardContent>
    </Card>
  );
}
