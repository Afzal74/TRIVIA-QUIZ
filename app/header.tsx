// Import required dependencies
import Link from "next/link"
import ThemeToggle from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Home, Trophy, Users, User } from "lucide-react"

/**
 * Header Component
 * 
 * Enhanced global header component with navigation and improved styling.
 * Features:
 * - Application logo/title with home link
 * - Navigation menu with icons
 * - Theme toggle button
 * - Responsive design with mobile menu
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Title with home link */}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <Trophy className="h-6 w-6 text-primary" />
            <span className="hidden sm:inline">Professional Quiz</span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/practice" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              <Home className="h-4 w-4" />
              Practice
            </Link>
            <Link href="/create-room" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              <Users className="h-4 w-4" />
              Multiplayer
            </Link>
            <Link href="/profile" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              <User className="h-4 w-4" />
              Profile
            </Link>
          </nav>

          {/* Theme toggle and mobile menu */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="outline" size="sm" className="md:hidden">
              Menu
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
