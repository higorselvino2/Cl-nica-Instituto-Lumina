'use client';

import * as React from 'react';
import { WhatsappIcon } from '@/components/icons';
import { motion, AnimatePresence } from 'motion/react';

export function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const minHeight = 300;
    const handleScroll = () => {
      if (window.scrollY > minHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappLink = "https://wa.me/5511973940501?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o%20exclusiva%20no%20Instituto%20Lumina.";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          id="btn-floating-whatsapp"
          data-track="lead-click-floating"
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0.5, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.5, opacity: 0, y: 50 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-green-600 hover:-translate-y-1 transition-all duration-300 before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-green-500 before:animate-ping before:opacity-20"
          aria-label="Falar pelo WhatsApp"
        >
          <WhatsappIcon className="h-8 w-8" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
