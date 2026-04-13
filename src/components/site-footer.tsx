import Link from "next/link";
import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="py-6 px-6 mt-auto bg-white border-t border-[var(--color-navy)]/10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--color-text-muted)]">
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" alt="FraCTO" width={20} height={20} className="w-5 h-5" />
          <span className="font-medium text-[var(--color-navy)]">FraCTO</span>
        </div>
        <div className="hidden md:block flex-1 text-center">
          <span className="text-[11px] uppercase tracking-[0.24em] font-mono font-semibold text-[var(--color-navy)]/70">
            Fractional CTO for AI <span className="text-[var(--color-teal)]">&mdash;</span> Elevating Value
          </span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/quick-scan" className="hover:text-[var(--color-teal)] transition-colors">
            Quick Scan
          </Link>
          <Link href="/express-interest" className="hover:text-[var(--color-teal)] transition-colors">
            Contact
          </Link>
          <span>&copy; {new Date().getFullYear()} FraCTO</span>
        </div>
      </div>
    </footer>
  );
}
