import type { Metadata } from 'next'
import './globals.css'
import ThemeToggle from '@/components/ThemeToggle'
import { basePath } from '@/lib/basePath'

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
        <div className="min-h-screen relative">
          {/* Background image with tint overlay */}
          <div className="fixed inset-0 z-0">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-fixed"
              style={{
                backgroundImage: `url('${basePath}/background.png')`,
              }}
            />
            {/* Tint overlay - light mode: cream tint, dark mode: plum tint */}
            <div className="absolute inset-0 bg-cream-50/95 dark:bg-plum-950/95" />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <header className="border-b border-blush-100 dark:border-mauve-900/30 bg-white/60 dark:bg-plum-950/50 backdrop-blur-sm">
              <div className="container mx-auto px-4 py-6">
                <nav className="flex items-center justify-between">
                  <a href={`${basePath}/`} className="text-2xl font-bold text-mauve-600 dark:text-blush-300">
                    My Blog
                  </a>
                  <div className="flex items-center gap-6">
                    <a href={`${basePath}/about`} className="text-gray-700 dark:text-mauve-200 hover:text-blush-500 dark:hover:text-blush-300 transition-colors">
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
        </div>
      </body>
    </html>
  )
}