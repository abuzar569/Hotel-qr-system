import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function MenuItemSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <CardContent className="p-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-2/3 mb-2" />
        <Skeleton className="h-5 w-1/4" />
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-8" />
          <Skeleton className="h-9 w-9" />
        </div>
        <Skeleton className="h-9 w-24" />
      </CardFooter>
    </Card>
  )
}
