import { Skeleton } from "@/components/ui"

export default function Loading() {
  return (
    <div className="space-y-10">
      <div className="overflow-hidden rounded-[28px] border border-subtle bg-surface p-8 shadow-[0_30px_68px_-44px_rgba(36,30,26,0.25)] md:p-12">
        <div className="space-y-3">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-4 w-3/5" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-3xl border border-subtle bg-surface-solid p-5 shadow-[0_24px_60px_-42px_rgba(35,29,24,0.25)]">
            <Skeleton className="mb-3 aspect-video w-full rounded-2xl" />
            <Skeleton className="mb-2 h-5 w-3/4" />
            <Skeleton className="mb-4 h-4 w-1/2" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-12 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
