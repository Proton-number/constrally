"use client";

import { SyntheticEvent, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, FileText, Loader2, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const fieldClass =
  "h-12 rounded-sm border-neutral-300 bg-white px-4 font-serif text-base text-neutral-900 shadow-none placeholder:text-neutral-400 focus-visible:border-[#091e3c] focus-visible:ring-2 focus-visible:ring-[#091e3c]/15";
const labelClass =
  "mb-2 block font-serif text-[10px] font-medium uppercase tracking-widest text-neutral-500";

const MAX_MB = 4; // Vercel rejects request bodies over about 4.5 MB
const ease = [0.2, 0.7, 0.2, 1] as const;

const stagger = (gap: number, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});
const root = stagger(0.08, 0.1);
const column = stagger(0.09);
const rise = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};
const word = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.9, ease } },
};
const panel = {
  hidden: { opacity: 0, x: 60 },
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

function Word({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className="-mb-[0.15em] -mr-[0.08em] inline-block overflow-hidden pb-[0.15em] pr-[0.08em] align-bottom">
      <motion.span variants={word} className={`inline-block ${className}`}>
        {children}
      </motion.span>
    </span>
  );
}

function checkFile(file?: File | null) {
  if (!file) return "Please choose your CV.";
  const isPdf =
    file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
  if (!isPdf) return "Please upload a PDF file.";
  if (file.size > MAX_MB * 1024 * 1024)
    return `Your CV is over ${MAX_MB} MB. Please upload a smaller PDF.`;
  return "";
}

export default function CareersPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState("");
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function pickFile(file?: File) {
    if (!file) {
      setFileName("");
      setFileError("");
      return;
    }
    const problem = checkFile(file);
    if (problem) {
      setFileName("");
      setFileError(problem);
      if (fileRef.current) fileRef.current.value = "";
      return;
    }
    setFileError("");
    setFileName(file.name);
  }

  function onDrop(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file || !fileRef.current) return;
    const dt = new DataTransfer();
    dt.items.add(file);
    fileRef.current.files = dt.files;
    pickFile(file);
  }

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;

    const problem = checkFile(fileRef.current?.files?.[0]);
    if (problem) {
      setFileError(problem);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/careers", {
        method: "POST",
        body: new FormData(form),
      });

      if (response.ok) {
        form.reset();
        setFileName("");
        setSent(true);
        return;
      }

      const data = await response.json().catch(() => ({}));
      setError(
        response.status === 413
          ? `Your CV is too large. Please upload a PDF under ${MAX_MB} MB.`
          : (data.message ?? "Something went wrong. Please try again."),
      );
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen overflow-x-clip bg-neutral-50 px-6 pb-24 pt-32 sm:pt-40">
      <motion.div
        variants={root}
        initial="hidden"
        animate="show"
        className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:items-start lg:gap-16"
      >
      
        <motion.div
          variants={column}
          className="lg:sticky lg:top-32 lg:self-start lg:pt-6"
        >
          <h1 className="font-serif text-4xl font-medium leading-[1.05] tracking-tight text-neutral-900 sm:text-6xl">
            <Word>Help</Word> <Word>us</Word> <Word>build</Word>{" "}
            <Word className="italic text-[#091e3c]">Lagos.</Word>
          </h1>

          <motion.p
            variants={rise}
            className="mt-6 max-w-lg font-serif text-lg leading-relaxed text-neutral-600"
          >
            We build, develop and sell exceptional properties. If you take pride
            in your work and want to grow with a team that delivers, we&apos;d
            like to hear from you.
          </motion.p>

          <ul className="mt-10 max-w-lg divide-y divide-neutral-200 border-y border-neutral-200">
            {[
              "Send your details and CV in under a minute",
              "Applications are reviewed by our team directly",
              "We'll reach out by email if there's a fit",
            ].map((item, i) => (
              <motion.li
                key={item}
                variants={rise}
                className="flex items-start gap-4 py-4 font-serif text-base text-neutral-700"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* right: form card slides in, then its fields follow */}
        <motion.div
          variants={panel}
          className="relative overflow-hidden rounded-sm border border-neutral-200 bg-white p-6 shadow-[0_20px_60px_-20px_rgba(9,30,60,0.15)] sm:p-10"
        >
          <motion.h2
            variants={rise}
            className="font-serif text-2xl font-medium tracking-tight text-neutral-900"
          >
            Apply now
          </motion.h2>
          <motion.p
            variants={rise}
            className="mt-1 font-serif text-sm text-neutral-500"
          >
            All fields are required.
          </motion.p>

          <form
            onSubmit={handleSubmit}
            onChange={() => error && setError("")}
            inert={sent}
            className={`mt-8 space-y-6 transition-opacity duration-300 ${
              sent ? "opacity-0" : "opacity-100"
            }`}
          >
            <motion.div variants={rise}>
              <label htmlFor="name" className={labelClass}>
                Full name
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Jane Doe"
                required
                className={fieldClass}
              />
            </motion.div>

            <motion.div variants={rise}>
              <label htmlFor="email" className={labelClass}>
                Email address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="jane@example.com"
                required
                className={fieldClass}
              />
            </motion.div>

            <motion.div variants={rise}>
              <label htmlFor="position" className={labelClass}>
                Position
              </label>
              <Input
                id="position"
                name="position"
                type="text"
                autoComplete="organization-title"
                placeholder="e.g. Site Engineer"
                required
                className={fieldClass}
              />
            </motion.div>

            <motion.div variants={rise}>
              <span className={labelClass}>CV (PDF)</span>

              {/* input comes first so the label can react to its keyboard focus */}
              <Input
                ref={fileRef}
                id="cv"
                name="cv"
                type="file"
                accept=".pdf,application/pdf"
                required
                className="peer sr-only"
                onChange={(e) => pickFile(e.target.files?.[0])}
              />
              <label
                htmlFor="cv"
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={onDrop}
                className={`flex cursor-pointer items-center gap-4 rounded-sm border border-dashed px-4 py-5 transition-colors peer-focus-visible:border-[#091e3c] peer-focus-visible:ring-2 peer-focus-visible:ring-[#091e3c]/15 ${
                  dragging
                    ? "border-[#091e3c] bg-[#091e3c]/5"
                    : fileName
                      ? "border-[#091e3c] bg-white"
                      : "border-neutral-300 bg-neutral-50 hover:border-[#091e3c] hover:bg-white"
                }`}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#091e3c]/5 text-[#091e3c]">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={fileName ? "file" : "upload"}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex"
                    >
                      {fileName ? <FileText size={18} /> : <Upload size={18} />}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="min-w-0 font-serif">
                  <span className="block truncate text-base text-neutral-900">
                    {dragging ? (
                      "Drop your PDF here"
                    ) : fileName ? (
                      fileName
                    ) : (
                      <>
                        Choose a file
                        <span className="hidden sm:inline">
                          {" "}
                          or drag it here
                        </span>
                      </>
                    )}
                  </span>
                  <span className="block text-xs text-neutral-500">
                    {fileName
                      ? "Click to change"
                      : `PDF only, up to ${MAX_MB} MB`}
                  </span>
                </span>
              </label>

              <AnimatePresence>
                {fileError && (
                  <motion.p
                    key="file-error"
                    role="alert"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-2 font-serif text-xs text-red-700"
                  >
                    {fileError}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div variants={rise}>
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
            </motion.div>
          </form>

          <AnimatePresence>
            {error && (
              <motion.p
                key="error"
                role="alert"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6 rounded-sm border border-red-200 bg-red-50 px-4 py-3 font-serif text-sm text-red-700"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          {/* success: covers the card so its height never jumps */}
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

                <h2 className="font-serif text-2xl font-medium text-neutral-900">
                  Application sent.
                </h2>
                <p className="max-w-xs font-serif text-sm leading-relaxed text-neutral-600">
                  Thank you. We&apos;ll email you if there&apos;s a fit.
                </p>
                <Button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-2 border-b border-neutral-900 pb-0.5 font-serif text-xs font-semibold uppercase tracking-wider text-neutral-900"
                >
                  Send another application
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </main>
  );
}
