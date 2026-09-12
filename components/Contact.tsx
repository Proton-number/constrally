import { Card } from "./ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { Separator } from "@/components/ui/separator";

export default function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 scroll-smooth px-6 py-16 sm:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-start lg:gap-20">
        <div className="w-full">
          <h2 className="font-serif text-3xl font-medium leading-tight tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
            Let's talk about your goals.
          </h2>

          <Separator className="my-6 bg-neutral-900" />

          <p className="max-w-xl font-serif text-base leading-relaxed text-neutral-600">
            Our team is ready to answer your questions with honesty and clarity,
            without any pressure. Reach out through whichever channel works best
            for you.
          </p>

          <div className="mt-10 space-y-8">
            <div>
              <p className="font-serif text-xs uppercase tracking-wider text-neutral-400">
                Phone / Direct Line
              </p>
              <h3 className="mt-1 font-serif text-lg font-medium text-neutral-900">
                +234 912 639 3650
              </h3>
            </div>

            <div>
              <p className="font-serif text-xs uppercase tracking-wider text-neutral-400">
                Email
              </p>
              <h3 className="mt-1 font-serif text-lg font-medium text-neutral-900">
                Info@constrally.com
              </h3>
            </div>

            <div>
              <p className="font-serif text-xs uppercase tracking-wider text-neutral-400">
                Location
              </p>
              <h3 className="mt-1 font-serif text-lg font-medium text-neutral-900">
                Lagos, Nigeria
              </h3>
            </div>
          </div>
        </div>

        <Card className="w-full rounded-none border border-neutral-200 bg-white p-6 sm:p-8 shadow-none">
          <h3 className="font-serif text-2xl font-medium tracking-tight text-neutral-900">
            Send Us a Message
          </h3>

          <Separator className="my-6 bg-neutral-300" />

          <form className="flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label
                  htmlFor="first-name"
                  className="font-serif text-xs uppercase tracking-wider text-neutral-600"
                >
                  First Name
                </Label>
                <Input
                  placeholder="John"
                  type="text"
                  id="first-name"
                  className="h-11 rounded-none border-neutral-300 font-serif text-sm focus-visible:ring-neutral-900"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="last-name"
                  className="font-serif text-xs uppercase tracking-wider text-neutral-600"
                >
                  Last Name
                </Label>
                <Input
                  placeholder="Doe"
                  type="text"
                  id="last-name"
                  className="h-11 rounded-none border-neutral-300 font-serif text-sm focus-visible:ring-neutral-900"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="font-serif text-xs uppercase tracking-wider text-neutral-600"
                >
                  Phone Number
                </Label>
                <Input
                  placeholder="+234"
                  type="tel"
                  id="phone"
                  className="h-11 rounded-none border-neutral-300 font-serif text-sm focus-visible:ring-neutral-900"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="font-serif text-xs uppercase tracking-wider text-neutral-600"
                >
                  Email Address
                </Label>
                <Input
                  placeholder="john@example.com"
                  type="email"
                  id="email"
                  className="h-11 rounded-none border-neutral-300 font-serif text-sm focus-visible:ring-neutral-900"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="message"
                className="font-serif text-xs uppercase tracking-wider text-neutral-600"
              >
                Message
              </Label>
              <Textarea
                placeholder="How can we help you?"
                name="message"
                id="message"
                rows={4}
                className="rounded-none border-neutral-300 font-serif text-sm focus-visible:ring-neutral-900"
              />
            </div>

            <Button
              type="submit"
              className="h-12 w-full rounded-none bg-neutral-900 font-serif text-xs font-semibold uppercase tracking-wider text-white hover:bg-neutral-800"
            >
              Send Enquiry Now
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
}
