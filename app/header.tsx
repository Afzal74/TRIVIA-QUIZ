import Link from "next/link"
import ThemeToggle from "@/components/theme-toggle"

export default function Header() {
  return (
    <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-slate-800 dark:text-slate-100">
            Professional Quiz
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
