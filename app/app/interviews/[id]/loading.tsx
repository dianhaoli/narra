import { Skeleton } from "@/components/ui"

export default function Loading() {
  return (
    <div className="space-y-10">
      <div className="space-y-4 rounded-[32px] border border-subtle bg-surface p-10 shadow-[0_36px_78px_-48px_rgba(34,28,22,0.25)]">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-7 w-3/4" />
        <Skeleton className="h-4 w-1/3" />
        <div className="flex gap-3">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-6 w-40 rounded-full" />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6 rounded-3xl border border-subtle bg-surface-solid p-8 shadow-[0_30px_65px_-42px_rgba(34,28,22,0.25)]">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-48 w-full rounded-2xl" />
          <Skeleton className="h-3 w-2/3" />
        </div>
        <div className="space-y-4 rounded-3xl border border-subtle bg-surface-solid p-6 shadow-[0_26px_55px_-38px_rgba(34,28,24,0.25)]">
          <Skeleton className="h-5 w-32" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-14 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
