"use client";

import { motion } from "motion/react";

const ease = [0.2, 0.7, 0.2, 1] as const;

export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, delay, ease },
      }}
      exit={undefined}
      viewport={{ once: false, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function DrawLine({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{
        scaleX: 1,
        transition: { duration: 1.1, ease },
      }}
      viewport={{ once: false }}
      transition={{ duration: 0.3 }}
      className={`origin-left ${className}`}
    >
      {children}
    </motion.div>
  );
}
