import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type PerformanceCategoriesProps = {
  categories: { [key: string]: number };
  onChange: (category: string, rating: number) => void;
};

export function PerformanceCategories({
  categories,
  onChange,
}: PerformanceCategoriesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Categories</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(categories).map(([category, rating]) => (
          <div key={category}>
            <Label>{category}</Label>
            <RadioGroup
              defaultValue={rating.toString()}
              onValueChange={(value) => onChange(category, parseInt(value))}
              className="flex space-x-2"
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <div key={value} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={value.toString()}
                    id={`${category}-${value}`}
                  />
                  <Label htmlFor={`${category}-${value}`}>{value}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
