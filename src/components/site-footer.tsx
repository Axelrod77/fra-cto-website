import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/50 py-8 px-6 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--color-muted-foreground)]">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-[var(--color-plum)] flex items-center justify-center">
            <span className="text-white font-bold text-[10px]">F</span>
          </div>
          <span className="font-medium text-[var(--color-plum)]">FraCTO</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/quick-scan" className="hover:text-[var(--color-plum)] transition-colors">
            Quick Scan
          </Link>
          <Link href="/express-interest" className="hover:text-[var(--color-plum)] transition-colors">
            Contact
          </Link>
        </div>
        <span>&copy; {new Date().getFullYear()} FraCTO. All rights reserved.</span>
      </div>
    </footer>
  );
}
