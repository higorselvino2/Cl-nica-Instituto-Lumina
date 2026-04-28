'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <div className="w-full mx-auto divide-y divide-lux-border border-y border-lux-border">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="py-6">
            <button
              onClick={() => toggleItem(index)}
              className="flex w-full items-center justify-between text-left focus:outline-none group"
              aria-expanded={isOpen}
            >
              <span className="font-serif text-xl md:text-2xl text-white group-hover:text-lux-accent transition-colors">
                {item.question}
              </span>
              <span className="ml-6 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-lux-border bg-transparent text-lux-accent transition-transform duration-300 ease-in-out group-hover:border-lux-accent" style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}>
                <ChevronDown className="h-4 w-4" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <p className="pt-4 text-lux-text-s leading-relaxed md:text-lg">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
