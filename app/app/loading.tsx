import { Skeleton } from "@/components/ui"

export default function Loading() {
  return (
    <div className="container mx-auto space-y-12 px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero card skeleton */}
      <div className="grid gap-8 rounded-[32px] border border-subtle bg-background/60 p-10 shadow-[0_35px_80px_-50px_rgba(34,28,22,0.25)] backdrop-blur-sm md:grid-cols-[1.2fr_0.8fr] md:p-16">
        <div className="space-y-4">
          <Skeleton className="h-4 w-40 rounded-full" />
          <Skeleton className="h-9 w-3/4" />
          <Skeleton className="h-9 w-2/3" />
          <div className="flex gap-3 pt-2">
            <Skeleton className="h-10 w-36 rounded-full" />
            <Skeleton className="h-10 w-40 rounded-full" />
          </div>
        </div>
        <div className="space-y-3 rounded-3xl border border-subtle bg-background/70 p-8">
          <Skeleton className="h-5 w-44" />
          <Skeleton className="h-4 w-3/5" />
          <Skeleton className="h-4 w-2/5" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-6 w-72" />
          </div>
          <Skeleton className="h-8 w-28" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-3xl border border-subtle bg-surface-solid p-5 shadow-[0_24px_60px_-42px_rgba(35,29,24,0.25)]">
              <Skeleton className="mb-3 aspect-video w-full rounded-2xl" />
              <Skeleton className="mb-2 h-5 w-3/4" />
              <Skeleton className="mb-4 h-4 w-1/2" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-12 rounded-full" />
                <Skeleton className="h-6 w-10 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
