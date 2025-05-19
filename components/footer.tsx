import Link from "next/link"
import { Mail, Trophy, Github, Phone, Linkedin, Twitter, Instagram } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/afzal-basheer-127878264",
    icon: Linkedin,
  },
  {
    name: "GitHub",
    href: "https://github.com/Afzal74",
    icon: Github,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/afzal_basheer",
    icon: Twitter,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/afzal_basheer",
    icon: Instagram,
  },
]

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Practice", href: "/practice" },
  { name: "Multiplayer", href: "/create-room" },
  { name: "Profile", href: "/profile" },
  { name: "About", href: "/about" },
]

const helpLinks = [
  { name: "FAQ", href: "/faq" },
  { name: "Rules", href: "/rules" },
  { name: "Support", href: "/support" },
  { name: "Feedback", href: "/feedback" },
]

const legalLinks = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Cookie Policy", href: "/cookies" },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center mb-4"
            >
              <Trophy className="h-6 w-6 text-primary mr-2" />
              <span className="text-xl font-bold tracking-tight">QuizVerse</span>
            </motion.div>
            <p className="text-muted-foreground mb-6">
              Challenge your friends in real-time multiplayer quizzes. Create a room, invite players, and test your
              knowledge.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <motion.div
                  key={link.name}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link 
                    href={link.href}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-muted-foreground hover:text-primary transition-colors" 
                    aria-label={link.name}
                  >
                    <link.icon className="h-5 w-5" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <motion.div
                  key={link.name}
                  whileHover={{ x: 5 }}
                >
                  <Link 
                    href={link.href} 
                    className="block text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Help & Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Help & Support</h3>
            <div className="space-y-3">
              {helpLinks.map((link) => (
                <motion.div
                  key={link.name}
                  whileHover={{ x: 5 }}
                >
                  <Link 
                    href={link.href} 
                    className="block text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <motion.p 
                className="text-muted-foreground flex items-start"
                whileHover={{ x: 5 }}
              >
                <Mail className="h-5 w-5 mr-2 mt-0.5" />
                <span>appuafzal777@gmail.com</span>
              </motion.p>
              <motion.p 
                className="text-muted-foreground flex items-start"
                whileHover={{ x: 5 }}
              >
                <Phone className="h-5 w-5 mr-2 mt-0.5" />
                <span>+91 8073925730</span>
              </motion.p>
              <p className="text-muted-foreground">
                Have questions or feedback? We&apos;d love to hear from you. Reach out to our team.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © {currentYear} QuizVerse. All rights reserved.
          </p>
          <div className="flex space-x-6">
            {legalLinks.map((link) => (
              <motion.div
                key={link.name}
                whileHover={{ y: -2 }}
              >
                <Link 
                  href={link.href} 
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
