import { Loader2 } from "lucide-react"

/**
 * Loading Component
 * 
 * A beautiful loading component with an animated spinner.
 * This is used by Next.js for loading states between page transitions.
 */
export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}
