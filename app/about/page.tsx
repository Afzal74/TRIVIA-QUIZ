import Header from "@/components/header"
import Footer from "@/components/footer"
import { Trophy, Users, Brain, Sparkles, Zap } from "lucide-react"

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16 pb-20">
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black"></div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="text-5xl font-bold mb-6 gradient-text">About QuizVerse</h1>
              <p className="text-xl text-gray-300">
                Discover the story behind the ultimate multiplayer quiz experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-white">Our Mission</h2>
                <p className="text-gray-300 mb-6">
                  QuizVerse was born from a simple idea: to create an engaging, interactive quiz platform that brings
                  people together through the joy of learning and friendly competition.
                </p>
                <p className="text-gray-300 mb-6">
                  Our mission is to make knowledge fun and accessible to everyone. We believe that learning should be an
                  exciting journey, not a chore. That's why we've designed QuizVerse to be both educational and
                  entertaining.
                </p>
                <p className="text-gray-300">
                  Whether you're a trivia enthusiast, a student looking to test your knowledge, or someone who enjoys a
                  good brain challenge, QuizVerse offers something for everyone.
                </p>
              </div>
              <div className="gradient-border p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4 text-white">Key Features</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="mr-4 mt-1">
                      <Trophy className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Competitive Gameplay</h4>
                      <p className="text-gray-400">
                        Challenge friends or random players in real-time multiplayer quizzes
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 mt-1">
                      <Brain className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Diverse Question Types</h4>
                      <p className="text-gray-400">
                        Multiple choice, checkbox, and sortable questions across various subjects
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 mt-1">
                      <Zap className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Adaptive Difficulty</h4>
                      <p className="text-gray-400">
                        Choose from Easy, Average, or Hard modes to match your skill level
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 mt-1">
                      <Users className="h-5 w-5 text-pink-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Social Experience</h4>
                      <p className="text-gray-400">
                        Create private rooms, invite friends, and compete on global leaderboards
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 mt-1">
                      <Sparkles className="h-5 w-5 text-amber-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Engaging Design</h4>
                      <p className="text-gray-400">
                        Immersive visuals, animations, and sound effects for an enhanced experience
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-20">
              <h2 className="text-3xl font-bold mb-6 text-white text-center">Our Story</h2>
              <div className="gradient-border p-8 rounded-xl">
                <p className="text-gray-300 mb-6">
                  QuizVerse started as a passion project by a small team of developers and educators who shared a common
                  love for trivia and learning. What began as a simple quiz app quickly evolved into a comprehensive
                  platform for knowledge enthusiasts around the world.
                </p>
                <p className="text-gray-300 mb-6">
                  Our team spent countless hours researching, designing, and testing to create an experience that's not
                  just informative, but genuinely fun. We consulted with educators, game designers, and UX experts to
                  ensure that QuizVerse strikes the perfect balance between education and entertainment.
                </p>
                <p className="text-gray-300 mb-6">
                  Today, QuizVerse continues to grow and evolve. We're constantly adding new features, questions, and
                  categories based on user feedback and the latest educational trends. Our community of quiz enthusiasts
                  helps shape the future of the platform, making it truly a collaborative effort.
                </p>
                <p className="text-gray-300">
                  We're proud of what QuizVerse has become, but we're even more excited about where it's going. As we
                  continue to expand our question database, add new game modes, and enhance the user experience, we
                  remain committed to our original mission: making learning fun for everyone.
                </p>
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6 text-white">Join the QuizVerse Community</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Ready to test your knowledge, challenge your friends, and discover new facts? Dive into QuizVerse today
                and become part of our growing community of quiz enthusiasts!
              </p>
              <div className="inline-block gradient-border p-1 rounded-full">
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-all">
                  Start Playing Now
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
