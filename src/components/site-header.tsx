"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-white/10 bg-[var(--color-teal)] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0">
          <Image src="/logo.svg" alt="FraCTO" width={32} height={32} className="w-8 h-8 brightness-0 invert" />
          <span className="text-xl font-semibold tracking-tight text-white">
            FraCTO
          </span>
        </Link>

        {/* Tagline (desktop) */}
        <div className="hidden lg:flex flex-1 justify-center">
          <span className="text-[11px] uppercase tracking-[0.24em] font-mono font-semibold text-white/80 whitespace-nowrap">
            Fractional CTO for AI <span className="text-white/50">·</span> Elevating Value
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-4 shrink-0">
          <Link href="/quick-scan" className="inline-flex items-center justify-center border border-white/60 text-white hover:border-white hover:bg-white/10 h-10 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Quick Scan
          </Link>
          <Link href="/express-interest">
            <Button className="bg-white text-[var(--color-teal)] hover:bg-white/90 border-none">
              Express Interest
            </Button>
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden p-2 text-white"
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

      {/* Mobile tagline */}
      <div className="lg:hidden border-t border-white/10 px-6 py-1.5 text-center">
        <span className="text-[10px] uppercase tracking-[0.2em] font-mono font-semibold text-white/70">
          Fractional CTO for AI <span className="text-white/50">·</span> Elevating Value
        </span>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="sm:hidden border-t border-white/10 bg-[var(--color-teal-dark)] px-6 py-4 flex flex-col gap-3">
          <Link href="/quick-scan" onClick={() => setMenuOpen(false)} className="inline-flex items-center w-full border border-white/60 text-white hover:border-white hover:bg-white/10 h-10 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Quick Scan
          </Link>
          <Link href="/express-interest" onClick={() => setMenuOpen(false)}>
            <Button className="w-full bg-white text-[var(--color-teal)] hover:bg-white/90 border-none">
              Express Interest
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
