import { Separator } from "./ui/separator";
import { getYear } from "date-fns";

export default function Footer() {
  return (
    <footer className="bg-black px-6 py-16 text-white sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <Separator className="bg-white/15" />

        <div className="mt-8 sm:mt-10">
          <h3 className="font-serif text-3xl font-medium tracking-tight sm:text-4xl">
            Constrally
          </h3>
        </div>

        <div className="mt-10 sm:mt-12">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-serif text-base text-neutral-200 sm:text-lg">
              We Build. We Develop. We Deliver.
            </p>

            <nav>
              <div className="mt-4">
                <ul className="flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-medium uppercase tracking-[0.15em] text-neutral-400">
                  <li>
                    <a
                      href="https://wa.me/message/VC4XY56ZPVCVO1"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-white"
                    >
                      WhatsApp
                    </a>
                  </li>
                  <li>
                    <a
                      href="http://www.youtube.com/@Constrally"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-white"
                    >
                      Youtube
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/constrally?stkn=OWp6dTQ3MXRpNmF4"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-white"
                    >
                      Instagram
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          <p className="mt-10 text-[10px] font-medium uppercase tracking-[0.15em] text-neutral-500 sm:mt-12">
            &copy; {getYear(new Date())} Constrally. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
