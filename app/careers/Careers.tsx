"use client";

import { SyntheticEvent, useState } from "react";
import { ArrowUpRight, FileText, Loader2, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const fieldClass =
  "h-12 rounded-sm border-neutral-300 bg-white px-4 font-serif text-base text-neutral-900 shadow-none placeholder:text-neutral-400 focus-visible:border-[#091e3c] focus-visible:ring-2 focus-visible:ring-[#091e3c]/15";
const labelClass =
  "mb-2 block font-serif text-[10px] font-medium uppercase tracking-widest text-neutral-500";

export default function CareersPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [fileName, setFileName] = useState<string>("");

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    // Grab the form now: e.currentTarget is null after an await
    const form = e.currentTarget;

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/careers", {
        method: "POST",
        body: new FormData(form),
      });

      const data = await response.json().catch(() => ({}));

      setSuccess(response.ok);
      setMessage(
        data.message ??
          (response.ok
            ? "Application sent. Thank you!"
            : "Something went wrong. Please try again."),
      );

      if (response.ok) {
        form.reset();
        setFileName("");
      }
    } catch {
      setSuccess(false);
      setMessage("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-neutral-50 px-6 pb-24 pt-32 sm:pt-40">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:items-start lg:gap-16">
        <div className="lg:pt-6">
          <h1 className="font-serif text-4xl font-medium leading-[1.05] tracking-tight text-neutral-900 sm:text-6xl">
            Help us build <span className="italic text-[#091e3c]">Lagos.</span>
          </h1>

          <p className="mt-6 max-w-lg font-serif text-lg leading-relaxed text-neutral-600">
            We build, develop and sell exceptional properties. If you take pride
            in your work and want to grow with a team that delivers, we&apos;d
            like to hear from you.
          </p>

          <ul className="mt-10 max-w-lg divide-y divide-neutral-200 border-y border-neutral-200">
            {[
              "Send your details and CV in under a minute",
              "Applications are reviewed by our team directly",
              "We'll reach out by email if there's a fit",
            ].map((item, i) => (
              <li
                key={item}
                className="flex items-start gap-4 py-4 font-serif text-base text-neutral-700"
              >
                <span className="font-medium text-[#091e3c]">0{i + 1}</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: form card */}
        <div className="rounded-sm border border-neutral-200 bg-white p-8 shadow-[0_20px_60px_-20px_rgba(9,30,60,0.15)] sm:p-10">
          <h2 className="font-serif text-2xl font-medium tracking-tight text-neutral-900">
            Apply now
          </h2>
          <p className="mt-1 font-serif text-sm text-neutral-500">
            All fields are required.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="name" className={labelClass}>
                Full name
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Jane Doe"
                required
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>
                Email address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="jane@example.com"
                required
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor="position" className={labelClass}>
                Position
              </label>
              <Input
                id="position"
                name="position"
                type="text"
                placeholder="e.g. Site Engineer"
                required
                className={fieldClass}
              />
            </div>

            <div className="relative">
              <span className={labelClass}>CV (PDF)</span>
              <label
                htmlFor="cv"
                className="flex cursor-pointer items-center gap-4 rounded-sm border border-dashed border-neutral-300 bg-neutral-50 px-4 py-5 transition-colors hover:border-[#091e3c] hover:bg-white"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#091e3c]/5 text-[#091e3c]">
                  {fileName ? <FileText size={18} /> : <Upload size={18} />}
                </span>
                <span className="min-w-0 font-serif">
                  <span className="block truncate text-base text-neutral-900">
                    {fileName || "Choose a file"}
                  </span>
                  <span className="block text-xs text-neutral-500">
                    {fileName ? "Click to change" : "PDF only"}
                  </span>
                </span>
              </label>
              <Input
                id="cv"
                name="cv"
                type="file"
                accept=".pdf"
                required
                className="sr-only"
                onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="group h-14 w-full cursor-pointer justify-between rounded-sm bg-[#091e3c] px-6 font-serif text-xs font-semibold uppercase tracking-wider text-white transition-colors duration-300 hover:bg-[#0d2c58] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Sending..." : "Apply"}
              {loading ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              )}
            </Button>
          </form>

          {message && (
            <p
              role="status"
              className={`mt-6 rounded-sm border px-4 py-3 font-serif text-sm ${
                success
                  ? "border-[#091e3c]/20 bg-[#091e3c]/5 text-[#091e3c]"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
