import { Skeleton } from "@/components/ui"

export default function Loading() {
  return (
    <div className="space-y-10">
      <div className="space-y-3 rounded-[28px] border border-subtle bg-surface p-8 shadow-[0_30px_70px_-45px_rgba(36,30,26,0.25)] md:p-10">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-7 w-2/3" />
        <Skeleton className="h-4 w-3/5" />
      </div>
      <div className="grid gap-8 rounded-3xl border border-subtle bg-surface-solid p-8 shadow-[0_32px_60px_-40px_rgba(35,29,24,0.25)] md:grid-cols-2 md:p-10">
        <div className="space-y-4">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-10 w-full rounded-2xl" />
          <Skeleton className="h-28 w-full rounded-2xl" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Skeleton className="h-10 w-full rounded-2xl" />
            <Skeleton className="h-10 w-full rounded-2xl" />
          </div>
          <Skeleton className="h-10 w-full rounded-2xl" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-5 w-56" />
          <Skeleton className="h-16 w-full rounded-2xl" />
          <Skeleton className="h-16 w-full rounded-2xl" />
          <Skeleton className="h-16 w-full rounded-2xl" />
          <Skeleton className="h-16 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  )
}
