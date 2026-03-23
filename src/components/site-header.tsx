"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="border-b border-border/50 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-lg bg-[var(--color-plum)] flex items-center justify-center">
            <span className="text-white font-bold text-sm">F</span>
          </div>
          <span className="text-xl font-semibold tracking-tight text-[var(--color-plum)]">
            FraCTO
          </span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/quick-scan">
            <Button variant="ghost" className="text-[var(--color-plum)] hover:bg-[var(--color-periwinkle-lighter)]">
              Quick Scan
            </Button>
          </Link>
          <Link href="/express-interest">
            <Button className="bg-[var(--color-plum)] hover:bg-[var(--color-plum-light)] text-white">
              Express Interest
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
