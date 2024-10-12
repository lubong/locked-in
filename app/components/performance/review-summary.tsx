import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type ReviewSummaryProps = {
  overallRating: number
  actionItems: string[]
  onOverallRatingChange: (rating: number) => void
  onActionItemsChange: (actionItems: string[]) => void
}

export function ReviewSummary({ 
  overallRating, 
  actionItems, 
  onOverallRatingChange, 
  onActionItemsChange 
}: ReviewSummaryProps) {
  const [newActionItem, setNewActionItem] = useState('')

  const handleAddActionItem = () => {
    if (newActionItem.trim()) {
      onActionItemsChange([...actionItems, newActionItem.trim()])
      setNewActionItem('')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Review Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Overall Rating</Label>
          <RadioGroup
            defaultValue={overallRating.toString()}
            onValueChange={(value) => onOverallRatingChange(parseInt(value))}
            className="flex space-x-2 mt-2"
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <div key={value} className="flex items-center space-x-2">
                <RadioGroupItem value={value.toString()} id={`overall-${value}`} />
                <Label htmlFor={`overall-${value}`}>{value}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div>
          <Label>Action Items</Label>
          <ul className="list-disc list-inside mt-2 space-y-2">
            {actionItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <div className="flex space-x-2 mt-2">
            <Input
              placeholder="New action item"
              value={newActionItem}
              onChange={(e) => setNewActionItem(e.target.value)}
            />
            <Button onClick={handleAddActionItem}>Add</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}