import Link from "next/link"
import Logo from "@/components/logo"
import { Facebook, Twitter, Instagram, GitlabIcon as GitHub, Mail } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900/80 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <span className="text-xl font-bold tracking-tight gradient-text">QuizVerse</span>
            </div>
            <p className="text-gray-400 mb-4">
              Challenge your friends in real-time multiplayer quizzes. Create a room, invite players, and test your
              knowledge.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="GitHub">
                <GitHub className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-3">
              <Link href="/notes" className="block text-gray-400 hover:text-white transition-colors">
                Notes
              </Link>
              <Link href="/leaderboard" className="block text-gray-400 hover:text-white transition-colors">
                Leaderboard
              </Link>
              <Link href="/about" className="block text-gray-400 hover:text-white transition-colors">
                About Us
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Help & Support</h3>
            <div className="space-y-3">
              <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                FAQ
              </Link>
              <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                Rules
              </Link>
              <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                Support
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <p className="text-gray-400 flex items-start">
                <Mail className="h-5 w-5 mr-2 mt-0.5" />
                <span>support@quizverse.com</span>
              </p>
              <p className="text-gray-400">
                Have questions or feedback? We'd love to hear from you. Reach out to our team.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">© {currentYear} QuizVerse. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
