import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function OrderItemSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="h-2 bg-muted" />
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <div>
            <Skeleton className="h-5 w-32 mb-2" />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="mt-2 sm:mt-0 flex items-center">
            <Skeleton className="h-5 w-16 mr-4" />
            <Skeleton className="h-9 w-32" />
          </div>
        </div>
        <div className="space-y-2 mb-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
        <Skeleton className="h-9 w-28" />
      </CardContent>
    </Card>
  )
}
