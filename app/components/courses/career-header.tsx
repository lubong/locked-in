import { Anchor, Star } from "lucide-react"
import { ProgressBar } from "./progress-bar"

interface CareerHeaderProps {
  title: string
  description: string
  level: number
  maxLevel: number
}

export function CareerHeader({ title, description, level, maxLevel }: CareerHeaderProps) {
  return (
    <div className="mb-12 text-center">
      <div className="inline-block p-4 bg-blue-800 rounded-full mb-4">
        <Anchor className="w-12 h-12" />
      </div>
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-xl mb-6 max-w-2xl mx-auto">{description}</p>
      <div className="flex items-center justify-center mb-4">
        {Array.from({ length: maxLevel }).map((_, index) => (
          <Star 
            key={index} 
            className={`w-8 h-8 ${index < level ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} 
          />
        ))}
      </div>
      <div className="max-w-md mx-auto">
        <ProgressBar progress={(level / maxLevel) * 100} />
        <p className="mt-2 text-sm">Career Level: {level}/{maxLevel}</p>
      </div>
    </div>
  )
}