'use client';

import { cn } from "@/lib/utils"
import React, { HTMLAttributes } from "react"
import { motion, HTMLMotionProps } from "motion/react"

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  containerClass?: string
}

export function Section({ children, className, containerClass, ...props }: SectionProps) {
  return (
    <section className={cn("py-20 md:py-32", className)} {...props}>
      <div className={cn("container mx-auto px-6 md:px-12 max-w-7xl", containerClass)}>
        {children}
      </div>
    </section>
  )
}

interface FadeInProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode
  delay?: number
}

export function FadeIn({ children, delay = 0, className, ...props }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
