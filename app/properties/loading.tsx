import { Separator } from "@/components/ui/separator";

function Bone({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`skeleton rounded-sm ${className}`} />;
}

export default function Loading() {
  return (
    <section
      role="status"
      aria-busy="true"
      className="skeleton-in min-h-screen bg-neutral-50 px-6 pb-24 pt-32 sm:pt-40 lg:pt-20"
    >
      <span className="sr-only">Loading properties…</span>

      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Bone className="mt-5 h-10 w-64 md:h-16 md:w-96" />
            <Bone className="mt-4 h-5 w-full max-w-md" />
          </div>
          <Bone className="h-3 w-24" />
        </div>

        <Separator className="mt-10 bg-neutral-200" />

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className={i >= 2 ? "hidden sm:block" : ""}>
              <Bone className="aspect-4/3 w-full" />

              <div className="pt-4">
                <Bone className="h-5 w-3/4" />
                <Bone className="mt-3 h-4 w-1/2" />

                <Separator className="my-4 bg-neutral-200" />

                <div className="flex items-end justify-between">
                  <Bone className="h-3 w-12" />
                  <Bone className="h-6 w-28" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
