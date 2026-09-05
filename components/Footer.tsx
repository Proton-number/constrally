import { Separator } from "./ui/separator";
import { getYear } from "date-fns";

export default function Footer() {
  return (
    <footer className="bg-black px-6 py-24 text-white">
      <div className="mx-auto max-w-6xl space-y-8">
        <Separator className="bg-white/15" />

        <h3 className="font-serif text-3xl font-medium tracking-tight md:text-4xl">
          Constrally
        </h3>

        <div>
          <div className="flex items-center justify-between gap-8">
            <p className="font-serif text-base text-neutral-200 md:text-lg">
              We Build. We Develop. We Deliver.
            </p>

            <ul className="ml-6 flex gap-6 text-[10px] font-medium uppercase tracking-[0.15em] text-neutral-400">
              <li>Properties</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>

          <p className="mt-8 text-[10px] font-medium uppercase tracking-[0.15em] text-neutral-500">
            &copy; {getYear(new Date())} Constrally. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
