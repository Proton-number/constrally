import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    name: "Adebayo o.",
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
    purchase: "Renovation Client· Surulere",
    fallback: "C",
  },
];

export default function Testimonials() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-500 ">
          Client Stories
        </h3>
        <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-neutral-900 md:text-5xl">
          What our clients say.
        </h2>
      </div>
      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
        {testimonials.map((testy) => (
          <Card
            key={testy.purchase}
            className="group flex min-h-62.5 flex-col justify-between rounded-xl border-neutral-200/80 bg-white p-8 "
          >
            <div>
              <span className="font-serif text-4xl leading-none text-neutral-300">
                “
              </span>

              <blockquote className="-mt-2 font-serif text-lg leading-8 text-neutral-800">
                {testy.testimony}
              </blockquote>
            </div>
            <div className="mt-8 flex items-center gap-3 pt-5">
              <Avatar className="h-11 w-11 border border-neutral-200">
                <AvatarFallback className="bg-neutral-100 font-serif text-sm font-medium text-neutral-700">
                  {testy.fallback}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-neutral-900">
                  {testy.name}
                </p>
                <p className="mt-1 text-xs text-neutral-500">
                  {testy.purchase}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
