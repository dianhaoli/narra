import { Skeleton } from "@/components/ui"

export default function Loading() {
  return (
    <div className="space-y-10">
      <div className="overflow-hidden rounded-[36px] border border-subtle bg-surface p-10 shadow-[0_36px_80px_-48px_rgba(34,28,22,0.25)] md:p-12">
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-6">
            <Skeleton className="h-28 w-28 rounded-3xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-7 w-64" />
              <Skeleton className="h-4 w-56" />
            </div>
          </div>
          <div className="rounded-3xl border border-subtle bg-soft px-6 py-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="mt-2 h-5 w-56" />
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        <div className="rounded-3xl border border-subtle bg-surface-solid p-6 shadow-[0_28px_62px_-44px_rgba(34,28,22,0.25)]">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="mt-4 h-4 w-3/4" />
          <Skeleton className="mt-2 h-4 w-2/3" />
        </div>
        <div className="rounded-3xl border border-subtle bg-surface-solid p-6 shadow-[0_28px_62px_-44px_rgba(34,28,22,0.25)]">
          <Skeleton className="h-5 w-28" />
          <div className="mt-3 flex flex-wrap gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-16 rounded-full" />
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div className="flex items-end justify-between">
          <Skeleton className="h-6 w-72" />
          <Skeleton className="h-8 w-28" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-3xl border border-subtle bg-surface-solid p-5">
              <Skeleton className="mb-3 aspect-video w-full rounded-2xl" />
              <Skeleton className="mb-2 h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
