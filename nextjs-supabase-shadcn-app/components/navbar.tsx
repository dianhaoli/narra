"use client";

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Dashboard' },
  { href: '/interviews', label: 'Interviews' },
  { href: '/upload', label: 'Upload' },
  { href: '/map', label: 'Map' },
  { href: '/profile/jane-doe', label: 'Profile' },
  { href: '/profile/john-smith', label: 'Narrator' },
  { href: '/profile', label: 'Profiles' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);
  const close = () => setOpen(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-subtle bg-surface-opaque shadow-[0_24px_45px_-28px_rgba(39,32,26,0.55)] backdrop-blur-xl transition-colors duration-300">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <h1 className="text-lg font-semibold text-[color:var(--foreground)] sm:text-xl">Narra</h1>

        <button
          onClick={toggle}
          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-subtle bg-surface shadow-[0_12px_28px_-18px_rgba(41,34,28,0.45)] text-[color:var(--foreground)] transition-colors duration-200 hover:bg-accent-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)] sm:hidden"
          aria-expanded={open}
          aria-label={open ? 'Close navigation' : 'Open navigation'}
        >
          {open ? <X size={20} strokeWidth={1.6} /> : <Menu size={20} strokeWidth={1.6} />}
        </button>

        <ul className="hidden items-center gap-3 text-sm font-medium text-muted sm:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-full px-4 py-2 transition-colors duration-200 hover:bg-accent-soft hover:text-[color:var(--accent-strong)]"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/upload"
              className="inline-flex items-center rounded-full bg-[color:var(--accent)] px-5 py-2.5 text-white shadow-[0_15px_35px_-20px_rgba(46,107,106,0.65)] transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:bg-[color:var(--accent-strong)]"
            >
              Share a story
            </Link>
          </li>
        </ul>
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.33, 1, 0.68, 1] }}
            className="sm:hidden flex flex-col gap-3 border-t border-subtle bg-surface-solid px-4 py-6 text-base font-medium text-[color:var(--foreground)] shadow-[0_28px_60px_-36px_rgba(41,34,28,0.35)]"
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-center justify-between rounded-2xl px-4 py-3 transition-colors duration-150 hover:bg-accent-soft/70 hover:text-[color:var(--accent-strong)]"
                  onClick={close}
                >
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/upload"
                className="flex items-center justify-center rounded-2xl bg-[color:var(--accent)] px-4 py-3 font-semibold text-white shadow-[0_26px_55px_-32px_rgba(46,107,106,0.6)]"
                onClick={close}
              >
                Share a story
              </Link>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;