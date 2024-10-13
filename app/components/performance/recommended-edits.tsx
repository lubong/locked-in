import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Anchor, Info } from "lucide-react";

export interface Edit {
  original: string;
  suggested: string[];
  reason: string;
}

type RecommendedEditsProps = {
  edits: Edit[];
  onApplyEdit: (index: number) => void;
  comments: string;
  onCommentsChange: (comments: string) => void;
};

export function RecommendedEdits({
  edits,
  onApplyEdit,
  comments,
  onCommentsChange,
}: RecommendedEditsProps) {
  const [expandedEdit, setExpandedEdit] = useState<number | null>(null);
  const [, setHighlightedText] = useState<string | null>(null);
  console.log(edits);
  const handleEditClick = (edit: Edit) => {
    setHighlightedText(edit.original);
    const newComments = comments.replace(
      edit.original,
      `<span class="bg-yellow-200">${edit.original}</span>`
    );
    onCommentsChange(newComments);
  };

  return (
    <Card className="bg-blue-50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold text-blue-900">
          Recommended Edits
        </CardTitle>
        <Anchor className="h-4 w-4 text-blue-500" />
      </CardHeader>
      <CardContent>
        {edits.length === 0 ? (
          <p className="text-blue-800">
            No recommended edits for this review. Clear skies ahead!
          </p>
        ) : (
          <div className="space-y-4">
            {edits.map((edit, index) => (
              <div
                key={index}
                className="border border-blue-200 rounded-lg p-4 bg-white"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-blue-800">
                    Edit Suggestion: {edit.original}
                  </h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setExpandedEdit(expandedEdit === index ? null : index);
                      handleEditClick(edit);
                    }}
                    className="text-blue-600 border-blue-300 hover:bg-blue-100"
                  >
                    {expandedEdit === index ? "Collapse" : "Expand"}
                  </Button>
                </div>
                {expandedEdit === index && (
                  <div className="space-y-2 mt-2">
                    <div className="flex items-start space-x-2 bg-blue-100 p-2 rounded">
                      <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                      <p className="text-blue-800 text-sm">{edit.reason}</p>
                    </div>
                    {edit.suggested.map((sugg) => (
                      <Textarea
                        value={sugg}
                        key={sugg}
                        readOnly
                        className="w-full bg-blue-50 text-blue-800 border-blue-200"
                      />
                    ))}

                    <Button
                      onClick={() => onApplyEdit(index)}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Apply Edit
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
