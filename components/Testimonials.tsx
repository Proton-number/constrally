import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface TESTIMONIALS {
  testimony: string;
  name: string;
  purchase: string;
  fallback: string;
}

const testimonials: Array<TESTIMONIALS> = [
  {
    testimony:
      "Constrally made buying my first plot of land completely stress-free. Everything was properly documented, the title was clean, and my agent was always available whenever I had a question.",
    name: "Adebayo O.",
    purchase: "Land Buyer · Ibeju Lekki",
    fallback: "A",
  },
  {
    testimony:
      "I was skeptical at first because I’ve been burned by fake agents before. But Constrally walked me through their registration, took me to the site, and provided all the necessary documents. I bought with complete confidence.",
    name: "Funke A.",
    purchase: "Property Buyer · Epe",
    fallback: "F",
  },
  {
    testimony:
      "The renovation they did on the property was exceptional. Every detail was carefully handled, and when I moved in, it felt brand new. Constrally delivered exactly what they promised.",
    name: "Chukwuemeka N.",
    purchase: "Renovation Client · Surulere",
    fallback: "C",
  },
];

export default function Testimonials() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <span className="font-serif text-[10px] font-medium uppercase tracking-widest text-neutral-500">
          Client Experiences
        </span>

        <h2 className="mt-3 font-serif text-3xl font-medium leading-tight tracking-tight text-neutral-900 md:text-5xl">
          What our clients say.
        </h2>
      </div>

      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
        {testimonials.map((testy) => (
          <Card
            key={testy.purchase}
            className="flex flex-col justify-between rounded-none border border-neutral-200 bg-white p-8 shadow-none"
          >
            <div>
              <span className="font-serif text-3xl leading-none text-neutral-300">
                “
              </span>

              <blockquote className="mt-2 font-serif text-base leading-relaxed text-neutral-700">
                {testy.testimony}
              </blockquote>
            </div>

            <div>
              <Separator className="my-6 bg-neutral-200" />

              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 rounded-full border border-neutral-200">
                  <AvatarFallback className="bg-neutral-100 font-serif text-xs font-medium text-neutral-700">
                    {testy.fallback}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <p className="font-serif text-xs font-semibold uppercase tracking-wider text-neutral-900">
                    {testy.name}
                  </p>
                  <p className="font-serif text-xs tracking-wide text-neutral-500">
                    {testy.purchase}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
