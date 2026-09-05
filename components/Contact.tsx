import { Card } from "./ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";

export default function Contact() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-start lg:gap-20">
        <div className="w-full">
          <h2 className="mb-6 font-serif text-3xl font-medium tracking-tight text-neutral-900 sm:mb-10 md:text-5xl">
            Let's talk about your goals.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-neutral-600">
            Our team is ready to answer your questions with honesty and clarity,
            without any pressure. Reach out through whichever channel works best
            for you.
          </p>
          <div className="mt-8 space-y-7 sm:mt-10">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-neutral-500">
                Phone / Direct Line
              </p>
              <h3 className="mt-2 font-serif text-lg text-neutral-900">
                +234 815 302 7176
              </h3>
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-neutral-500">
                Email
              </p>
              <h3 className="mt-2 font-serif text-lg text-neutral-900">
                Info@constrally.com
              </h3>
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-neutral-500">
                Location
              </p>
              <h3 className="mt-2 font-serif text-lg text-neutral-900">
                Lagos, Nigeria
              </h3>
            </div>
          </div>
        </div>
        <Card className="w-full px-4 sm:px-6 lg:max-w-none shadow-lg">
          <h3 className="mb-8 font-serif text-2xl font-medium tracking-tight text-neutral-900">
            Send Us a Message
          </h3>
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="first-name" className="mb-2 uppercase">
                  First Name
                </Label>
                <Input
                  placeholder="John"
                  type="text"
                  id="first-name"
                  className="h-11 rounded-none"
                />
              </div>
              <div>
                <Label htmlFor="last-name" className="mb-2 uppercase">
                  Last Name
                </Label>
                <Input
                  placeholder="Doe"
                  type="text"
                  id="last-name"
                  className="h-11 rounded-none"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="uppercase mb-2">
                  Phone Number
                </Label>
                <Input
                  placeholder="+234"
                  type="tel"
                  id="phone"
                  className="h-11 rounded-none"
                />
              </div>
              <div>
                <Label htmlFor="email" className="uppercase mb-2">
                  Email Address
                </Label>
                <Input
                  placeholder="john@example.com"
                  type="email"
                  id="email"
                  className="h-11 rounded-none"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="message" className="uppercase mb-2">
                Message
              </Label>
              <Textarea
                placeholder="How can we help you?"
                name="message"
                id="message"
                className="min-h-32 rounded-none"
              />
            </div>
            <Button className="uppercase  py-6 cursor-pointer">
              Send Enquiry Now
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
