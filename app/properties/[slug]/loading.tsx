import { Separator } from "@/components/ui/separator";

function Bone({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`skeleton rounded-sm ${className}`} />;
}

export default function Loading() {
  return (
    <article
      role="status"
      aria-busy="true"
      className="skeleton-in min-h-screen px-6 py-16"
    >
      <span className="sr-only">Loading property…</span>

      <div className="mx-auto max-w-6xl">
        <Bone className="mb-8 h-4 w-48" />

        <div className="mb-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Bone className="h-3 w-24" />
            <Bone className="mt-3 h-9 w-72 max-w-full md:h-12 md:w-[28rem]" />
            <Bone className="mt-3 h-4 w-40" />
          </div>
          <div>
            <Bone className="h-3 w-12 md:ml-auto" />
            <Bone className="mt-2 h-8 w-40 md:h-10" />
          </div>
        </div>

        <Separator className="mb-8 bg-neutral-200" />

        <Bone className="mb-12 aspect-video w-full" />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
          <div className="space-y-4 lg:col-span-2">
            <Bone className="h-5 w-32" />
            <Bone className="h-4 w-full" />
            <Bone className="h-4 w-full" />
            <Bone className="h-4 w-2/3" />
          </div>
          <Bone className="h-72 w-full" />
        </div>
      </div>
    </article>
  );
}
