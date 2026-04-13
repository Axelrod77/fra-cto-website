"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-[var(--color-navy)]/8 bg-white/85 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Image src="/logo.svg" alt="FraCTO" width={32} height={32} className="w-8 h-8" />
          <span className="text-xl font-semibold tracking-tight text-[var(--color-navy)]">
            FraCTO
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-4">
          <Link href="/quick-scan" className="inline-flex items-center justify-center border border-[var(--color-teal)]/40 text-[var(--color-navy)] hover:text-[var(--color-teal)] hover:border-[var(--color-teal)] h-10 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Quick Scan
          </Link>
          <Link href="/express-interest">
            <Button className="bg-[var(--color-teal)] hover:bg-[var(--color-teal-dark)] text-white border-none">
              Express Interest
            </Button>
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden p-2 text-[var(--color-navy)]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="sm:hidden border-t border-[var(--color-navy)]/8 bg-white px-6 py-4 flex flex-col gap-3">
          <Link href="/quick-scan" onClick={() => setMenuOpen(false)} className="inline-flex items-center w-full border border-[var(--color-teal)]/40 text-[var(--color-navy)] hover:text-[var(--color-teal)] h-10 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Quick Scan
          </Link>
          <Link href="/express-interest" onClick={() => setMenuOpen(false)}>
            <Button className="w-full bg-[var(--color-teal)] hover:bg-[var(--color-teal-dark)] text-white border-none">
              Express Interest
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
