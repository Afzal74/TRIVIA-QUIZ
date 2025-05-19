// Import required dependencies
import Link from "next/link"
import ThemeToggle from "@/components/theme-toggle"

/**
 * Header Component
 * 
 * Global header component that appears on all pages.
 * Features:
 * - Application logo/title with home link
 * - Theme toggle button for switching between light/dark modes
 * 
 * Uses responsive design with container-custom class for consistent padding
 * and dark mode support through Tailwind CSS classes
 */
export default function Header() {
  return (
    <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Title with home link */}
          <Link href="/" className="text-xl font-bold text-slate-800 dark:text-slate-100">
            Professional Quiz
          </Link>
          {/* Theme toggle button component */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
