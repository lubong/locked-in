interface ProgressBarProps {
  progress: number
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full bg-blue-800 rounded-full h-4 overflow-hidden">
      <div 
        className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}