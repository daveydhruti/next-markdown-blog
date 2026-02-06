import type { Metadata } from 'next'
import './globals.css'
import ThemeToggle from '@/components/ThemeToggle'

export const metadata: Metadata = {
  title: 'My Blog',
  description: 'A simple markdown-based blog built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gradient-to-b from-cream-50 to-cream-100 dark:from-plum-950 dark:to-plum-900">
          <header className="border-b border-blush-100 dark:border-mauve-900/30 bg-white/60 dark:bg-plum-950/50 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-6">
              <nav className="flex items-center justify-between">
                <a href="/" className="text-2xl font-bold text-mauve-600 dark:text-blush-300">
                  My Blog
                </a>
                <div className="flex items-center gap-6">
                  <a href="/" className="text-gray-700 dark:text-mauve-200 hover:text-blush-500 dark:hover:text-blush-300 transition-colors">
                    Home
                  </a>
                  <a href="/about" className="text-gray-700 dark:text-mauve-200 hover:text-blush-500 dark:hover:text-blush-300 transition-colors">
                    About
                  </a>
                  <ThemeToggle />
                </div>
              </nav>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="border-t border-blush-100 dark:border-mauve-900/30 mt-16">
            <div className="container mx-auto px-4 py-6 text-center text-gray-600 dark:text-mauve-300">
              <p>&copy; {new Date().getFullYear()} My Blog. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}