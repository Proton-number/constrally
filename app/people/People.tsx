"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

type Person = {
  name: string;
  role: string;
  focus: string;
};

type Department = {
  name: string;
  description: string;
  people: Person[];
};

const departments: Department[] = [
  {
    name: "Management",
    description: "Providing direction and overseeing business operations.",
    people: [
      {
        name: "Ayomiposi Micheal",
        role: "Executive Officer",
        focus: "Management & administration",
      },
    ],
  },
  {
    name: "Human Resources",
    description: "Supporting people, development, and organizational growth.",
    people: [
      {
        name: "Happiness Ogbeifun",
        role: "Human Resources",
        focus: "People & administration",
      },
    ],
  },
  {
    name: "Engineering & Project Management",
    description: "Turning plans into structures that last.",
    people: [
      {
        name: "Samuel Oyinloye",
        role: "Surveyor",
        focus: "Surveying",
      },
      {
        name: "Kamaldeen Ojulari",
        role: "Architect Intern",
        focus: "Architecture",
      },
      {
        name: "Ojomolade Toyosi",
        role: "Civil Engineer",
        focus: "Engineering ",
      },
    ],
  },
  {
    name: "Creative",
    description: "Communicating ideas through creativity and design.",
    people: [
      {
        name: "Mariam Ogunbayo",
        role: "Creative Communications & Social Media",
        focus: "Communications & social media",
      },
      {
        name: "Rejoicing Daniel",
        role: "Creative Communications & Social Media",
        focus: "Communications & social media",
      },
      {
        name: "Micheal Uwokpen",
        role: "Creative Graphic Officer",
        focus: "Graphic design",
      },
      {
        name: "Mariam Ganiu",
        role: "Creative Coordinator Intern",
        focus: "Creative support",
      },
    ],
  },
  {
    name: "Sales & Marketing",
    description: "Connecting clients with opportunities.",
    people: [
      {
        name: "Lucia Egbujor",
        role: "Growth Executive",
        focus: "Business growth",
      },
      {
        name: "Chioma Ikeionwu",
        role: "Sales Executive",
        focus: "Sales growth",
      },
      {
        name: "Jeffrey Ibeneme",
        role: "Sales Executive",
        focus: "Sales growth",
      },
    ],
  },
  {
    name: "Client Relations",
    description: "Building lasting relationships through service.",
    people: [
      {
        name: "Morenikeji Kolade",
        role: "Customer Care",
        focus: "Client relations",
      },
      {
        name: "Jennifer Uba",
        role: "Customer Care",
        focus: "Client support",
      },
    ],
  },
  {
    name: "Business Development",
    description: "Identifying opportunities and building partnerships.",
    people: [
      {
        name: "Olayinka Adaramoye",
        role: "Business Development",
        focus: "Business development",
      },
    ],
  },
  {
    name: "IT",
    description: "Supporting the systems and technology behind our operations.",
    people: [
      {
        name: "Favour Adebimpe",
        role: "IT Officer",
        focus: "Technology & IT support",
      },
    ],
  },
  {
    name: "Legal",
    description: "Providing legal guidance and professional support.",
    people: [
      {
        name: "Ayotoye Olajumoke Muinat",
        role: "Legal Officer",
        focus: "Legal services",
      },
    ],
  },
  {
    name: "Accounting",
    description: "Managing financial records and accountability.",
    people: [
      {
        name: "Elizabeth Ajilore",
        role: "Account Officer",
        focus: "Accounting & finance",
      },
    ],
  },
  {
    name: "Administration",
    description: "Keeping daily operations organized and efficient.",
    people: [
      {
        name: "Odunayo Ekunjesu",
        role: "Personal Assistant",
        focus: "Administrative support",
      },
      {
        name: "Boluwatife Atomode",
        role: "Intern",
        focus: "Administrative support",
      },
    ],
  },
];

export default function People() {
  const [active, setActive] = useState<string>("All");
  const reduce = useReducedMotion();

  const reveal = ({
    x = 0,
    y = 0,
    delay = 0,
  }: {
    x?: number;
    y?: number;
    delay?: number;
  }) => ({
    initial: reduce ? (false as const) : { opacity: 0, x, y },
    whileInView: { opacity: 1, x: 0, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 1.1, delay, ease: EASE },
  });

  const visible =
    active === "All"
      ? departments
      : departments.filter((department) => department.name === active);

  return (
    <main className="min-h-screen overflow-x-clip bg-neutral-50 text-neutral-900">
      <section className="px-6 pt-32 sm:pt-40">
        <div className="mx-auto max-w-6xl">
          <h1 className="max-w-5xl font-serif text-5xl font-light leading-[1.05] tracking-tight sm:text-7xl lg:text-8xl">
            <motion.span {...reveal({ x: -80, delay: 0.1 })} className="block">
              Great things are
            </motion.span>
            <motion.span
              {...reveal({ x: -80, delay: 0.45 })}
              className="block text-neutral-400"
            >
              built by people.
            </motion.span>
          </h1>
        </div>
      </section>

      <section id="our-people" className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <motion.div {...reveal({ x: -60 })}>
              <h2 className="font-serif text-4xl font-light sm:text-5xl">
                Meet our people
              </h2>
            </motion.div>

            <motion.div
              {...reveal({ x: 60, delay: 0.2 })}
              role="tablist"
              aria-label="Filter by department"
              className="flex gap-6 overflow-x-auto whitespace-nowrap pb-3 text-xs uppercase tracking-widest scrollbar-hide"
            >
              {["All", ...departments.map((department) => department.name)].map(
                (name) => (
                  <button
                    key={name}
                    role="tab"
                    aria-selected={active === name}
                    onClick={() => setActive(name)}
                    className={`relative shrink-0 pb-1 transition-colors ${
                      active === name
                        ? "text-neutral-900"
                        : "text-neutral-400 hover:text-neutral-700"
                    }`}
                  >
                    {name}
                    {/* underline glides between tabs */}
                    {active === name && (
                      <motion.span
                        layoutId="people-tab-underline"
                        aria-hidden
                        className="absolute inset-x-0 bottom-0 h-px bg-neutral-900"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </button>
                ),
              )}
            </motion.div>
          </div>

          {/* Departments */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -24 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="space-y-16 sm:space-y-24"
            >
              {visible.map((department) => (
                <div
                  key={department.name}
                  className="relative grid gap-8 pt-8 md:grid-cols-[1fr_2fr] md:gap-12"
                >
                  {/* top rule draws in from the left */}
                  <motion.span
                    aria-hidden
                    initial={reduce ? false : { scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease: EASE }}
                    className="absolute inset-x-0 top-0 h-px origin-left bg-neutral-200"
                  />

                  {/* Department Information */}
                  <motion.div
                    {...reveal({ x: -60 })}
                    className="md:sticky md:top-24 md:self-start"
                  >
                    <div className="flex items-center gap-3">
                      <h3 className="font-serif text-3xl font-light sm:text-4xl">
                        {department.name}
                      </h3>
                    </div>

                    <p className="mt-3 max-w-xs text-sm leading-relaxed text-neutral-500">
                      {department.description}
                    </p>
                  </motion.div>

                  {/* Employees */}
                  <ul>
                    {department.people.map((person, index) => (
                      <motion.li
                        key={`${department.name}-${person.name}`}
                        {...reveal({ x: 60, delay: 0.15 + index * 0.15 })}
                        className="group relative -mx-4 grid grid-cols-[2rem_1fr] items-baseline gap-x-4 border-b border-neutral-200 px-4 py-6 transition-colors duration-300 hover:bg-[#091e3b] hover:text-white sm:grid-cols-[2rem_1.4fr_1fr_1.5rem] sm:py-7"
                      >
                        <div className="transition-transform duration-500 group-hover:translate-x-2 sm:col-span-2">
                          <p className="font-serif text-2xl sm:text-3xl">
                            {person.name}
                          </p>

                          <p className="mt-1 text-sm text-neutral-500 transition-colors group-hover:text-white/70">
                            {person.role}
                          </p>
                        </div>

                        {/* Focus */}
                        <p className="col-start-2 mt-3 text-xs uppercase tracking-widest text-neutral-400 transition-colors group-hover:text-white/60 sm:col-start-auto sm:mt-0 sm:text-right">
                          {person.focus}
                        </p>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
