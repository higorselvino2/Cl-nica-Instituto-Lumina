'use client';

import * as React from 'react';
import { Menu, X, Instagram } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Tratamentos', href: '#tratamentos' },
    { name: 'Infraestrutura', href: '#infraestrutura' },
    { name: 'Corpo Clínico', href: '#equipe' },
    { name: 'Depoimentos', href: '#depoimentos' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-40 transition-all duration-300 pointer-events-auto',
        isScrolled
          ? 'bg-[#0A0F12]/80 backdrop-blur-md shadow-sm py-4 border-b border-lux-border'
          : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-6 md:px-12 max-w-7xl flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex-shrink-0 group">
          <span className={cn(
            "font-serif font-medium tracking-tight text-xl md:text-2xl transition-colors",
            isScrolled ? "text-lux-accent" : "text-white group-hover:text-lux-text-p"
          )}>
            INSTITUTO LUMINA<span className="text-lux-accent">.</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-lux-accent",
                isScrolled ? "text-lux-text-p" : "text-white"
              )}
            >
              {link.name}
            </a>
          ))}
          
          <div className="flex items-center space-x-6 pl-4 border-l border-lux-border">
            <a
              href="https://instagram.com/higorcaco"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "transition-colors hover:text-lux-accent",
                isScrolled ? "text-lux-text-p" : "text-white"
              )}
            >
              <Instagram className="w-5 h-5" />
            </a>
            
            <a
              id="btn-nav-whatsapp"
              data-track="lead-click"
              href="https://wa.me/5511973940501?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center tracking-wide text-xs px-6 py-3 font-medium uppercase transition-all duration-300 rounded-sm hover:-translate-y-0.5 bg-lux-accent text-black hover:opacity-90 hover:shadow-[0_8px_20px_rgba(197,160,89,0.2)]"
            >
              Agendar Avaliação
            </a>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={cn(
            "md:hidden p-2 rounded-sm transition-colors",
            isScrolled ? "text-lux-text-p" : "text-white"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0A0F12] shadow-xl border-t border-lux-border py-6 px-6 flex flex-col space-y-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-lux-text-p text-lg font-medium hover:text-lux-accent"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="https://wa.me/5511973940501"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center bg-lux-accent text-black hover:opacity-90 px-6 py-4 font-medium uppercase tracking-wide text-sm rounded-sm"
          >
            Agendar Agora
          </a>
        </div>
      )}
    </header>
  );
}
