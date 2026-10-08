"use client";

import { Card } from "./ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "./ui/toast";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const ease = [0.2, 0.7, 0.2, 1] as const;
const viewport = { once: false, amount: 0.2 } as const;

const rise = {
  hidden: { opacity: 0, y: 20, transition: { duration: 0.3 } },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const draw = {
  hidden: { scaleX: 0, transition: { duration: 0.3 } },
  show: { scaleX: 1, transition: { duration: 1, ease } },
};
const column = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const panel = {
  hidden: { opacity: 0, x: 60, transition: { duration: 0.3 } },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease,
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
};

const details = [
  {
    label: "Phone / Direct Line",
    value: "+234 912 639 3650",
    href: "tel:+2349126393650",
  },
  {
    label: "Email",
    value: "hello@constrally.com",
    href: "mailto:hello@constrally.com",
  },
  { label: "Location", value: "Lagos, Nigeria" },
];

function Detail({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  const cls = `${href ? "group " : ""}relative flex items-center justify-between border-b border-neutral-200 py-5`;
  const body = (
    <>
      <div>
        <p className="font-serif text-xs uppercase tracking-wider text-neutral-400">
          {label}
        </p>
        <h3 className="mt-1 font-serif text-lg font-medium text-neutral-900 transition-transform duration-300 group-hover:translate-x-1">
          {value}
        </h3>
      </div>
      {href && (
        <>
          <ArrowUpRight className="h-5 w-5 text-neutral-400 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-900" />
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-neutral-900 transition-transform duration-500 group-hover:scale-x-100"
          />
        </>
      )}
    </>
  );

  return (
    <motion.div variants={rise}>
      {href ? (
        <a href={href} className={cls}>
          {body}
        </a>
      ) : (
        <div className={cls}>{body}</div>
      )}
    </motion.div>
  );
}

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div variants={rise} className="space-y-1">
      <Label
        htmlFor={id}
        className="font-serif text-xs uppercase tracking-wider text-neutral-600"
      >
        {label}
      </Label>
      <div className="group/field relative">
        {children}
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-neutral-900 transition-transform duration-500 group-focus-within/field:scale-x-100"
        />
      </div>
    </motion.div>
  );
}

const inputCls =
  "h-11 rounded-none border-0 border-b border-neutral-300 bg-transparent px-0 font-serif text-sm shadow-none focus-visible:ring-0";

export default function Contact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [trap, setTrap] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const submitForm = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (trap) {
      setSent(true);
      return;
    }

    setIsSubmitting(true);
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        { firstName, lastName, phoneNumber, email, message },
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! },
      );

      setFirstName("");
      setLastName("");
      setPhoneNumber("");
      setEmail("");
      setMessage("");
      setSent(true);
    } catch {
      toast.add({
        type: "error",
        description: "Failed to send message. Please try again.",
        priority: "high",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="scroll-mt-24 overflow-x-clip px-6 py-16 sm:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-start lg:gap-20">
        <motion.div
          variants={column}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="w-full"
        >
          <motion.h2
            variants={rise}
            className="font-serif text-3xl font-medium leading-tight tracking-tight text-neutral-900 sm:text-4xl md:text-5xl"
          >
            Let's talk about your goals.
          </motion.h2>

          <motion.div variants={draw} className="origin-left">
            <Separator className="my-6 bg-neutral-900" />
          </motion.div>

          <motion.p
            variants={rise}
            className="max-w-xl font-serif text-base leading-relaxed text-neutral-600"
          >
            Our team is ready to answer your questions with honesty and clarity,
            without any pressure. Reach out through whichever channel works best
            for you.
          </motion.p>

          <div className="mt-10 border-t border-neutral-200">
            {details.map((d) => (
              <Detail key={d.label} {...d} />
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={panel}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="w-full"
        >
          <Card className="relative w-full overflow-hidden rounded-none border border-neutral-200 bg-white p-6 shadow-none sm:p-8">
            <motion.h3
              variants={rise}
              className="font-serif text-2xl font-medium tracking-tight text-neutral-900"
            >
              Send Us a Message
            </motion.h3>

            <motion.div variants={draw} className="origin-left">
              <Separator className="my-6 bg-neutral-300" />
            </motion.div>

            <form
              inert={sent}
              className={`flex flex-col gap-6 transition-opacity duration-300 ${
                sent ? "opacity-0" : "opacity-100"
              }`}
              onSubmit={submitForm}
            >
              <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                <Field id="first-name" label="First Name">
                  <Input
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                    type="text"
                    id="first-name"
                    className={inputCls}
                  />
                </Field>

                <Field id="last-name" label="Last Name">
                  <Input
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    type="text"
                    id="last-name"
                    className={inputCls}
                  />
                </Field>

                <Field id="phone" label="Phone Number">
                  <Input
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+234"
                    type="tel"
                    id="phone"
                    className={inputCls}
                  />
                </Field>

                <Field id="email" label="Email Address">
                  <Input
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    type="email"
                    id="email"
                    className={inputCls}
                  />
                </Field>
              </div>

              <Field id="message" label="Message">
                <Textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help you?"
                  name="message"
                  id="message"
                  rows={4}
                  className={`${inputCls} h-auto min-h-24 resize-none py-2`}
                />
              </Field>

              <input
                type="text"
                name="constrally-trap"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                value={trap}
                onChange={(e) => setTrap(e.target.value)}
                className="absolute -left-2499.75 h-0 w-0 opacity-0"
              />

              <motion.div variants={rise}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="group h-12 w-full rounded-none bg-[#091e3c] font-serif text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#071832]"
                >
                  {isSubmitting ? "Sending..." : "Send Enquiry Now"}
                  {!isSubmitting && (
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  )}
                </Button>
              </motion.div>
            </form>

            <AnimatePresence>
              {sent && (
                <motion.div
                  key="done"
                  role="status"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-white p-8 text-center"
                >
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                    fill="none"
                    aria-hidden
                  >
                    <motion.circle
                      cx="32"
                      cy="32"
                      r="30"
                      stroke="#091e3c"
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8, ease }}
                    />
                    <motion.path
                      d="M20 33l8 8 16-17"
                      stroke="#091e3c"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.6, ease }}
                    />
                  </svg>

                  <h3 className="font-serif text-2xl font-medium text-neutral-900">
                    Message sent.
                  </h3>
                  <p className="max-w-xs font-serif text-sm leading-relaxed text-neutral-600">
                    We'll get back to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-2 border-b border-neutral-900 pb-0.5 font-serif text-xs font-semibold uppercase tracking-wider text-neutral-900"
                  >
                    Send another message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
