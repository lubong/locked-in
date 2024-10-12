"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type FeedbackSectionProps = {
  comments: string;
  onChange: (comments: string) => void;
};

export function FeedbackSection({ comments, onChange }: FeedbackSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Feedback and Comments</CardTitle>
      </CardHeader>
      <CardContent>
        <Label htmlFor="comments">Additional Comments</Label>
        <Textarea
          id="comments"
          placeholder="Provide any additional feedback or comments here..."
          value={comments}
          onChange={(e) => onChange(e.target.value)}
          className="mt-2"
          rows={5}
        />
      </CardContent>
    </Card>
  );
}
