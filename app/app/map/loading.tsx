import { Skeleton } from "@/components/ui"

export default function Loading() {
  return (
    <div className="space-y-8">
      <div className="rounded-[28px] border border-subtle bg-surface p-8 shadow-[0_30px_68px_-44px_rgba(36,30,26,0.25)] md:p-10">
        <div className="space-y-3">
          <Skeleton className="h-4 w-56" />
          <Skeleton className="h-7 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <div className="min-h-[70vh] rounded-[32px] border border-subtle bg-surface-solid p-4 shadow-[0_32px_70px_-46px_rgba(36,30,26,0.25)] md:p-6">
        <div className="flex h-full flex-col gap-6 xl:flex-row">
          <div className="hidden xl:block xl:max-w-sm">
            <div className="space-y-4 rounded-3xl border border-subtle bg-soft p-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-5 w-56" />
                  <Skeleton className="h-3 w-24" />
                </div>
              ))}
            </div>
          </div>
          <Skeleton className="h-[520px] w-full rounded-[32px]" />
        </div>
      </div>
    </div>
  )
}
