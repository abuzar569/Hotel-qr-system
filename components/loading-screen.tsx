import { LoadingSpinner } from "@/components/loading-spinner"
import { cn } from "@/lib/utils"

interface LoadingScreenProps {
  message?: string
  className?: string
}

export function LoadingScreen({ message = "Loading...", className }: LoadingScreenProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-background",
        "animate-in fade-in duration-300",
        className,
      )}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="relative">
          <LoadingSpinner size="lg" className="text-primary" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="sr-only">Loading</span>
          </div>
        </div>
        <p className="text-lg font-medium text-muted-foreground animate-pulse">{message}</p>
      </div>
    </div>
  )
}
