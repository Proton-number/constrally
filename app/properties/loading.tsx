import { Separator } from "@/components/ui/separator";

export default function Loading() {
  return (
    <div className="min-h-screen px-6 py-24">
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="space-y-3">
            <div className="h-3 w-24 bg-neutral-200" />
            <div className="h-10 w-72 bg-neutral-200" />
            <div className="h-4 w-96 max-w-full bg-neutral-200" />
          </div>
          <div className="h-4 w-28 bg-neutral-200" />
        </div>

        <Separator className="mb-12 bg-neutral-200" />

        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="flex flex-col border border-neutral-200 bg-white"
            >
              <div className="aspect-video w-full bg-neutral-200" />
              <div className="p-5 space-y-4">
                <div className="h-5 w-3/4 bg-neutral-200" />
                <Separator className="bg-neutral-100" />
                <div className="flex items-center justify-between pt-1">
                  <div className="h-4 w-24 bg-neutral-200" />
                  <div className="h-4 w-20 bg-neutral-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
